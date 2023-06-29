import camelcaseKeys from "camelcase-keys";
import { getApiKey, setApiKey } from "../utils/ApiKey";
import RestError from "../utils/RestError";

class RestOptions {
    constructor({ jsonBody = true, camelCaseKeys = true }) {
        // Boolean (false in multipart rest calls)
        this.jsonBody = jsonBody;
        // Boolean
        this.camelCaseKeys = camelCaseKeys;
    };
}

const defaultRestOptions = new RestOptions({});
const multipartRestOptions = new RestOptions({ jsonBody: false });

// If window.DEV_MODE is true, the logging function is implemented.
// Otherwise it's an empty function.
const log = window?.DEV_MODE === true ?
    (string, obj) => {
        console.log(string, obj);
    }
    :
    (string, obj) => { };

// useRestUtils primary purpose is the four following methods it exports.
// getRequest, postRequest, patchRequest, deleteRequest
// These are used to make respective HTTP calls to the backend API. The URL provided to these method calls
// is the resource location relative to the base API URL (which is appended to each call internally).
// API Key and UserData is appended to calls as needed. MD - May 30/2022
function useRestUtils() {

    const apiBase = window?.API_URL || "http://localhost:3002";

    // Returns Header Object with X-APIKey, or undefined
    function apiKeyHeader() {
        const apiKey = getApiKey();

        if (apiKey) {
            log("Using API Key", apiKey);
            return { "X-APIKey": apiKey };
        }

        return "";
    }

    async function execute(url, request, options) {
        const apiUrl = `${apiBase}${url}`;

        const response = await fetch(apiUrl, request);

        return await processResponse(response, options);
    }

    function headers(options) {
        return options.jsonBody ? { "content-type": "application/json", ...apiKeyHeader() } :
            { ...apiKeyHeader() }
    }

    async function getRequest(url, options = defaultRestOptions) {
        if (!url) {
            throw new Error("Invalid GET Request, missing URL");
        }

        const request = {
            method: "GET",
            headers: { ...apiKeyHeader() }
        };

        log("GET", url);

        return execute(url, request, options);
    }

    async function postRequest(url, data = null, options = defaultRestOptions) {
        if (!url || typeof (url) !== "string") {
            throw new Error("Invalid POST Request, missing URL");
        }

        const request = {
            method: "POST",
            body: options.jsonBody ? JSON.stringify(data) : data,
            headers: headers(options)
        };
        log("POST", url);
        return execute(url, request, options);
    }

    async function putRequest(url, data = null, options = defaultRestOptions) {
        if (!url || typeof (url) !== "string") {
            throw new Error("Invalid POST Request, missing URL");
        }

        const request = {
            method: "PUT",
            body: options.jsonBody ? JSON.stringify(data) : data,
            headers: headers(options)
        };

        log("PUT", url);

        return execute(url, request, options);
    }

    async function deleteRequest(url, data = null, options = defaultRestOptions) {
        if (!url || typeof (url) !== "string") {
            throw new Error("Invalid DELETE Request, missing URL");
        }

        const request = {
            method: "DELETE",
            body: options.jsonBody ? JSON.stringify(data) : data,
            headers: headers(options)
        };

        log("DELETE", url);

        return execute(url, request, options);
    }

    async function processResponse(response, options) {
        log("RESPONSE", response.status);
        if (response.ok) {
            if (response.status >= 200 && response.status <= 299) {
                setApiKey(response.headers.get("X-APIKey"));
            }

            if (response.status === 204) {
                return;
            }
        }
        else {
            if (response.status >= 400 && response.status <= 499) {
                setApiKey(response.headers.get("X-APIKey"));

                const errorJson = camelcaseKeys(await response.json(), { deep: true });
                log("Error JSON payload:", errorJson);

                // Presently this logic is not needed.
                /*if (response.status === 422) {
                    // In the event of an ERROR from the API, combined with a Not Logged In message - the user credentials are now
                    // invalid but are still cached on the web side. We need to force a page reload.
                    if (errorJson.errorCode === "ERROR" && errorJson.message.toLowerCase().indexOf("not logged in") !== -1) {
                        // Comment this line of code because the page keeps reloading, not sure if we need to clear the credentials caching
                        window.location.reload();
                    }
                }
                */
                if (Array.isArray(errorJson?.message)) {
                    const { message } = errorJson.message[0];
                    throw new RestError(response.status, errorJson.errorCode, message, errorJson.field, errorJson.message);
                }
                else {
                    throw new RestError(response.status, errorJson.errorCode, errorJson.message, errorJson.field, []);
                }
            } else {
                throw new RestError(response.status, "", response.statusText);
            }
        }
        if (options.jsonBody) {
            return options.camelCaseKeys ? camelcaseKeys(await response.json(), { deep: true }) : await response.json();
        }
        return null;
    }

    const callbackWrapper = (promise, callback) => {
        promise
            .then(res => {
                log('SUCCESS: ', res);
                callback?.(null, res || true);
            })
            .catch(err => {
                log('FAILURE: ', err);
                callback?.(err, null);
            });
    }

    return {
        multipartRestOptions,
        getRequest,
        postRequest,
        putRequest,
        deleteRequest,
        callbackWrapper
    };
}

export default useRestUtils;
