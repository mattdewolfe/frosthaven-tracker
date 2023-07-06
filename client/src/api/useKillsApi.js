import useRestUtils from "./useRestUtils";

function useKillsApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllKills(callback, { page, limit }) {
        callbackWrapper(getRequest(`/stats/kill?page=${page}&limit=${limit}`), callback);
    }

    function getKillsByOwner(callback, characterId, playerId, options) {
        let query = `/stats/kill?`;
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
            callbackWrapper(getRequest('/stats/kill'), callback);
        }
    }

    function postNewKill(callback, data) {
        callbackWrapper(postRequest('/stats/kill', data), callback);
    }

    function updateKill(callback, data) {
        callbackWrapper(putRequest('/stats/kill', data), callback);
    }

    return {
        getAllKills,
        getKillsByOwner,
        postNewKill,
        updateKill
    };
}

export default useKillsApi;
