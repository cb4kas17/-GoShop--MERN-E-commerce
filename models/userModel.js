const mongoose = require('mongoose');
const { use } = require('../Routes/userRoute');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
        },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model('user', userSchema);
module.exports = User;
