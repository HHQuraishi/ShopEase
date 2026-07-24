require('dotenv').config();

const express       = require('express');
const cors          = require('cors');
const connectDB     = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes    = require('./routes/userRoutes');
const orderRoutes   = require('./routes/orderRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

connectDB();
const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

app.use('/api/users',    userRoutes);

app.use('/api/orders',   orderRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ShopEase API running!', timestamp: new Date() });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV}`);
});

