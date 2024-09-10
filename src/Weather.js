import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function Weather() {
  let [query, setQuery] = useState("");
  let [display, setDisplay] = useState(false);
  let [condition, setCondition] = useState({});

  function showWeather(response) {
    setDisplay(true);
    setCondition({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function submitSearch(event) {
    event.preventDefault();
    let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateSearch(event) {
    setQuery(event.target.value);
  }

  let form = (
    <div className="Weather">
      <h1>Weather App</h1>
      <form onSubmit={submitSearch}>
        <input
          type="search"
          placeholder="Type a city"
          onChange={updateSearch}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );

  let footer = (
    <div className="footer">
      <small>
        This project was coded by
        <a href="https://github.com/milimk" target="_blank" rel="noreferrer">
          MiliM
        </a>
        and is
        <a
          href="https://github.com/milimk/react-weather-app"
          target="_blank"
          rel="noreferrer"
        >
          open-sourced
        </a>
      </small>
    </div>
  );

  if (display) {
    return (
      <div className="Weather">
        {form}
        <h5>Current weather condition in {query}</h5>
        <ul>
          <li>Temperature: {Math.round(condition.temperature)}°C</li>
          <li>Description: {condition.description}</li>
          <li>Humidity: {condition.humidity}%</li>
          <li>Wind: {condition.wind}km/h</li>
          <li>
            <img src={condition.icon} alt={condition.description} />
          </li>
        </ul>
        {footer}
      </div>
    );
  } else {
    return (
      <div>
        {form}
        <br />
        {footer}
      </div>
    );
  }
}
