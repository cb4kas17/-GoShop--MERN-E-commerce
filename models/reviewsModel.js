const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        name: { type: String, require: true },
        productId: { type: String, require: true },
        comment: { type: String },
        rating: { type: Number, require: true },
    },
    { timestamps: true }
);
const Reviews = mongoose.model('reviews', reviewSchema);
module.exports = Reviews;
