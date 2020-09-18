import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';

function Header() {
    return (

        <header class="header-login-signup">

            <div class="header-limiter">

                <h1><a href="/">Coding<span>Cafe</span></a></h1>

                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/">About App</Link>
                    <Link to="/">Contact Us</Link>
                </nav>

                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </ul>

            </div>

        </header>
    );
}

export default Header;