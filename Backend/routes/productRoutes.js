const express = require('express');
const router = express.Router();
const { addProduct, getBusinessProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Business actions
router.post('/', protect, authorizeRoles('business'), addProduct);
router.put('/:productId', protect, authorizeRoles('business'), updateProduct);
router.delete('/:productId', protect, authorizeRoles('business'), deleteProduct);

// View by any user
router.get('/:businessId', protect, getBusinessProducts);

module.exports = router;
