function Message({ type = "info", children }) {
  const styles = {
    error: {
      background: "#2D1515",
      color: "#FF6B6B",
      border: "1px solid #FF6B6B",
    },

    success: {
      background: "#0A2818",
      color: "#56CF8A",
      border: "1px solid #56CF8A",
    },

    info: {
      background: "#0D2137",
      color: "#79C0FF",
      border: "1px solid #388BFD",
    },
  };

  return (
    <div
      style={{
        ...styles[type],

        padding: "12px 16px",

        borderRadius: "8px",

        margin: "12px 0",
      }}
    >
      {children}
    </div>
  );
}

export default Message;
