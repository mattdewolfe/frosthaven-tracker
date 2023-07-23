import React, { useContext, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { EnumContext } from '../../contexts';
import SelectableEnumEntry from './SelectableEnumEntry';
import { HostedImage } from '../core';
import { useStatusApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';

const StatusReceivedForm = ({ style, character, scenarioId }) => {

    const { statusEffects } = useContext(EnumContext);
    const { postReceivedBatch } = useStatusApi();

    const [selected, setSelected] = useState([]);

    const handleAdded = (id) => {
        setSelected(prev => [...prev, id]);
    }

    const handleEntryRemoved = (index) => {
        setSelected(prev => {
            const next = [...prev];
            next.splice(index, 1);
            return next;
        });
    }

    const handleSaveData = useCallback(() => {
        postReceivedBatch((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Status Received Batch Submitted', type: 'success' });
                setSelected([]);
            }
        }, {
            scenario_id: scenarioId,
            player_id: character?.playerId,
            character_id: character?.id,
            status_ids: selected
        })
    }, [character, scenarioId, selected]);

    const renderEntry = useCallback((id, idx) => {
        const element = statusEffects.find(el => el?.id == id);
        return (
            <div
                key={id + idx + element?.name}
                style={{ width: 32 }}
                className='clickable-container'
                onClick={() => handleEntryRemoved(idx)}
            >
                <HostedImage
                    style={{ width: 32, height: 32, borderRadius: 6 }}
                    src={element?.iconUrl}
                />
            </div>
        )
    }, [statusEffects]);

    return (
        <div style={{
            border: `1px dashed white`,
            ...style
        }}>
            <div
                className='form-label'
                style={{ color: 'orange' }}
            >
                Status Effect Received
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', gap: 2 }}>
                {
                    statusEffects.map(e => {
                        return <SelectableEnumEntry
                            key={e?.id + e?.name}
                            onClick={handleAdded}
                            data={e}
                        />
                    })
                }
            </div>

            <div
                className='form-label'
                style={{ color: 'orange' }}
            >
                Selected
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', gap: 2 }}>
                {
                    selected.map((id, idx) => {
                        return renderEntry(id, idx);
                    })
                }
            </div>

            <div style={{ marginTop: 10 }}>
                <Button onClick={handleSaveData}>
                    Save
                </Button>
            </div>
        </div>
    );
}

export default StatusReceivedForm;