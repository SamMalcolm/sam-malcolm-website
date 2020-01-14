import React, { useState, useEffect } from 'react'

function Background(props) {

	const [backgrounds, setBackgrounds] = useState([
		{
			"src": "/assets/backgrounds/flower.jpg",
			"highlight": "rgb(0,255,255)",
			"active": 1,
			"position": "bottom right"
		},
		{
			"src": "/assets/backgrounds/toby.jpg",
			"highlight": "rgb(0,255,100)",
			"active": 1,
			"position": "top center"

		},
		{
			"src": "/assets/backgrounds/night_exp.jpg",
			"highlight": "#f99d23",
			"active": 1,
			"position": "center"
		},
	]);

	useEffect(() => {
		props.setHighlightColour(backgrounds[0].highlight);
		let counter = 0;
		const int = setInterval(() => {
			let bgs = JSON.parse(JSON.stringify(backgrounds));
			for (let i = 0; i < bgs.length; i++) {
				if (counter == 1) {
					bgs[i].active = 1;
					props.setHighlightColour(bgs[0].highlight);
				} else if (counter == 0) {
					for (var c = 0; c < bgs.length; c++) {
						bgs[c].active = 0;
					}
					bgs[0].active = 1;
					bgs[bgs.length - 1].active = 1;
					props.setHighlightColour(bgs[0].highlight);
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
			setBackgrounds(bgs);
			if (counter == (bgs.length * 2) - 1) {
				counter = 0;
			} else {
				counter++;
			}
		}, 4000);
		return () => clearInterval(int);
	}, []);

	return (
		<div className="backgroundContainer">
			{backgrounds.map((background) => {
				return (
					<div className="background" style={
						{
							'backgroundImage': 'url(' + background.src + ')',
							'opacity': background.active,
							'zIndex': (0 - 999 - backgrounds.indexOf(background)),
							'backgroundPosition': background.position
						}
					}>
					</div>
				)
			})}
		</div>
	)
}

export default Background

