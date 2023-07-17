import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIsMounted } from '../hooks';
import { useScenariosApi } from '../api';
import { EnumContext } from '../contexts';
import { DynamicRoutes, FormatDynamicRoute } from '../routes';
import { LoadingWrapper } from '../components/core';
import { Row, Container } from '../components';
import { CreateScenarioForm, ScenarioList } from '../components/scenario';

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
    const navigate = useNavigate();

    const { getAllScenarios, postNewScenario } = useScenariosApi();
    const { scenarioOutcomes, loadingEnums } = useContext(EnumContext);
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
            for (let entry of scenarioOutcomes) {
                if (entry?.name === 'Ongoing') {
                    return entry?.id;
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

    const handleScenarioClicked = (data) => {
        navigate(FormatDynamicRoute(DynamicRoutes.SINGLE_SCENARIO, data?.id));
    }

    const handleSubmitScenario = (data) => {
        postNewScenario(handleScenarioCreation, data);
    }

    return (
        <LoadingWrapper loading={loadingEnums}>
            <Container style={{ color: 'white' }}>
                <h3>The Scenarios Page</h3>
                <Row>
                    <ScenarioList
                        scenarios={scenarios.filter(e => e?.outcome !== ongoingOutcomeId)}
                        title='Past Scenarios'
                        onScenarioClicked={handleScenarioClicked} />

                    <ScenarioList
                        scenarios={scenarios.filter(e => e?.outcome == ongoingOutcomeId)}
                        title='Active Scenarios'
                        onScenarioClicked={handleScenarioClicked} />

                    <CreateScenarioForm
                        ongoingOutcomeId={ongoingOutcomeId}
                        onSubmit={handleSubmitScenario} />
                </Row >
            </Container >
        </LoadingWrapper>
    );
};

export default ScenariosPage;