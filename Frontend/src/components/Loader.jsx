function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      {/* CSS spinner — keyframes CSS file mein add karo */}

      <div
        style={{
          width: "48px",

          height: "48px",

          border: "4px solid #30363D",

          borderTop: "4px solid #38BDF8",

          borderRadius: "50%",

          animation: "spin 0.8s linear infinite",

          margin: "0 auto",
        }}
      />

      <p style={{ color: "#8B949E", marginTop: "12px" }}>Loading...</p>
    </div>
  );
}

export default Loader;
