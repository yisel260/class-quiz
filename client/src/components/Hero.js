import React from 'react';
import raisedHands from "../Images/raisedHands.png"

function Hero() {
    return (
        <div className="hero-container">
            <img className="hero-image" src={raisedHands} alt={"raised hands foto"}/>
            <div className='hero-text' id='heroText'>
                <h1>Welcome to Class Quiz!</h1>
            </div>
            <div className='hero-btn-container'>
            <button className='hero-btn' id= "i-am-teacher">I'm a teacher</button>
            <button className='hero-btn' id="i-am-student">I'm a student</button>
            </div>
        </div>
    );
}

export default Hero;