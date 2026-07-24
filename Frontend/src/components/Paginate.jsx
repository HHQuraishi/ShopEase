import { useNavigate } from "react-router-dom";

function Paginate({ page, totalPages, keyword = "", category = "" }) {
  const navigate = useNavigate();

  // Page change karna

  const goToPage = (pageNum) => {
    const params = new URLSearchParams();

    params.set("page", pageNum);

    if (keyword) params.set("keyword", keyword);

    if (category) params.set("category", category);

    navigate(`/?${params.toString()}`);
  };

  // Sirf 1 page hai toh mat dikhao

  if (totalPages <= 1) return null;

  // Page numbers array banao — [1, 2, 3, ... totalPages]

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",

        gap: "8px",

        margin: "24px 0",
      }}
    >
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        style={{
          padding: "8px 14px",

          borderRadius: "6px",

          border: "1px solid #30363D",

          background: page === 1 ? "#0D1117" : "#1C2128",

          color: page === 1 ? "#30363D" : "#8B949E",

          cursor: page === 1 ? "not-allowed" : "pointer",
        }}
      >
        &larr;
      </button>
      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          style={{
            padding: "8px 14px",

            borderRadius: "6px",

            border: "1px solid #30363D",

            background: p === page ? "#38BDF8" : "#1C2128",

            color: p === page ? "#0D1117" : "#8B949E",

            fontWeight: p === page ? "bold" : "normal",

            cursor: "pointer",
          }}
        >
          {p}
        </button>
      ))}
      {/* Next button */}
       
      <button
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        style={{
          padding: "8px 14px",

          borderRadius: "6px",

          border: "1px solid #30363D",

          background: page === totalPages ? "#0D1117" : "#1C2128",

          color: page === totalPages ? "#30363D" : "#8B949E",

          cursor: page === totalPages ? "not-allowed" : "pointer",
        }}
      >
        &rarr;
      </button>
    </div>
  );
}

export default Paginate;
