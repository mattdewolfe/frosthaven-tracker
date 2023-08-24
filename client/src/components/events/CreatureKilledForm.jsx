import React, { useContext, useCallback, useState } from 'react';
import { EventColors, CreatureKilled } from './EventModels';
import EventForm from './EventForm';
import { EnumContext } from '../../contexts';
import { useKillsApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';

const CreatureKilledForm = ({ scenarioId, scenarioLevel, style, activeCharacter }) => {

    const { creatureClasses, creatureLevels } = useContext(EnumContext);
    const { postNewKill } = useKillsApi();

    const handleFormSubmission = useCallback((data) => {
        postNewKill((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Creature Kill Submitted', type: 'success' });
            }
        }, {
            scenario_level: scenarioLevel,
            character_id: activeCharacter?.id,
            player_id: activeCharacter?.playerId,
            scenario_id: scenarioId,
            ...data
        });
    }, [activeCharacter, scenarioId, scenarioLevel]);

    return (
        <div
            style={{
                border: `1px solid ${EventColors.CreatureKilled}`,
                ...style
            }}>

            <EventForm
                resetOnSubmit={false}
                title='Creature Killed'
                saveLabel='Save Kill'
                model={CreatureKilled}
                character={activeCharacter}
                enumData={{ creatureClasses, creatureLevels }}
                scenarioId={scenarioId}
                onSubmit={handleFormSubmission}
            />
        </div>
    );
}

export default CreatureKilledForm;