const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const {
    ordersController,
    getOrdersByUserIdController,
    getOrderDetail,
    getAllOrders,
} = require('../controllers/ordersController');
router.get('/', isAuth, isAdmin, getAllOrders);
router.post('/', isAuth, getOrdersByUserIdController);
router.get('/:orderId', isAuth, getOrderDetail);
router.post('/placeOrder', isAuth, ordersController);

module.exports = router;
