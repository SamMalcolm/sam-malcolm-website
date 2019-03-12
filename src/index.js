import React from 'react';
import Router from 'react-router';
import ReactDOM from 'react-dom';
const Nav = require('./components/Nav.js');

function App() {
    return (
        <div className="appContainer">
            <Nav />
            <h1> This is my app</h1>
        </div>
    )
}

console.log(App);

ReactDOM.render(<App />, document.querySelector(".container"));