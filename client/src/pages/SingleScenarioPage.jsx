import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useScenariosApi } from '../api';
import { Subs, globalObserver } from '../utils/Observers';
import { LoadingWrapper } from '../components/core';
import { EditScenarioForm } from '../components/scenario';
import EventForms from '../components/events';

const SingleScenarioPage = () => {

    const styles = Object.freeze({
        characterForms: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 4
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
            padding: 6,
            display: 'flex',
            flexDirection: 'column'
        }
    });

    const { id } = useParams();

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

    const onUpdateScenario = (data) => {
        updateScenario((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, variant: 'error' });
            }
            else {
                setScenario(prev => {
                    return { ...prev, ...data }
                });
            }
        }, data);
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

                    <div
                        style={styles.characterForms}
                        className='form-label'>
                        <EventForms.CharacterTurn
                            style={styles.eventForm}
                            scenarioId={scenario?.id}
                        />

                        <EventForms.Healing
                            style={styles.eventForm}
                            scenarioId={scenario?.id}
                        />

                        <EventForms.DamageDealt
                            style={styles.eventForm}
                            scenarioId={scenario?.id} />

                        <EventForms.DamageTaken
                            style={styles.eventForm}
                            scenarioId={scenario?.id} />

                        <EventForms.DualElementForm
                            style={styles.eventForm}
                            scenarioId={scenario?.id}
                        />

                        <EventForms.DualStatusForm
                            style={styles.eventForm}
                            scenarioId={scenario?.id}
                        />

                        <EventForms.CreatureKilled
                            style={styles.eventForm}
                            scenarioId={scenario?.id}
                            scenarioLevel={scenario?.level}
                        />
                    </div>
                </div>
            </div>
        </LoadingWrapper >
    );
};

export default SingleScenarioPage;