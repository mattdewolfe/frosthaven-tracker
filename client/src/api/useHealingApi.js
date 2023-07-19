import useRestUtils from "./useRestUtils";

function useHealingApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllHealing(callback, { page, limit }) {
        callbackWrapper(getRequest(`/stats/heals?page=${page}&limit=${limit}`), callback);
    }

    function getHealingByOwner(callback, characterId, playerId, options) {
        let query = `/stats/heals?`;
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
            callbackWrapper(getRequest('/stats/healing'), callback);
        }
    }

    function getHealingById(callback, id) {
        callbackWrapper(getRequest(`/stats/healing?id=${id}`), callback);
    }

    function postNewHeal(callback, data) {
        callbackWrapper(postRequest('/stats/healing', data), callback);
    }

    function updateHeal(callback, data) {
        callbackWrapper(putRequest('/stats/healing', data), callback);
    }

    return {
        getAllHealing,
        getHealingByOwner,
        getHealingById,
        postNewHeal,
        updateHeal
    };
}

export default useHealingApi;
