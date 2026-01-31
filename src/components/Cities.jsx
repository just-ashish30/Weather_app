import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CITY_NAMES } from "../cities";
import { useSettings } from "../context/SettingsContext";

// Ideally, move this to an environment variable (.env)
const API_KEY = "a5cb900c402c40238d7111716263101";
const API_BASE = "https://api.weatherapi.com/v1/current.json";

const Cities = () => {
  const [weatherList, setWeatherList] = useState([]);
  const { temperatureUnit } = useSettings();

  useEffect(() => {
    const fetchCities = async () => {
      const results = [];
      for (let i = 0; i < CITY_NAMES.length; i++) {
        try {
          const res = await axios.get(
            `${API_BASE}?key=${API_KEY}&q=${encodeURIComponent(CITY_NAMES[i])}`
          );
          results.push(res.data);
        } catch (err) {
          console.warn(`Failed to fetch ${CITY_NAMES[i]}`, err);
        }
      }
      setWeatherList(results);
    };
    fetchCities();
  }, []);

  const temp = (data) =>
    temperatureUnit === "fahrenheit"
      ? data.current.temp_f
      : data.current.temp_c;

  const unit = temperatureUnit === "fahrenheit" ? "°F" : "°C";

  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#f8f9fa", // Light grey background for the page
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1
          style={{
            color: "#333",
            fontWeight: "800",
            fontSize: "2.5rem",
            marginBottom: "10px",
            letterSpacing: "-0.5px",
          }}
        >
          Weather Dashboard
        </h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>
          Current conditions in your favorite cities
        </p>
      </div>

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive grid
          gap: "40px",
        }}
      >
        {weatherList.map((data) => (
          <div
            key={data.location.name}
            className="weather-card" // Used for hover selector in <style>
            style={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {/* Header Gradient */}
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                height: "120px",
                position: "relative",
              }}
            >
                {/* Optional: Add a subtle overlay or pattern here if desired */}
            </div>

            {/* Floating Icon Wrapper */}
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: "10px",
                position: "absolute",
                top: "70px", // Half inside header, half outside
                left: "50%",
                transform: "translateX(-50%)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <img
                src={`https:${data.current.condition.icon}`}
                alt={data.current.condition.text}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            {/* Content Body */}
            <div
              style={{
                padding: "60px 25px 30px", // Top padding accounts for floating icon
                textAlign: "center",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  margin: "0 0 5px",
                  fontSize: "1.5rem",
                  color: "#2d3436",
                  fontWeight: "700",
                }}
              >
                {data.location.name}
              </h3>

              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  backgroundColor: "#f1f3f5",
                  color: "#636e72",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "20px",
                }}
              >
                {data.current.condition.text}
              </span>

              <div
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "800",
                  color: "#2d3436",
                  lineHeight: "1",
                  marginBottom: "25px",
                  fontVariantNumeric: "tabular-nums", // Prevents numbers from jumping
                }}
              >
                {Math.round(temp(data))}
                <span
                  style={{
                    fontSize: "1.5rem",
                    verticalAlign: "top",
                    color: "#b2bec3",
                    marginLeft: "4px",
                  }}
                >
                  {unit}
                </span>
              </div>

              <Link
                to={`/weather-details/${data.location.name}`}
                state={{ weatherData: data }}
                style={{ width: "100%", marginTop: "auto", textDecoration: "none" }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "14px",
                    border: "none",
                    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(118, 75, 162, 0.3)",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                  onMouseOut={(e) => (e.target.style.opacity = "1")}
                >
                  View Forecast
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Global styles for hover effects and responsiveness */}
      <style>
        {`
          .weather-card:hover {
            transform: translateY(-10px) !important;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
          }
          
          /* Smooth out the fonts */
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}
      </style>
    </div>
  );
};

export default Cities;