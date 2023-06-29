import useRestUtils from "./useRestUtils";

function usePlayersApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllPlayers(callback) {
        callbackWrapper(getRequest("/players"), callback);
    }

    function getPlayerById(id, callback) {
        callbackWrapper(getRequest(`/players?id=${id}`), callback);
    }

    function postNewPlayer(data, callback) {
        callbackWrapper(postRequest("/players", data), callback);
    }

    function updatePlayer(data, callback) {
        callbackWrapper(putRequest("/players", data), callback);
    }

    return {
        getAllPlayers,
        getPlayerById,
        postNewPlayer,
        updatePlayer
    };
}

export default usePlayersApi;
