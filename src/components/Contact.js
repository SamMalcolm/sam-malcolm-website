import React, { useState } from 'react'
const setActive = (serviceName) => {
	// let socialCopy = socials;
	// for (let key in socialCopy) {
	// 	socialCopy[key].active = false;
	// 	if (socialCopy[key].service == serviceName) {
	// 		socialCopy[key].active = true;
	// 	}
	// }
	// setSocials(socials);
	console.log("truee");
}
export default function Contact() {

	let [socials, setSocials] = useState([
		{
			"service": "Twitter",
			"icon": "http://pngimg.com/uploads/twitter/twitter_PNG1.png",
			"colour": "#38A1F3",
			"content": `<a href="https://twitter.com/SamMalcolm1414?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-show-count="false">Follow @SamMalcolm1414</a>
			<a class="twitter-timeline" data-theme="dark" href="https://twitter.com/SamMalcolm1414?ref_src=twsrc%5Etfw">Tweets by SamMalcolm1414</a>`,
			"active": true

		}
	])



	return (
		<div>
			<div className="socialContainer">
				{socials.map((social) => {
					return (
						<div className="social" onClick={setActive(social.service)}>
							<div className="socialIcon"><img src={social.icon} /></div>
							<div className="socialName">{social.service}</div>
						</div>
					)
				})}
			</div>
			<div className="socialContentContainer">
				{socials.map((social) => {
					return (
						<div style={(social.active) ? { "display": "block" } : { "display": "none" }} dangerouslySetInnerHTML={{ '__html': social.content }}>

						</div>
					)
				})}
			</div>
		</div >
	)
}
