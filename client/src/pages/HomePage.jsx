import React, { useState, useEffect } from 'react';
import CardPicker from '../components/cards/CardPicker';
import { DropdownPicker } from '../components/core';
import CharacterData from '../data/character-data';

const Levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const HomePage = () => {

    const [selectedCharacter, setSelectedCharacter] = useState(CharacterData[0]);
    const [characterLevel, setCharacterLevel] = useState(1);

    const handleCharacterSelected = (key) => {
        setSelectedCharacter(CharacterData.find(c => c?.cardKey === key));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
                marginTop: 10,
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10
            }}
                className='header-text light-border'
            >
                Select Character:
                <DropdownPicker
                    mappingFunc={(entry) => {
                        const { name, cardKey } = entry;
                        return {
                            value: cardKey,
                            display: name
                        }
                    }}
                    value={selectedCharacter}
                    onChange={handleCharacterSelected}
                    options={CharacterData}
                />

                Set Level:
                <DropdownPicker
                    mappingFunc={(entry) => {
                        return {
                            value: entry,
                            display: entry
                        };
                    }}
                    options={Levels}
                    onChange={setCharacterLevel}
                    value={characterLevel}
                />
            </div>

            <CardPicker
                character={selectedCharacter}
                level={characterLevel} />
        </div>
    )
}

export default HomePage;

