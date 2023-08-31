const convertArrayToObject = (array, keyPropertyName = 'id') => {
    let result = {};

    for (let entry of array) {
        result[entry[keyPropertyName]] = entry;
    }

    return result;
}

const convertObjectToHTTPQueryTerms = (obj = {}, prefix = '?') => {
    const keys = Object.keys(obj);

    // No keys in this object, return an empty string.
    if (keys.length < 1) {
        return "";
    }
    else {
        let terms = [];
        for (let entry of keys) {
            terms.push(`${entry}=${obj[entry]}`);
        }

        return `${prefix}${terms.join('&')}`;
    }
}

export {
    convertArrayToObject,
    convertObjectToHTTPQueryTerms
}