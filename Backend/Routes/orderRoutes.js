const express  = require('express');
const router   = express.Router();
const { protect, admin } = require('../Middleware/authMiddleware');
const { createOrder, getMyOrders, getOrderById, updateOrderStatus, getAllOrders, createRazorpayOrder, verifyPayment } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

router.get('/', protect, admin, getAllOrders);
router.put('/:id/status',  protect, admin, updateOrderStatus);

router.post('/:id/razorpay', protect, createRazorpayOrder);
router.post('/:id/verify', protect, verifyPayment);

module.exports = router;