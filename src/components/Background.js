import React, { useState } from 'react'

function Background() {
    const [backgrounds, setBackgrounds] = useState([
        {
            "src": "/public/assets/backgrounds/1.jpg",
            "highlight": "#FF0000"
        },
        {
            "src": "/public/assets/backgrounds/2.jpg",
            "highlight": "#00FF00"
        },
        {
            "src": "/public/assets/backgrounds/3.jpg",
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

