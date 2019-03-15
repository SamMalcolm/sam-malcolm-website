import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import './styles/_var.scss'
import './styles/style.scss'
import Background from './components/Background';

const fetchBackgrounds = () => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                "src": "/public/assets/backgrounds/1.jpg",
                "highlight": "#FF0000"
            },
            {
                "src": "/public/assets/backgrounds/2.jpg",
                "highlight": "#00FF00"
            },
            {
                "src": "/public/assets/backgrounds/3.jpg",
                "highlight": "#0000FF"
            },
        ])
    })
}

const App = () => {

    const [highlightColour, setHighlightColour] = useState('#000054');
    const [activeBackground, setActiveBackground] = useState('/public/assets/backgrounds/1.jpg');
    const [backgrounds, setBackgrounds] = useState({});
    // useEffect(() => {
    // fetchBackgrounds().then((response) => {
    //     setBackgrounds(response);
    //     let counter = 0;
    //     const interval = setInterval(() => {
    //         console.log("Timer: " + counter);
    //         setActiveBackground(backgrounds[counter].src);
    //         setHighlightColour(backgrounds[counter].highlight);
    //         counter++;
    //         if (counter == backgrounds.length + 1) {
    //             counter = 0;
    //         }
    //     }, 3000);
    //     clearInterval(interval);
    // });
    // useEffect(() => {
    //     let path = window.location.pathname;
    //     document.title = "Sam Malcolm Media | " + path;
    // })
    return (
        <Router>
            <div className="appContainer">
                <Nav highlight={highlightColour} />
                <h1> This is my app</h1>
                <Switch>
                    <Route exact path="/snooker">
                        <h2>Snooker &amp; Billiards Results</h2>
                    </Route>
                    <Route exact path="/about">
                        <h2>About Me</h2>
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
                </Switch>
            </div>

        </Router>
    )
}

ReactDOM.render(<App />, document.querySelector(".container"));