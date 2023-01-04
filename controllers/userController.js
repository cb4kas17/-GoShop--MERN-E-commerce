const User = require('../models/userModel');

const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    User.find({ email: email }, (err, result) => {
        if (result.length > 0) {
            return res.status(200).json({ success: false, message: 'email exists' });
        } else {
            const newUser = new User({
                name,
                email,
                password,
            });
            newUser.save((err, result) => {
                if (err) {
                    return res.status(400).json({ success: false, message: err.message });
                }

                return res.status(201).json({ success: true, user: result });
            });
        }
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    });
};
const loginUser = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'error' });
        }
        if (result) {
            if (result.password === password) {
                return res.status(201).json({
                    success: true,
                    data: { name: result.name, email: result.email, _id: result._id },
                });
            } else {
                return res
                    .status(200)
                    .json({ success: false, message: 'email or password does not exists' });
            }
        } else {
            return res
                .status(200)
                .json({ success: false, message: 'email or password does not exists' });
        }
    });
};

const getUserDetails = (req, res) => {
    const { userId } = req.params;
    User.findOne({ _id: userId }, (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'No user with that ID' });
        }
        if (result) {
            return res.status(201).json({
                success: true,
                data: { name: result.name, email: result.email, _id: result._id },
            });
        } else {
            return res.status(400).json({ success: false, message: 'Can not fetch user datails' });
        }
    });
};

const updateProfile = (req, res) => {
    const { updatedUserDetails } = req.body;
    const { userId } = req.params;

    User.findOne({ _id: userId }, (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'No user with that ID' });
        } else {
            result.email = updatedUserDetails.email;
            result.name = updatedUserDetails.name;
            result.save((err, docs) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ success: false, message: 'Cannot update user details' });
                } else {
                    return res.status(201).json({
                        success: true,
                        data: { name: docs.name, email: docs.email, _id: docs._id },
                    });
                }
            });
        }
    });
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, null, { select: '_id name email' }).sort({
            createdAt: -1,
        });
        if (users) {
            return res.status(200).json({ success: true, users: users });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Error fetching all users' });
    }
};
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (user) {
            return res.status(200).json({ success: true, message: 'User successfully deleted' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Error deleting the user' });
    }
};

module.exports = { registerUser, loginUser, getUserDetails, updateProfile, getUsers, deleteUser };
