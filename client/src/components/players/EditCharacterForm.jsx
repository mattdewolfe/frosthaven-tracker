import React, { useMemo, useState } from 'react';
import { Col, Button, ToggleButton } from 'react-bootstrap';
import HostedImage from '../HostedImage';

const EditCharacterForm = ({ style, onSave, character = {}, classes = [] }) => {

    const labelStyle = {
        marginBottom: 2,
        marginTop: 6
    };

    const [enableEdits, setEnableEdits] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target) {
            const name = e.target[0]?.value;
            const xp = e.target[1]?.value;
            const level = e.target[2]?.value;
            const perks = e.target[3]?.value;
            const masteries = e.target[4]?.value;
            const retired = e.target[5]?.checked == true;

            setEnableEdits(false);

            onSave?.({
                name,
                xp,
                level,
                perks,
                masteries,
                retired
            });
        }
    }

    const characterClass = useMemo(() => {
        if (character && classes) {
            const charClass = classes.find(e => e.id == character?.classId);
            return charClass ?? { name: 'Unknown' };
        }

        return { name: '...' };
    }, [character, classes]);

    const onChangeEdits = (e) => {
        if (e.target) {
            setEnableEdits(e.target.checked);
        }
    }

    if (!character) {
        return (
            <Col>
                No Character Data Provider
            </Col>
        );
    }

    return (
        <Col style={style}>

            <Col>
                <div
                    className='header-text'
                    style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <h4>{`Class: ${characterClass?.name}`}</h4>
                    <HostedImage
                        src={characterClass?.iconUrl}
                        style={{ width: 32, height: 50, marginLeft: 10 }} />
                </div>
            </Col>

            <div
                className='form-label'
                style={{ display: "flex", flexDirection: "row", marginTop: 6, gap: 6, textAlign: "center" }}>Enable Edits:
                <input
                    id="toggle-one"
                    autoComplete='none'
                    className='form-text'
                    type='checkbox'
                    onChange={onChangeEdits}
                    checked={enableEdits}
                />
            </div>

            <form onSubmit={handleSubmit}>
                <Col>
                    <div
                        className='form-label'
                        style={labelStyle}>Name:</div>
                    <input
                        disabled={!enableEdits}
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        defaultValue={character?.name}
                    />
                </Col>

                <Col>
                    <div
                        className='form-label'
                        style={labelStyle}>Xp: </div>
                    <input
                        disabled={!enableEdits}
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        defaultValue={character?.xp}
                        placeholder='XP'
                    />
                </Col>

                <Col>
                    <div
                        className='form-label'
                        style={labelStyle}>Level: </div>
                    <input
                        disabled={!enableEdits}
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        defaultValue={character?.level}
                        placeholder='Level'
                    />
                </Col>

                <Col>
                    <div className='form-label'>Perks: </div>
                    <input
                        disabled={!enableEdits}
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        defaultValue={character?.perks}
                        placeholder='Level'
                    />
                </Col>

                <Col>
                    <div
                        className='form-label'
                        style={labelStyle}>Masteries: </div>
                    <input
                        disabled={!enableEdits}
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        defaultValue={character?.masteries}
                        placeholder='Level'
                    />
                </Col>

                <Col>
                    <div
                        className='form-label'
                        style={{ display: "flex", flexDirection: "row", marginTop: 6, gap: 6, alignItems: "center" }}>Retired:
                        <input
                            disabled={!enableEdits}
                            autoComplete='none'
                            className='form-text'
                            type='checkbox'
                            defaultChecked={character?.retired}
                            placeholder='Retired'
                        />
                    </div>
                </Col>

                {
                    enableEdits &&
                    <Col>
                        <div
                            className='flex-row'
                            style={{ marginTop: 10 }}>
                            <Button
                                type='submit'
                                disabled={!enableEdits}>
                                Save Changes
                            </Button>
                        </div>
                    </Col>
                }
            </form>
        </Col>
    );
}

export default EditCharacterForm;