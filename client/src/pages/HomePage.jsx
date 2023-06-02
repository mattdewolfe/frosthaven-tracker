import React, { useState } from "react";
import bonfire from '../assets/bonfire.jpg';

const HomePage = () => {

    const [randomNumber, setRandomNumber] = useState(Math.random());

    const newRandomNumber = () => {
        setRandomNumber(Math.random());
    };

    return (
        <div>
            <h3>A warm light for all mankind to share</h3>
            <br />
            <div>
                {`The Random Number: ${randomNumber}`}
                <br />
                <button onClick={newRandomNumber}>
                    Get New Number
                </button>
            </div>
            <div>
            <img src={bonfire} className="Bonfire" alt="a bonfire from dark souls"></img>
            </div>
            <div className="pink-div">
                This is a classNamed div.
            </div>
            <div className="blue-div">
                This is ugly.
            </div>
            <a
            className="players-link"
            href="./players"
            target="_blank"
            rel="noopener noreferrer"
            >Players Page
            </a>
            
        </div >
    );
};

export default HomePage;