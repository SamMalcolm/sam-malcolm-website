import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import './styles/_var.scss'
import './styles/style.scss'
function App() {

    const { highlightColour, setHighlightColour } = useState('#000054');

    return (
        <Router>
            <div className="appContainer">
                <Nav />
                <h1> This is my app</h1>
                <Switch>
                    <Route exact path="/users">
                        <h2>Users route</h2>
                    </Route>
                </Switch>
            </div>

        </Router>
    )
}

console.log(App);

ReactDOM.render(<App />, document.querySelector(".container"));