import React, { useCallback, useContext, useState } from 'react';
import { EventColors, DamageTaken } from './EventModels';
import { EnumContext } from '../../contexts';
import { useDamageApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';
import EventForm from './EventForm';

const DamageTakenForm = ({ scenarioId, style, activeCharacter }) => {

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
            character_id: activeCharacter?.id,
            player_id: activeCharacter?.playerId,
            scenario_id: scenarioId,
            ...data
        });
    }, [activeCharacter, scenarioId]);

    return (
        <div
            style={{
                border: `1px solid ${EventColors.DamageTaken}`,
                ...style
            }}>

            <EventForm
                title='Damage Taken'
                saveLabel='Save Damage Taken'
                model={DamageTaken}
                enumData={{ damageSources }}
                onSubmit={handleFormSubmission}
            />
        </div>
    );
}

export default DamageTakenForm;