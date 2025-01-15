import React from 'react';
import raisedHands from "../Images/raisedHands.png"

function Hero() {
    return (
        <div className="overLay">
            <img className="heroImage" src={raisedHands} alt={"raised hands foto"}/>
        </div>
    );
}

export default Hero;