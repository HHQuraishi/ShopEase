import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartScreen() {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Your cart is empty</h2>
        <Link to="/" style={{ color: '#F0A500' }}>Go Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Shopping Cart</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          {cartItems.map(item => (
            <div key={item._id} style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid #30363D' }}>
              <img src={item.images?.[0] || '/images/default.jpg'} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <Link to={`/product/${item._id}`} style={{ color: '#E6EDF3' }}>{item.name}</Link>
                <p>Rs. {item.price}</p>
                <select value={item.quantity} onChange={(e) => updateQty(item._id, Number(e.target.value))}>
                  {[...Array(Math.min(item.stock, 10)).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
                <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: '16px', background: 'none', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#161B22', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
          <h2>Total: Rs. {totalPrice.toLocaleString()}</h2>
          <Link to="/checkout"><button style={{ width: '100%', background: '#F0A500', padding: '12px', border: 'none', borderRadius: '8px', marginTop: '16px' }}>Proceed to Checkout</button></Link>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;