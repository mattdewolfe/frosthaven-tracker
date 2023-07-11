import React, { useContext, useMemo } from 'react';
import { EnumContext, PlayerContext } from '../contexts';
import { AddCharacterForm } from '../components/players';

const Player = ({ name = 'unknown', classes }) => {

    return (
        <>
            <h1>Name: {name}</h1>
        </>
    )
}

const PlayersPage = () => {

    const { players, playerCharacters } = useContext(PlayerContext);
    const { characterClasses } = useContext(EnumContext);

    const handleCreateCharacter = (data) => {
        // TODO: Post character data to API via context.
    }

    return (
        <div className='text-primary'>
            <h3 className='display-4 text-center py-5'>The Ravengers!</h3>
            <div>
                {
                    playerCharacters.map(e => <Player data={e} />)
                }
            </div>
            <AddCharacterForm
                players={players}
                classes={characterClasses}
                onSubmit={handleCreateCharacter} />
        </div >
    );
};

export default PlayersPage;