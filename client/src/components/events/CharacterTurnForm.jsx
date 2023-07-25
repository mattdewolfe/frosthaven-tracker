import React, { useContext, useCallback, useState } from 'react';
import { EventColors, CharacterTurn } from './EventModels';
import EventForm from './EventForm';
import { EnumContext } from '../../contexts';
import { useTurnApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';
import { CharactersPicker } from '../players';

const CharacterEventForm = ({ scenarioId, style }) => {

    const { postNewTurn } = useTurnApi();
    const { creatureClasses, creatureLevels } = useContext(EnumContext);

    const [activeCharacter, setActiveCharacter] = useState({});

    const handleActiveCharacter = (character) => {
        setActiveCharacter(character);
    }

    const handleFormSubmission = useCallback((data) => {

        let validated = { ...data };
        if (validated.long_rest) {
            validated.initiative = 99;
            validated.short_rest = false;
        }

        postNewTurn((error, resData) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Character Turn Submitted', type: 'success' });
            }
        }, {
            ...validated,
            character_id: activeCharacter?.id,
            player_id: activeCharacter?.playerId,
            scenario_id: scenarioId
        });
    }, [activeCharacter, scenarioId]);

    return (
        <div
            style={{
                border: `1px solid ${EventColors.CharacterTurn}`,
                ...style
            }}>

            <CharactersPicker onCharacterSelected={handleActiveCharacter} />

            <div className='divider' />

            <EventForm
                title='Character Turn'
                saveLabel='Save Turn'
                model={CharacterTurn}
                character={activeCharacter}
                enuenumData={{ creatureClasses, creatureLevels }}
                scenarioId={scenarioId}
                onSubmit={handleFormSubmission}
            />
        </div>
    );
}

export default CharacterEventForm;