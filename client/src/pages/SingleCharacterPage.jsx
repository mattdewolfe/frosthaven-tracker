import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useCharactersApi } from '../api';
import { Subs, globalObserver } from '../utils/Observers';
import { LoadingWrapper, Container, Row, Col, Button } from '../components';
import { EnumContext, PlayerContext } from '../contexts';

const SingleCharacterPage = () => {
    const { id } = useParams();

    const { characterClasses } = useContext(EnumContext);
    const { activePlayerCharacters } = useContext(PlayerContext);

    const { getCharacterById } = useCharactersApi();

    const [loading, setLoading] = useState(false);
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        getCharacterById((error, data) => {
            if (error) {
                globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE, { message: error, variant: 'error' });
                setCharacter(null);
            }
            else {
                setCharacter(data);
            }

            setLoading(false);
        }, id);
    }, [id]);

    const onUpdateCharacter = (e) => {
        // Update character data.
    }

    return (
        <LoadingWrapper loading={loading}>
            <Container>
                <Row style={{ color: 'lightgrey' }}>
                    <h3 >{`Character: ${character?.name}`}</h3>
                    <Col>{`Level: ${character?.level}`}</Col>

                    <Col>
                        <form onSubmit={onUpdateCharacter}>
                            <Col >

                                <Button style={{ width: 100, marginLeft: 10 }} type='submit'>
                                    Save
                                </Button>
                            </Col>
                        </form>
                    </Col>
                </Row>
            </Container>
        </LoadingWrapper >
    );
};

export default SingleCharacterPage;