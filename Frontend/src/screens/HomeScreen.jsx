import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await getProducts();
        setProducts(data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Kuch galat ho gaya!');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: '#FF6B6B', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#E6EDF3', marginBottom: '24px' }}>Latest Products</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px'
      }}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;