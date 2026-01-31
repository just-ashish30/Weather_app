import { useSettings } from "../context/SettingsContext";
import { CITY_NAMES } from "../cities";

function Settings() {
  const {
    temperatureUnit,
    preferredCity,
    setTemperatureUnit,
    setPreferredCity,
  } = useSettings();

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #f7fbff, #e0f2ff)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#003366",
          }}
        >
          ⚙️ Settings
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "0.95rem",
            marginBottom: "25px",
          }}
        >
          Your preferences are saved in your browser.
        </p>

        {/* Temperature Unit */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="temp-unit"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
            }}
          >
            Temperature Unit
          </label>

          <select
            id="temp-unit"
            value={temperatureUnit}
            onChange={(e) => setTemperatureUnit(e.target.value)}
            style={selectStyle}
          >
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
          </select>
        </div>

        {/* Preferred City */}
        <div>
          <label
            htmlFor="preferred-city"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
            }}
          >
            Preferred City
          </label>

          <select
            id="preferred-city"
            value={preferredCity}
            onChange={(e) => setPreferredCity(e.target.value)}
            style={selectStyle}
          >
            <option value="">None</option>
            {CITY_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "0.95rem",
  outline: "none",
};

export default Settings;
