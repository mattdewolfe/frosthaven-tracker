import React, { useState } from 'react';
import { CharactersPicker } from '../players';
import ElementGenerationForm from './ElementGenerationForm';
import ElementConsumptionForm from './ElementConsumptionForm';

const FormKeys = {
    Generated: 'generated',
    Consumed: 'consumed'
};

const DualElementForm = ({ scenarioId, style }) => {

    const [visibleForm, setVisibleForm] = useState(FormKeys.Generated);
    const [activeCharacter, setActiveCharacter] = useState({});

    const handleActiveCharacter = (character) => {
        setActiveCharacter(character);
    }

    const onSelectForm = (e) => {
        setVisibleForm(e.target?.id);
        console.log(e.target.id);
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
                    checked={visibleForm == FormKeys.Generated}
                    onChange={onSelectForm}
                    name='element_variant'
                    autoComplete='none'
                    className='form-text'
                    type='radio'
                    id={FormKeys.Generated}
                />
                <label for={FormKeys.Generated}>Created</label>

                <input
                    checked={visibleForm == FormKeys.Consumed}
                    name='element_variant'
                    onChange={onSelectForm}
                    autoComplete='none'
                    className='form-text'
                    type='radio'
                    id={FormKeys.Consumed}
                />
                <label for={FormKeys.Consumed}>Consumption</label>
            </div>

            <div className='divider' />

            {
                visibleForm === FormKeys.Generated ?
                    <ElementGenerationForm
                        style={style}
                        character={activeCharacter}
                        scenarioId={scenarioId} />
                    :
                    null
            }

            {
                visibleForm === FormKeys.Consumed ?
                    <ElementConsumptionForm
                        style={style}
                        character={activeCharacter}
                        scenarioId={scenarioId} />
                    :
                    null
            }
        </div>
    );
}

export default DualElementForm;