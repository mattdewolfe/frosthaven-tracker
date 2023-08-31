import { convertObjectToHTTPQueryTerms } from '../utils/Conversion';
import useRestUtils from './useRestUtils';

function useElementsApi() {
    const { getRequest, postRequest, deleteRequest, callbackWrapper } = useRestUtils();

    function getAllGenerated(callback, queryOptions) {
        callbackWrapper(getRequest(`/elements/generated${convertObjectToHTTPQueryTerms(queryOptions)}`), callback);
    }

    function deleteGeneratedById(callback, id) {
        callbackWrapper(deleteRequest(`/elements/generated?id=${id}`), callback);
    }

    function deleteGeneratedByScenarioId(callback, scenarioId) {
        callbackWrapper(deleteRequest(`/elements/generated/scenario?id=${scenarioId}`), callback);
    }

    function postGeneratedBatch(callback, { scenario_id, player_id, character_id, element_ids } = {}) {
        if (!scenario_id) {
            console.error('Post Element Batch is missing scenario_id');
            return;
        }
        else if (!player_id) {
            console.error('Post Element Batch is missing player_id');
            return;
        }
        else if (!character_id) {
            console.error('Post Element Batch is missing character_id');
            return;
        }
        else if (element_ids && element_ids.length < 1) {
            console.error('Post Element Batch has no element ids');
            return;
        }

        const body = {
            scenario_id,
            player_id,
            character_id,
            element_ids
        };

        callbackWrapper(postRequest('/elements/generated', body), callback);
    }

    function getAllConsumed(callback, queryOptions) {
        callbackWrapper(getRequest(`/elements/consumed${convertObjectToHTTPQueryTerms(queryOptions)}`), callback);
    }

    function deleteConsumedById(callback, id) {
        callbackWrapper(deleteRequest(`/elements/consumed?id=${id}`), callback);
    }

    function deleteConsumedByScenarioId(callback, scenarioId) {
        callbackWrapper(deleteRequest(`/elements/consumed/scenario?id=${scenarioId}`), callback);
    }

    function postConsumedBatch(callback, { scenario_id, player_id, character_id, element_ids } = {}) {
        if (!scenario_id) {
            console.error('Post Element Batch is missing scenario_id');
            return;
        }
        else if (!player_id) {
            console.error('Post Element Batch is missing player_id');
            return;
        }
        else if (!character_id) {
            console.error('Post Element Batch is missing character_id');
            return;
        }
        else if (element_ids && element_ids.length < 1) {
            console.error('Post Element Batch has no element ids');
            return;
        }

        const body = {
            scenario_id,
            player_id,
            character_id,
            element_ids
        };

        callbackWrapper(postRequest('/elements/consumed', body), callback);
    }

    return {
        getAllGenerated,
        deleteGeneratedById,
        deleteGeneratedByScenarioId,
        postGeneratedBatch,
        getAllConsumed,
        deleteConsumedById,
        deleteConsumedByScenarioId,
        postConsumedBatch
    };
}

export default useElementsApi;
