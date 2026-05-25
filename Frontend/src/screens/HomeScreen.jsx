import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Kuch galat ho gaya!");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (loading)
    return <p style={{ color: "#61DAFB", textAlign: "center" }}>Loading...</p>;
  if (error)
    return <p style={{ color: "#FF6B6B", textAlign: "center" }}>{error}</p>;
  return (
    <div>
      <h1 style={{ color: "#E6EDF3", marginBottom: "24px" }}>
        Latest Products
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
