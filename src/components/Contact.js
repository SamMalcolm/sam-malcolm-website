import React, { useState, useEffect } from 'react'
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';
import { FacebookProvider, Feed } from 'react-facebook';
import Container from './Container';


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
			<form action="/api/contact" method="post" name="contact" id="contactForm">
				<h4>Email</h4>
				<input style={{ 'borderColor': props.highlight }} type="email" name="email" required id="email" placeholder="ronnie.osullivan@worldsnooker.com" />
				<h4>Name</h4>
				<input style={{ 'borderColor': props.highlight }} type="text" name="name" required id="name" placeholder="Ron" />
				<h4>Message</h4>
				<textarea style={{ 'borderColor': props.highlight }} id="message" name="message"></textarea>
				<br /><br />
				<input type="submit" value="Submit" className="smBtn" style={{ 'borderColor': props.highlight }} />
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
			"active": true,
			"colour": "#1da1f2"
		},
		{
			"service": "contact",
			"icon": "/assets/ui_images/social/email.png",
			"component": [<ContactForm />],
			"active": false,
			"colour": "#0078d7"
		},
		{
			"service": "github",
			"icon": "/assets/ui_images/social/github.jpg",
			"src": "https://github.com/SamMalcolm",
			"active": false,
			"colour": "#333333"
		},
		{
			"service": "imdb",
			"icon": "/assets/ui_images/social/imdb.png",
			"src": "https://www.imdb.com/name/nm7066438/",
			"active": false,
			"colour": "#f5de50"
		},
		{
			"service": "instagram",
			"icon": "/assets/ui_images/social/instagram.png",
			"src": "https://www.instagram.com/sam_a_malcolm/",
			"active": false,
			"colour": "#f56040"
		},
		{
			"service": "facebook",
			"icon": "/assets/ui_images/social/facebook.png",
			"src": "https://www.facebook.com/sammalcolmmedia/",
			"active": false,
			"colour": "#3b5998"
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
						<div className="socialInput" style={{ 'backgroundColor': social.colour }}>
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
			<Container>
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
			</Container>
		</div >
	)
}
