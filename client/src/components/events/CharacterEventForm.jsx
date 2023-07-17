import React, { useContext, useCallback } from 'react';
import { EventColors, CharacterEvent } from './EventModels';
import EventForm from './EventForm';
import { EnumContext } from '../../contexts';
import { useEventsApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';

const CharacterEventForm = ({ character, scenarioId, style }) => {

    const { creatureClasses, creatureLevels } = useContext(EnumContext);
    const { postNewEvent } = useEventsApi();

    const handleDamageTakenSubmission = useCallback((data) => {
        postNewEvent((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Creature Kill Submitted', type: 'success' });
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
            title="Character Event"
            style={{
                border: `1px solid ${EventColors.CharacterEvent}`,
                ...style
            }}
            model={CharacterEvent}
            character={character}
            enuenumData={{ creatureClasses, creatureLevels }}
            scenarioId={scenarioId}
            onSubmit={handleDamageTakenSubmission}
        />
    );
}

export default CharacterEventForm;