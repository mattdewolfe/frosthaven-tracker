import React, { useContext, useCallback } from 'react';
import { EventColors, Healing } from './EventModels';
import EventForm from './EventForm';
import { EnumContext } from '../../contexts';
import { useHealingApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';

const CharacterEventForm = ({ character, scenarioId, style }) => {

    const { creatureClasses, creatureLevels } = useContext(EnumContext);
    const { postNewHeal } = useHealingApi();

    const handleFormSubmission = useCallback((data) => {
        postNewHeal((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Healing Submitted', type: 'success' });
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
            title="Healing"
            style={{
                border: `1px solid ${EventColors.Healing}`,
                ...style
            }}
            model={Healing}
            character={character}
            enuenumData={{ creatureClasses, creatureLevels }}
            scenarioId={scenarioId}
            onSubmit={handleFormSubmission}
        />
    );
}

export default CharacterEventForm;