import React, { useCallback, useContext, useState } from 'react';
import { EventColors, DamageDealt } from './EventModels';
import { EnumContext } from '../../contexts';
import { useDamageApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';
import EventForm from './EventForm';
import { CharactersPicker } from '../players';

const DamageDealtForm = ({ scenarioId, style }) => {

    const { damageSources } = useContext(EnumContext);
    const { postDamageDealt } = useDamageApi();

    const [activeCharacter, setActiveCharacter] = useState({});

    const handleActiveCharacter = (character) => {
        setActiveCharacter(character);
    }

    const handleFormSubmission = useCallback((data) => {
        postDamageDealt((error, result) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Damage Dealt Submitted', type: 'success' });
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
                border: `1px solid ${EventColors.DamageDealt}`,
                ...style
            }}>

            <CharactersPicker onCharacterSelected={handleActiveCharacter} />

            <div className='divider' />

            <EventForm
                title='Damage Dealt'
                saveLabel='Save Damage Dealt'
                model={DamageDealt}
                enumData={{ damageSources }}
                onSubmit={handleFormSubmission}
            />
        </div>
    );
}

export default DamageDealtForm;