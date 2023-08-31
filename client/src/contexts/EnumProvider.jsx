import React, { useState, useEffect, createContext } from 'react';
import { useEnumsApi } from '../api';
import { useIsMounted } from '../hooks';
import { LoadingWrapper } from '../components/core';

const EnumContext = createContext({
    statusEffects: [],
    scenarioOutcomes: [],
    characterClasses: [],
    creatureClasses: [],
    damageSources: [],
    elements: [],
    creatureLevels: [],
    loadingEnums: false,
});

const EnumProvider = ({ children }) => {
    const isMounted = useIsMounted();

    const { getStatusEffects,
        getScenarioOutcomes,
        getCharacterClasses,
        getCreatureClasses,
        getDamageSources,
        getCreatureLevels,
        getElements,
        getAttackModifiers } = useEnumsApi();

    const [loading, setLoading] = useState(8);
    const [statusEffects, setStatusEffects] = useState([]);
    const [scenarioOutcomes, setScenarioOutcomes] = useState([]);
    const [characterClasses, setCharacterClasses] = useState([]);
    const [creatureClasses, setCreatureClasses] = useState([]);
    const [damageSources, setDamageSources] = useState([]);
    const [elements, setElements] = useState([]);
    const [creatureLevels, setCreatureLevels] = useState([]);
    const [attackModifiers, setAttackModifiers] = useState([]);

    const handleStatusEffects = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setStatusEffects([...data]);
        }

        setLoading(prev => prev - 1);
    }

    const handleScenarioOutcomes = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setScenarioOutcomes([...data]);
        }

        setLoading(prev => prev - 1);
    }

    const handleCharacterClasses = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setCharacterClasses([...data]);
        }

        setLoading(prev => prev - 1);
    }

    const handleCreatureClasses = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setCreatureClasses([...data]);
        }

        setLoading(prev => prev - 1);
    }

    const handleDamageSources = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setDamageSources([...data]);
        }

        setLoading(prev => prev - 1);
    }

    const handleCreatureLevels = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setCreatureLevels([...data]);
        }

        setLoading(prev => prev - 1);
    }

    const handleElements = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setElements([...data]);
        }

        setLoading(prev => prev - 1);
    }

    const handleAttackModifiers = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setAttackModifiers([...data]);
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
        getAttackModifiers(handleAttackModifiers);
    }, []);

    return (
        <EnumContext.Provider
            value={{
                loadingEnums: loading > 0,
                statusEffects,
                scenarioOutcomes,
                characterClasses,
                creatureClasses,
                damageSources,
                elements,
                creatureLevels,
                attackModifiers
            }}>
            <LoadingWrapper loading={loading > 0}>
                {children}
            </LoadingWrapper>
        </EnumContext.Provider>
    );
}

export default EnumProvider;
export { EnumContext };