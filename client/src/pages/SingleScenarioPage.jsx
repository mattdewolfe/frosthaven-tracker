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
        const newOutcome = e.target[0]?.value;

        if (newOutcome) {
            updateScenario((error, data) => {
                if (error) {
                    globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, variant: 'error' });
                }
                else {
                    setScenario(prev => {
                        return { ...prev, outcome: newOutcome }
                    });
                }
            }, {
                id: scenario?.id,
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
                <Row style={{ color: 'lightgrey' }}>
                    <h3 >{`Scenario: ${scenario?.name} (${scenario?.scenarioNumber})`}</h3>
                    <Col>{`Outcome: ${outcome}`}</Col>
                    <Col>{`Level: ${scenario?.scenarioLevel}`}</Col>
                    <Col>
                        <form onSubmit={onChangeOutcome}>
                            <Col >
                                <select name='outcomes'>
                                    {
                                        scenarioOutcomes.map(c => {
                                            const { id, name } = c;
                                            return <option key={id} value={id}>{name}</option>
                                        })
                                    }
                                </select>
                                <Button style={{ width: 100, marginLeft: 10 }} type='submit'>
                                    Save
                                </Button>
                            </Col>
                        </form>
                    </Col>
                </Row>
            </Container>
        </LoadingWrapper >
    );
};

export default SingleScenarioPage;