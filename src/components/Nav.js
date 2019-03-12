var React = require('react')
import Link from 'react-router'

const Nav = () => {
    return (
        <div className="nav">
            <h2>This is my nav component</h2>
            <Link path="users">
                <h3>Test</h3>
            </Link>
        </div>
    )
}

export default Nav;