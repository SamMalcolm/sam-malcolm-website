var React = require('react')
import { Link } from 'react-router-dom'
import '../styles/nav.scss'

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
        <div className="nav-link">{props.name}
            <div className="nav-link-underline" style={{ 'backgroundColor': props.highlight }}></div>
        </div>
    )
}

const Nav = (props) => {
    return (
        <nav>
            <Link to="/">
                <Wordmark highlight={props.highlight} />
            </Link>
            <div className="nav-links">
                <div className="hamburger">
                    <div className="grill"></div>
                    <div className="grill"></div>
                    <div className="grill"></div>
                </div>
                <Link to="/work">
                    <NavLink highlight={props.highlight} name="Work" />
                </Link>
                <Link to="/blog">
                    <NavLink highlight={props.highlight} name="Blog" />
                </Link>
                <Link to="/music">
                    <NavLink name="Music" />
                </Link>
                <Link to="/tutorials">
                    <NavLink name="Tutorials" />
                </Link>
                <Link to="/snooker">
                    <NavLink name="Snooker" />
                </Link>
                <Link to="/film">
                    <NavLink name="Film Criticism" />
                </Link>
                <Link to="/about">
                    <NavLink name="About" />
                </Link>
                <Link to="/contact">
                    <NavLink name="Contact" />
                </Link>
            </div>
        </nav>
    )
}

export default Nav;