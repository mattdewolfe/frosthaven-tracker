# Client -> API Hooks

## Overview
Here is the general concept of our API hooks.

First, all of the hooks inside of the api folder are built on the functionality of the `useRestUtils.js` file. In this hook we have the structure for the various HTTP requests (https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) that we will make. Any unique error handling or header checks that we may want to do should also happen inside here. All the requests in here return promises, which are resolved/rejected after parsing the response of the request.

### Supported Requests
* GET, POST, PUT, DELETE, OPTIONS

### Unsupported Requests
* PATCH, HEAD, TRACE, CONNECT, PATCH

## Usage
### Import
Any of these request methods can be extracted from the `useRestUtils` hook, as such:

```
const { getRequest, postRequest, putRequest, deleteRequest, callbackWrapper } = useRestUtils();
```

The request calls return a `Promise`, (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) allowing us to use them with `async / await` flow if desired. The `callbackWrapper` method allows us to take in a `Promise` and a callback and trigger said callback function when the `Promise` resolves.


### Calls
Calls to these endpoints expect, at the very least, a path. This is the first parameter of all the `Request` methods. The second parameter is an optional data payload, which will be sent as the body of the request. The third paramter is an optional 'options' object, specifying key options we may want to set on the HTTP request. This is more complex, and generally the default will suffice.
```
const someApiHook = () => {
    const { getRequest } = useRestUtils();
    
    function getCharacter() {
        /* Note, this is not wrapped in a callback handler. While this call will succeed, nothing will be done with the data. */

        getRequest('/character');
    }

    function getCharacterByName(name) {
        /* This request is using the data payload to send a body with the request. */
        getRequest('/character', { Name: name });
    }

    function getCharacterWithOptions() {
        /* This request is using the options to alter the request/response. See the `useRestUtils.js` file for more details on how this works. */
        getRequest('/character', undefined, { camelCaseKeys: false});
    }
}
```


### Callbacks
Anytime you are using the `callbackWrapper` with one of the request `Promises`, there is an expected structure. `Error`, if there is any, will always be the first parameter in the callback. The `data` - which will be any non-error response from the API, will be in the second parameter. When making an HTTP request within any of our API hooks, the format will be almost entirely identical.
```
function callbackHandler(error, data) {
    // Do whatever you need to in here.
    // Common flow: check for errors first
    if (error) {
        console.log('Oh darn!');
    }
    else {
        console.log('handle your data here');
    }
}

// This may show up as lambdas more often, but is functionally the same
const lambdaCallback = (error, data) => { 
    // Do stuff in here.
}
```

## API Hooks
By and large, the `useRestUtils.js` should never be used outside of our API hooks. The concept for each of these API hooks is to group functionality into logical chunks. IE, one API hook for all character requests, another for all user request, another for configuration requests, etc etc.

The internals of these hooks is really left up to the writer, but it should be settled on whether you will be making use of normal `async / await` patterns, or using the `callbackWrapper`. The general convention used with all these hooks is to accept a callback as their first parameter. If the callback structure is used, the callback should be the first parameter of all methods from these hooks. This keeps the usage consistent and avoids checking function call defintions over and over again for different APIs.