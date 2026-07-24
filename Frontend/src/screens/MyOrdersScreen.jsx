// src/screens/MyOrdersScreen.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyOrders, selectMyOrders, selectOrderLoading } from '../store/orderSlice';

// Status ke hisaab se badge color
const statusColor = {
  Processing: '#FFD93D',
  Shipped: '#82AAFF',
  Delivered: '#56CF8A',
  Cancelled: '#FF6B6B'
};

function MyOrdersScreen() {
  const dispatch = useDispatch();
  const orders = useSelector(selectMyOrders);
  const loading = useSelector(selectOrderLoading);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) {
    return <p style={{ color: '#34D399', textAlign: 'center', marginTop: '40px' }}>Loading...</p>;
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '50px' }}>📦</p>
        <h2 style={{ color: '#E6EDF3' }}>Koi order nahi abhi tak</h2>
        <Link to="/" style={{ color: '#34D399' }}>Shopping karo!</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ color: '#E6EDF3', marginBottom: '24px' }}>Mere Orders</h1>

      <div style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1C2128' }}>
              {['Order ID', 'Date', 'Total', 'Payment', 'Status', ''].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '12px',
                    color: '#8B949E',
                    textAlign: 'left',
                    borderBottom: '1px solid #30363D',
                    fontSize: '13px'
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: '1px solid #30363D' }}>
                <td style={{ padding: '12px', color: '#8B949E', fontSize: '12px' }}>
                  {order._id.slice(-8).toUpperCase()}
                </td>
                <td style={{ padding: '12px', color: '#E6EDF3', fontSize: '13px' }}>
                  {new Date(order.createdAt).toLocaleDateString('ur-PK')}
                </td>
                <td style={{ padding: '12px', color: '#56CF8A', fontWeight: 'bold' }}>
                  Rs.{order.totalPrice?.toLocaleString()}
                </td>
                <td style={{ padding: '12px', fontSize: '13px', color: order.isPaid ? '#56CF8A' : '#FF6B6B' }}>
                  {order.isPaid ? '✅ Paid' : '❌ Pending'}
                </td>
                <td style={{ padding: '12px' }}>
                  <span
                    style={{
                      background: statusColor[order.orderStatus] || '#8B949E',
                      color: '#0D1117',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <Link
                    to={`/orders/${order._id}`}
                    style={{ color: '#34D399', textDecoration: 'none', fontSize: '13px' }}
                  >
                    Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrdersScreen;