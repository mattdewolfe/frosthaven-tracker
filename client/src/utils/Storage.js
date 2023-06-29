// Setting this up as a type enum, to handle the potential of future storage options (such as encrypted local). 
// MD, May26/22
const StorageType = Object.freeze({
    LOCAL: "Local",
    SESSION: "Session"
});

// Arrays currently unsupported by this system. Doing so will mean iterating over arrays of strings and replacing
// and escaping any ,. That way when the array is loaded in and split by , the string elements are not cut up.
const StorageDataTypes = Object.freeze({
    BOOL: "bool",
    STRING: "string",
    OBJECT: "json",
    NUMBER: "number"
});

// Basic check to ensure the key you are trying to write is a valid key.
function checkKey(key) {
    if (!key || typeof (key) !== "string") {
        throw new Error(`Invalid Storage Key: ${key}`);
    }
}

function getItem(key, storageType = StorageType.LOCAL) {
    switch (storageType) {
        case StorageType.LOCAL:
            return window.localStorage.getItem(key);

        case StorageType.SESSION:
            return window.sessionStorage.getItem(key);
    }

    throw new Error(`Unhandled storage type in {get key: ${key}} request`);
}

function setItem(key, value, storageType = StorageType.LOCAL) {
    switch (storageType) {
        case StorageType.LOCAL:
            return window.localStorage.setItem(key, value);

        case StorageType.SESSION:
            return window.sessionStorage.setItem(key, value);
    }

    throw new Error(`Unhandled storage type in {set key: ${key}, value: ${value}} request`);
}

function removeItem(key, storageType = StorageType.LOCAL) {
    switch (storageType) {
        case StorageType.LOCAL:
            return window.localStorage.removeItem(key);

        case StorageType.SESSION:
            return window.sessionStorage.removeItem(key);
    }

    throw new Error(`Unhandled storage type in {remove key: ${key}} request`);
}

function clearAll(storageType = StorageType.LOCAL) {
    switch (storageType) {
        case StorageType.LOCAL:
            return window.localStorage.clear();

        case StorageType.SESSION:
            return window.sessionStorage.clear();
    }

    throw new Error(`Unhandled storage type in {clear key: ${key}} request`);
}

// Converts provided data to the requested type.
// Does not throw new error, will return default for type if errors occur.
function convertData(data, type) {
    let result = "";

    try {
        switch (type) {
            case StorageDataTypes.BOOL:
                result = data == "true";
                break;

            case StorageDataTypes.NUMBER:
                result = Number(data);
                break;

            case StorageDataTypes.OBJECT:
                result = JSON.parse(data);
                break;

            default:
                result = data;
        }
    }
    catch (e) {
        console.warn(e);
        result = getDefaultData(type);
    }

    return result;
}

// Simple method to get default value for a given data type.
// Defaults to empty string.
function getDefaultData(forType) {
    switch (forType) {
        case StorageDataTypes.BOOL:
            return false;

        case StorageDataTypes.NUMBER:
            return 0;

        case StorageDataTypes.OBJECT:
            return {};

        default:
            return "";
    }
}

// Serialization before passing value onto the storage set call.
// Only handles object right now, else you would get [Object object] from the set call.
// If we want to handle arrays, or functions, or anything else funcky - well, we need to handle that :)
function serializeData(data) {
    if (typeof data === "object") {
        return JSON.stringify(data);
    }

    return data;
}

class StorageWrapper {
    constructor(type = StorageType.LOCAL) {
        this.type = type;
    }

    // Unless specified, your data type will be assumed to be a string as this is the how data is stored in browser storage.
    // To save parsing after the request, you can pass in a StorageDataType and the conversion will be handled here.
    get(key, dataType = StorageDataTypes.STRING) {
        try {
            checkKey(key);
            let data = getItem(key, this.type);
            return convertData(data, dataType);
        }
        catch (e) {
            console.warn(e);
            return getDefaultData(dataType);
        }
    }

    // Sets a value in storage. Does not require a type as serialization handles this.
    set(key, value) {
        try {
            checkKey(key);
            setItem(key, serializeData(value), this.type);
        }
        catch (e) {
            console.warn(e);
        }
    }

    // Removes the specified key from storage. 
    // This is not to set the value as null or something, but to remove the key entirely.
    remove(key) {
        try {
            checkKey(key);
            removeItem(key, this.type);
        }
        catch (e) {
            console.warn(e);
        }
    }

    // Wipes out ALL data in this storage.
    clear() {
        try {
            clearAll(this.type);
        }
        catch (e) {
            console.warn(e);
        }
    }
}

const LocalStorage = new StorageWrapper(StorageType.LOCAL);
const SessionStorage = new StorageWrapper(StorageType.SESSION);

export { LocalStorage, SessionStorage, StorageDataTypes };