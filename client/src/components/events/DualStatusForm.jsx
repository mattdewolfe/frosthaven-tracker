import React, { useState } from 'react';
import { CharactersPicker } from '../players';
import StatusAppliedForm from './StatusAppliedForm';
import StatusReceivedForm from './StatusReceivedForm';

const FormKeys = {
    Applied: 'applied',
    Received: 'received'
};

const DualStatusForm = ({ scenarioId, style }) => {

    const [visibleForm, setVisibleForm] = useState(FormKeys.Applied);
    const [activeCharacter, setActiveCharacter] = useState({});

    const handleActiveCharacter = (character) => {
        setActiveCharacter(character);
    }

    const onSelectForm = (e) => {
        setVisibleForm(e.target?.id);
    }

    return (
        <div
            style={{
                border: `1px dashed lightgrey`,
                ...style
            }}>

            <CharactersPicker onCharacterSelected={handleActiveCharacter} />

            <div style={{ display: 'flex', gap: 6 }}>

                <input
                    checked={visibleForm === FormKeys.Applied}
                    onChange={onSelectForm}
                    name='status_variant'
                    autoComplete='none'
                    className='form-text'
                    type='radio'
                    id={FormKeys.Applied}
                />
                <label htmlFor={FormKeys.Applied}>APPLIED</label>

                <input
                    checked={visibleForm === FormKeys.Received}
                    name='status_variant'
                    onChange={onSelectForm}
                    autoComplete='none'
                    className='form-text'
                    type='radio'
                    id={FormKeys.Received}
                />
                <label htmlFor={FormKeys.Received}>RECEIVED</label>
            </div>

            <div className='divider' />

            {
                visibleForm === FormKeys.Applied ?
                    <StatusAppliedForm
                        style={style}
                        character={activeCharacter}
                        scenarioId={scenarioId} />
                    :
                    null
            }

            {
                visibleForm === FormKeys.Received ?
                    <StatusReceivedForm
                        style={style}
                        character={activeCharacter}
                        scenarioId={scenarioId} />
                    :
                    null
            }
        </div>
    );
}

export default DualStatusForm;