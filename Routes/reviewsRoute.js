const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { postReviewController, getReviews } = require('../controllers/reviewsController');
router.post('/', isAuth, postReviewController);
router.get('/:productId', getReviews);

module.exports = router;
