import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";

import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectTotalPages,
} from "../store/productSlice";

import ProductCard from "../components/ProductCard";

import Paginate from "../components/Paginate";

import Loader from "../components/Loader";

import Message from "../components/Message";

// Categories list

const CATEGORIES = [
  "All",
  "Footwear",
  "Clothing",
  "Electronics",
  "Books",
  "Bags",
  "Other",
];

function HomeScreen() {
  const dispatch = useDispatch();

  // URL se keyword, category aur page lo

  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  const category = searchParams.get("category") || "";

  const page = Number(searchParams.get("page")) || 1;

  // Redux store se state

  const products = useSelector(selectProducts);

  const loading = useSelector(selectProductsLoading);

  const error = useSelector(selectProductsError);

  const totalPages = useSelector(selectTotalPages);

  // Jab bhi keyword, category ya page badle — products fetch karo

  useEffect(() => {
    dispatch(fetchProducts({ keyword, page, category }));
  }, [dispatch, keyword, page, category]);

  // Category filter click handler

  const categoryHandler = (cat) => {
    const params = {};

    if (cat !== "All") params.category = cat;

    if (keyword) params.keyword = keyword;

    params.page = 1; // Category badli toh page 1 se shuru

    setSearchParams(params);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      {/* nn Category Filter nnnnnnnnnnnnnnnnnnnnnnnnnnnn */}

      <div
        style={{
          display: "flex",
          gap: "8px",

          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => categoryHandler(cat)}
            style={{
              padding: "6px 16px",

              borderRadius: "20px",

              border: "1px solid #30363D",

              cursor: "pointer",

              fontWeight:
                category === cat || (cat === "All" && !category)
                  ? "bold"
                  : "normal",

              background:
                category === cat || (cat === "All" && !category)
                  ? "#38BDF8"
                  : "#1C2128",

              color:
                category === cat || (cat === "All" && !category)
                  ? "#0D1117"
                  : "#8B949E",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* nn Search Result Heading nnnnnnnnnnnnnnnnnnn */}

      {keyword && (
        <h2 style={{ color: "#E6EDF3", marginBottom: "16px" }}>
          '{keyword}' ke results
        </h2>
      )}


      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : products.length === 0 ? (
        <Message type="info">Koi product nahi mila!</Message>
      ) : (
        <>
          {/* Products Grid */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",

              gap: "20px",

              marginBottom: "32px",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}

          {totalPages > 1 && (
            <Paginate
              page={page}
              totalPages={totalPages}
              keyword={keyword}
              category={category}
            />
          )}
        </>
      )}
    </div>
  );
}

export default HomeScreen;
