import {Link} from 'react-router-dom';

function ProductCard({product}){
    const { _id, name, image, price, rating, numReviews, stock } = product;
    return (
    <div style={{
      background: '#161B22',
      border: '1px solid #30363D',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}>
    {/* Product Image */}
    <img src={image || '/images/default.jpg'} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
    <div style={{ padding: '16px' }}>
    {/* Product Name */}
    <h3 style={{ color: '#E6EDF3', fontSize: '14px', marginBottom: '8px' }}>{name}</h3>
    {/* Rating */}
    <p style={{ color: '#FFD93D', fontSize: '13px' }}>{'n'.repeat(Math.round(rating))} ({numReviews} reviews)</p>
    {/* Price */}
    <p style={{ color: '#56CF8A', fontSize: '18px', fontWeight: 'bold' }}>Rs. {price?.toLocaleString()}</p>
    {/* Stock Status */}
    <p style={{ color: stock > 0 ? '#56CF8A' : '#FF6B6B', fontSize: '12px' }}>
    {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}</p>
    </div></div>
  );}

export default ProductCard;

