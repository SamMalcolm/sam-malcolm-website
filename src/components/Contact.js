import React, { useState, useEffect } from 'react'
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';
import Container from './Container';
import Axios from 'axios';

const Twitter = () => {
	return (
		<div>
			<TwitterFollowButton screenName="SamMalcolm1414" options={{ size: 'small' }} />
			<br />
			<TwitterTimelineEmbed options={{ height: 400 }} theme="dark" sourceType="profile" screenName="SamMalcolm1414" />
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

const Contact = (props) => {
	const [socials, setSocials] = useState([]);

	useEffect(() => {
		Axios.get('/api/socials').then((resp) => {
			setSocials(resp.data);
		})
	}, [])

	const handleChange = (e) => {
		let index = e.currentTarget.value;
		let newSocialObject = socials.map((social) => (social));
		for (let key in newSocialObject) {
			newSocialObject[key].active = false;
		}
		newSocialObject[index].active = true;
		setSocials(newSocialObject);
	}

	return (
		<div>
			<div className="socialContainer">
				{(socials).map((social, i) => {
					return (
						<div key={'social-link-' + i} className={social.active ? "socialInput selected" : "socialInput"} style={{ 'backgroundColor': social.colour, 'width': 'calc(100% / ' + socials.length, 'cursor': 'pointre' }}>
							{(!social.embed) ?
								<div>
									<a href={social.src} target="_blank">
										<div className="socialLabel" for={social.service}>
											<div className="socialIcon">
												<img src={social.icon} />
											</div>
											<div className="socialTitle" style={{ 'color': (social.dark_text) ? '#000000' : '#FFFFFF' }}>{social.service}</div>
										</div>
									</a>
								</div>
								:
								<div>
									<input type="radio" id={social.service} className="socialRadio" name="social" value={i} onChange={handleChange} checked={(social.active) ? "true" : "false"} />
									<label className="socialLabel" for={social.service}>
										<div className="socialIcon">
											<img src={social.icon} />
										</div>
										<div className="socialTitle">{social.service}</div>
									</label>
								</div>
							}
						</div>
					)
				})}

			</div>
			<Container>
				<div className="socialContentContainer">
					{(typeof window.success_message != "undefined") ?
						<div className="success alert">{window.success_message}</div> : null
					}
					{(typeof window.error_message != "undefined") ?
						<div className="error alert">{window.error_message}</div> : null
					}

					{(socials).map((social, i) => {
						return (
							<div key={'social-' + i} className="socialContainer" style={{ 'display': (social.active) ? 'block' : 'none' }}>
								{social.service == "twitter" && (
									<Twitter />
								)}
								{social.service == "contact" && (
									<ContactForm highlight={props.highlight} />
								)}
							</div>
						)
					})}
				</div>
			</Container>
		</div >
	)
}

export default { Contact, ContactForm }