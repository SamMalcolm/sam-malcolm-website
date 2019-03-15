import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';

import './styles/_var.scss'
import './styles/style.scss'
import './styles/about.scss';
import './styles/acknowledgement.scss';
import './styles/backgrounds.scss';

import Background from './components/Background';
import About from './components/About.js';
import AcknowledgementOfCountry from './components/AcknowledgementOfCountry.js';


const App = () => {

    const [highlightColour, setHighlightColour] = useState('#000054');

    return (
        <Router>
            <div className="appContainer">
                <Background />
                <Nav highlight={highlightColour} />
                <Switch>
                    <Route exact path="/snooker">
                        <h2>Snooker &amp; Billiards Results</h2>
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route exact path="/work">
                        <h2>Works</h2>
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
                        <h2>Music</h2>
                    </Route>
                </Switch>
                <AcknowledgementOfCountry />
            </div>

        </Router>
    )
}

ReactDOM.render(<App />, document.querySelector(".container"));