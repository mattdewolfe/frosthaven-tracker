import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useScenariosApi } from '../api';
import { Subs, globalObserver } from '../utils/Observers';
import { LoadingWrapper, Container, Row, Col, Button } from '../components';
import { EnumContext, PlayerContext } from '../contexts';

const SingleScenarioPage = () => {
    const { id } = useParams();

    const { scenarioOutcomes, loadingEnums } = useContext(EnumContext);
    const { activePlayerCharacters } = useContext(PlayerContext);

    const { getScenarioById, updateScenario } = useScenariosApi();
    const [loading, setLoading] = useState(true);
    const [scenario, setScenario] = useState(null);

    useEffect(() => {
        getScenarioById((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, variant: 'error' });
                setScenario(null);
            }
            else {
                setScenario(data);
            }

            setLoading(false);
        }, id);
    }, [id]);

    const onChangeOutcome = (e) => {
        e.preventDefault();
        const newLevel = e.target[0]?.value;
        const newOutcome = e.target[1]?.value;

        if (newOutcome) {
            updateScenario((error, data) => {
                if (error) {
                    globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, variant: 'error' });
                }
                else {
                    setScenario(prev => {
                        return { ...prev, outcome: newOutcome, scenarioLevel: newLevel }
                    });
                }
            }, {
                id: scenario?.id,
                scenario_level: newLevel,
                outcome: newOutcome
            });
        }
    }

    const outcome = useMemo(() => {
        if (!scenario || scenarioOutcomes.length < 1 || !scenario?.outcome) {
            return '';
        }

        return scenarioOutcomes.find(e => e.id == scenario.outcome)?.name ?? 'unknown';
    }, [scenario, scenarioOutcomes]);

    return (
        <LoadingWrapper loading={loading}>
            <Container>
                <Row className='light-border'>
                    <h3 className='header-text'>
                        {`Scenario: ${scenario?.name} (${scenario?.scenarioNumber})`}
                    </h3>

                    <Col style={{ color: 'lightgrey' }}>
                        <Col>{`Outcome: ${outcome}`}</Col>
                        <Col>{`Level: ${scenario?.scenarioLevel}`}</Col>
                    </Col>

                    <Col>
                        <form onSubmit={onChangeOutcome}>
                            <Col>
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

                            </Col>
                            <Col >
                                <div className='form-label'>
                                    New Outcome:
                                    <select
                                        name='outcomes'
                                        style={{ marginLeft: 10 }}>
                                        {
                                            scenarioOutcomes.map(c => {
                                                const { id, name } = c;
                                                return <option key={id} value={id}>{name}</option>
                                            })
                                        }
                                    </select>

                                </div>
                            </Col>
                        </form>
                    </Col>
                    <Col>
                        <Button style={{ width: 150 }} type='submit'>
                            Save Changes
                        </Button>
                    </Col>
                </Row>
            </Container>
        </LoadingWrapper >
    );
};

export default SingleScenarioPage;