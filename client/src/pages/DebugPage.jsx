import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useElementsApi, useScenariosApi } from "../api";
import { EnumContext, PlayerContext } from "../contexts";
import { useIsMounted } from "../hooks";
import { globalObserver, Subs } from "../utils/Observers";

const DebugPage = () => {

    const styles = Object.freeze({
        columnStyle: {
            flexDirection: "column",
            gap: 4,
            border: "1px solid lightgrey",
            borderRadius: 4,
            padding: 4
        },
        rowStyle: {
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 4,
            textAlign: "center",
            fontSize: "1.25rem",
            border: '0.5px dashed grey',
            marginBottom: 2
        },
        entryImage: {
            width: 50,
            height: 50,
            objectFit: "contain"
        }
    });

    const isMounted = useIsMounted();

    const { getAllScenarios } = useScenariosApi();
    const { postElementBatch } = useElementsApi();
    const { statusEffects, characterClasses } = useContext(EnumContext);
    const { players, playerCharacters, createNewCharacter } = useContext(PlayerContext);
    const [activeScenario, setActiveScenario] = useState([]);

    useEffect(() => {
        getAllScenarios((error, data) => {
            if (error) {
                console.warn(error);
            }
            else {
                if (isMounted()) {
                    setActiveScenario(data[0]);
                }
            }
        });
    }, []);

    const submitCharacterData = (e) => {
        e.preventDefault();
        if (e.target) {
            const name = e.target[0]?.value;
            const classId = e.target[1]?.value;
            const playerId = e.target[2]?.value;

            createNewCharacter({
                name: name,
                class_id: classId,
                player_id: playerId
            });
        }
    }

    const submitElementGeneration = (e) => {
        e.preventDefault();
        if (e.target) {
            const player_id = e.target[0]?.value;
            const character_id = e.target[1]?.value;
            const scenario_id = 1;
            let element_ids = [];

            const rndCount = Math.round(1 + Math.random() * 3);
            for (let i = 0; i < rndCount; i++) {
                element_ids.push(Math.max(1, Math.round(Math.random() * 6)));
            }

            postElementBatch((error, data) => {
                if (error) {
                    globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE,
                        { message: e, type: 'error' });
                }
                else {
                    globalObserver.sendMsg(Subs.REQUEST_TOAST_MESSAGE,
                        { message: `${element_ids.length} Element(s) Generated`, type: 'success' });
                }
            }, {
                scenario_id,
                player_id,
                character_id,
                element_ids
            });
        }
    }

    return (
        <div style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            overflow: "auto",
            marginTop: 10
        }}>
            <Container style={styles.columnStyle}>
                <h3>Players</h3>
                <br />
                {
                    players.map((p, idx) => {
                        const { name = "?" } = p;

                        return (
                            <div style={styles.rowStyle}
                                key={`${name}_${idx}`}>
                                {name}
                            </div>
                        );
                    })
                }

                <h3>Characters</h3>
                <br />
                {
                    playerCharacters.map((c, idx) => {
                        const { name = "?" } = c;

                        return (
                            <div style={styles.rowStyle}
                                key={`${name}_${idx}`}>
                                {name}
                            </div>
                        );
                    })
                }

                <Col >
                    <form id="createCharacter" onSubmit={submitCharacterData}>
                        <div style={{ color: 'orange' }}>Add Character</div>
                        <Col >
                            <div className='form-label'>
                                Name
                            </div>
                            <input
                                autoComplete="none"
                                className="form-text"
                                type="text"
                                placeholder='character name'
                            />
                        </Col>
                        <Col>
                            <div className='form-label'>
                                Class
                            </div>
                            <select name="players">
                                {
                                    characterClasses.map(c => {
                                        const { id, name } = c;
                                        return <option key={id} value={id}>{name}</option>
                                    })
                                }
                            </select>
                        </Col>
                        <Col>
                            <div className='form-label'>
                                Player
                            </div>
                            <select name="players">
                                {
                                    players.map(p => {
                                        const { id, name } = p;
                                        return <option key={id} value={id}>{name}</option>
                                    })
                                }
                            </select>
                        </Col>

                        <div className="flex-row" style={{ marginTop: 10 }}>
                            <Button type="submit">
                                Create
                            </Button>
                        </div>
                    </form>
                </Col>
            </Container>
            <Container>
                <form id="createCharacter" onSubmit={submitElementGeneration}>
                    <div style={{ color: 'orange' }}>Generate Elements</div>
                    <Col>
                        <div className='form-label'>
                            Player
                        </div>
                        <select name="players">
                            {
                                players.map(c => {
                                    const { id, name } = c;
                                    return <option key={id} value={id}>{name}</option>
                                })
                            }
                        </select>
                    </Col>
                    <Col>
                        <div className='form-label'>
                            Character
                        </div>
                        <select name="players">
                            {
                                playerCharacters.map(p => {
                                    const { id, name } = p;
                                    return <option key={id} value={id}>{name}</option>
                                })
                            }
                        </select>
                    </Col>

                    <div className="flex-row" style={{ marginTop: 10 }}>
                        <Button type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </Container>
        </div >
    );
};

export default DebugPage;