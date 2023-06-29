import { LocalStorage } from "./Storage";
import { StorageKeys } from "../constants";

function getApiKey() {
    let res = '';
    try {
        res = LocalStorage.get(StorageKeys.API_KEY);
    }
    catch (e) {
        console.warn(e);
    }

    return res;
}

function setApiKey(key) {
    LocalStorage.set(StorageKeys.API_KEY, key);
}

export { getApiKey, setApiKey };