// src/screens/PlaceOrderScreen.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  placeOrder,
  clearCurrentOrder,
  selectShipping,
  selectPaymentMethod,
  selectCurrentOrder,
  selectOrderLoading,
  selectOrderError
} from '../store/orderSlice';
import { clearCart, selectCartItems, selectTotalPrice } from '../store/cartSlice';

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const shippingAddress = useSelector(selectShipping);
  const paymentMethod = useSelector(selectPaymentMethod);
  const currentOrder = useSelector(selectCurrentOrder);
  const loading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);

  // Order place hone ke baad - OrderDetail page pe jao
  useEffect(() => {
    if (currentOrder) {
      dispatch(clearCart()); // Cart khaali karo
      navigate(`/orders/${currentOrder._id}`);
      dispatch(clearCurrentOrder());
    }
  }, [currentOrder, navigate, dispatch]);

  const taxPrice = totalPrice * 0.05;
  const shippingPrice = totalPrice > 2000 ? 0 : 150;
  const grandTotal = totalPrice + taxPrice + shippingPrice;

  const placeOrderHandler = () => {
    dispatch(placeOrder({
      orderItems: cartItems.map(i => ({
        product: i._id,
        name: i.name,
        image: i.image,
        price: i.price,
        quantity: i.quantity
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice: totalPrice,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: grandTotal
    }));
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {['Shipping', 'Payment', 'Review'].map((step, i) => (
          <div
            key={step}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '8px',
              borderRadius: '6px',
              fontSize: '13px',
              background: i === 2 ? '#34D399' : '#1C2128',
              color: i === 2 ? '#0D1117' : '#8B949E',
              fontWeight: i === 2 ? 'bold' : 'normal'
            }}
          >
            {i + 1}. {step}
          </div>
        ))}
      </div>

      <h2 style={{ color: '#E6EDF3', marginBottom: '24px' }}>Review Your Order</h2>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* LEFT — Order Details */}
        <div>
          {/* Shipping Address */}
          <div style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
            <h3 style={{ color: '#E6EDF3', marginBottom: '8px' }}>📍 Shipping Address</h3>
            <p style={{ color: '#8B949E', fontSize: '14px' }}>
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zipCode}
              <br />
              📞 {shippingAddress.phone}
            </p>
          </div>

          {/* Payment Method */}
          <div style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
            <h3 style={{ color: '#E6EDF3', marginBottom: '8px' }}>💳 Payment Method</h3>
            <p style={{ color: '#8B949E', fontSize: '14px' }}>{paymentMethod}</p>
          </div>

          {/* Order Items */}
          <div style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: '10px', padding: '16px' }}>
            <h3 style={{ color: '#E6EDF3', marginBottom: '12px' }}>🛍️ Items ({cartItems.length})</h3>
            {cartItems.map(item => (
              <div
                key={item._id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                />
                <Link
                  to={`/product/${item._id}`}
                  style={{ color: '#E6EDF3', flex: 1, textDecoration: 'none', fontSize: '14px' }}
                >
                  {item.name}
                </Link>
                <span style={{ color: '#8B949E', fontSize: '13px' }}>
                  {item.quantity} x Rs.{item.price.toLocaleString()} = Rs.{(item.quantity * item.price).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Order Summary */}
        <div style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: '10px', padding: '20px', height: 'fit-content' }}>
          <h3 style={{ color: '#E6EDF3', marginBottom: '16px' }}>Order Summary</h3>

          {[
            ['Items', totalPrice],
            ['Tax (5%)', taxPrice],
            ['Shipping', shippingPrice]
          ].map(([label, amount]) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}
            >
              <span style={{ color: '#8B949E' }}>{label}</span>
              <span style={{ color: '#E6EDF3' }}>
                Rs.{Math.round(amount).toLocaleString()}
              </span>
            </div>
          ))}

          <hr style={{ borderColor: '#30363D', margin: '12px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>Total</span>
            <span style={{ color: '#34D399', fontWeight: 'bold', fontSize: '18px' }}>
              Rs.{Math.round(grandTotal).toLocaleString()}
            </span>
          </div>

          {error && <p style={{ color: '#FF6B6B', marginBottom: '12px' }}>{error}</p>}

          <button
            onClick={placeOrderHandler}
            disabled={loading || cartItems.length === 0}
            style={{
              width: '100%',
              padding: '14px',
              background: '#34D399',
              color: '#0D1117',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'wait' : 'pointer'
            }}
          >
            {loading ? 'Order Place Ho Raha Hai...' : 'Order Place Karo'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;