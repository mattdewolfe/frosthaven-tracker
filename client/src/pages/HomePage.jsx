import React, { useState } from "react";


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
            <div className="pink-div">
                This is a classNamed div.
            </div>
            <div className="blue-div">
                This is ugly.
            </div>
            
        </div >
    );
};

export default HomePage;