import useRestUtils from "./useRestUtils";

function useEventsApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllEvents(callback, { page, limit }) {
        callbackWrapper(getRequest(`/stats/events?page=${page}&limit=${limit}`), callback);
    }

    function getEventsByOwner(callback, characterId, playerId, options) {
        let query = `/stats/events?`;
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
            callbackWrapper(getRequest('/stats/events'), callback);
        }
    }

    function getEventById(callback, id) {
        callbackWrapper(getRequest(`/stats/event?id=${id}`), callback);
    }

    function postNewEvent(callback, data) {
        callbackWrapper(postRequest('/stats/event', data), callback);
    }

    function updateEvent(callback, data) {
        callbackWrapper(putRequest('/stats/event', data), callback);
    }

    return {
        getAllEvents,
        getEventsByOwner,
        getEventById,
        postNewEvent,
        updateEvent
    };
}

export default useEventsApi;
