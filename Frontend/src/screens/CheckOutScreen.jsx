// src/screens/CheckoutScreen.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress, selectShipping } from '../store/orderSlice';

function CheckoutScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saved = useSelector(selectShipping);

  // Pehle se saved address? Toh woh load karo
  const [address, setAddress] = useState(saved.address || '');
  const [city, setCity] = useState(saved.city || '');
  const [state, setState] = useState(saved.state || '');
  const [zipCode, setZipCode] = useState(saved.zipCode || '');
  const [phone, setPhone] = useState(saved.phone || '');

  const submitHandler = (e) => {
    e.preventDefault();

    // Redux mein save karo
    dispatch(saveShippingAddress({
      address,
      city,
      state,
      zipCode,
      phone
    }));

    // Step 2 pe jao
    navigate('/payment');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    marginBottom: '14px',
    background: '#1C2128',
    border: '1px solid #30363D',
    borderRadius: '6px',
    color: 'white',
    fontSize: '14px',
    outline: 'none'
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
              background: i === 0 ? '#34D399' : '#1C2128',
              color: i === 0 ? '#0D1117' : '#8B949E',
              fontWeight: i === 0 ? 'bold' : 'normal'
            }}
          >
            {i + 1}. {step}
          </div>
        ))}
      </div>

      <h2 style={{ color: '#E6EDF3', marginBottom: '20px' }}>Shipping Address</h2>

      <form onSubmit={submitHandler}>
        <label style={{ color: '#8B949E', fontSize: '13px' }}>Ghar ka Address</label>
        <input
          style={inputStyle}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="Street, Mohalla, Area"
        />

        <label style={{ color: '#8B949E', fontSize: '13px' }}>Shehar</label>
        <input
          style={inputStyle}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          placeholder="Lahore"
        />

        <label style={{ color: '#8B949E', fontSize: '13px' }}>State/Province</label>
        <input
          style={inputStyle}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          placeholder="Punjab"
        />

        <label style={{ color: '#8B949E', fontSize: '13px' }}>Zip / Postal Code</label>
        <input
          style={inputStyle}
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
          placeholder="54000"
        />

        <label style={{ color: '#8B949E', fontSize: '13px' }}>Phone Number</label>
        <input
          style={inputStyle}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="03001234567"
        />

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
            cursor: 'pointer'
          }}
        >
          Next →
        </button>
      </form>
    </div>
  );
}

export default CheckoutScreen;