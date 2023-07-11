import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';

const CreateScenarioForm = ({ style, onSubmit }) => {
    return (
        <Col>
            <form onSubmit={onSubmit}>
                <Row style={{ color: 'orange' }}>Add Scenario</Row>
                <Col >
                    <div className='form-label'>
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
                    <div className='form-label'>
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
                    <div className='form-label'>
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