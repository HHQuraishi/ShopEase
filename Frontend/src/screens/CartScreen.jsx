import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
} from "../store/cartSlice";

// Auth slice se login check

import { selectIsLoggedIn } from "../store/authSlice";

function CartScreen() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Redux store se cart data lo

  const cartItems = useSelector(selectCartItems);

  const totalItems = useSelector(selectTotalItems);

  const totalPrice = useSelector(selectTotalPrice);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Checkout handler

  const checkoutHandler = () => {
    if (isLoggedIn) {
      navigate("/checkout"); // Chapter 10 mein banayenge
    } else {
      navigate("/login"); // Login karo pehle
    }
  };

  // nn CART KHAALI HAI nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <p style={{ fontSize: "60px", marginBottom: "16px" }}>n</p>

        <h2 style={{ color: "#E6EDF3", marginBottom: "8px" }}>
          Aapka Cart Khaali Hai
        </h2>

        <p style={{ color: "#8B949E", marginBottom: "24px" }}>
          Koi product abhi cart mein nahi hai
        </p>

        <Link
          to="/"
          style={{
            background: "#38BDF8",
            color: "#0D1117",

            padding: "12px 28px",
            borderRadius: "8px",

            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Shopping Karo
        </Link>
      </div>
    );
  }

  // nn CART MEIN ITEMS HAIN nnnnnnnnnnnnnnnnnnnnnnnnnnnn

  // Tax aur shipping calculate karo

  const taxPrice = totalPrice * 0.05; // 5% tax

  const shippingPrice = totalPrice > 2000 ? 0 : 150; // 2000+ free shipping;

  const grandTotal = totalPrice + taxPrice + shippingPrice;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
      <h1 style={{ color: "#E6EDF3", marginBottom: "24px" }}>
        Shopping Cart ({totalItems} items)
      </h1>

      {/* Two column layout */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
        }}
      >
        {/* nn LEFT: Cart Items nnnnnnnnnnnnnnnnnnnnnnn */}

        <div>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                background: "#161B22",
                border: "1px solid #30363D",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "12px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <div style={{ flex: 1 }}>
                <Link
                  to={`/product/${item._id}`}
                  style={{
                    color: "#E6EDF3",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Link>
                <p style={{ color: "#56CF8A", marginTop: "4px" }}>
                  Rs. {item.price?.toLocaleString()}
                </p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item._id,
                        quantity: item.quantity - 1,
                      }),
                    )
                  }
                  style={{
                    background: "#1C2128",
                    color: "white",

                    border: "1px solid #30363D",
                    borderRadius: "4px",

                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>

                <span
                  style={{
                    color: "white",
                    minWidth: "24px",

                    textAlign: "center",
                  }}
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item._id,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                  style={{
                    background: "#1C2128",
                    color: "white",

                    border: "1px solid #30363D",
                    borderRadius: "4px",

                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              {/* Item Total */}
              <p
                style={{
                  color: "#56CF8A",
                  fontWeight: "bold",

                  minWidth: "80px",
                  textAlign: "right",
                }}
              >
                Rs. {(item.price * item.quantity).toLocaleString()}
              </p>
              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeItem(item._id))}
                style={{
                  background: "none",
                  border: "none",

                  color: "#FF6B6B",
                  cursor: "pointer",

                  fontSize: "20px",
                  padding: "4px",
                }}
              >
                5
              </button>
            </div>
          ))}
        </div>

        {/* nn RIGHT: Order Summary nnnnnnnnnnnnnnnnnnn */}

        <div
          style={{
            background: "#161B22",
            border: "1px solid #30363D",

            borderRadius: "10px",
            padding: "20px",
            height: "fit-content",
          }}
        >
          <h3 style={{ color: "#E6EDF3", marginBottom: "16px" }}>
            Order Summary
          </h3>
          {/* Price rows */}
          {[
            ["Items Total", totalPrice],

            ["Tax (5%)", taxPrice],

            ["Shipping", shippingPrice],
          ].map(([label, amount]) => (
            <div
              key={label}
              style={{
                display: "flex",

                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span style={{ color: "#8B949E" }}>{label}</span>
              MERN Stack E-Commerce | Roman Urdu Course | Chapter 9: Frontend
              Pages Complete Page 16
              <span style={{ color: "#E6EDF3" }}>
                Rs.{" "}
                {amount?.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          ))}
          {/* Divider */}
          <hr style={{ borderColor: "#30363D", margin: "12px 0" }} />
          {/* Grand Total */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",

              marginBottom: "20px",
            }}
          >
            <span
              style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Grand Total
            </span>

            <span
              style={{ color: "#56CF8A", fontWeight: "bold", fontSize: "18px" }}
            >
              Rs.{" "}
              {grandTotal?.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
          {/* Free shipping notice */}
          {shippingPrice === 0 && (
            <p
              style={{
                color: "#56CF8A",
                fontSize: "12px",

                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              n Free Shipping!
            </p>
          )}
          {shippingPrice > 0 && (
            <p
              style={{
                color: "#8B949E",
                fontSize: "12px",

                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              Rs. 2000+ order pe free shipping milegi
            </p>
          )}
         
          {/* Checkout Button */}
          <button
            onClick={checkoutHandler}
            style={{
              width: "100%",

              padding: "14px",

              background: "#38BDF8",

              color: "#0D1117",

              border: "none",

              borderRadius: "8px",

              fontSize: "16px",

              fontWeight: "bold",

              cursor: "pointer",
            }}
          >
            {isLoggedIn ? "Checkout Karo" : "Login Karo Checkout Ke Liye"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
