const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
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
router.delete('/:productId', isAuth, isAdmin, deleteProductById);
router.post('/', isAuth, isAdmin, addProduct);
router.put('/:productId', isAuth, isAdmin, updateProduct);

module.exports = router;
