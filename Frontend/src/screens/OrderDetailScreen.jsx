import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUser } from '../store/authSlice';
import {
  getOrderById,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from '../services/api';

function OrderDetailScreen() {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);

  const loadOrder = async (deferLoading = false) => {
    try {
      if (deferLoading) {
        await Promise.resolve();
      }
      setLoading(true);
      const { data } = await getOrderById(id);
      setOrder(data.data ?? data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Order load nahi hua');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder(true);
  }, [id]);

  async function payWithRazorpay() {
    if (!order) return;

    if (!window.Razorpay) {
      alert('Razorpay checkout script loaded nahi hua. Page refresh karo.');
      return;
    }

    try {
      setPaying(true);
      const { data } = await createRazorpayOrder(order._id);

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'ShopEase',
        description: `Order #${order._id.slice(-6).toUpperCase()}`,
        handler: async (response) => {
          try {
            await verifyRazorpayPayment(order._id, response);
            alert('Payment ho gayi! Order confirmed!');
            await loadOrder();
          } catch (verifyError) {
            alert(
              'Payment verify nahi hua: ' +
              (verifyError.response?.data?.message || verifyError.message)
            );
          } finally {
            setPaying(false);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: order.shippingAddress?.phone,
        },
        theme: { color: '#34D399' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setPaying(false);
      alert('Payment start nahi hua: ' + (err.response?.data?.message || err.message));
    }
  }

  if (loading) {
    return <div style={{ color: '#E6EDF3' }}>Loading order...</div>;
  }

  if (error) {
    return <div style={{ color: '#FF6B6B' }}>{error}</div>;
  }

  if (!order) {
    return <div style={{ color: '#E6EDF3' }}>Order nahi mila.</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', color: '#E6EDF3' }}>
      <h1 style={{ marginBottom: '20px' }}>Order Details</h1>

      <div
        style={{
          background: '#0D1117',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ marginBottom: '12px' }}>Delivery</h2>
        <p>
          {order.shippingAddress?.address}, {order.shippingAddress?.city},{' '}
          {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
        </p>
        <p>Phone: {order.shippingAddress?.phone || 'N/A'}</p>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        <div
          style={{
            background: '#0D1117',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <h2 style={{ marginBottom: '12px' }}>Payment</h2>
          <p>Method: {order.paymentMethod}</p>
          <p>Status: {order.isPaid ? 'Paid ✅' : 'Pending ❌'}</p>
        </div>

        <div
          style={{
            background: '#0D1117',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <h2 style={{ marginBottom: '12px' }}>Order Summary</h2>
          <p>Items: ₹{order.itemsPrice?.toFixed(2) ?? '0.00'}</p>
          <p>Shipping: ₹{order.shippingPrice?.toFixed(2) ?? '0.00'}</p>
          <p>Tax: ₹{order.taxPrice?.toFixed(2) ?? '0.00'}</p>
          <p style={{ fontWeight: 'bold', marginTop: '12px' }}>
            Total: ₹{order.totalPrice?.toFixed(2) ?? '0.00'}
          </p>
        </div>
      </div>

      {!order.isPaid && order.paymentMethod === 'Razorpay' && (
        <button
          onClick={payWithRazorpay}
          disabled={paying}
          style={{
            marginTop: '24px',
            background: '#34D399',
            color: '#0D1117',
            padding: '14px 24px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: paying ? 'not-allowed' : 'pointer',
          }}
        >
          {paying ? 'Processing...' : 'Razorpay Se Pay Karo'}
        </button>
      )}
    </div>
  );
}

export default OrderDetailScreen;
