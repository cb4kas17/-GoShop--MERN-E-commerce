const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const {
    ordersController,
    getOrdersByUserIdController,
    getOrderDetail,
    getAllOrders,
} = require('../controllers/ordersController');
router.get('/', isAuth, getAllOrders);
router.post('/', isAuth, getOrdersByUserIdController);
router.get('/:orderId', isAuth, getOrderDetail);
router.post('/placeOrder', isAuth, ordersController);

module.exports = router;
