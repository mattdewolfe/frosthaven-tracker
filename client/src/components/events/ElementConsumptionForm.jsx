import React, { useContext, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { EnumContext } from '../../contexts';
import SelectableEnumEntry from './SelectableEnumEntry';
import { HostedImage } from '../core';
import { useElementsApi } from '../../api';
import { Subs, globalObserver } from '../../utils/Observers';

const ElementConsumptionForm = ({
    style,
    activeCharacter = {},
    scenarioId,
    saveLabel = 'Save Consumed'
}) => {

    const { elements } = useContext(EnumContext);
    const { postConsumedBatch } = useElementsApi();

    const [selectedElements, setSelectedElements] = useState([]);

    const handleElementAdded = (id) => {
        setSelectedElements(prev => [...prev, id]);
    }

    const handleEntryRemoved = (index) => {
        setSelectedElements(prev => {
            const next = [...prev];
            next.splice(index, 1);
            return next;
        });
    }

    const handleSaveData = useCallback(() => {
        postConsumedBatch((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, type: 'error' });
            }
            else {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: 'Element Consumption Submitted', type: 'success' });
                setSelectedElements([]);
            }
        }, {
            scenario_id: scenarioId,
            player_id: activeCharacter?.playerId,
            character_id: activeCharacter?.id,
            element_ids: selectedElements
        })
    }, [activeCharacter, scenarioId, selectedElements]);

    const renderEntry = useCallback((id, idx) => {
        const element = elements.find(el => el?.id == id);
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
    }, [elements]);

    return (
        <div style={{
            border: `1px dashed white`,
            ...style
        }}>
            <h4
                className='form-label'
                style={{ color: 'orange' }}
            >
                Element Consumed
            </h4>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {
                    elements.map(e => {
                        return <SelectableEnumEntry
                            key={e?.id + e?.name}
                            onClick={handleElementAdded}
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
                    selectedElements.map((id, idx) => {
                        return renderEntry(id, idx);
                    })
                }
            </div>

            <div style={{ marginTop: 10 }}>
                <Button variant='danger'
                    onClick={handleSaveData}>
                    {saveLabel}
                </Button>
            </div>
        </div>
    );
}

export default ElementConsumptionForm;