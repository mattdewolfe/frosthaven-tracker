import React, { useState } from 'react';
import ElementGenerationForm from './ElementGenerationForm';
import ElementConsumptionForm from './ElementConsumptionForm';

const FormKeys = {
    Generated: 'generated',
    Consumed: 'consumed'
};

const DualElementForm = ({ scenarioId, style, activeCharacter }) => {

    const [visibleForm, setVisibleForm] = useState(FormKeys.Generated);

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
                <label htmlFor={FormKeys.Generated}>CREATED</label>

                <input
                    checked={visibleForm == FormKeys.Consumed}
                    name='element_variant'
                    onChange={onSelectForm}
                    autoComplete='none'
                    className='form-text'
                    type='radio'
                    id={FormKeys.Consumed}
                />
                <label htmlFor={FormKeys.Consumed}>CONSUMED</label>
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