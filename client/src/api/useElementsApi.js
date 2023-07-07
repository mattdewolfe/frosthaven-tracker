import { convertObjectToHTTPQueryTerms } from "../utils/Conversion";
import useRestUtils from "./useRestUtils";

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

    function postElementBatch(callback, { scenario_id, player_id, character_id, element_ids } = {}) {
        if (!scenario_id) {
            console.error("Post Element Batch is missing scenario_id");
            return;
        }
        else if (!player_id) {
            console.error("Post Element Batch is missing player_id");
            return;
        }
        else if (!character_id) {
            console.error("Post Element Batch is missing character_id");
            return;
        }
        else if (element_ids && element_ids.length < 1) {
            console.error("Post Element Batch has no element ids");
            return;
        }

        const body = {
            scenario_id,
            player_id,
            character_id,
            element_ids
        };

        callbackWrapper(postRequest("/elements/generated", body), callback);
    }

    return {
        getAllGenerated,
        deleteGeneratedById,
        deleteGeneratedByScenarioId,
        postElementBatch
    };
}

export default useElementsApi;
