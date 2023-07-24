import React, { useContext, useCallback, useState } from 'react';
import { EventColors, Healing } from './EventModels';
import EventForm from './EventForm';
import { EnumContext } from '../../contexts';
import { useHealingApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';
import { CharactersPicker } from '../players';

const CharacterEventForm = ({ scenarioId, style }) => {

    const { creatureClasses, creatureLevels } = useContext(EnumContext);
    const { postNewHeal } = useHealingApi();

    const [activeCharacter, setActiveCharacter] = useState({});

    const handleActiveCharacter = (character) => {
        setActiveCharacter(character);
    }

    const handleFormSubmission = useCallback((data) => {
        console.log(activeCharacter);

        postNewHeal((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Healing Submitted', type: 'success' });
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
                border: `1px solid ${EventColors.Healing}`,
                ...style
            }}>

            <CharactersPicker onCharacterSelected={handleActiveCharacter} />

            <div className='divider' />

            <EventForm
                title='Healing'
                saveLabel='Save Healing'
                model={Healing}
                character={activeCharacter}
                enuenumData={{ creatureClasses, creatureLevels }}
                scenarioId={scenarioId}
                onSubmit={handleFormSubmission}
            />
        </div>
    );
}

export default CharacterEventForm;