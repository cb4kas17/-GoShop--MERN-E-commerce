const express = require('express');
const router = express.Router();
const { postReviewController, getReviews } = require('../controllers/reviewsController');
router.post('/', postReviewController);
router.get('/:productId', getReviews);

module.exports = router;
