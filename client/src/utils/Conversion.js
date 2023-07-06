const convertArrayToObject = (array, keyPropertyName = 'id') => {
    let result = {};

    for (let entry of array) {
        result[entry[keyPropertyName]] = entry;
    }

    return result;
}

export {
    convertArrayToObject
}