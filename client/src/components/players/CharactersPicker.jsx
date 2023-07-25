import React, { useContext, useEffect } from 'react';
import { DropdownPicker } from '../core';
import { PlayerContext } from '../../contexts';

const CharactersPicker = ({ onCharacterSelected, style = {} }) => {

    const { activeCharacters } = useContext(PlayerContext);

    useEffect(() => {
        if (activeCharacters.length > 0) {
            onCharacterSelected?.(activeCharacters[0])
        }
    }, [activeCharacters]);

    const handleSelectedCharacter = (id) => {
        const selected = activeCharacters.find(character => character?.id == id);
        onCharacterSelected?.(selected);
    }

    if (activeCharacters.length < 1) {
        return (
            <div>
                No characters provided
            </div>
        );
    }

    return (
        <div style={style} >
            <DropdownPicker
                label='Character'
                onChange={handleSelectedCharacter}
                options={activeCharacters} />
        </div >
    );
}

export default CharactersPicker;