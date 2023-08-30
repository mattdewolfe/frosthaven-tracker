import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { EnumContext } from '../../contexts';

const ScenarioEntry = ({ data, style, allOutcomes, onClick }) => {
    const { name, scenarioNumber, scenarioLevel, outcome, id } = data;

    const displayOutcome = allOutcomes ? allOutcomes[outcome] : {};

    const handleClick = () => {
        onClick?.(data);
    }

    return (
        <Row className='clickable-container'
            onClick={handleClick}>
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

const ScenarioList = ({ style, scenarios = [], title, onScenarioClicked }) => {

    const { scenarioOutcomes } = useContext(EnumContext);

    return (
        <Col style={style}>
            <div style={{ color: 'orange' }}>{title}</div>
            {
                scenarios.map((e, idx) => {
                    return (
                        <ScenarioEntry
                            onClick={onScenarioClicked}
                            key={`${e?.id}_${idx}_all`}
                            data={e}
                            allOutcomes={scenarioOutcomes} />
                    );
                })
            }
        </Col>
    );
}

export default ScenarioList;
