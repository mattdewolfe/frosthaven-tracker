import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useScenariosApi } from '../api';
import { Subs, globalObserver } from '../utils/Observers';
import { Container } from '../components';
import { LoadingWrapper } from '../components/core';
import { EnumContext, PlayerContext } from '../contexts';
import { EditScenarioForm, EnlistCharacterForm } from '../components/scenario';

const SingleScenarioPage = () => {
    const { id } = useParams();

    const { loadingEnums } = useContext(EnumContext);
    const { activeCharacters, players } = useContext(PlayerContext);

    const { getScenarioById, updateScenario } = useScenariosApi();
    const [loading, setLoading] = useState(true);
    const [scenario, setScenario] = useState(null);
    const [enlistedCharacters, setEnlistedCharacters] = useState([]);

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

    const onUpdateScenario = (data) => {
        updateScenario((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, variant: 'error' });
            }
            else {
                setScenario(prev => {
                    return { ...prev, outcome: newOutcome, scenarioLevel: newLevel }
                });
            }
        }, data);
    }

    const handleEnlistCharacter = (character) => {
        if (enlistedCharacters.some(ec => ec.playerId == character?.playerId)) {
            globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE,
                {
                    message: 'That characters player already has a character enrolled in this scenario',
                    variant: 'error'
                });
        }
        setEnlistedCharacters(prev => [...prev, character]);
    }

    return (
        <LoadingWrapper loading={loading}>
            <Container style={{ marginTop: 10 }}>
                <EditScenarioForm
                    scenario={scenario}
                    onSaveChanges={onUpdateScenario} />

                <EnlistCharacterForm
                    characters={activeCharacters}
                    enlistedCharacters={enlistedCharacters}
                    onEnlist={handleEnlistCharacter}
                />

                <div className='header-text'>
                    Enlisted Characters
                    {
                        enlistedCharacters.map((ec, idx) => {
                            const { name, playerId } = ec;
                            return (
                                <div className='form-label' key={name + idx}>
                                    {name}
                                </div>
                            );
                        })
                    }
                </div>
            </Container>
        </LoadingWrapper >
    );
};

export default SingleScenarioPage;