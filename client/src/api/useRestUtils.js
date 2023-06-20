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

// Errors with status reports from the Batch job return an email as a key.
// We need to ignore the . in this or else it becomes jibberish on our end
const AllowPeriodRegex = new RegExp(/\./g);

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
// If credentials are added, that will be handled in here instead of each api hook. MD - May Jun1/23
function useRestUtils() {

    const apiBase = window?.API_URL || "http://localhost:8000";

    async function execute(url, request, options) {
        const apiUrl = `${apiBase}${url}`;

        const response = await fetch(apiUrl, request);

        return await processResponse(response, options);
    }

    // Expand as necessary to add additional header properties we need.
    function headers(options) {
        return options.jsonBody ? { "content-type": "application/json" } :
            {}
    }

    async function getRequest(url, options = defaultRestOptions) {
        if (!url) {
            throw new Error("Invalid GET Request, missing URL");
        }

        const request = {
            method: "GET",
            headers: { ...apiKeyHeader(), ...isoDateHeader() }
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

    async function patchRequest(url, data = null, options = defaultRestOptions) {
        if (!url || typeof (url) !== "string") {
            throw new Error("Invalid POST Request, missing URL");
        }

        const request = {
            method: "PATCH",
            body: options.jsonBody ? JSON.stringify(data) : data,
            headers: headers(options)
        };

        log("PATCH", url);

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
                // Parse headers to get key data, if desired.
                // IE: store api key from "response.headers.get(X-APIKey)";
            }

            if (response.status === 204) {
                return;
            }
        }
        else {
            if (response.status >= 400 && response.status <= 499) {
                // As these are error states, we might wipe out any critical local data (such as an API key)
                const errorJson = camelcaseKeys(await response.json(), { deep: true, stopPaths: [AllowPeriodRegex] });
                log("Error JSON payload:", errorJson);

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
            return options.camelCaseKeys ? camelcaseKeys(await response.json(), { deep: true, exclude: [AllowPeriodRegex] }) : await response.json();
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
        patchRequest,
        deleteRequest,
        callbackWrapper
    };
}

export default useRestUtils;
