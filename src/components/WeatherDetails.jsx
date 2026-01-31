import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

const API_KEY = "a5cb900c402c40238d7111716263101";
const API_BASE = "https://api.weatherapi.com/v1/current.json";

const WeatherDetails = () => {
  const { cityName } = useParams();
  const location = useLocation();
  const [weatherData, setWeatherData] = useState(
    location.state?.weatherData ?? null
  );

  const { temperatureUnit } = useSettings();

  useEffect(() => {
    if (location.state?.weatherData) {
      setWeatherData(location.state.weatherData);
      return;
    }

    const fetchWeather = async () => {
      if (!cityName) return;
      try {
        const res = await axios.get(
          `${API_BASE}?key=${API_KEY}&q=${encodeURIComponent(cityName)}`
        );
        setWeatherData(res.data);
      } catch (err) {
        console.warn("Failed to fetch weather", err);
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [cityName, location.state?.weatherData]);

  if (!cityName && !location.state?.weatherData) {
    return (
      <div style={centerWrapper}>
        <h2>No city selected</h2>
        <Link to="/cities" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>Go to Cities</button>
        </Link>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div style={centerWrapper}>
        <h2>Loading weather...</h2>
      </div>
    );
  }

  const { location: loc, current } = weatherData;
  const temp =
    temperatureUnit === "fahrenheit" ? current.temp_f : current.temp_c;
  const unit = temperatureUnit === "fahrenheit" ? "°F" : "°C";
  const feelsLike =
    temperatureUnit === "fahrenheit"
      ? current.feelslike_f
      : current.feelslike_c;

  return (
    <div style={pageWrapper}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "10px" }}>{loc.name}</h1>
        <p style={{ color: "#666", marginBottom: "15px" }}>
          {loc.region}, {loc.country}
        </p>

        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          style={{ width: "120px", marginBottom: "10px" }}
        />

        <h2 style={{ margin: "5px 0" }}>
          {temp.toFixed(1)}
          {unit}
        </h2>

        <p style={{ color: "#555", marginBottom: "15px" }}>
          {current.condition.text}
        </p>

        <div style={infoGrid}>
          <div>
            <strong>Feels like</strong>
            <p>
              {feelsLike.toFixed(1)}
              {unit}
            </p>
          </div>
          <div>
            <strong>Humidity</strong>
            <p>{current.humidity}%</p>
          </div>
          <div>
            <strong>Wind</strong>
            <p>
              {current.wind_kph} km/h {current.wind_dir}
            </p>
          </div>
          <div>
            <strong>Updated</strong>
            <p>{current.last_updated}</p>
          </div>
        </div>

        <Link to="/cities" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>← Back to Cities</button>
        </Link>
      </div>
    </div>
  );
};



const pageWrapper = {
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  background: "linear-gradient(135deg, #e0f2ff, #f7fbff)",
  fontFamily: "Arial, sans-serif",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "14px",
  textAlign: "center",
  maxWidth: "420px",
  width: "100%",
  boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px",
  marginBottom: "20px",
};

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#0077ff",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: "0.95rem",
};

const centerWrapper = {
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial, sans-serif",
};

export default WeatherDetails;
