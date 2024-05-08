// App.js
import React, { useEffect } from "react";
import Home from "./components/Home";
import LoginSignup from "./components/signup/LoginSignup";
import FarmerLogin from "./components/Farmerlogin/FarmerLogin";
import AdminLogin from "./components/adminLogin/AdminLogin";
import AdminHome from "./components/homePage/AdminHome";
import WeatherCard from "./components/weather/WeatherCard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./components/start";
import Farm from "./components/homePage/Farm";
import UserHomePage from "./components/homePage/UserHomePage";
import Adminweb from "./components/Adminweb/Adminweb.jsx";
import Ml from "./Ml";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/farmerLogin" element={<FarmerLogin />} />
        <Route path="/home" element={<Start />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/weather" element={<WeatherCard />} />
        <Route path="/farmerHome" element={<Farm />} />
        <Route path="/userHomePage" element={<UserHomePage />} />
        <Route path="/adminweb" element={<Adminweb />} />
        <Route path="/ml" element={<Ml />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
