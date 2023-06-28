import React, { useState, useEffect } from "react";
import { useEnumsApi } from "../hooks";
import HostedImage from "../components/HostedImage";

const DebugPage = () => {

    const styles = Object.freeze({
        columnStyle: {
            display: "flex",
            width: "25%",
            flexDirection: "column",
            gap: 5
        },
        rowStyle: {
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10
        }
    });

    const { getStatusEffects, getElements, getCreatureClasses } = useEnumsApi();

    const [statusEffects, setStatusEffects] = useState([]);
    const [elements, setElements] = useState([]);
    const [creatureClasses, setCreatureClasses] = useState([]);

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

    useEffect(() => {
        getStatusEffects(handleStatusEffects);
        getElements(handleElements);
        getCreatureClasses(handleCreatureClasses);
    }, []);

    return (
        <div style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            overflow: "auto"
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
        </div >
    );
};

export default DebugPage;