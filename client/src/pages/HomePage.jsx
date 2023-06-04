import React, { useState } from "react";
import bonfire from '../assets/bonfire.jpg';
import bonfire3 from '../assets/bonfire3.gif'
import { Link } from "react-router-dom";
import RouteMap from "../routes";

const HomePage = () => {
    return (
        <div>
            <img src= {bonfire3} alt="a dark souls bonfire"
                 style={{ width: "100%", height: "100%" }} />
            <div className="warm">
                "A warm light for all mankind to share"
            </div>
        </div>
        

        
    )
    
}
    


export default HomePage;