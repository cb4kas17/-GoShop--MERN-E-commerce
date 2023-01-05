const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ordersController = async (req, res) => {
    const { token, cartItems, currentUser, totalAmount } = req.body;
    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
    });
    const payment = await stripe.charges.create(
        {
            amount: totalAmount * 100,
            currency: 'php',
            customer: customer.id,
            receipt_email: currentUser.email,
        },
        { idempotencyKey: uuidv4() }
    );

    if (payment) {
        try {
            const order = new Order({
                userId: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                orderItems: cartItems,
                shippingAddress: {
                    address: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postalCode: token.card.address_zip,
                },
                orderAmount: totalAmount,
                transactionId: payment.source.id,
                isDelivered: false,
            });
            order.save((err) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'saving order to backend went wrong',
                    });
                } else {
                    cartItems.forEach(async (item) => {
                        const product = await Product.findOne({ _id: item._id });
                        product.countInStock -= item.quantity;
                        await product.save();
                    });
                    res.status(201).json({ success: true, message: 'order placed successfully' });
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'login before checkout',
            });
        }
    } else {
        res.status(400).json({ success: false, message: 'payment failed' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        if (orders) {
            res.status(200).json({ success: true, orders: orders });
        } else {
            res.status(400).json({
                success: false,
                message: 'Getting orders failed',
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "There's an error fetching orders",
        });
    }
};

const getOrdersByUserIdController = (req, res) => {
    const { userId } = req.body;
    try {
        Order.find({ userId: userId })
            .sort({ createdAt: -1 })
            .exec((err, result) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: "There's an error fetching orders",
                    });
                }
                if (result) {
                    res.status(200).json({ success: true, orders: result });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "There's no orders by the USER",
                    });
                }
            });
    } catch (error) {
        res.status(400).json({ success: false, message: "There's an error fetching orders" });
    }
};

const getOrderDetail = (req, res) => {
    const { orderId } = req.params;
    try {
        Order.find({ _id: orderId }, (err, result) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Order ID does not exist',
                });
            }
            if (result) {
                res.status(200).json({ success: true, orderDetail: result[0] });
            } else {
                res.status(400).json({ success: false, message: 'Order ID does not exist' });
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: "There's an error fetching orders" });
    }
};
module.exports = { ordersController, getOrdersByUserIdController, getOrderDetail, getAllOrders };
