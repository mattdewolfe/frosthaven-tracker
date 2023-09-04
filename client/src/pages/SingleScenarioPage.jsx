import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useScenariosApi } from '../api';
import { Subs, globalObserver } from '../utils/Observers';
import { LoadingWrapper } from '../components/core';
import { EditScenarioForm } from '../components/scenario';
import EventForms from '../components/events';
import { CharacterDisplay, CharactersPicker } from "../components/players";
import { EnumContext } from "../contexts";

const SingleScenarioPage = () => {

    const styles = Object.freeze({
        characterForms: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 10
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
            flexDirection: 'column',
            justifyContent: 'space-between'
        }
    });

    const { id } = useParams();

    const { getScenarioById, updateScenario } = useScenariosApi();
    const { characterClasses } = useContext(EnumContext);
    const [loading, setLoading] = useState(true);
    const [scenario, setScenario] = useState(null);
    const [activeCharacter, setActiveCharacter] = useState(null);

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

    const commonProps = useMemo(() => {
        if (scenario) {
            return {
                style: styles.eventForm,
                activeCharacter: activeCharacter,
                scenarioId: scenario?.id
            }
        }
        else {
            return {}
        }
    }, [scenario, activeCharacter]);

    return (
        <LoadingWrapper loading={loading}>
            <div style={{ padding: 10 }}>
                <EditScenarioForm
                    scenario={scenario}
                    onSaveChanges={onUpdateScenario} />
                <div
                    style={{ marginTop: 10, padding: 10, display: 'flex', flexDirection: 'row' }}
                    className='header-text light-border'>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 250 }}>
                        <CharactersPicker onCharacterSelected={setActiveCharacter} />

                        <CharacterDisplay
                            character={activeCharacter}
                            classes={characterClasses} />
                    </div>

                    <div
                        style={styles.characterForms}
                        className='form-label'>
                        <EventForms.CharacterTurn {...commonProps} />

                        <EventForms.DamageDealt {...commonProps} />

                        <EventForms.Healing {...commonProps} />

                        <EventForms.DamageTaken {...commonProps} />

                        <EventForms.ElementConsumed {...commonProps} />

                        <EventForms.StatusReceived {...commonProps} />

                        <EventForms.ElementCreated {...commonProps} />

                        <EventForms.StatusApplied {...commonProps} />

                        <EventForms.CreatureKilled {...commonProps} />

                    </div>
                </div>
            </div>
        </LoadingWrapper >
    );
};

export default SingleScenarioPage;