const express  = require('express');
const router   = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createOrder, getMyOrders, getOrderById, updateOrderStatus, getAllOrders } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

router.get('/', protect, admin, getAllOrders);
router.put('/:id/status',  protect, admin, updateOrderStatus);

module.exports = router;