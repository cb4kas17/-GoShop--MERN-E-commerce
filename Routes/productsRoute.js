const express = require('express');
const router = express.Router();
// Import controllers
const {
    getAllProducts,
    getSingleProduct,
    deleteProductById,
    addProduct,
    updateProduct,
} = require('../controllers/productsController');
// getting all the products
router.get('/', getAllProducts);
router.get('/:productId', getSingleProduct);
router.delete('/:productId', deleteProductById);
router.post('/', addProduct);
router.put('/:productId', updateProduct);

module.exports = router;
