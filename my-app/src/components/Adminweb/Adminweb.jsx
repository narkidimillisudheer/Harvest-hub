import React, { useState } from 'react';
import AdminHome from '../homePage/AdminHome';
import AdminVerified from "./AdminVerified";
import Navbar from '../Navbar';
import Topbar from '../Topbar';
function Adminweb() {
  const [currentPage, setCurrentPage] = useState(null);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renContent = () => {
    switch (currentPage) {
      case 'Yet To Verify':
        return <div><AdminHome /> </div>;
      case 'Verified Farmers':
        return <div><AdminVerified/></div>;
      default:
        return <div><AdminHome /></div>;
    }
  };

  return (
    <>
    <style>
        {`
             .Appp13 {
                font-family: Arial, sans-serif;
              }
              
              .container11113 {
                height: 100vh;
                display: flex;
              }
              
              .sidebar11113 {
                width: 250px;
                background-color: #4caf50; /* Greenery color */
                padding: 20px;
                display: flex;
                flex-direction: column;
              }
              
              .sidebar11113 button {
                flex-grow: 1;
                margin-bottom: 10px;
                padding: 12px 20px; /* Adjusted padding for better button size */
                background-color: #f2fcfe;
                border: none;
                cursor: pointer;
                color: #545353;
                font-weight: bold;
                text-transform: uppercase;
                transition: background-color 0.3s ease;
              }
              
              .sidebar11113 button:hover {
                background-color: #ffffff;
                color: #565454;
              }
              
              
              .content11113 {
                flex: 1;
                padding: 20px;
                background-color: #f9f9f9; /* Light grey */
                display: flex;
                justify-content: flex-start;
              }
              
              
              
        `}
    </style>
    <Topbar />
    <Navbar/>
    <div className="Appp13">
      {/* <nav className="navbar">
        <div className="profile">
          Profile
        </div>
        <div className="nav-buttons">
          <button onClick={() => handleNavigation('logout')}>Logout</button>
          <button onClick={() => handleNavigation('contact')}>Contact Us</button>
        </div>
      </nav> */}
      <div className="container11113">
        <div className="sidebar11113">
          <button onClick={() => handleNavigation('Yet To Verify')}><strong>Yet To Verify</strong></button><br />
          <button onClick={() => handleNavigation('Verified Farmers')}><strong>Verified Farmers</strong></button><br />
          
        </div>
        <div className="content11113">
          {renContent()}
        </div>
      </div>
    </div></>
  );
}

export default Adminweb;