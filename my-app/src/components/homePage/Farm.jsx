import React, { useState } from 'react';
import WeatherCard from '../weather/WeatherCard';
import AddCropForm from '../weather/AddCropForm';
import Ml from '../../Ml';
import Mycrops from '../weather/Mycrops';
import Navbar from '../Navbar';
import Topbar from '../Topbar';
function Farm() {
  const [currentPage, setCurrentPage] = useState(null);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'upload':
        return <div><center><AddCropForm/></center></div>;
      case 'weather':
        return <div><WeatherCard/></div>;
      case 'disease':
        return <div><center><Ml /></center></div>;
      case 'crops':
        return <div><Mycrops/></div>;
      default:
        return <div>Welcome! Please select an option from the menu.</div>;
    }
  };

  return (
    <>
    <style>
          {`
           .Appp112 {
            font-family: Arial, sans-serif;
          }
          .container11112 {
            height: 80vh;
            display: flex;
          }
          
          .sidebar11112 {
            width: 200px;
            background-color: #f0f0f0;
            padding: 20px;
          }
          
          .sidebar11112 button {
            display: block;
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            background-color: #b6f755;
            border: none;
            cursor: pointer;
          }
          
          .sidebar11112 button:hover {
            background-color: #ccc;
          }
          
          .content11112 {
            flex: 1;
            padding: 20px;
            background-color: #fff;
            display: flex;
            justify-content: flex-start;
            
          }
          .sidebar11112 {
            width: 200px;
            background-color: #4e4f50;
            padding: 20px;
            
            display: flex;
            flex-direction: column; /* Ensure buttons stack vertically */
          }
          
          .sidebar11112 button {
            flex-grow: 1; /* Allow buttons to grow and occupy the available space */
            margin-bottom: 10px; /* Add margin between buttons */
            background-color: #f2fcfe;
            border: none;
            border-radius:10px;
            cursor: pointer;
            color: rgb(84, 79, 79);
            font-size: 16px;
          }
          
          .sidebar11112 button:hover {
            background-color: #ffffff;
            color: rgb(86, 84, 84);
          }
          
          
          `}
    </style>
    <Topbar />
    <Navbar />
    <div className="Appp112">
      {/* <nav className="navbar">
        <div className="profile">
          Profile
        </div>
        <div className="nav-buttons">
          <button onClick={() => handleNavigation('logout')}>Logout</button>
          <button onClick={() => handleNavigation('contact')}>Contact Us</button>
        </div>
      </nav> */}
      <div className="container11112">
        <div className="sidebar11112">
          <button onClick={() => handleNavigation('upload')}><strong>Sell Your Crop</strong></button><br />
          <button onClick={() => handleNavigation('weather')}><strong>Weather Forecast</strong></button><br />
          <button onClick={() => handleNavigation('disease')}><strong> Disease Prediction</strong></button><br />
          <button onClick={() => handleNavigation('crops')}><strong>My Crops</strong></button><br />
        </div>
        <div className="content11112">
          {renderContent()}
        </div>
      </div>
    </div></>
  );
}

export default Farm;