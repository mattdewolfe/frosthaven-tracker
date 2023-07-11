import React from 'react';
import { Col, Button } from 'react-bootstrap';

const AddCharacterForm = ({ style, onSubmit, players = [], classes = [] }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!e.target) {
            return;
        }

        const playerId = e.target[0]?.value;
        const name = e.target[1]?.value;
        const classId = e.target[2]?.value;
        const level = e.target[3]?.value;

        onSubmit?.({
            playerId,
            name,
            classId,
            level
        });
    }

    console.log(players)
    return (
        <Col>
            <form onSubmit={handleSubmit}>
                <div style={{ color: 'orange' }}>Create Character</div>

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

export default AddCharacterForm;