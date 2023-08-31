import React, { useState, useEffect, useMemo, createContext } from 'react';
import { useCharactersApi, usePlayersApi } from '../api';
import { useIsMounted } from '../hooks';
import { LoadingWrapper } from '../components/core';

const PlayerContext = createContext({
    players: [],
    playerCharacters: [],
    activeCharacters: [],
    loading: true,
    createNewCharacter: (data) => { },
    updatePlayerCharacter: (id, data) => { }
});

const PlayerProvider = ({ children }) => {
    const isMounted = useIsMounted();

    const { getAllPlayersBasicData } = usePlayersApi();
    const { getAllCharacters, postNewCharacter, updateCharacter } = useCharactersApi();

    const [loading, setLoading] = useState(2);
    const [players, setPlayers] = useState([])
    const [playerCharacters, setPlayerCharacters] = useState([]);

    const handlePlayers = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setPlayers(prev => [...data]);
        }

        setLoading(prev => Math.max(0, prev - 1));
    }

    const handleCharacters = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setPlayerCharacters([...data]);
        }

        setLoading(prev => Math.max(0, prev - 1));
    }

    const handleCharacterUpdate = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else {
            getAllCharacters(handleCharacters);
        }
    }

    const refreshData = () => {
        getAllPlayersBasicData(handlePlayers);
        getAllCharacters(handleCharacters);
    }

    useEffect(() => {
        refreshData();
    }, []);

    const handlePlayerCreation = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else {
            refreshData();
        }
    }

    const createNewCharacter = (playerData) => {
        postNewCharacter(handlePlayerCreation, playerData);
    }

    const updatePlayerCharacter = (id, characterData) => {
        updateCharacter(handleCharacterUpdate, {
            id,
            ...characterData
        });
    }

    const activeCharacters = useMemo(() => {
        return playerCharacters.filter(e => !e?.retired);
    }, [playerCharacters]);

    return (
        <PlayerContext.Provider
            value={{
                loading: loading > 0,
                players,
                playerCharacters,
                activeCharacters,
                createNewCharacter,
                updatePlayerCharacter
            }}>
            <LoadingWrapper loading={loading > 0}>
                {children}
            </LoadingWrapper>
        </PlayerContext.Provider>
    );
}

export default PlayerProvider;
export { PlayerContext };