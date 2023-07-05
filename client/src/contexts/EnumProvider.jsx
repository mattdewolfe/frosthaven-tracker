import React, { useState, useEffect, createContext } from "react";
import { useEnumsApi } from "../api";
import { useIsMounted } from "../hooks";
import LoadingWrapper from "../components/LoadingWrapper";

const EnumContext = createContext({
    statusEffects: {},
    scenarioOutcomes: {},
    characterClasses: {},
    creatureClasses: {},
    damageSources: {},
    elements: {},
    creatureLevels: {},
    loading: 1,
});

const EnumProvider = ({ children }) => {
    const isMounted = useIsMounted();

    const { getStatusEffects,
        getScenarioOutcomes,
        getCharacterClasses,
        getCreatureClasses,
        getDamageSources,
        getCreatureLevels,
        getElements } = useEnumsApi();

    const [loading, setLoading] = useState(7);
    const [statusEffects, setStatusEffects] = useState({});
    const [scenarioOutcomes, setScenarioOutcomes] = useState({});
    const [characterClasses, setCharacterClasses] = useState({});
    const [creatureClasses, setCreatureClasses] = useState({});
    const [damageSources, setDamageSources] = useState({});
    const [elements, setElements] = useState({});
    const [creatureLevels, setCreatureLevels] = useState({});

    const convertToEnumObject = (array, keyPropertyName = 'id') => {
        let result = {};
        for (let entry of array) {
            result[entry[keyPropertyName]] = entry;
        }

        return result;
    }

    const handleStatusEffects = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setStatusEffects(convertToEnumObject(data));
        }

        setLoading(prev => prev - 1);
    }

    const handleScenarioOutcomes = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setScenarioOutcomes(convertToEnumObject(data));
        }

        setLoading(prev => prev - 1);
    }

    const handleCharacterClasses = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setCharacterClasses(convertToEnumObject(data));
        }

        setLoading(prev => prev - 1);
    }

    const handleCreatureClasses = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setCreatureClasses(convertToEnumObject(data));
        }

        setLoading(prev => prev - 1);
    }

    const handleDamageSources = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setDamageSources(convertToEnumObject(data));
        }

        setLoading(prev => prev - 1);
    }

    const handleCreatureLevels = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setCreatureLevels(convertToEnumObject(data));
        }

        setLoading(prev => prev - 1);
    }

    const handleElements = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setElements(convertToEnumObject(data));
        }

        setLoading(prev => prev - 1);
    }

    useEffect(() => {
        getStatusEffects(handleStatusEffects);
        getScenarioOutcomes(handleScenarioOutcomes);
        getCharacterClasses(handleCharacterClasses);
        getCreatureClasses(handleCreatureClasses);
        getDamageSources(handleDamageSources);
        getCreatureLevels(handleCreatureLevels);
        getElements(handleElements);
    }, []);

    return (
        <EnumContext.Provider value={{
            loading: loading > 0,
            statusEffects,
            scenarioOutcomes,
            characterClasses,
            creatureClasses,
            damageSources,
            elements,
            creatureLevels
        }}>
            <LoadingWrapper loading={loading > 0}>
                {children}
            </LoadingWrapper>
        </EnumContext.Provider>
    );
}

export default EnumProvider;
export { EnumContext };