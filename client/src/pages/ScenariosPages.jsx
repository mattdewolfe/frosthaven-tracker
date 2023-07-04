import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';

import { useIsMounted } from '../hooks';
import { useScenariosApi } from '../api';
import { EnumContext } from '../contexts';

const ScenarioEntry = ({ data, style, allOutcomes }) => {
    const { name, number, level, outcome, id } = data;

    const displayOutcome = allOutcomes.find(e => {
        e?.id === outcome
    });

    return (
        <Row>
            {name}
            {number}
            {level}
            {displayOutcome?.name}
        </Row>
    );
}

const ScenariosPage = () => {

    const isMounted = useIsMounted();

    const { getAllScenarios } = useScenariosApi();
    const { scenarioOutcomes } = useContext(EnumContext);
    const [scenarios, setScenarios] = useState([]);
    const [scenarioNumber, setScenarioNumber] = useState();
    const [scenarioName, setScenarioName] = useState();
    const [scenarioLevel, setScenarioLevel] = useState();

    const getScenarios = () => {
        getAllScenarios((error, data) => {
            if (error) {
                console.warn(error);
            }
            else {
                setScenarios([...data]);
            }
        });
    }

    useEffect(() => {
        getScenarios();
    }, []);

    const submitNewScenario = (e) => {
        e.preventDefault();
    }

    return null;

    return (
        <Container style={{ color: 'white' }}>
            <h3>The Scenarios Page</h3>
            <Row>
                <Col>
                    <div style={{ color: 'orange' }}>All Scenarios</div>
                    {
                        scenarios.map(e => {
                            return (
                                <ScenarioEntry data={e} />
                            )
                        })}
                </Col>
                <Col>
                    <div style={{ color: 'orange' }}>Active Scenarios</div>
                    {
                        scenarios.map(e => {
                            if (e?.outcome === scenarioOutcomes['Ongoing']) {
                                return (
                                    <ScenarioEntry data={e} />
                                )
                            }
                            return null
                        })}
                </Col>
                <Col>
                    <form onSubmit={submitNewScenario}>
                        <Row style={{ color: 'orange' }}>Add Scenario</Row>
                        <Col>
                            <div className='form-text'>
                                Number
                            </div>
                            <input
                                autoComplete="none"
                                className="form-text"
                                type="text"
                                placeholder='Scenario Number'
                            />
                        </Col>
                        <Col>
                            <div className='form-text'>
                                Level
                            </div>
                            <input
                                autoComplete="none"
                                className="form-text"
                                type="text"
                                placeholder='Scenario Level'
                            />
                        </Col>
                        <Col>
                            <div className='form-text'>
                                Name
                            </div>
                            <input
                                autoComplete="none"
                                className="form-text"
                                type="text"
                                placeholder='Scenario Name'
                            />
                        </Col>

                        <div className="flex-row" style={{ marginTop: Spacing.xbig }}>
                            <Button type="submit" label="Submit" />
                        </div>
                    </form>
                </Col>
            </Row >
        </Container >
    );
};

export default ScenariosPage;