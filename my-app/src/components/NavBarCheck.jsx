import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './bootstrap.min.css';
import './navbar.css';

function Navbar() {
  const location = useLocation();

  // Define different sets of navbar elements based on routes
  const homeNavbar = (
    <>
      <Link to="/" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
      <Link to="/about" className={`nav-item nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
      <Link to="/contact" className={`nav-item nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
    </>
  );

  const UserPage = (
    <>
      <Link to="/home" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>submit</Link>
      <Link to="/home" className={`nav-item nav-link ${location.pathname === '/about' ? 'active' : ''}`}>Submit</Link>
      {/* Add elements specific to the about route */}
    </>
  );

  const contactNavbar = (
    <>
      <Link to="/" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
      <Link to="/about" className={`nav-item nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
      <Link to="/contact" className={`nav-item nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
      {/* Add elements specific to the contact route */}
    </>
  );

  // Render different navbar elements based on the current route
  let navbarElements;
  switch (location.pathname) {
    case '/':
      navbarElements = homeNavbar;
      break;
    case '/about':
      navbarElements = aboutNavbar;
      break;
    case '/contact':
      navbarElements = contactNavbar;
      break;
    default:
      navbarElements = homeNavbar;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
      <h2 href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <h1 className="m-0">Harvest Hub</h1>
      </h2>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          {navbarElements}
        </div>
        <button> Feedback<i className="fa fa-arrow-right ms-3"></i></button>
      </div>
    </nav>
  );
}

export default Navbar;
