var React = require('react')
import { Link } from 'react-router-dom'
import '../styles/nav.scss'

const Wordmark = () => {
    return (
        <div className="wordmark">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 365 55.4" style={{ "enable-background": "new 0 0 365 55.4" }} space="preserve">
                <style type="text/css">
                    .st0{`fill: rgba(0,0,0,0);stroke:#FFF;`}
                    .st1{`font - family: 'montserratextrabold';`}
                    .st2{`font - size: 36.7136px; fill:white;`}
                    .st3{`fill: white;`}
                </style>
                <g>
                    <polygon className="st0" points="4.5,39 4.5,16.5 24,5.2 43.5,16.5 43.5,39 24,50.2 	" />
                    <path className="st3" d="M24,10.4l15,8.7v17.3L24,45L9,36.4V19.1L24,10.4 M24,0L0,13.9v27.7l24,13.9l24-13.9V13.9L24,0L24,0z" />
                </g>
                <text transform="matrix(1 0 0 1 65.7876 40.5863)" className="st1 st2">SAM MALCOLM</text>
            </svg>
        </div>
    )
}

const NavLink = (props) => {
    return (
        <div className="nav-link">{props.name}
            <div className="nav-link-underline"></div>
        </div>
    )
}

const Nav = () => {
    return (
        <nav>
            <Link to="/">
                <Wordmark />
            </Link>
            <div className="nav-links">
                <Link to="/work">
                    <NavLink name="Work" />
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