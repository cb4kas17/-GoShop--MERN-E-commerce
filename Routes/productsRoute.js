const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
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
router.delete('/:productId', isAuth, deleteProductById);
router.post('/', isAuth, addProduct);
router.put('/:productId', isAuth, updateProduct);

module.exports = router;
