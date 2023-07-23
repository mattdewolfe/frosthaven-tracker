import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useScenariosApi } from '../api';
import { Subs, globalObserver } from '../utils/Observers';
import { DropdownPicker, LoadingWrapper } from '../components/core';
import { PlayerContext } from '../contexts';
import { EditScenarioForm } from '../components/scenario';
import EventForms from '../components/events';

const SingleScenarioPage = () => {

    const styles = Object.freeze({
        characterForms: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
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
            width: '100%',
            justifyContent: 'center',
            fontSize: 30,
            flexDirection: 'row',
            fontWeight: 'bold',
            marginTop: 6,
            gap: 10,
            color: 'lightblue'
        },
        eventForm: {
            borderRadius: 6,
            padding: 6
        }
    });

    const { id } = useParams();

    const { activeCharacters } = useContext(PlayerContext);

    const { getScenarioById, updateScenario } = useScenariosApi();
    const [loading, setLoading] = useState(true);
    const [scenario, setScenario] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

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

    useEffect(() => {
        if (activeCharacters.length > 0) {
            setSelectedCharacter(activeCharacters[0]);
        }
    }, [activeCharacters]);

    const handleSelectedCharacter = (id) => {
        setSelectedCharacter(activeCharacters.find(character => character?.id == id));
    }

    return (
        <LoadingWrapper loading={loading}>
            <div style={{ padding: 10 }}>
                <EditScenarioForm
                    scenario={scenario}
                    onSaveChanges={onUpdateScenario} />

                <div
                    style={{ marginTop: 10, padding: 10 }}
                    className='header-text light-border'>
                    <DropdownPicker
                        label='Characters'
                        onChange={handleSelectedCharacter}
                        options={activeCharacters} />
                    {
                        selectedCharacter !== null &&
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            className='form-label'>
                            <div style={styles.playerDetails}>
                                {selectedCharacter?.name}
                            </div>

                            <div
                                style={styles.characterForms}
                                key={`${selectedCharacter?.name}`}
                            >
                                <div style={styles.formColumn}>
                                    <EventForms.CharacterTurn
                                        style={styles.eventForm}
                                        character={selectedCharacter}
                                        scenarioId={scenario?.id}
                                    />
                                    <EventForms.CreatureKilled
                                        style={styles.eventForm}
                                        character={selectedCharacter}
                                        scenarioId={scenario?.id}
                                        scenarioLevel={scenario?.level}
                                    />
                                </div>

                                <div style={styles.formColumn}>
                                    <EventForms.DamageTaken
                                        style={styles.eventForm}
                                        character={selectedCharacter}
                                        scenarioId={scenario?.id}
                                    />
                                </div>

                                <div style={styles.formColumn}>
                                    <EventForms.DamageDealt
                                        style={styles.eventForm}
                                        character={selectedCharacter}
                                        scenarioId={scenario?.id}
                                    />
                                </div>

                                <div style={styles.formColumn}>
                                    <EventForms.Healing
                                        style={styles.eventForm}
                                        character={selectedCharacter}
                                        scenarioId={scenario?.id}
                                    />
                                </div>
                            </div>

                            <div style={styles.characterForms}>


                                <div style={styles.formColumn}>
                                    <EventForms.ElementGeneration
                                        style={styles.eventForm}
                                        scenarioId={scenario?.id}
                                        character={selectedCharacter}
                                    />
                                </div>

                                <div style={styles.formColumn}>
                                    <EventForms.ElementConsumption
                                        style={styles.eventForm}
                                        scenarioId={scenario?.id}
                                        character={selectedCharacter}
                                    />
                                </div>

                                <div style={styles.formColumn}>
                                    <EventForms.StatusApplied
                                        style={styles.eventForm}
                                        scenarioId={scenario?.id}
                                        character={selectedCharacter}
                                    />
                                </div>

                                <div style={styles.formColumn}>
                                    <EventForms.StatusReceived
                                        style={styles.eventForm}
                                        scenarioId={scenario?.id}
                                        character={selectedCharacter}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </LoadingWrapper >
    );
};

export default SingleScenarioPage;