import React from 'react';
import { ContactForm } from './Contact'
import { SocialIcon } from 'react-social-icons';

const About = (props) => {
	return (
		<div className="bio_container">
			<div className="bio_img">
				<div className="avatar">
					<img src="https://sammalcolm-static.s3-us-west-2.amazonaws.com/assets/profile/me.jpg" />
				</div>
			</div>
			<div className="bio_body">
				<h1>SAM MALCOLM</h1>
				<SocialIcon target="_blank" style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#FFFFFF" url="https://www.twitter.com/SamMalcolm1414" />
				<SocialIcon target="_blank" style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#FFFFFF" url="https://www.linkedin.com/in/sam-malcolm/" />
				<SocialIcon target="_blank" style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#FFFFFF" url="https://github.com/SamMalcolm" />
				<SocialIcon target="_blank" style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#FFFFFF" url="https://www.instagram.com/sam_a_malcolm/" />
				<SocialIcon target="_blank" style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#FFFFFF" url="https://www.facebook.com/sammalcolmmedia" />
				<SocialIcon target="_blank" style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#FFFFFF" url="https://www.reddit.com/user/sam_malcolm/" />
				<SocialIcon target="_blank" style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#000000" bgColor="#FFFFFF" url="https://codepen.io/SamMalcolm/" />
				<SocialIcon target="_blank" style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#FFFFFF" url="https://www.youtube.com/channel/UCOSAPdTi4ICVPW8AUzoHUMg" />
				<SocialIcon target="_blank" style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#FFFFFF" url="https://open.spotify.com/artist/1lic0tkQOleES5rgyihvHV?si=m1Sjky21QuOzId0rpz9qOA" />
				<SocialIcon style={{ height: 30, width: 30, marginRight: 5 }} fgColor="#FFFFFF" url="#contact" network="email" />

				<p>I am a relentlessly curious Digital Media Designer and Developer from Melbourne, Australia with a passion for Education. I’m also someone who is a strong advocate for inclusive and supportive workplaces as well as ethical design practices.</p>
				<p>I currently work at RMIT University in the central Learning and Teaching Technology team which focuses on improving the student and teacher experience. This role has been both challenging and rewarding and it has allowed me to work within the intersection of my passion for education and technology. I have built enterprise scale software solutions and driven initiatives that have resulted in improved business processes and a positive impact on the learning experience.</p>
				<p>I am constantly learning and improving. Being on the cutting edge of my professional practice and being able to approach different issues from unique and informed perspectives is very important to me. For this reason I spend a lot of time outside of my work exploring, learning and building. In the remainder of my spare time I love walking my dog Apollo, watching films, playing boardgames with friends and competing in local snooker competitions. </p>
				<p>If you want to collaborate on a project, have a chat about film, or organise a game of snooker then feel free to reach out on social media, or you can use the contact form on this site. </p>
				<p>I look forward to hearing from you.</p>
				<p>Thanks!</p>
				<div className="sig">
					<img src="https://sammalcolm-static.s3-us-west-2.amazonaws.com/assets/profile/Sig.png" />
				</div>
			</div>

			<div className="divider"></div>
			<div className="bottomSection">
				<div className="frameworks">
					<h4>Frameworks</h4>
					<ul>

						<li>JavaScript</li>
						<li>PHP</li>
						<li>Ruby on Rails</li>
						<li>Swift</li>
						<li>Flutter / Dart</li>
						<li>CSS</li>
						<li>HTML</li>
						<li>Node</li>
						<li>React</li>
						<li>MySQL</li>
						<li>MongoDB</li>
						<li>Oracle</li>
						<li>Docker</li>
						<li>Linux</li>
						<li>Apache</li>
					</ul>
				</div>
				<div className="cert">
					<h4>Education</h4>
					<ul>
						<li>2016: Bachelor of Design (Digital Media) With Distinction</li>
						<li>2013: Certificate III in Interactive Digital Media</li>
						<li>2012: Certificate II in Information Technology</li>
					</ul>
					<h4>Achievements</h4>
					<ul>
						<li>2019: RMIT University Education leadership Award (Beyond the Call)</li>
						<li>2019: Presented at International Instructure Con Confrence in Long Beach CA</li>
					</ul>

				</div>
				<div className="lyndaList" style={{ 'width': '100%' }}>
					<h4>Lynda:</h4>
					<ul className="lynda">
						<li>Learning Paths:
                        <ul>
								<li>Become a MERN stack developer</li>
							</ul>
						</li>
						<li>Certificates:
                        <ul>
								<li>Learning webpack 4</li><li>Visual Studio Code Productivity Tips</li><li>AWS for Developers: Deploying Your Application to the Cloud</li><li>Learning Cloud Computing: Core Concepts (2016)</li><li>Learning Bash Scripting</li><li>Photoshop CC 2019 New Features</li><li>JavaScript: Classes</li><li>SSL Certificates for Web Developers</li><li>Node.js: Testing and Code Quality</li><li>Node.js: Deploying Applications</li><li>React: Securing Applications</li><li>Node.js: Securing RESTful APIs</li><li>Learning Full-Stack JavaScript Development: MongoDB, Node, and React</li><li>Building RESTful Web APIs with Node.js and Express</li><li>Learning Webpack 3</li><li>Express Essential Training</li><li>Building a Website with Node.js and Express.js (2016)</li><li>Learning MongoDB</li><li>Learning NPM the Node Package Manager (2015)</li><li>Git Intermediate Techniques</li><li>Learning Data Visualization with D3.js</li><li>CSS: Animation</li><li>Advanced SVG Animation</li><li>Learning SVG</li><li>Learning REST APIs</li><li>Anger Management</li><li>One-Minute Songwriting Tips</li><li>20 Unofficial Rules of Songwriting</li><li>Learning Composer, the PHP Dependency Manager</li><li>JavaScript and AJAX: Integration Techniques</li><li>JavaScript and JSON: Integration Techniques</li><li>Learning ECMAScript 6</li><li>Learning PhoneGap Build</li><li>React.js Essential Training (2017)</li><li>Node.js Essential Training (2017)</li><li>HTML5: Drag and Drop</li><li>Git Essential Training (2012)</li><li>CSS: Advanced Layouts with Grid</li><li>jQuery Essential Training</li><li>Ajax with PHP: Add Dynamic Content to Websites</li><li>Xamarin Essential Training</li><li>C# Essential Training</li><li>Nuke Essential Training (2014)</li><li>Maya: 3D Printing with Shapeways</li><li>Ableton Live 9 Essential Training</li><li>PHP with MySQL Beyond the Basics (2009)</li><li>XML Essential Training (2014)</li><li>Maya 2017 Essential Training</li><li>Programming Foundations: Object-Oriented Design (2012)</li><li>JavaScript Essential Training</li><li>PHP with MySQL Essential Training (2013)</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div id="contact" className="divider"></div>
			<div >
				<ContactForm highlight={props.highlight} />
			</div>
		</div >
	)
}

export default About;

