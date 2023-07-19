import React, { useContext, useCallback } from 'react';
import { EventColors, CharacterTurn } from './EventModels';
import EventForm from './EventForm';
import { EnumContext } from '../../contexts';
import { useTurnApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';

const CharacterEventForm = ({ character, scenarioId, style }) => {

    const { creatureClasses, creatureLevels } = useContext(EnumContext);
    const { postNewTurn } = useTurnApi();

    const handleFormSubmission = useCallback((data) => {
        postNewTurn((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Character Turn Submitted', type: 'success' });
            }
        }, {
            character_id: character?.id,
            player_id: character?.id,
            scenario_id: scenarioId,
            ...data
        });
    }, [character, scenarioId]);

    return (
        <EventForm
            title="Character Turn"
            style={{
                border: `1px solid ${EventColors.CharacterTurn}`,
                ...style
            }}
            model={CharacterTurn}
            character={character}
            enuenumData={{ creatureClasses, creatureLevels }}
            scenarioId={scenarioId}
            onSubmit={handleFormSubmission}
        />
    );
}

export default CharacterEventForm;