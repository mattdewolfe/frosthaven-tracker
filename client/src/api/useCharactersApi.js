import useRestUtils from "./useRestUtils";

function useCharactersApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllCharacters(callback) {
        callbackWrapper(getRequest("/characters"), callback);
    }

    function getCharactersByPlayerId(callback, id) {
        callbackWrapper(getRequest(`/characters?playerId=${id}`), callback);
    }

    function getCharacterById(callback, id) {
        callbackWrapper(getRequest(`/characters?id=${id}`), callback);
    }

    function postNewCharacter(callback, data) {
        callbackWrapper(postRequest(`/characters`, data), callback);
    }

    function updateCharacter(callback, data) {
        callbackWrapper(putRequest(`/characters`, data), callback);
    }

    return {
        getAllCharacters,
        getCharactersByPlayerId,
        getCharacterById,
        postNewCharacter,
        updateCharacter
    };
}

export default useCharactersApi;
