import React, { useMemo } from 'react';
import { Col } from 'react-bootstrap';
import HostedImage from '../core/HostedImage';

const EditCharacterForm = ({ style, character = {}, classes = [] }) => {

    const characterClass = useMemo(() => {
        if (character && classes) {
            const charClass = classes.find(e => e.id == character?.classId);
            return charClass ?? { name: 'Unknown' };
        }

        return { name: '...' };
    }, [character, classes]);

    if (!character) {
        return (
            <Col>
                No Character Data Provider
            </Col>
        );
    }

    return (
        <div className='header-text'
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...style
            }}>

            <HostedImage
                src={characterClass?.iconUrl}
                style={{ width: 128, height: 200, padding: 10, borderRadius: 10 }} />

            <div style={{ textAlign: 'center' }}>
                <h4>{character?.name}</h4>
                <h6>{`Level: ${character?.level} ${characterClass?.name}`}</h6>
            </div>
        </div>
    );
}

export default EditCharacterForm;