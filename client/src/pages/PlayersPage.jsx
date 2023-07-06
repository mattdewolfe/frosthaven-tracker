import React, { useState, useCallback, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import bannerman from '../assets/581588-Armor-Shield.jpg'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useEnumsApi } from "../api";
import Dropdown from 'react-bootstrap/Dropdown';



const Players = ({name = "unknown", charclass = "n/a", charname = "n/a", level = 0}) => {
    return (
        <>
            <h1>Name: {name}</h1>
            <h2>Character class: {charclass}</h2>
            <h2>Character: {charname}</h2>
            <h3>Level: {level}</h3>

        </>
    )
}

const PlayersPage = () => {
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

console.log(characterClasses)
    return (
        <>
        <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Character Classes
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            characterClasses.map((entry, idx) => {
                                return (
                                    <Dropdown.Item
                                        key={"status_" + entry?.id}
                                        eventKey={entry?.id}>
                                        {entry?.name}
                                    </Dropdown.Item>
                                );
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                        <select name="status" id="status">
                    {
                        statusEffects.map((status, idx) => {
                            return (
                                <option key={"status_"+status?.id} value={status?.id}>
                                    {status?.name}
                                </option>
                            )
                        })
                    }
                </select>

        <div class="text-primary">
            <div>
                <h1 className="display-4 text-center py-5 text-danger">The Ravengers!</h1>   
            </div>
            <div className="container">
                <div className="card-group align-items-center justify-content-center">
                    <div class="row my-5 align-items-center justify-content-center">
                    <div className="div col-8 col-lg-4 col-xl-3">
                        <div className="card border-0">
                            <img class="card-image" src={bannerman} />
                            <div className="card-body card-img-overlay text-center py-4">
                                <div className="h4 card-title display-3">
                                Matt
                                </div>
                                <div className="display-6 card subtitle my2 border-0">
                                Andrew the Bannerspear   
                                </div>
                                <p class="card-text text-muted pt-4">Humans are a resiliant race. Ever met with tragedy and war, humans have persevered throughout the ages to become the most prolific civilization,
                                reaching across the continent in search of new conquests. They may have overestimated their ability to survive with Frosthaven, however.
                                Conquering the north is much more difficult and eadly. There are forces here, both known and unknown, that are best undisturbed, but such things have not stopped humans in the past.
                                </p>
                                <p class="card-text text-muted pt-4">At the head of this thrust into the frozen unknown are the Banner Spears, tireless warriors forever in search of glory and honor at the behest of the capital city of White Oak. Frosthaven has no need of prise, though. Cut off from the order they hold dear and faced with the harsh realities of the north, Banner Spears are forced to reevaluate what truly matter.
                                Will they give up everything to protect the outpost, or will they flee from the face of chaos and destruction?
                                </p>
                            </div>
                        </div>
                    
                    </div>
                    <div className="div col-8 col-lg-4 col-xl-3">
                        <div className="div card border-0">
                            <div className="div card-body text-center py-4">
                                <div className="h4 card-title display-3">
                                Gord
                                </div>
                                <div className="display-6 card subtitle my2 border-0">
                                Trashcan the Drifter   
                                </div>
                                <p class="card-text text-muted pt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Laboriosam at facere suscipit, sunt repudiandae eaque nemo quae saepe ex temporibus?
                                </p>
                            </div>
                        </div>
                    
                    </div>
                    <div className="col-8 col-lg-4 col-xl-3">
                        <div className="card">
                            <div className="img-header"></div>
                            <div className="card-body text-center py-4">
                                <div className="h4 card-title display-3">
                                Mark
                                </div>
                                <div className="display-6 card subtitle my2 border-0">
                                Gimpy the Frozenfist   
                                </div>
                                <p class="card-text text-muted pt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Laboriosam at facere suscipit, sunt repudiandae eaque nemo quae saepe ex temporibus?
                                </p>
                            </div>
                        </div>
                    
                    </div>
                    </div>
                </div>
            </div>

        </div >
        </>
        
  
    );
};

export default PlayersPage;