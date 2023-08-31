import { convertObjectToHTTPQueryTerms } from '../utils/Conversion';
import useRestUtils from './useRestUtils';

function useStatusApi() {
    const { getRequest, postRequest, deleteRequest, callbackWrapper } = useRestUtils();

    function getAllApplied(callback, queryOptions) {
        callbackWrapper(getRequest(`/status/applied${convertObjectToHTTPQueryTerms(queryOptions)}`), callback);
    }

    function deleteAppliedById(callback, id) {
        callbackWrapper(deleteRequest(`/status/applied?id=${id}`), callback);
    }

    function deleteAppliedByScenarioId(callback, scenarioId) {
        callbackWrapper(deleteRequest(`/status/applied/scenario?id=${scenarioId}`), callback);
    }

    function postAppliedBatch(callback, { scenario_id, player_id, character_id, status_ids } = {}) {
        if (!scenario_id) {
            console.error('Post Status Batch is missing scenario_id');
            return;
        }
        else if (!player_id) {
            console.error('Post Status Batch is missing player_id');
            return;
        }
        else if (!character_id) {
            console.error('Post Status Batch is missing character_id');
            return;
        }
        else if (status_ids && status_ids.length < 1) {
            console.error('Post Status Batch has no element ids');
            return;
        }

        const body = {
            scenario_id,
            player_id,
            character_id,
            status_ids
        };

        callbackWrapper(postRequest('/status/applied', body), callback);
    }

    function getAllReceived(callback, queryOptions) {
        callbackWrapper(getRequest(`/status/received${convertObjectToHTTPQueryTerms(queryOptions)}`), callback);
    }

    function deleteReceivedById(callback, id) {
        callbackWrapper(deleteRequest(`/status/received?id=${id}`), callback);
    }

    function deleteReceivedByScenarioId(callback, scenarioId) {
        callbackWrapper(deleteRequest(`/status/received/scenario?id=${scenarioId}`), callback);
    }

    function postReceivedBatch(callback, { scenario_id, player_id, character_id, status_ids } = {}) {
        if (!scenario_id) {
            console.error('Post Status Batch is missing scenario_id');
            return;
        }
        else if (!player_id) {
            console.error('Post Status Batch is missing player_id');
            return;
        }
        else if (!character_id) {
            console.error('Post Status Batch is missing character_id');
            return;
        }
        else if (status_ids && status_ids.length < 1) {
            console.error('Post Status Batch has no element ids');
            return;
        }

        const body = {
            scenario_id,
            player_id,
            character_id,
            status_ids
        };

        callbackWrapper(postRequest('/status/received', body), callback);
    }

    return {
        getAllApplied,
        deleteAppliedById,
        deleteAppliedByScenarioId,
        postAppliedBatch,
        getAllReceived,
        deleteReceivedById,
        deleteReceivedByScenarioId,
        postReceivedBatch,
    };
}

export default useStatusApi;
