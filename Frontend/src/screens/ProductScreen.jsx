import { useState, useEffect }          from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';

import { useDispatch, useSelector }      from 'react-redux';

// Redux thunk — product fetch karne ke liye

import { fetchProductById,

         selectSelectedProduct,

         selectProductsLoading,

         selectProductsError } from '../store/productSlice';

// Cart action — Redux se

import { addItem } from '../store/cartSlice';

function ProductScreen() {

  const { id }   = useParams();          // URL se product ID lo

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux store se product data lo

  const product = useSelector(selectSelectedProduct);

  const loading = useSelector(selectProductsLoading);

  const error   = useSelector(selectProductsError);

  // Quantity — sirf local state mein (cart mein jaane se pehle)

  const [quantity, setQuantity] = useState(1);

  // Component mount hone pe product fetch karo

  useEffect(() => {

    dispatch(fetchProductById(id));

  }, [dispatch, id]);

  // id dependency mein hai — URL badlne pe dobara fetch hoga

  // n FIXED — Ab Redux cartSlice mein item add hoga

  const addToCartHandler = () => {

    dispatch(addItem({

      _id:      product._id,

      name:     product.name,

      image:    product.images?.[0] || '/images/default.jpg',

      price:    product.price,

      stock:    product.stock,

      quantity: quantity,   // User ne jo quantity choose ki

    }));

    navigate('/cart');  // Cart page pe le jao

  };

  // Loading aur Error states

  if (loading) return (

    <p style={{ color: '#38BDF8', textAlign: 'center', marginTop: '40px' 
}}>

      Loading product...

    </p>

  );

  if (error) return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>

      <p style={{ color: '#FF6B6B', marginBottom: '16px' }}>{error}</p>

      <Link to='/' style={{ color: '#38BDF8' }}>Home pe wapas jao</Link>

    </div>

  );

  if (!product) return null;  // Data aane tak kuch mat dikhao

  return (

    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }
}>

      {/* Back button */}

      <Link to='/' style={{ color: '#8B949E', textDecoration: 'none',

        display: 'inline-block', marginBottom: '20px' }}>

        &larr; Wapas Products Pe

      </Link>

      {/* Main Grid — image left, detail right */}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',

        gap: '40px', alignItems: 'start' }}>

        {/* LEFT — Product Image */}

        <img

          src={product.images?.[0] || '/images/default.jpg'}

          alt={product.name}

          style={{ width: '100%', borderRadius: '12px',

            border: '1px solid #30363D' }}

        />

        {/* RIGHT — Product Details */}

        <div>

          {/* Naam */}

          <h1 style={{ color: '#E6EDF3', fontSize: '24px',

            marginBottom: '12px' }}>

            {product.name}

          </h1>

          {/* Price */}
          <p style={{ color: '#56CF8A', fontSize: '28px',

            fontWeight: 'bold', marginBottom: '12px' }}>

            Rs. {product.price?.toLocaleString()}

          </p>

          {/* Category */}

          <p style={{ color: '#8B949E', fontSize: '13px',

            marginBottom: '16px' }}>

            Category: {product.category}

          </p>

          {/* Description */}

          <p style={{ color: '#C9D1D9', lineHeight: '1.6',

            marginBottom: '20px' }}>

            {product.description}

          </p>

          {/* Stock Status */}

          <p style={{

            color:        product.stock > 0 ? '#56CF8A' : '#FF6B6B',

            fontWeight:   'bold',

            marginBottom: '20px'

          }}>

            {product.stock > 0

              ? `In Stock — ${product.stock} bache hain`

              : 'Out of Stock'}

          </p>

          {/* Quantity Selector — sirf tab dikhao jab in stock ho */}

          {product.stock > 0 && (

            <div style={{ display: 'flex', alignItems: 'center',

              gap: '12px', marginBottom: '20px' }}>

              <span style={{ color: '#8B949E' }}>Quantity:</span>

              <button

                onClick={() => setQuantity(q => Math.max(1, q - 1))}

                style={{ background: '#1C2128', color: 'white',border: '1px solid #30363D', borderRadius: '6px',

                  padding: '6px 14px', cursor: 'pointer', fontSize: '18px' }}

              > - </button>

              <span style={{ color: 'white', fontSize: '18px',

                minWidth: '30px', textAlign: 'center' }}>

                {quantity}

              </span>

              <button

                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}

                style={{ background: '#1C2128', color: 'white',

                  border: '1px solid #30363D', borderRadius: '6px',

                  padding: '6px 14px', cursor: 'pointer', fontSize: '18px' }}

              > + </button>

              {/* Math.min(stock, q+1) — stock se zyada nahi ho sakti */}

            </div>

          )}

          {/* Add to Cart Button */}

          <button

            onClick={addToCartHandler}

            disabled={product.stock === 0}

            style={{

              background:    product.stock > 0 ? '#38BDF8' : '#30363D',

              color:         product.stock > 0 ? '#0D1117' : '#8B949E',

              border:        'none',

              borderRadius:  '8px',

              padding:       '14px 32px',

              fontSize:      '16px',

              fontWeight:    'bold',

              cursor:        product.stock > 0 ? 'pointer' : 'not-allowed',

              width:         '100%',
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