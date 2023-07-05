import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';

import { useIsMounted } from '../hooks';
import { useScenariosApi } from '../api';
import { EnumContext } from '../contexts';

const ScenarioEntry = ({ data, style, allOutcomes }) => {
    const { name, scenarioNumber, scenarioLevel, outcome, id } = data;

    const displayOutcome = allOutcomes ? allOutcomes[outcome] : {};

    return (
        <Row style={{ border: '1px solid grey' }}>
            <div>
                Name: {name}
            </div>
            <div>
                Scenario Number: {scenarioNumber}
            </div>
            <div>
                Scenario Level: {scenarioLevel}
            </div>
            <div>
                Outcome: {displayOutcome?.name}
            </div>
        </Row>
    );
}

const ScenariosPage = () => {

    const isMounted = useIsMounted();

    const { getAllScenarios, postNewScenario } = useScenariosApi();
    const { scenarioOutcomes } = useContext(EnumContext);
    const [scenarios, setScenarios] = useState([]);

    const getScenarios = () => {
        getAllScenarios((error, data) => {
            if (error) {
                console.warn(error);
            }
            else {
                if (isMounted()) {
                    setScenarios([...data]);
                }
            }
        });
    }

    const ongoingOutcomeId = useMemo(() => {
        if (scenarioOutcomes) {
            for (let key in scenarioOutcomes) {
                if (scenarioOutcomes[key].name === 'Ongoing') {
                    console.log('return the key')
                    return key;
                }
            }
        }

        return 0;
    }, [scenarioOutcomes]);

    useEffect(() => {
        getScenarios();
    }, []);

    const handleScenarioCreation = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else {
            getScenarios();
        }
    }

    const submitNewScenario = (e) => {
        e.preventDefault();
        if (e.target) {
            const scenarioNum = e.target[0]?.value;
            const scenarioLevel = e.target[1]?.value;
            const scenarioName = e.target[2]?.value;
            const scenarioOutcome = ongoingOutcomeId || 1;

            postNewScenario(handleScenarioCreation, {
                scenario_number: scenarioNum,
                scenario_level: scenarioLevel,
                outcome: scenarioOutcome,
                name: scenarioName
            });
        }
    }

    return (
        <Container style={{ color: 'white' }}>
            <h3>The Scenarios Page</h3>
            <Row>
                <Col>
                    <div style={{ color: 'orange' }}>Past Scenarios</div>
                    {
                        scenarios.map((e, idx) => {
                            if (e?.outcome != ongoingOutcomeId) {
                                return (
                                    <ScenarioEntry key={`${e?.id}_${idx}_all`} data={e} allOutcomes={scenarioOutcomes} />
                                );
                            }
                            return null;
                        })}
                </Col>

                <Col>
                    <div style={{ color: 'orange' }}>Active Scenarios</div>
                    {
                        scenarios.map((e, idx) => {
                            if (e?.outcome == ongoingOutcomeId) {
                                return (
                                    <ScenarioEntry key={`${e?.id}_${idx}_ongoing`} data={e} allOutcomes={scenarioOutcomes} />
                                );
                            }
                            return null;
                        })}
                </Col>

                <Col>
                    <form onSubmit={submitNewScenario}>
                        <Row style={{ color: 'orange' }}>Add Scenario</Row>
                        <Col >
                            <div className='form-label'>
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
                            <div className='form-label'>
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
                            <div className='form-label'>
                                Name
                            </div>
                            <input
                                autoComplete="none"
                                className="form-text"
                                type="text"
                                placeholder='Scenario Name'
                            />
                        </Col>

                        <div className="flex-row" style={{ marginTop: 10 }}>
                            <Button type="submit">
                                Create
                            </Button>
                        </div>
                    </form>
                </Col>
            </Row >
        </Container >
    );
};

export default ScenariosPage;