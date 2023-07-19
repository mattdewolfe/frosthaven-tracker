import React, { useContext, useCallback } from 'react';
import { EventColors, CreatureKilled } from './EventModels';
import EventForm from './EventForm';
import { EnumContext } from '../../contexts';
import { useKillsApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';

const CreatureKilledForm = ({ character, scenarioId, scenarioLevel, style }) => {

    const { creatureClasses, creatureLevels } = useContext(EnumContext);
    const { postNewKill } = useKillsApi();

    const handleDamageTakenSubmission = useCallback((data) => {
        postNewKill((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Creature Kill Submitted', type: 'success' });
            }
        }, {
            scenario_level: scenarioLevel,
            character_id: character?.id,
            player_id: character?.id,
            scenario_id: scenarioId,
            ...data
        });
    }, [character, scenarioId, scenarioLevel]);

    return (
        <EventForm
            title="Creature Killed"
            style={{
                border: `1px solid ${EventColors.CreatureKilled}`,
                ...style
            }}
            model={CreatureKilled}
            character={character}
            enumData={{ creatureClasses, creatureLevels }}
            scenarioId={scenarioId}
            onSubmit={handleDamageTakenSubmission}
        />
    );
}

export default CreatureKilledForm;