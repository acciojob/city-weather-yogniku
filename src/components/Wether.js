

import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [query, setQuery] = useState('');  
  const [weather, setWeather] = useState(null);  
  const [error, setError] = useState(''); 

  const API_KEY = '9cdaadcc6ba6b6207e8b9f83bf525d2e';  
  

  useEffect(() => {

    if (query) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          console.log(data)
          if (data.cod === 200) {
            setWeather(data);
            console.log(weather)
            setError('');
          } else {
            setWeather(null);
            setError('City not found');
          }
        } catch (error) {
          setWeather(null);
          setError('Failed to fetch weather data');
        }
      };

      fetchWeather();
    }
  }, [query, API_KEY]);  

  return (
    <div className="app">
      <input
        type="text"
        className="search"
        placeholder="Enter city name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}  
      />
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <p>{weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;


