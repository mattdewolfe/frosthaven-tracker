import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useScenariosApi } from '../api';
import { Subs, globalObserver } from '../utils/Observers';
import { LoadingWrapper } from '../components/core';
import { PlayerContext } from '../contexts';
import { EditScenarioForm, EnlistCharacterForm } from '../components/scenario';
import { CharacterEventForm, CreatureKilledForm, DamageDealtForm, DamageTakenForm } from '../components/events';

const SingleScenarioPage = () => {

    const styles = Object.freeze({
        characterForms: {
            display: 'grid',
            gridTemplateColumns: '80px 1fr 1fr 1fr 1fr 1fr',
            gap: 2
        },
        formColumn: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
        },
        playerDetails: {
            display: 'flex',
            flexDirection: 'column',
            fontWeight: 'bold',
            marginLeft: 2,
            marginTop: 6
        }
    });

    const { id } = useParams();

    const { activeCharacters } = useContext(PlayerContext);

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
            <div style={{ marginTop: 10, marginLeft: 10, overflow: 'auto' }}>
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
                                <div
                                    className='light-border'
                                    style={styles.characterForms}
                                    key={`${ec?.name ?? 'player_'}_${idx}`}
                                >
                                    <div
                                        style={styles.playerDetails}
                                        className='form-label'
                                        key={name + idx}>
                                        <div>{name}</div>
                                    </div>

                                    <div style={styles.formColumn}>
                                        <CharacterEventForm
                                            character={ec}
                                            scenarioId={scenario?.id}
                                        />
                                    </div>

                                    <div style={styles.formColumn}>
                                        <DamageTakenForm
                                            character={ec}
                                            scenarioId={scenario?.id}
                                        />
                                    </div>

                                    <div style={styles.formColumn}>
                                        <DamageDealtForm
                                            character={ec}
                                            scenarioId={scenario?.id}
                                        />
                                    </div>

                                    <div style={styles.formColumn}>
                                        <CreatureKilledForm
                                            character={ec}
                                            scenarioId={scenario?.id}
                                            scenarioLevel={scenario?.level}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </LoadingWrapper >
    );
};

export default SingleScenarioPage;