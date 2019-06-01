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

const ContactForm = (props) => {
	return (
		<div>
			<h1>Contact Me</h1>
			<form action="/api/contact" method="post" name="contact" id="contact">
				<h4>Email</h4>
				<input style={{ 'borderColor': props.highlight }} type="email" name="email" required id="email" placeholder="ronnie.osullivan@worldsnooker.com" />
				<h4>Name</h4>
				<input style={{ 'borderColor': props.highlight }} type="text" name="name" required id="name" placeholder="Ron" />
				<h4>Message</h4>
				<textarea style={{ 'borderColor': props.highlight }} name="message" id="message" form="contact"></textarea>
				<br /><br />
				<input type="submit" value="Submit" className="smBtn" />
			</form>
		</div>
	)
}

export default function Contact(props) {
	const [socials, setSocials] = useState([
		{
			"service": "twitter",
			"icon": "/assets/ui_images/social/twitter.png",
			"component": [<ContactForm highlight={props.highlight} />],
			"active": true
		},
		{
			"service": "contact",
			"icon": "/assets/ui_images/social/mail.png",
			"component": [<ContactForm />],
			"active": false
		},
		{
			"service": "github",
			"icon": "/assets/ui_images/social/github.png",
			"src": "https://github.com/SamMalcolm",
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

				{/* {(socials).map((social, i) => {
					return (
						<div className="socialContainer" style={{ 'display': (social.active) ? 'block' : 'none' }}>
							{(
								social.component[0]
							)}
						</div>
					)
				})} */}
				<ContactForm highlight={props.highlight} />
			</div>
		</div >
	)
}
