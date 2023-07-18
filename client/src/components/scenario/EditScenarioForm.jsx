import React, { useMemo, useCallback, useContext } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import DropdownPicker from '../core/DropdownPicker';
import { EnumContext } from '../../contexts';

const EditScenarioForm = ({ scenario, onSaveChanges }) => {

    const { id } = scenario;

    const { scenarioOutcomes } = useContext(EnumContext);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const newLevel = e.target[0]?.value;
        const newOutcome = e.target[1]?.value;

        onSaveChanges?.({
            id,
            scenario_level: newLevel,
            outcome: newOutcome
        });
    }, [scenario]);

    const outcome = useMemo(() => {
        if (!scenario || scenarioOutcomes.length < 1 || !scenario?.outcome) {
            return '';
        }

        return scenarioOutcomes.find(e => e.id == scenario.outcome)?.name ?? 'unknown';
    }, [scenario, scenarioOutcomes]);

    return (
        <div
            style={{ display: 'flex', flexDirection: 'row', gap: 10, padding: 10 }}
            className='light-border'>
            <div className='header-text'>
                <h3>
                    {`Scenario: ${scenario?.name} (${scenario?.scenarioNumber})`}
                </h3>
                <div style={{ color: 'lightgrey' }}>
                    <div>{`Outcome: ${outcome}`}</div>
                    <div>{`Level: ${scenario?.scenarioLevel}`}</div>
                </div>
            </div>

            <Col>
                <form onSubmit={handleSubmit}>
                    <div className='form-label'>
                        New Level:
                        <input
                            style={{ marginLeft: 10 }}
                            autoComplete='none'
                            className='form-text'
                            type='text'
                            defaultValue={scenario?.scenarioLevel}
                            placeholder='Scenario Level'
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <DropdownPicker
                            style={{ height: 28 }}
                            options={scenarioOutcomes}
                            label='New Outcome:'
                        />

                        <Button
                            style={{ width: 150 }}
                            type='submit'>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Col>
        </div>
    );
}

export default EditScenarioForm;