import React, { useState, useEffect } from 'react'

function Background() {
    const [backgrounds, setBackgrounds] = useState([
        {
            "src": "/assets/backgrounds/flower.jpg",
            "highlight": "#FF0000"
        },
        {
            "src": "/assets/backgrounds/toby.jpg",
            "highlight": "#00FF00"
        },
        {
            "src": "/assets/backgrounds/night_exp.jpg",
            "highlight": "#0000FF"
        },
    ]);

    return (
        <div className="backgroundContainer">
            {backgrounds.map((background) => {
                return (
                    <div className="background" style={{ 'backgroundImage': 'url(' + background.src + ')' }}>
                    </div>
                )
            })}
        </div>
    )
}

export default Background

