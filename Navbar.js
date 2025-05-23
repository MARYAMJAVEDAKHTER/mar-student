import React from "react";
import { Link } from 'react-router-dom';
import "../App.css";

const Navbar = () => {

  return (

      <header className="navbar">
      <nav>
        <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
         <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>

  );
};

export default Navbar;
