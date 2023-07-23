import React, { useCallback, useContext } from 'react';
import { EventColors, DamageDealt } from './EventModels';
import { EnumContext } from '../../contexts';
import { useDamageApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';
import EventForm from './EventForm';

const DamageDealtForm = ({ character, scenarioId, style }) => {

    const { damageSources } = useContext(EnumContext);
    const { postDamageDealt } = useDamageApi();

    const handleFormSubmission = useCallback((data) => {
        postDamageDealt((error, result) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Damage Dealt Submitted', type: 'success' });
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
            title="Damage Dealt"
            style={{
                border: `1px solid ${EventColors.DamageDealt}`,
                ...style
            }}
            model={DamageDealt}
            enumData={{ damageSources }}
            onSubmit={handleFormSubmission}
        />
    );
}

export default DamageDealtForm;