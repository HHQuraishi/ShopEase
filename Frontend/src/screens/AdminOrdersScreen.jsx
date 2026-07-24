import { useEffect, useState }    from 'react';

import { useSelector }            from 'react-redux';

import { selectToken }            from '../store/authSlice';

import { getAllOrders, updateOrderStatus } from '../services/api';

const STATUS_OPTIONS = ['Processing','Shipped','Delivered','Cancelled'];

const statusColor    = { Processing:'#FFD93D', Shipped:'#82AAFF',

                         Delivered:'#56CF8A', Cancelled:'#FF6B6B' };

function AdminOrdersScreen() {

  const [orders,  setOrders]  = useState([]);

  const [loading, setLoading] = useState(true);

  const token = useSelector(selectToken);

  const fetchOrders = async () => {

    try {

      const { data } = await getAllOrders();

      setOrders(data.data);

    } catch (err) { console.error(err); }

    finally { setLoading(false); }

  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId, newStatus) => {

    try {

      await updateOrderStatus(orderId, newStatus);

      // Local state update karo

      setOrders(prev => prev.map(o =>

        o._id === orderId ? { ...o, orderStatus: newStatus } : o

      ));} catch (err) { alert('Update fail hua!',err); }

  };

  if (loading) return <p style={{ color:'#C084FC', textAlign:'center' }}>
Loading...</p>;

  return (

    <div style={{ maxWidth:'1100px', margin:'30px auto', padding:'0 20px'}}>

      <h1 style={{ color:'#E6EDF3', marginBottom:'20px' }}>

        Admin — Orders ({orders.length})

      </h1>

      <div style={{ overflowX:'auto' }}>

        <table style={{ width:'100%', borderCollapse:'collapse' }}>

          <thead>

            <tr style={{ background:'#1C2128' }}>

              {['ID','User','Date','Total','Status','Action'].map(h => (

                <th key={h} style={{ padding:'12px', color:'#8B949E',

                  textAlign:'left', borderBottom:'1px solid #30363D' }}>{h}</th>

              ))}

            </tr>

          </thead>

          <tbody>

            {orders.map(order => (

              <tr key={order._id} style={{ borderBottom:'1px solid #30363D' }}>

                <td style={{ padding:'10px', color:'#8B949E', fontSize:'12px' }}>

                  {order._id.slice(-6).toUpperCase()}

                </td>

                <td style={{ padding:'10px', color:'#E6EDF3', fontSize:'13px' }}>

                  {order.user?.name || 'N/A'}

                </td>

                <td style={{ padding:'10px', color:'#8B949E', fontSize:'12px' }}>
                  {new Date(order.createdAt).toLocaleDateString()}

                </td>

                <td style={{ padding:'10px', color:'#56CF8A', fontWeight:
'bold' }}>

                  Rs. {order.totalPrice?.toLocaleString()}

                </td>

                <td style={{ padding:'10px' }}>

                  <span style={{ padding:'3px 8px', borderRadius:'10px', 
fontSize:'12px',

                    background: statusColor[order.orderStatus]+'22',

                    color: statusColor[order.orderStatus] }}>

                    {order.orderStatus}

                  </span>

                </td>

                <td style={{ padding:'10px' }}>

                  {/* Status dropdown */}

                  <select

                    value={order.orderStatus}

                    onChange={e => updateStatus(order._id, e.target.value
)}

                    style={{ background:'#1C2128', color:'white',

                      border:'1px solid #30363D', borderRadius:'4px',

                      padding:'4px 8px', fontSize:'12px' }}

                  >

                    {STATUS_OPTIONS.map(s => (

                      <option key={s} value={s}>{s}</option>

                    ))}

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

    );

}

export default AdminOrdersScreen;