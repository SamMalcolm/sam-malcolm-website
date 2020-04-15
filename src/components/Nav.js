import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/nav.scss'

function getSize() {
	return {
		innerHeight: window.innerHeight,
		innerWidth: window.innerWidth,
		outerHeight: window.outerHeight,
		outerWidth: window.outerWidth,
	};
}

function useWindowSize(setExpanded) {
	let [windowSize, setWindowSize] = useState(getSize());

	function handleResize() {
		setWindowSize(getSize());
	}

	useEffect(() => {

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return windowSize;
}

const Wordmark = (props) => {
	return (
		<div className="wordmark">
			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				viewBox="0 0 365 55.4" style={{ "enable-background": "new 0 0 365 55.4" }} space="preserve">
				<g>
					<polygon className="st0" points="4.5,39 4.5,16.5 24,5.2 43.5,16.5 43.5,39 24,50.2 	" />
					<path style={{ 'fill': props.highlight }} className="st3" d="M24,10.4l15,8.7v17.3L24,45L9,36.4V19.1L24,10.4 M24,0L0,13.9v27.7l24,13.9l24-13.9V13.9L24,0L24,0z" />
				</g>
				<text transform="matrix(1 0 0 1 65.7876 40.5863)" className="st1 st2">SAM MALCOLM</text>
			</svg>
		</div>
	)
}

const NavLink = (props) => {
	return (
		<Link tabindex='0' onClick={props.showMenu} to={props.path}>
			<div className="nav-link">{props.name}
				<div className="nav-link-underline" style={{ 'backgroundColor': props.highlight }}></div>
			</div>
		</Link>
	)
}

const Nav = (props) => {
	const [expanded, setExpanded] = useState(false);
	let windowSize = useWindowSize(setExpanded);

	useEffect(() => {
		if (windowSize.innerWidth > 1040) {
			setExpanded(true);
		} else {
			setExpanded(false);
		}
	}, [windowSize.innerWidth])

	const showMenu = () => {
		if (windowSize.innerWidth < 1041) {
			if (expanded) {
				setExpanded(false);
			} else {
				setExpanded(true);
			}
		}
	}

	return (
		<nav style={{ "backgroundColor": 'black' }}>
			<Link to="/">
				<Wordmark highlight={props.highlight} />
			</Link>
			<div className={(expanded) ? 'hamburger selected' : 'hamburger'} onClick={showMenu}>
				<div className="grill"></div>
				<div className="grill"></div>
				<div className="grill"></div>
			</div>
			<div className="nav-links" style={{ 'display': (expanded) ? 'block' : 'none' }}>
				<NavLink highlight={props.highlight} name="Work" path="/work" showMenu={showMenu} />
				<NavLink highlight={props.highlight} name="Blog" path="/blog" showMenu={showMenu} />
				<NavLink highlight={props.highlight} name="Music" path="/music" showMenu={showMenu} />
				<NavLink highlight={props.highlight} name="Tutorials" path="/tutorials" showMenu={showMenu} />
				<NavLink highlight={props.highlight} name="Snooker" path="/snooker" showMenu={showMenu} />
				<NavLink highlight={props.highlight} name="Film" path="/film" showMenu={showMenu} />
				<NavLink highlight={props.highlight} name="About + Contact" path="/about" showMenu={showMenu} />
				{/* <NavLink highlight={props.highlight} name="Live" path="/appearances" showMenu={showMenu} /> */}
				{/* <NavLink highlight={props.highlight} name="Contact" path="/contact" showMenu={showMenu} /> */}
			</div>
		</nav>
	)
}

export default Nav;