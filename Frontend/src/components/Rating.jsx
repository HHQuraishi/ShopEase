function Rating({ value = 0, text = "", color = "#FFD93D" }) {
  const getStar = (starNumber) => {
    if (value >= starNumber) return "⭐"; // Full star
    if (value >= starNumber - 0.5) return "½"; // Half star
    return "n"; // Empty star
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: color, fontSize: "16px" }}>
          {getStar(star)}
        </span>
      ))}
      {text && (
        <span style={{ color: "#8B949E", fontSize: "13px", marginLeft: "6px" }}>
          {text}
        </span>
      )}
    </div>
  );
}

export default Rating;
