import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function WeatherCard() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState("Bhimavaram");
  const API_KEY = "4520a4515356cd2c078c89a4d45ce5a6";
  const API_ENDPOINT_URL = "https://api.openweathermap.org/data/2.5";
  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const id = decodedToken.id;
      const response = await axios.get(
        `http://localhost:3001/farmerHome/weather/${id}`
      );
      console.log(response.data);
      setLocation(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINT_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINT_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filteredData = data.list.filter((item) => {
          return item.dt_txt.includes("12:00:00");
        });
        setForecastData(filteredData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    if (location) {
      fetchWeatherData();
      fetchForecastData();
    }
  }, [location]);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <>
      <style>
        {`
  .body1234 {
    margin: 0;
    padding: 0;
    background-image: url('https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg?auto=compress&cs=tinysrgb&w=600');
    background-size: cover;
    background-position: center;
    height: 80vh;
    width : 1260px;
    font-family: Arial, sans-serif;
    color: white; 
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .bigcard {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    max-width: 400px;
    width: 100%;
  }

  .name1112 {
    height: 30px;
    width: 200px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 14px; 
    padding: 5px 10px;
    border: 2px solid #ccc;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  }

  .name1112:hover {
    border-color: #999;
  }

  .name1112:focus {
    border-color: #333;
    background-color: #fff;
    outline: none;
  }

  .temp1112 {
    font-size: 48px; 
    color:white;
  }

  .cityname1112 {
    font-size: 36px;
    color:white; 
  }

  .p1112 {
    font-size: 14px; 
    color:white;
  }

  .forecast {
    display: flex;
    gap: 20px;
    color: white;
    justify-content: center;
  }

  .day {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    width: 120px;
    color:white;
  }

  .day h2,
  .day h4 {
    margin: 5px 0; 
    color:white;
  }
  .weather-icon111 img{
    width:64px;
  }
  .weather-icon222 img{
    width:80px;s
  }

  `}
      </style>

      <div className="body1234">
        <div className="main">
          <div className="bigcard">
            <input
              type="text"
              className="name1112"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
            />
            {weatherData && (
              <>
                <h1 className="cityname1112">{weatherData.name}</h1>
                <h3 className="temp1112">{weatherData.main.temp}°C</h3>
                <div className="weather-icon111">
                  {weatherData.weather[0].main === "Clouds" && (
                    <img
                      className="img12"
                      src="https://cdn-icons-png.flaticon.com/128/3222/3222801.png"
                      alt="Cloudy"
                    />
                  )}
                  {weatherData.weather[0].main === "Clear" && (
                    <img
                      className="img12"
                      src="https://cdn-icons-png.flaticon.com/128/2698/2698194.png"
                      alt="Sunny"
                    />
                  )}
                  {weatherData.weather[0].main === "Rain" && (
                    <img
                      className="img12"
                      src="https://cdn-icons-png.flaticon.com/128/2864/2864448.png"
                      alt="Rainy"
                    />
                  )}
                </div>
                <p className="p1112">
                  <b>Humidity : {weatherData.main.humidity}% </b>
                </p>
                <p className="p1122">
                  <b>Wind : {weatherData.wind.speed} m/s </b>
                </p>
              </>
            )}
          </div>
          <div className="forecast">
            {forecastData &&
              forecastData.map((item, index) => (
                <div key={index} className="day">
                  <h2>
                    {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </h2>
                  <h4>{item.main.temp}°C</h4>
                  <div className="weather-icon222">
                    {item.weather[0].main === "Clouds" && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/3222/3222801.png"
                        alt="Cloudy"
                      />
                    )}
                    {item.weather[0].main === "Clear" && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2698/2698194.png"
                        alt="Sunny"
                      />
                    )}
                    {item.weather[0].main === "Rain" && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2864/2864448.png"
                        alt="Rainy"
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
