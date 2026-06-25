import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { _id, name, images, price, rating, numReviews } = product;
  const imageUrl = images?.[0] || '/images/default.jpg';

  return (
    <div style={{
      background: '#161B22',
      border: '1px solid #30363D',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}>
      <Link to={`/product/${_id}`}>
        <img src={imageUrl} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      </Link>
      <div style={{ padding: '16px' }}>
        <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ color: '#E6EDF3', fontSize: '1rem', marginBottom: '8px' }}>{name}</h3>
        </Link>
        <div style={{ color: '#FFD93D', fontSize: '0.85rem' }}>
          {'★'.repeat(Math.round(rating || 0))}{'☆'.repeat(5 - Math.round(rating || 0))}
          <span style={{ color: '#8B949E', marginLeft: '6px' }}>({numReviews || 0})</span>
        </div>
        <p style={{ color: '#56CF8A', fontWeight: 'bold', marginTop: '8px' }}>Rs. {price?.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ProductCard;