import useRestUtils from './useRestUtils';

function useCharactersApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllCharacters(callback) {
        callbackWrapper(getRequest('/players/character'), callback);
    }

    function getCharactersByPlayerId(callback, id) {
        callbackWrapper(getRequest(`/players/character?playerId=${id}`), callback);
    }

    function getCharacterById(callback, id) {
        callbackWrapper(getRequest(`/players/character?id=${id}`), callback);
    }

    function postNewCharacter(callback, data) {
        callbackWrapper(postRequest(`/players/character`, data), callback);
    }

    function updateCharacter(callback, data) {
        callbackWrapper(putRequest(`/players/character`, data), callback);
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
