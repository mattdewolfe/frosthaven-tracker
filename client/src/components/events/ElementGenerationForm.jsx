import React, { useContext, useState, useCallback } from 'react';
import { EnumContext } from '../../contexts';
import SelectableEnumEntry from './SelectableEnumEntry';
import { HostedImage } from '../core';
import { Button } from 'react-bootstrap';

const ElementGenerationForm = ({ style, character, scenarioId }) => {

    const { elements } = useContext(EnumContext);

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

    const handleSaveData = () => {

    }

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
            border: `1px solid white`,
            ...style
        }}>
            <div
                className='form-label'
                style={{ color: 'orange' }}
            >
                Element Generation
            </div>
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
                Selected Elements
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', gap: 2 }}>
                {
                    selectedElements.map((id, idx) => {
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

export default ElementGenerationForm;