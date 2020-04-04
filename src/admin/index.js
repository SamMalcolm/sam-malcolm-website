import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CRUDAbout from './components/CRUDAbout';
import CRUDBlog from './components/CRUDBlog';
import CRUDWorks from './components/CRUDWorks';
import CRUDPlaylists from './components/CRUDPlaylists';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/admin.scss';

const Admin = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/admin">
					<div className="adminMenu">
						<h1>SAM MALCOLM MEDIA ADMIN PANEL</h1>
						<div className="adminMenu">
							<Link className="btn btn-secondary" to="/admin/manage/about">Mange About Section</Link>
							<Link className="btn btn-secondary" to="/admin/manage/blog">Mange Blog Section</Link>
							<Link className="btn btn-secondary" to="/admin/manage/works">Mange Works Section</Link>
							<Link className="btn btn-secondary" to="/admin/manage/playlists">Mange Playlists Section</Link>
						</div>
					</div>
				</Route>
				<Route exact path="/admin/manage/about">
					<CRUDAbout />
				</Route>
				<Route exact path="/admin/manage/blog">
					<CRUDBlog />
				</Route>
				<Route exact path="/admin/manage/works">
					<CRUDWorks />
				</Route>
				<Route exact path="/admin/manage/playlists">
					<CRUDPlaylists />
				</Route>
			</Switch>

		</Router>
	)
}

ReactDOM.render(<Admin />, document.querySelector(".adminContainer"));