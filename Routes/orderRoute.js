const express = require('express');
const router = express.Router();
const {
    ordersController,
    getOrdersByUserIdController,
    getOrderDetail,
    getAllOrders,
} = require('../controllers/ordersController');
router.get('/', getAllOrders);
router.post('/', getOrdersByUserIdController);
router.get('/:orderId', getOrderDetail);

router.post('/placeOrder', ordersController);

module.exports = router;
