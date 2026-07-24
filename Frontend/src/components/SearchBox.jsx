import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword.trim()}&page=1`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Products dhundho..."
        style={{
          padding: "8px 14px",
          background: "#1C2128",
          border: "1px solid #30363D",
          borderRadius: "6px",
          color: "white",
          width: "220px",
          outline: "none",
        }}
      />

      <button
        type="submit"
        style={{
          background: "#38BDF8",
          color: "#0D1117",
          border: "none",
          borderRadius: "6px",
          padding: "8px 16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        &#x1F50D;
      </button>
    </form>
  );
}

export default SearchBox;
