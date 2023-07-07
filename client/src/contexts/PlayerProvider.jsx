import React, { useState, useEffect, createContext } from "react";
import { useCharactersApi, usePlayersApi } from "../api";
import { useIsMounted } from "../hooks";
import { LoadingWrapper } from "../components";

const PlayerContext = createContext({
    players: [],
    playerCharacters: [],
    loading: true,
    createNewCharacter: (data) => { }
});

const PlayerProvider = ({ children }) => {
    const isMounted = useIsMounted();

    const { getAllPlayersBasicData } = usePlayersApi();
    const { getAllCharacters, postNewCharacter } = useCharactersApi();

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

        setLoading(prev => prev - 1);
    }

    const handleCharacters = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else if (isMounted()) {
            setPlayerCharacters([...data]);
        }

        setLoading(prev => prev - 1);
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

    return (
        <PlayerContext.Provider
            value={{
                loading: loading > 0,
                players,
                playerCharacters,
                createNewCharacter
            }}>
            <LoadingWrapper loading={loading > 0}>
                {children}
            </LoadingWrapper>
        </PlayerContext.Provider>
    );
}

export default PlayerProvider;
export { PlayerContext };