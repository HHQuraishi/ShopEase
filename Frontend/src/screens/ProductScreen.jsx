import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id);
        setProduct(data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Product nahi mila!');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart({ ...product, quantity });
    navigate('/cart');
  };

  if (loading) return <Loader />;
  if (error) return <p style={{ color: '#FF6B6B', textAlign: 'center' }}>{error} <Link to="/">Go Home</Link></p>;
  if (!product) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <img src={product.images?.[0] || '/images/default.jpg'} alt={product.name} style={{ width: '100%', borderRadius: '12px' }} />
        <div>
          <h1 style={{ color: '#E6EDF3' }}>{product.name}</h1>
          <p style={{ color: '#56CF8A', fontSize: '24px', fontWeight: 'bold' }}>Rs. {product.price?.toLocaleString()}</p>
          <p style={{ color: '#8B949E' }}>{product.description}</p>
          {product.stock > 0 && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', margin: '16px 0' }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
          )}
          <button
            onClick={addToCartHandler}
            disabled={product.stock === 0}
            style={{
              background: product.stock > 0 ? '#F0A500' : '#30363D',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: product.stock > 0 ? 'pointer' : 'not-allowed'
            }}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;