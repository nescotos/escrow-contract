import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render(){
        return (
            <nav className="navbar is-dark is-fixed-top">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://ethereum.org/">
                        <img src="https://i1.wp.com/boxmining.com/wp-content/uploads/2017/03/ETHEREUM_LOGO.png?ssl=1" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                    </a>
                </div>
                    <div id="navbarExampleTransparentExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="/" className="navbar-item">Home</Link>
                            <Link to="/contract" className="navbar-item">Create Contract</Link>
                        </div>
                    </div>
            </nav>
        )
    }
}

export default NavBar;