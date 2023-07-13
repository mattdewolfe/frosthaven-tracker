import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnumContext, PlayerContext } from '../contexts';
import { Container, Row, Col } from "../components";
import { CreateCharacterForm } from '../components/players';
import { convertArrayToObject } from '../utils/Conversion';
import { DynamicRoutes, FormatDynamicRoute } from '../routes';

const Player = ({ style, data = {}, classMap }) => {

    const navigate = useNavigate();
    const { name, characterData, id } = data;

    const handleSelectCharacter = (pcId) => {
        navigate(FormatDynamicRoute(DynamicRoutes.SINGLE_CHARACTER, pcId));
    }

    return (
        <Col style={style}>
            <h3 className='header-text'>Name: {name}</h3>
            {
                characterData.map(pc => {
                    const { name, classId, level, retired, id } = pc;
                    return (
                        <Row
                            style={{
                                marginTop: 10,
                                borderRadius: 8,
                                padding: 4,
                                border: '1px solid lightblue'
                            }}
                            className='clickable-container'
                            onClick={() => handleSelectCharacter(id)}
                            key={name + classId + level}>
                            <Row>{`Character: ${name}`}</Row>
                            <Row>{classMap[classId]?.name}</Row>
                            <Row>{`Level: ${level}`}</Row>
                            <Row>{`Retired: ${retired ? 'YES' : 'NO'}`}</Row>
                        </Row>
                    );
                })
            }
        </Col>
    );
}

const PlayersPage = () => {

    const { players, playerCharacters, createNewCharacter } = useContext(PlayerContext);
    const { characterClasses } = useContext(EnumContext);

    const handleCreateCharacter = (data) => {
        createNewCharacter(data)
    }

    const classMap = useMemo(() => {
        return convertArrayToObject(characterClasses);
    }, [characterClasses]);

    const displayData = useMemo(() => {
        return players.map(e => {
            return {
                ...e,
                characterData: playerCharacters.filter(pc => pc.playerId === e.id)
            }
        })
    }, [players, playerCharacters]);

    return (
        <Container className='light-text'>
            <h3 className='display-4 text-primary text-center py-5'>The Ravengers!</h3>
            <Row style={{ gap: 10 }}>
                {
                    displayData.map((e, idx) => <Player
                        style={{ marginTop: 10 }}
                        key={e?.name + idx}
                        data={e}
                        classMap={classMap} />)
                }

                <Col>
                    <CreateCharacterForm
                        players={players}
                        classes={characterClasses}
                        onSubmit={handleCreateCharacter} />
                </Col>
            </Row>
        </Container >
    );
};

export default PlayersPage;