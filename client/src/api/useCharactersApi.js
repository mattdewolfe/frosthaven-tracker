import useRestUtils from "./useRestUtils";

function useCharactersApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllCharacters(callback) {
        callbackWrapper(getRequest("/characters"), callback);
    }

    function getCharactersByPlayerId(id, callback) {
        callbackWrapper(getRequest(`/characters?playerId=${id}`), callback);
    }

    function getCharacterById(id, callback) {
        callbackWrapper(getRequest(`/characters?id=${id}`), callback);
    }

    function postNewCharacter(data, callback) {
        callbackWrapper(postRequest(`/characters`, data), callback);
    }

    function updateCharacter(data, callback) {
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
