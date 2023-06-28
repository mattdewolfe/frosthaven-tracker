import React, { useState, useEffect } from "react";
import { useEnumsApi } from "../api";
import HostedImage from "../components/HostedImage";

const DebugPage = () => {

    const styles = Object.freeze({
        columnStyle: {
            display: "flex",
            minWidth: "20%",
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
            gap: 10
        }
    });

    const { getStatusEffects, getElements, getCreatureClasses, getCharacterClasses } = useEnumsApi();

    const [statusEffects, setStatusEffects] = useState([]);
    const [elements, setElements] = useState([]);
    const [creatureClasses, setCreatureClasses] = useState([]);
    const [characterClasses, setCharacterClasses] = useState([]);

    const handleStatusEffects = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else {
            setStatusEffects([...data]);
        }
    }

    const handleElements = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else {
            setElements([...data]);
        }
    }

    const handleCreatureClasses = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else {
            setCreatureClasses([...data]);
        }
    }

    const handleCharacterClasses = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else {
            setCharacterClasses([...data]);
        }
    }

    useEffect(() => {
        getStatusEffects(handleStatusEffects);
        getElements(handleElements);
        getCreatureClasses(handleCreatureClasses);
        getCharacterClasses(handleCharacterClasses);
    }, []);

    return (
        <div style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            overflow: "auto",
            marginTop: 10
        }}>
            <div style={styles.columnStyle}>
                <h3>Status Effects</h3>
                <br />
                {
                    statusEffects.map((status, idx) => {
                        const { name = "?", iconUrl = "" } = status;

                        return (
                            <div style={styles.rowStyle}
                                key={`${name}_${idx}`}>
                                {name}
                                <HostedImage style={{ width: 32, height: 32, objectFit: "contain" }}
                                    src={iconUrl} />
                            </div>
                        );
                    })
                }
            </div>

            <div style={styles.columnStyle}>
                <h3>Elements</h3>
                <br />
                {
                    elements.map((status, idx) => {
                        const { name = "?", iconUrl = "" } = status;

                        return (
                            <div style={styles.rowStyle}
                                key={`${name}_${idx}`}>
                                {name}
                                <HostedImage style={{ width: 32, height: 32, objectFit: "contain" }}
                                    src={iconUrl} />
                            </div>
                        );
                    })
                }
            </div>

            <div style={styles.columnStyle}>
                <h3>Creature Classes</h3>
                <br />
                {
                    creatureClasses.map((status, idx) => {
                        const { name = "?", iconUrl = "" } = status;

                        return (
                            <div style={styles.rowStyle}
                                key={`${name}_${idx}`}>
                                {name}
                                <HostedImage style={{ width: 32, height: 32, objectFit: "contain" }}
                                    src={iconUrl} />
                            </div>
                        );
                    })
                }
            </div>

            <div style={styles.columnStyle}>
                <h3>Character Classes</h3>
                <br />
                {
                    characterClasses.map((status, idx) => {
                        const { name = "?", iconUrl = "" } = status;

                        return (
                            <div style={styles.rowStyle}
                                key={`${name}_${idx}`}>
                                {name}
                                <HostedImage style={{ width: 32, height: 32, objectFit: "contain" }}
                                    src={iconUrl} />
                            </div>
                        );
                    })
                }
            </div>
        </div >
    );
};

export default DebugPage;