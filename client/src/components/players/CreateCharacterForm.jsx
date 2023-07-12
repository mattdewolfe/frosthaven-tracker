import React from 'react';
import { Col, Button } from 'react-bootstrap';

const CreateCharacterForm = ({ style, onSubmit, players = [], classes = [] }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target) {
            const player_id = e.target[0]?.value;
            const name = e.target[1]?.value;
            const class_id = e.target[2]?.value;
            const level = e.target[3]?.value;

            onSubmit?.({
                player_id,
                name,
                class_id,
                level
            });
        }
    }

    return (
        <Col style={style}>
            <form onSubmit={handleSubmit}>
                <h3 style={{ color: 'orange' }}>Create Character</h3>

                <Col>
                    <select
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        placeholder='Player'
                    >
                        {
                            players.map(p => {
                                const { id, name } = p;
                                return <option key={id} value={id}>{name}</option>
                            })
                        }
                    </select>
                </Col>

                <Col>
                    <input
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        placeholder='Character Name'
                    />
                </Col>

                <Col>
                    <select
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        placeholder='Class'
                    >
                        {
                            classes.map(c => {
                                const { id, name } = c;
                                return <option key={id} value={id}>{name}</option>
                            })
                        }
                    </select>
                </Col>

                <Col>
                    <input
                        autoComplete='none'
                        className='form-text'
                        type='text'
                        placeholder='Level'
                    />
                </Col>

                <Col>
                    <div className='flex-row' style={{ marginTop: 10 }}>
                        <Button type='submit'>
                            Create
                        </Button>
                    </div>
                </Col>
            </form>
        </Col>
    );
}

export default CreateCharacterForm;