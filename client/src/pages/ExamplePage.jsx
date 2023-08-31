import React, { useState, useEffect } from 'react';
import { usePlayersApi } from '../api';

const ExamplePage = () => {

    const styles = Object.freeze({
        row: {
            display: 'flex', flexDirection: 'row', border: '1px solid lightblue', gap: 4, marginTop: 2
        },
        entry: {
            fontSize: 14, marginRight: 10, textAlign: 'left'
        }
    });

    const [data, setData] = useState([]);

    const { getAllPlayers } = usePlayersApi();

    // Define a callback method for our rest request. 
    // These are setup so that error is always the first parameter, and response data is the second.
    const handlePlayerData = (error, data) => {
        if (error) {
            // Shit went south. Display the error and wipe out existing data.
            setData([]);
            console.warn(error);
        }
        else {
            // Happy path.
            setData(data);
        }
    }

    // Define a use effect for our data retrieval.
    // Use effects run once when a component mounts, and again anytime their subscribed variables change.
    // The subscribed variables are passed in with an array as the second parameter. If nothing is
    // passed in then the useEffect code will only run once (when component mounts). 

    useEffect(() => {
        getAllPlayers(handlePlayerData);
    }, []);
    // ^ These hooks are generally written with inline lambda methods, but could also be done as such:
    /*
    function fetchPlayerData() {
        getAllPlayers(handlePlayerData);
    }

    useEffect(fetchPlayerData, []);
    */

    return (
        <div>
            <h3>Example data grab</h3>
            <br />
            {
                // This is a common convetion to display arrays of data in react.
                // You map over the array, receiving each entry and index and return the element you want rendered.
                // Things to note: each element needs a unique key (the console will complain about this if you miss it)
                data.map((entry, idx) => {
                    const { name, id, characterId, charactersPlayed, dateCreated = 'unknown' } = entry;
                    // ^ This is object deconstruction. Extremely useful for grabbing properties that you expect to exist, while giving defaults as fallbacks.
                    // In this case, dateCreated does not exist on these entries - but I've given it a default value.

                    return (
                        <div key={`${name}_${idx}`} style={styles.row}>
                            <div style={styles.entry}>{`Name: ${name}`}</div>
                            <div style={styles.entry}>{`Id: ${id}`}</div>
                            <div style={styles.entry}>{`Current Character Id: ${characterId}`}</div>
                            <div style={styles.entry}>{`Characters Played: ${charactersPlayed}`}</div>
                            <div style={styles.entry}>{`Date Created: ${dateCreated}`}</div>
                        </div>
                    );
                })
            }
        </div >
    );
};

export default ExamplePage;