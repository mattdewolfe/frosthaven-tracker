import React, { useMemo, useCallback } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Subs, globalObserver } from '../../utils/Observers';

const EventForm = ({
    model,
    enumData,
    onSubmit,
    title = 'Form',
    style = {},
    saveLabel = 'Save',
    resetOnSubmit = true
}) => {
    const rowStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
        gap: 6
    }

    const { fields, defaults = {} } = model;

    const keys = useMemo(() => {
        if (!fields) {
            return [];
        }

        return Object.keys(fields);
    }, [fields]);

    const getDefault = useCallback((key) => {
        if (!defaults || !defaults.hasOwnProperty(key)) {
            return undefined;
        }

        return defaults[key];
    }, [defaults]);

    const handleSubmit = useCallback((e) => {
        if (!e.target) {
            return;
        }

        e.preventDefault();

        let result = {};

        for (let i = 0; i < keys.length; i++) {
            if (fields[keys[i]] === 'boolean') {
                result[keys[i]] = e.target[i].checked == true;
            }
            else if (fields[keys[i]] === 'string' && e.target[i].value !== '') {
                result[keys[i]] = e.target[i].value;
            }
            // If this is neither string nor boolean value, we will cast it to a number.
            else if (e.target[i].value !== '') {
                try {
                    result[keys[i]] = parseInt(e.target[i].value);
                }
                catch (e) {
                    globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: `Error casting form value to number: ${keys[i]}`, type: 'error' });
                    return;
                }
            }
        }

        if (resetOnSubmit) {
            e.target.reset();
        }
        onSubmit?.(result);
    }, [keys, fields, onSubmit, resetOnSubmit]);

    return (
        <form
            style={style}
            onSubmit={handleSubmit}
        >
            <div
                className='form-label'
                style={{ color: 'orange' }}
            >
                {title}
            </div>
            {
                keys.map((k, idx) => {
                    if (fields[k] === 'boolean') {
                        return (
                            <Col key={k + idx}>
                                <div
                                    className='form-label'
                                    style={rowStyle}
                                >
                                    {k}
                                    <input
                                        autoComplete='none'
                                        className='form-text'
                                        type='checkbox'
                                        defaultChecked={getDefault(k)}
                                    />
                                </div>
                            </Col>
                        );
                    }
                    else if (fields[k] === 'number') {
                        return (
                            <Col key={k + idx}>
                                <div
                                    className='form-label'
                                    style={rowStyle}
                                >
                                    {k}
                                    <input
                                        autoComplete='none'
                                        className='form-text'
                                        type='number'
                                        defaultValue={getDefault(k)}
                                    />
                                </div>
                            </Col>
                        );
                    }
                    else if (fields[k] === 'string') {
                        return (
                            <Col key={k + idx}>
                                <div
                                    className='form-label'
                                    style={rowStyle}
                                >
                                    {k}
                                    <input
                                        autoComplete='none'
                                        className='form-text'
                                        type='text'
                                        defaultValue={getDefault(k)}
                                    />
                                </div>
                            </Col>
                        );
                    }
                    else if (enumData) {
                        const options = enumData[fields[k]] ?? [];

                        return (
                            <Col key={k + idx}>
                                <div
                                    className='form-label'
                                    style={rowStyle}
                                >
                                    {k}
                                    <select
                                        defaultValue={getDefault(k)}
                                        autoComplete='none'
                                        className='form-text'
                                        type='text'
                                    >
                                        {
                                            options.map(c => {
                                                const { id, name } = c;
                                                return <option key={id + name} value={id}>{name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </Col>
                        );
                    }
                })
            }

            <div style={{ marginTop: 10 }}>
                <Button
                    type='submit'>
                    {saveLabel}
                </Button>
            </div>
        </form>
    );
}

export default EventForm;