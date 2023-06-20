import React, { useState, useEffect } from "react";
import { useEnumsApi } from "../hooks";

const DebugPage = () => {

    const { getStatusEffects } = useEnumsApi();

    const [statusEffects, setStatusEffects] = useState([]);

    const handleStatusEffects = (error, data) => {
        if (error) {
            console.warn(error);
        }
        else {
            setStatusEffects([...data]);
        }
    }

    useEffect(() => {
        getStatusEffects(handleStatusEffects);
    }, []);

    return (
        <div>
            <h3>Status Effects</h3>
            <br />
            {
                statusEffects.map((status, idx) => {
                    const { name = "?", iconUrl = "" } = status;
                    return (
                        <div key={`${name}_${idx}`}>
                            {name}
                            <img src={'http://localhost:3002/images/status_effects/fh-bane.png'} />
                        </div>
                    );
                })
            }
        </div >
    );
};

export default DebugPage;