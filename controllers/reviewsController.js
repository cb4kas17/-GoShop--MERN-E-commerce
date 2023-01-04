const Reviews = require('../models/reviewsModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const postReviewController = async (req, res) => {
    const { productId, userId, name, rating, reviewContent } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'login first',
            });
        }
        const reviewObject = { productId, userId, name, rating, comment: reviewContent };
        const review = new Reviews(reviewObject);

        const product = await Product.findById(productId)
            .populate({
                path: 'reviews',
                options: { sort: { createdAt: -1 } },
            })
            .exec();
        let userExist = false;
        product.reviews.forEach((element) => {
            if (element.userId.toString() === userId) {
                userExist = true;
            }
        });
        if (userExist) {
            res.status(200).json({
                success: true,
                message: 'user exists',
            });
            return;
        }
        if (product) {
          
            product.reviews.push(review._id);
            product.save((err) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'There is an error saving reviews in the product model',
                    });
                } else {
                    review.save((err) => {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: 'There is an error saving reviews to review model',
                            });
                        } else {
                            return res.status(200).json({
                                success: true,
                                message: 'The review is successfully submitted',
                            });
                        }
                    });
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'There is no product with that ID',
            });
        }
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: "There's an error in your post request" });
    }
};

const getReviews = (req, res) => {
    const { productId } = req.params;
    try {
        Reviews.find({ productId: productId })
            .sort({ createdAt: -1 })
            .exec((err, result) => {
                if (!err) {
                    res.status(201).json({ success: true, reviews: result });
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Fetching reviews went wrong',
                    });
                }
            });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'There is an error fetching reviews of this product',
        });
    }
};

module.exports = { postReviewController, getReviews };
