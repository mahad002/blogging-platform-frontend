import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default NavBar;
