const Product = require('../models/productModel');
const Reviews = require('../models/reviewsModel');
const getAllProducts = (req, res) => {
    Product.find({}, (err, result) => {
        if (!err) {
            return res.status(200).json({ success: true, data: result });
        } else {
            return res.status(400).json({
                success: false,
                message: 'There is an error in fetching all the products',
            });
        }
    });
};

const getSingleProduct = (req, res) => {
    const { productId } = req.params;
    if (productId) {
        Product.findById(productId)
            .populate({ path: 'reviews', options: { sort: { createdAt: -1 } } })
            .exec((err, result) => {
                if (!err) {
                    const totalRating =
                        result.reviews.reduce((initial, item) => {
                            return initial + Number(item.rating);
                        }, 0) / result.reviews.length;

                    result.rating = Number(totalRating);
                    return res.status(200).json({ success: true, data: result });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'There is an error fetching a single product',
                    });
                }
            });
    }
};

const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    if (productId) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            await Reviews.deleteMany({ productId: productId });
            if (product) {
                res.status(200).json({ success: true, message: 'Product successfully deleted' });
            } else {
                res.status(400).json({ success: false, message: 'Product  deletion failed' });
            }
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
};
const addProduct = async (req, res) => {
    const { productDetails } = req.body;

    try {
        const product = new Product(productDetails);
        product.save((err) => {
            if (err) {
                res.status(400).json({ success: false, message: 'Product creation failed' });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Product successfully created',
                });
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: 'There is an error in creating product' });
    }
};
const updateProduct = async (req, res) => {
    const { productDetails } = req.body;
    const { productId } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(productId, productDetails);
        if (product) {
            res.status(200).json({
                success: true,
                message: 'Product successfully created',
                productDetail: product,
            });
        } else {
            res.status(400).json({ success: false, message: 'No product with that ID' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'There is an error in updating product' });
    }
};

module.exports = { getAllProducts, getSingleProduct, deleteProductById, addProduct, updateProduct };
