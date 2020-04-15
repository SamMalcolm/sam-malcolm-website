import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';

import './styles/style.scss';

import Background from './components/Background';
import About from './components/About.js';
import Card from './components/Card.js';
import Container from './components/Container.js';
import FullWidthBanner from './components/FullWidthBanner';
import Menu from './components/Menu';
import { BlogPage } from './components/BlogPage';
import Contact from './components/Contact';
import Appearances from './components/Appearances';
import Folio from './components/Folio';
import WorkPage from './components/WorkPage';
import Albums from './components/Albums';
import FilmPage from './components/FilmPage';
import SnookerPage from './components/SnookerPage';
import { Helmet } from "react-helmet";
import YoutubePlaylist from './components/YoutubePlaylist';

const App = () => {

	const [highlightColour, setHighlightColour] = useState('');
	const [backgroundSlides, setBackgroundSlides] = useState(false);

	return (
		<Router>
			<div className="appContainer">
				<Helmet>
					<title>Sam Malcolm Media</title>
				</Helmet>
				{(!backgroundSlides) ? <Background setHighlightColour={setHighlightColour} /> : null}
				<Nav highlight={highlightColour} />
				<Switch>
					<Route exact path="/"></Route>
					<Route exact path="/appearances">

						<Container>
							<Helmet>
								<title>Sam Malcolm Media | Live</title>
							</Helmet>
							<Appearances highlight={highlightColour} />
						</Container>
					</Route>
					<Route exact path="/snooker">
						<div>
							<Helmet>
								<title>Sam Malcolm Media | Snooker</title>
							</Helmet>
							<FullWidthBanner src={window.bucket + "/assets/ui_images/snooker2.jpg"} caption="Photo: David Heath" title="Snooker &amp; Billiards" />
							<Container>
								<SnookerPage />
							</Container>
						</div>
					</Route>
					<Route exact path="/about">
						<Container>
							<Helmet>
								<title>Sam Malcolm Media | About</title>
							</Helmet>
							<About highlight={highlightColour} />
						</Container>
					</Route>
					<Route exact path="/podcasts">
						<Container>
							<Helmet>
								<title>Sam Malcolm Media | Podcasts</title>
							</Helmet>
							<Menu dataSource="/api/podcasts" urlPath="/podcast/" menuName="Podcast" />
						</Container>
					</Route>
					<Route exact path="/work">
						<div>
							<Helmet>
								<title>Sam Malcolm Media | Work</title>
							</Helmet>
							<Folio />
						</div>
					</Route>
					<Route exact path="/work/:work_id" render={(props) => {
						let workid = props.location.pathname.replace('/work/', '');
						return (
							<div>
								<Helmet>
									<title>Sam Malcolm Media | Work</title>
								</Helmet>
								<WorkPage highlight={highlightColour} id={workid} />
							</div>
						)
					}} />

					<Route exact path="/blog/:blog_id" render={(props) => {
						let blogid = props.location.pathname.replace('/blog/', '');
						return (
							<div>
								<Helmet>
									<title>Sam Malcolm Media | Blog</title>
								</Helmet>
								<BlogPage id={blogid} />
							</div>
						)
					}} />

					<Route exact path="/contact">
						<div>
							<Helmet>
								<title>Sam Malcolm Media | Contact</title>
							</Helmet>

							<Contact highlight={highlightColour} />
						</div>
					</Route>
					<Route exact path="/film">
						<div>
							<Helmet>
								<title>Sam Malcolm Media | Film</title>
							</Helmet>
							<FullWidthBanner src={window.bucket + "/assets/ui_images/film.jpg"} title="Film Criticism" />
							<Container>
								<FilmPage highlight={highlightColour} />
							</Container>
						</div>
					</Route>
					<Route exact path="/tutorials">
						<Container>
							<Menu dataSource="/api/tutorial" urlPath="/tutorials/" menuName="Tutorials" />
						</Container>
					</Route>
					<Route exact path="/tutorials/:id" render={(props) => {
						let tutorial_id = props.location.pathname.replace('/tutorials/', '');
						return (
							<div>
								<Helmet>
									<title>Sam Malcolm Media | Tutorials</title>
								</Helmet>
								<YoutubePlaylist id={tutorial_id} />
							</div>
						)
					}} />
					<Route exact path="/blog">
						<Container>
							<Helmet>
								<title>Sam Malcolm Media | Blog</title>
							</Helmet>
							<Menu dataSource="/api/blog" urlPath="/blog/" menuName="Blog" />
						</Container>
					</Route>
					<Route exact path="/music">
						<div>
							<Helmet>
								<title>Sam Malcolm Media | Music</title>
							</Helmet>
							<Albums highlight={highlightColour} />
						</div>
					</Route>
				</Switch>
				<div className="cardContainer">

					<Card icon="https://sammalcolm-static.s3-us-west-2.amazonaws.com/assets/ui_images/accessibility.png">
						<div className="ackText">
							<h3>Accessibility Options</h3>
							<i>Stop Background Slideshow</i>
							<input type="checkbox" value="backgrounds" onChange={(e) => {
								console.log(e.target.checked);
								setBackgroundSlides(e.target.checked);

							}} />
							<br />
							<i>Large Text</i>
							<input type="checkbox" value="backgrounds" onChange={(e) => {
								document.querySelector("body").classList.toggle("large_text");

							}} />
							<br />
							<i>If an accessibility feature is missing that may help you access the site more easily please dont hesitate to contact me via the contact page and I will make it a priority.</i>
						</div>
					</Card>
					<Card icon="https://sammalcolm-static.s3-us-west-2.amazonaws.com/assets/ui_images/australia.png">
						<div className="ackImage">
							<img src='https://sammalcolm-static.s3-us-west-2.amazonaws.com/assets/ui_images/ack.png' />
						</div>
						<div className="ackText">
							<h3>Acknowledgement Of Country</h3>
							<p>I would like to acknowledge the traditional owners of the land on which I conduct the business of being a developer and designer. I would like to pay my respect to their elders past, present and future.</p>
							<p>If you would like to learn more about indigenous culture please click <a style={{ 'color': 'white' }} href="https://www.indigenous.gov.au/">here</a></p>
						</div>
					</Card>
				</div>
			</div>

		</Router >
	)
}

ReactDOM.render(<App />, document.querySelector(".container"));