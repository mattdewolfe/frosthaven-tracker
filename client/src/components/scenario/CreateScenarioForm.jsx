import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';

const CreateScenarioForm = ({ style, onSubmit, ongoingOutcomeId }) => {

    const labelStyle = {
        height: 10, marginTop: 8
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target) {
            const scenario_number = e.target[0]?.value;
            const scenario_level = e.target[1]?.value;
            const name = e.target[2]?.value;
            const outcome = ongoingOutcomeId || 1;

            onSubmit?.({
                scenario_number,
                scenario_level,
                name,
                outcome
            });
        }
    }

    return (
        <Col style={style}>
            <form onSubmit={handleSubmit}>
                <Row style={{ color: 'orange' }}>Add Scenario</Row>
                <Col >
                    <div
                        style={labelStyle}
                        className='form-label'>
                        Number
                    </div>
                    <input
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        placeholder='Scenario Number'
                    />
                </Col>
                <Col>
                    <div
                        style={labelStyle}
                        className='form-label'>
                        Level
                    </div>
                    <input
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        placeholder='Scenario Level'
                    />
                </Col>
                <Col>
                    <div
                        style={labelStyle}
                        className='form-label'>
                        Name
                    </div>
                    <input
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        placeholder='Scenario Name'
                    />
                </Col>

                <div className='flex-row' style={{ marginTop: 10 }}>
                    <Button type='submit'>
                        Create
                    </Button>
                </div>
            </form>
        </Col>
    );
}

export default CreateScenarioForm;