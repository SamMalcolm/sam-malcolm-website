import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CRUDAbout from './components/CRUDAbout';
import CRUDBlog from './components/CRUDBlog';

const Admin = () => {
	return (
		<Router>
			<div className="adminContainer">
				<h1>SAM MALCOLM MEDIA ADMIN PANEL</h1>
				<div className="adminMenu">
					<Link to="/admin/manage/about">Mange About Section</Link>
					<Link to="/admin/manage/blog">Mange Blog Section</Link>
				</div>
				<Switch>
					<Route exact path="/admin/manage/about">
						<CRUDAbout />
					</Route>
					<Route exact path="/admin/manage/blog">
						<CRUDBlog />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

ReactDOM.render(<Admin />, document.querySelector(".adminContainer"));