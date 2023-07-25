import useRestUtils from "./useRestUtils";

function useTurnApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllTurns(callback, { page, limit }) {
        callbackWrapper(getRequest(`/stats/turns?page=${page}&limit=${limit}`), callback);
    }

    function getTurnsByOwner(callback, characterId, playerId, options) {
        let query = `/stats/turns?`;
        let params = [];
        if (characterId) {
            params.push(`characterId${characterId}`);
        }
        if (playerId) {
            params.push(`playerId=${playerId}`);
        }
        if (options) {
            const { page = 1, limit = 20 } = options;
            params.push(`page=${page}&limit=${limit}`);
        }
        if (params.length > 0) {
            callbackWrapper(getRequest(`${query}${params.join('&')}`), callback);
        }
        else {
            callbackWrapper(getRequest('/stats/turns'), callback);
        }
    }

    function getTurnById(callback, id) {
        callbackWrapper(getRequest(`/stats/turn?id=${id}`), callback);
    }

    function postNewTurn(callback, data) {
        console.log(data);

        callbackWrapper(postRequest('/stats/turn', data), callback);
    }

    function updateTurn(callback, data) {
        callbackWrapper(putRequest('/stats/turn', data), callback);
    }

    return {
        getAllTurns,
        getTurnsByOwner,
        getTurnById,
        postNewTurn,
        updateTurn
    };
}

export default useTurnApi;
