import React, { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { DropdownPicker } from '../core';

const EnlistCharacterForm = ({ characters = [], enlistedCharacters = [], onEnlist }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentId = e.target[0]?.value;
        onEnlist?.(characters.find(e => e.id == currentId));
    }

    const validEntries = useMemo(() => {
        return characters.filter(c => !enlistedCharacters.some(ec => ec.id == c.id));
    }, [characters, enlistedCharacters]);

    return (
        <form onSubmit={handleSubmit}>
            {validEntries.length > 0 ?
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>

                    <DropdownPicker
                        style={{ height: 28 }}
                        options={validEntries}
                        label='Enlist Character'
                    />

                    <Button type='submit'>
                        Enlist Selected
                    </Button>
                </div>
                :
                <div className='form-label'>
                    No Valid Characters can Enlist for this Scenario
                </div>
            }
        </form>
    );
}

export default EnlistCharacterForm;