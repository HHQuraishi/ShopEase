import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { loginUser } from "../services/api";

function LoginScreen() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data } = await loginUser(email, password);

      // Redux store update karo

      dispatch(setCredentials({ user: data.data, token: data.token }));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{ maxWidth: "400px", margin: "40px auto" }}
    >
      <h2 style={{ color: "#E6EDF3", marginBottom: "20px" }}>Login</h2>

      {error && (
        <p style={{ color: "#FF6B6B", marginBottom: "12px" }}>{error}</p>
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",

          background: "#1C2128",
          border: "1px solid #30363D",
          color: "white",
          borderRadius: "6px",
        }}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "16px",

          background: "#1C2128",
          border: "1px solid #30363D",
          color: "white",
          borderRadius: "6px",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          background: "#764ABC",

          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginScreen;
