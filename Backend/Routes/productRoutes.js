const express  = require('express');
const router   = express.Router();
const{ protect, admin } = require('../Middleware/authMiddleware');
const{getProducts, getProductById, createProduct, updateProduct, deleteProduct, createReview} = require('../controllers/productController');

router.get('/',    getProducts);
router.get('/:id', getProductById);

router.post('/:id/reviews', protect, createReview);

router.post('/',      protect, admin, createProduct);
router.put('/:id',    protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
