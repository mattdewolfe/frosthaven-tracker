import useRestUtils from './useRestUtils';

function usePlayersApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllPlayers(callback) {
        callbackWrapper(getRequest('/players'), callback);
    }

    function getPlayerById(callback, id) {
        callbackWrapper(getRequest(`/players?id=${id}`), callback);
    }

    function postNewPlayer(callback, data) {
        callbackWrapper(postRequest('/players', data), callback);
    }

    function updatePlayer(callback, data) {
        callbackWrapper(putRequest('/players', data), callback);
    }

    return {
        getAllPlayers,
        getPlayerById,
        postNewPlayer,
        updatePlayer
    };
}

export default usePlayersApi;
