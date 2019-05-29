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
import Blog from './components/Blog';
import { BlogPage } from './components/BlogPage';
import Contact from './components/Contact';
import Appearances from './components/Appearances';
import Folio from './components/Folio';
import WorkPage from './components/WorkPage';
import Albums from './components/Albums';
import FilmPage from './components/FilmPage';
import SnookerPage from './components/SnookerPage'
const App = () => {
    const [highlightColour, setHighlightColour] = useState('');
    return (
        <Router>
            <div className="appContainer">
                <Background setHighlightColour={setHighlightColour} />
                <Nav highlight={highlightColour} />
                <Switch>
                    <Route exact path="/"></Route>
                    <Route exact path="/appearances">
                        <Container>
                            <Appearances highlight={highlightColour} />
                        </Container>
                    </Route>
                    <Route exact path="/snooker">
                        <div>
                            <FullWidthBanner src="/assets/ui_images/snooker2.jpg" caption="Photo: David Heath" title="Snooker &amp; Billiards" />
                            <Container>
                                <SnookerPage />
                            </Container>
                        </div>
                    </Route>
                    <Route exact path="/about">
                        <Container>
                            <About />
                        </Container>
                    </Route>
                    <Route exact path="/work">
                        <Folio />
                    </Route>
                    <Route exact path="/work/:work_id" render={(props) => {
                        let workid = props.location.pathname.replace('/work/', '');
                        return (
                            <WorkPage highlight={highlightColour} id={workid} />
                        )
                    }} />

                    <Route exact path="/blog/:blog_id" render={(props) => {
                        let blogid = props.location.pathname.replace('/blog/', '');
                        return (
                            <BlogPage id={blogid} />
                        )
                    }} />

                    <Route exact path="/contact">
                        <Container>
                            <Contact highlight={highlightColour} />
                        </Container>
                    </Route>
                    <Route exact path="/film">
                        <div>
                            <FullWidthBanner src="/assets/ui_images/film.jpg" title="Film Criticism" />
                            <Container>
                                <FilmPage highlight={highlightColour} />
                            </Container>
                        </div>
                    </Route>
                    <Route exact path="/tutorials">
                        <h2>Tutorials</h2>
                    </Route>
                    <Route exact path="/blog">
                        <Container>
                            <Blog />
                        </Container>
                    </Route>
                    <Route exact path="/music">
                        <Albums highlight={highlightColour} />
                    </Route>
                </Switch>
                <div className="cardContainer">
                    <Card top="50%">
                        <div className="ackImage">
                            <img src='./assets/ui_images/ack.png' />
                        </div>
                        <div className="ackText">
                            <h3>Acknowledgement Of Country</h3>
                            <p>I would like to acknowledge the traditional owners of the land on which I conduct the business of being a developer and designer. I would like to pay my respect to their elders past, present and future.</p>
                            <p>If you would like to learn more about indigenous culture please click <a href="#">here</a></p>
                        </div>
                    </Card>
                    <Card top="0">
                        <div className="ackImage">
                            <img src='./assets/ui_images/ack.png' />
                        </div>
                        <div className="ackText">
                            <h3>Accessibility Options</h3>
                            <p>I would like to acknowledge the traditional owners of the land on which I conduct the business of being a developer and designer. I would like to pay my respect to their elders past, present and future.</p>
                            <p>If you would like to learn more about indigenous culture please click <a href="#">here</a></p>
                        </div>
                    </Card>
                </div>
            </div>

        </Router>
    )
}

ReactDOM.render(<App />, document.querySelector(".container"));