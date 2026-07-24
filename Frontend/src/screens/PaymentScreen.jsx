// src/screens/PaymentScreen.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  savePaymentMethod,
  selectPaymentMethod
} from '../store/orderSlice';

const PAYMENT_METHODS = [
  { id: 'Razorpay', label: 'Razorpay (Card/UPI)', icon: '💳' },
  { id: 'COD', label: 'Cash on Delivery', icon: '💵' }
];

function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const savedMethod = useSelector(selectPaymentMethod);
  const [method, setMethod] = useState(savedMethod || 'Razorpay');

  const submitHandler = (e) => {
    e.preventDefault();

    // Redux mein save karo
    dispatch(savePaymentMethod(method));

    // Step 3 pe jao
    navigate('/placeorder');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '0 20px' }}>
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
              background: i === 1 ? '#34D399' : '#1C2128',
              color: i === 1 ? '#0D1117' : '#8B949E',
              fontWeight: i === 1 ? 'bold' : 'normal'
            }}
          >
            {i + 1}. {step}
          </div>
        ))}
      </div>

      <h2 style={{ color: '#E6EDF3', marginBottom: '20px' }}>Payment Method</h2>

      <form onSubmit={submitHandler}>
        {PAYMENT_METHODS.map((pm) => (
          <label
            key={pm.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              marginBottom: '12px',
              background: method === pm.id ? '#0A2818' : '#1C2128',
              border: `1px solid ${method === pm.id ? '#34D399' : '#30363D'}`,
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <input
              type="radio"
              name="payment"
              value={pm.id}
              checked={method === pm.id}
              onChange={(e) => setMethod(e.target.value)}
              style={{ accentColor: '#34D399', width: '18px', height: '18px' }}
            />
            <span style={{ fontSize: '20px' }}>{pm.icon}</span>
            <span style={{ color: '#E6EDF3', fontSize: '14px' }}>{pm.label}</span>
          </label>
        ))}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            background: '#34D399',
            color: '#0D1117',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          Review Order →
        </button>
      </form>
    </div>
  );
}

export default PaymentScreen;