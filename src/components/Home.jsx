function Home() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #e0f2ff, #f7fbff)",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "15px",
          color: "#003366",
        }}
      >
        🌤 Weather Dashboard App
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          maxWidth: "500px",
          color: "#333",
          marginBottom: "10px",
        }}
      >
        Welcome! This app shows real-time weather information for different
        cities around the world.
      </p>

      <p
        style={{
          fontSize: "1rem",
          color: "#555",
        }}
      >
        Use the menu above to explore Cities, check Weather Details, or update
        your Settings.
      </p>
    </div>
  );
}

export default Home;
