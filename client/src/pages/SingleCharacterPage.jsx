import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useCharactersApi } from '../api';
import { Subs, globalObserver } from '../utils/Observers';
import { Container, Row } from '../components';
import { LoadingWrapper } from '../components/core';
import { EnumContext, PlayerContext } from '../contexts';
import { EditCharacterForm } from '../components/players';

const SingleCharacterPage = () => {
    const { id } = useParams();

    const { characterClasses } = useContext(EnumContext);
    const { activePlayerCharacters, updatePlayerCharacter } = useContext(PlayerContext);

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

    const handleSaveChanges = useCallback((data) => {
        updatePlayerCharacter(id, data);
    }, [id]);

    return (
        <LoadingWrapper loading={loading}>
            <Container>
                <Row style={{ color: 'lightgrey' }}>
                    {
                        character !== null ?

                            <EditCharacterForm
                                onSave={handleSaveChanges}
                                character={character}
                                classes={characterClasses} />
                            :
                            "Character data found"
                    }
                </Row>
            </Container>
        </LoadingWrapper >
    );
};

export default SingleCharacterPage;