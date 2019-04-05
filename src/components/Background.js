import React, { useState, useEffect } from 'react'

function Background(props) {
    const [backgrounds, setBackgrounds] = useState([
        {
            "src": "/assets/backgrounds/flower.jpg",
            "highlight": "#D2FBFC",
            "active": 1,
        },
        {
            "src": "/assets/backgrounds/toby.jpg",
            "highlight": "#00FF00",
            "active": 1

        },
        {
            "src": "/assets/backgrounds/night_exp.jpg",
            "highlight": "#FF0000",
            "active": 1
        },
    ]);
    useEffect(() => {
        console.log("USING EFFECT");
        let counter = 0;
        const int = setInterval(() => {
            let bgs = JSON.parse(JSON.stringify(backgrounds));
            for (let i = 0; i < bgs.length; i++) {

                console.log(counter);

                if (counter == 1) {
                    bgs[i].active = 1;
                    props.setHighlightColour(bgs[0].highlight);
                } else if (counter == 0) {
                    bgs[0].active = 0;
                    bgs[0].active = 1;
                    bgs[bgs.length - 1].active = 1;
                } else {
                    if (counter == i * 2 || counter == (i * 2) + 1) {
                        if (counter) {
                            for (var c = 0; c < bgs.length; c++) {
                                if (c < i) {
                                    bgs[c].active = 0;
                                }
                            }
                        }
                        bgs[i].active = 1;
                        props.setHighlightColour(bgs[i].highlight);
                    }
                }


            }

            // counter == 0 100, 1 111, 2 011, 3 011, 4 001, 5 001
            console.log(bgs);
            setBackgrounds(bgs);
            if (counter == (bgs.length * 2) - 1) {
                counter = 0;
            } else {
                counter++;
            }

            console.log(`${counter} Seconds Passed`);
        }, 2500);
        return () => clearInterval(int);
    }, [])

    return (
        <div className="backgroundContainer">
            {backgrounds.map((background) => {
                return (
                    <div className="background" style={
                        {
                            'backgroundImage': 'url(' + background.src + ')',
                            'opacity': background.active,
                            'zIndex': (0 - 999 - backgrounds.indexOf(background))
                        }
                    }>
                    </div>
                )
            })}
        </div>
    )
}

export default Background

