import React, { useCallback, useContext } from 'react';
import { EventColors, DamageTaken } from './EventModels';
import { EnumContext } from '../../contexts';
import { useDamageApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';
import EventForm from './EventForm';

const DamageTakenForm = ({ character, scenarioId, style }) => {

    const { damageSources } = useContext(EnumContext);
    const { postDamageTaken } = useDamageApi();

    const handleFormSubmission = useCallback((data) => {
        postDamageTaken((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Damage Taken Submitted', type: 'success' });
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
            title="Damage Taken"
            style={{
                border: `1px solid ${EventColors.DamageTaken}`,
                ...style
            }}
            model={DamageTaken}
            enumData={{ damageSources }}
            onSubmit={handleFormSubmission}
        />
    );
}

export default DamageTakenForm;