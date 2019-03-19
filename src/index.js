import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';

import './styles/_var.scss'
import './styles/style.scss'
import './styles/about.scss';
import './styles/card.scss';
import './styles/backgrounds.scss';

import Background from './components/Background';
import About from './components/About.js';
import Card from './components/Card.js';
import Container from './components/Container.js';
import FullWidthBanner from './components/FullWidthBanner';
import Albums from './components/Albums';
import Folio from './components/Folio';
import backgroundSlider from './components/backgroundSlider'


const App = () => {

    const [highlightColour, setHighlightColour] = useState('#000054');

    useEffect(() => {
        backgroundSlider();
    })

    return (
        <Router>
            <div className="appContainer">
                <Background />
                <Nav highlight={highlightColour} />
                <Switch>
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
                    <Route exact path="/contact">
                        <h2>Contact Me</h2>
                    </Route>
                    <Route exact path="/film">
                        <h2>Film criticism</h2>
                    </Route>
                    <Route exact path="/tutorials">
                        <h2>Tutorials</h2>
                    </Route>
                    <Route exact path="/blog">
                        <h2>blog</h2>
                    </Route>
                    <Route exact path="/music">
                        <Albums />
                    </Route>
                </Switch>
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
            </div>

        </Router>
    )
}

ReactDOM.render(<App />, document.querySelector(".container"));