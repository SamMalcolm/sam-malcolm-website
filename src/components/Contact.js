import React, { useState, useEffect } from 'react'
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';
import { FacebookProvider, Feed } from 'react-facebook';



const Twitter = () => {
	return (
		<div>
			<TwitterFollowButton screenName="SamMalcolm1414" options={{ size: 'large' }} />
			<br />
			<TwitterTimelineEmbed theme="dark" sourceType="profile" screenName="SamMalcolm1414" />
		</div>
	)
}

const ContactForm = () => {
	return (
		<div>
			<h1>Contact Form</h1>
			<h3>la dad adad</h3>
		</div>
	)
}

export default function Contact() {
	const [socials, setSocials] = useState([
		{
			"service": "twitter",
			"icon": "/assets/ui_images/social/twitter.png",
			"component": [<Twitter />],
			"active": true
		},
		{
			"service": "contact",
			"icon": "/assets/ui_images/social/mail.png",
			"component": [<ContactForm />],
			"active": false
		}
	]);

	const handleChange = (e) => {
		console.log(socials);
		console.log(e.currentTarget.value);
		let index = e.currentTarget.value;
		let newSocialObject = socials;
		for (let key in newSocialObject) {
			newSocialObject[key].active = false;
		}
		newSocialObject[index].active = true;
		console.log(newSocialObject);
		setSocials(newSocialObject);
	}

	useEffect(() => {
		console.log(socials);
	}, [])

	return (
		<div>
			<div className="socialContainer">
				{(socials).map((social, i) => {
					return (
						<div className="socialInput">
							<input type="radio" id={social.service} className="socialRadio" name="social" value={i} onChange={handleChange}
								checked={(social.active) ? "true" : "false"} />
							<label className="socialLabel" for={social.service}>
								<div className="socialIcon">
									<img src={social.icon} />
								</div>
								<div className="socialTitle">{social.service}</div>
							</label>
						</div>
					)
				})}

			</div>
			<div className="socialContentContainer">

				{(socials).map((social, i) => {
					return (
						<div className="socialContainer" style={{ 'display': (social.active) ? 'block' : 'none' }}>
							{(
								social.component[0]
							)}
						</div>
					)
				})}
			</div>
		</div >
	)
}
