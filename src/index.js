import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';

import './styles/_var.scss';
import './styles/style.scss';
import './styles/about.scss';
import './styles/card.scss';
import './styles/backgrounds.scss';
import './styles/blog.scss';
import './styles/appearances.scss';
import './styles/bio.scss';
import './styles/work.scss';
import Background from './components/Background';
import About from './components/About.js';
import Card from './components/Card.js';
import Container from './components/Container.js';
import FullWidthBanner from './components/FullWidthBanner';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Appearances from './components/Appearances';
import Folio from './components/Folio';

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
                            <FullWidthBanner src="/assets/ui_images/snooker.jpg" title="Snooker &amp; Billiards" />
                            <Container>
                                <h1>Results</h1>
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
                    <Route exact path="/work/:work_id">
                        <h1>Test</h1>
                    </Route>
                    <Route exact path="/contact">
                        <Container>
                            <Contact />
                        </Container>
                    </Route>
                    <Route exact path="/film">
                        <h2>Film criticism</h2>
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
                        <div>
                            <FullWidthBanner backgroundPosition="top center" src="/assets/ui_images/music.jpg" title="Music" />
                            <Container>
                                <h1>Coming Soon: Ultra Violet <i>(2019)</i></h1>
                                <p>Ultra Violet is a alternative rock album. Taking inspiration from the likes of Primus, Jack White and Flume it offers a unique yet memorable combination of progressive funk rhythms, contemporary electronic sounds and classic blues energy and lyrics.</p>
                                <div style={{ "width": "80%", "margin": "auto", "margin-top": "15px", "margin-bottom": "15px", "height": "2px", "background": "white" }}></div>
                                <h1>Cover: All The Good Girls Go To Hell <i>(2019)</i></h1>
                                <p>This is my cover of the Billie Eilish song <i>All The Good Girls Go To Hell.</i> After listening to this song initially I really liked the bass line and saw great potential for an energitic rock version of the tune.</p>
                                <div className="videoContainer">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/s_IwrqvM618" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                                <div style={{ "width": "80%", "margin": "auto", "margin-top": "15px", "margin-bottom": "15px", "height": "2px", "background": "white" }}></div>
                                <h1>Thirty Five Millimeter <i>(2018)</i></h1>
                                <p>Thirty Five Millimetere is my first publicaly released record. It was entirely written performed and mastered by me. I decided to try and make a record of cinematic, ambient and experimental works. Mixing orchestral and electronic instrumentation I think i produced something failry interesting.</p>
                                <iframe src="https://open.spotify.com/embed/album/6N9Nmb25DGkh6szFdJ4jcK" width="100%" height="267" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                            </Container>
                        </div>
                    </Route>
                </Switch>
                <div className="cardContainer">
                    <Card>
                        <div className="ackImage">
                            <img src='./assets/ui_images/ack.png' />
                        </div>
                        <div className="ackText">
                            <h3>Acknowledgement Of Country</h3>
                            <p>I would like to acknowledge the traditional owners of the land on which I conduct the business of being a developer and designer. I would like to pay my respect to their elders past, present and future.</p>
                            <p>If you would like to learn more about indigenous culture please click <a href="#">here</a></p>
                        </div>
                    </Card>
                    <Card>
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