import useRestUtils from './useRestUtils';

function useScenariosApi() {
    const { getRequest, postRequest, putRequest, callbackWrapper } = useRestUtils();

    function getAllScenarios(callback, { page = 1, limit = 50 } = {}) {
        callbackWrapper(getRequest(`/scenarios?page=${page}&limit=${limit}`), callback);
    }

    function getScenarioById(callback, id) {
        callbackWrapper(getRequest(`/scenarios?id=${id}`), callback);
    }

    function postNewScenario(callback, data) {
        callbackWrapper(postRequest(`/scenarios`, data), callback);
    }

    function updateScenario(callback, data) {
        callbackWrapper(putRequest(`/scenarios`, data), callback);
    }

    return {
        getAllScenarios,
        getScenarioById,
        postNewScenario,
        updateScenario
    };
}

export default useScenariosApi;
