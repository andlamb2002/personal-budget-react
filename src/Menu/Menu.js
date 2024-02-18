import React from 'react';
import { Link } from 'react-router-dom';


function Menu() {
  return (
    <nav>
            <ul>
                <li><Link to="./" aria-label="Home">Home</Link></li>
                <li><Link to="./about" aria-label="About">About</Link></li>
                <li><Link to="./login" aria-label="Login">Login</Link></li>
                <li><Link to="https://google.com" aria-label="Google">Google</Link></li>
            </ul>
        </nav>
  );
}

export default Menu;
