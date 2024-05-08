// Navbar.js
import React,{ useEffect, useState } from 'react';
import './bootstrap.min.css'
import './navbar.css'
import { jwtDecode } from 'jwt-decode';
import {Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [username, setUsername] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [adminName, setadminName] = useState('');
  const [userType, setUserType] = useState('');
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userType = decodedToken.userType;
      setUserType(userType);
      if(userType==='customer'){
        setUsername(decodedToken.username);
      }
      else if(userType==='farmer'){
        setFarmerName(decodedToken.username);
      }
      else if(userType==='admin'){
        setadminName(decodedToken.username);
        console.log(decodedToken.username);
      }
      
    }
  }, [location.pathname]);
  const homeNavbar = (
    <>
      <Link to="/" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
      <Link to="/about" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>About</Link>
      <Link to="/contact" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>Contact</Link>
      <button> Feedback<i className="fa fa-arrow-right ms-3"></i></button>
    </>
  );

  const UserPage = (
    <>
      <p>Welcome, {username}!</p>
      {/* Add elements specific to the about route */}
    </>
  );

  const adminPage = (
    <>
    <h4>Welcome, {adminName}</h4>
      {/* Add elements specific to the contact route */}
    </>
  );
  //farmer page
  const farmerPage = (
    <>
    <h4>Welcome, {farmerName}</h4>
      {/* Add elements specific to the contact route */}
    </>
  );
  // Render different navbar elements based on the current route
  let navbarElements;
  switch (location.pathname) {
    case '/':
      navbarElements = homeNavbar;
      break;
    case '/userHomePage':
      navbarElements = UserPage;
      break;
    case '/adminweb':
      navbarElements = adminPage;
      break;
    case '/farmerHome':
        navbarElements = farmerPage;
      break;
    default:
      navbarElements = homeNavbar;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
      <h2 href="index.html" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
            <h1 class="m-0">Harvest Hub</h1>
        </h2>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
        {navbarElements}
        </div>
       
      </div>
    </nav>
  );
}

export default Navbar;
