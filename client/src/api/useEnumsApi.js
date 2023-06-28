import useRestUtils from "./useRestUtils";

function useEnumsApi() {
    const { getRequest, callbackWrapper } = useRestUtils();

    function getStatusEffects(callback) {
        callbackWrapper(getRequest("/enums/status_effects"), callback);
    }

    function getElements(callback) {
        callbackWrapper(getRequest("/enums/elements"), callback);
    }

    function getScenarioOutcomes(callback) {
        callbackWrapper(getRequest("/enums/scenario_outcomes"), callback);
    }

    function getDamageSources(callback) {
        callbackWrapper(getRequest("/enums/damage_sources"), callback);
    }

    function getCreatureLevels(callback) {
        callbackWrapper(getRequest("/enums/creature_levels"), callback);
    }

    function getCreatureClasses(callback) {
        callbackWrapper(getRequest("/enums/creature_classes"), callback);
    }

    function getCharacterClasses(callback) {
        callbackWrapper(getRequest("/enums/character_classes"), callback);
    }

    return {
        getStatusEffects,
        getElements,
        getScenarioOutcomes,
        getDamageSources,
        getCreatureLevels,
        getCreatureClasses,
        getCharacterClasses
    };
}

export default useEnumsApi;
