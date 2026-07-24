import { Link }   from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating     from './Rating';
import { addItem } from '../store/cartSlice';

function ProductCard({ product }) {

  const dispatch = useDispatch();

  const { _id, name, images, price, rating, numReviews, stock } = product;

  const quickAddHandler = (e) => {

    e.preventDefault();  // Link ke andar hai — navigate mat karo

    dispatch(addItem({

      _id, name, price, stock,

      image:    images?.[0] || '/images/default.jpg',

      quantity: 1,

    }));

  };

  return (

    <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>

      <div style={{

        background:   '#161B22',

        border:       '1px solid #30363D',

        borderRadius: '12px',

        overflow:     'hidden',

        transition:   'transform 0.2s, border-color 0.2s',

      }}

        onMouseEnter={e => {

          e.currentTarget.style.transform    = 'translateY(-4px)';

          e.currentTarget.style.borderColor  = '#38BDF8';

        }}

        onMouseLeave={e => {

          e.currentTarget.style.transform    = 'translateY(0)';

          e.currentTarget.style.borderColor  = '#30363D';

        }}

      >

        {/* Image */}

        <img src={images?.[0] || '/images/default.jpg'}

          alt={name}

          style={{ width: '100%', height: '200px', objectFit: 'cover' }}

        />

        <div style={{ padding: '16px' }}>

          {/* Naam */}

          <h3 style={{ color: '#E6EDF3', fontSize: '14px',

            marginBottom: '8px', lineHeight: '1.4' }}>

            {name}

          </h3>

          {/* Rating */}

          <div style={{ marginBottom: '10px' }}>

            <Rating

              value={rating}

              text={`(${numReviews})`}

            />

          </div>

          {/* Price aur Stock */}

          <div style={{ display: 'flex',

            justifyContent: 'space-between', alignItems: 'center' }}>

            <p style={{ color: '#56CF8A', fontSize: '18px', fontWeight: 'bold' }}>

              Rs. {price?.toLocaleString()}

            </p>

            <span style={{

              fontSize:     '11px',

              padding:      '2px 8px',

              borderRadius: '12px',

              background:   stock > 0 ? '#0A2818' : '#2D1515',

              color:        stock > 0 ? '#56CF8A' : '#FF6B6B',

            }}>

              {stock > 0 ? 'In Stock' : 'Out of Stock'}

            </span>
            </div>

          {/* Quick Add Button */}

          {stock > 0 && (

            <button

              onClick={quickAddHandler}

              style={{

                width:        '100%',

                marginTop:    '12px',

                padding:      '8px',

                background:   '#1C2128',

                color:        '#38BDF8',

                border:       '1px solid #38BDF8',

                borderRadius: '6px',

                cursor:       'pointer',

                fontSize:     '13px',

              }}

            >

              + Quick Add

            </button>

          )}

        </div>

      </div>

    </Link>

  );

}

export default ProductCard;