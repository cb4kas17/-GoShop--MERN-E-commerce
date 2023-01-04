const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../models/userModel');
const createToken = (_id, name, email) => {
    return jwt.sign({ _id, name, email }, process.env.SECRET, { expiresIn: '1d' });
};
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!email && !name && !password) {
            throw Error('All fields must be filled');
        }
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid');
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough');
        }
        const userFound = await User.findOne({ email: email });
        if (userFound) {
            throw Error('email exists');
        }
        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Creating a user in user model
        const user = await User.create({ name, email, password: hash });

        // creating a token after account creation
        const token = createToken(user._id, name, email);
        if (user) {
            return res.status(201).json({
                success: true,
                user: { _id: user._id, email: user.email, name: user.name, token: token },
            });
        } else {
            throw Error('registering the user failed');
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // validation
        if (!email && !password) {
            throw Error('All fields must be filled');
        }
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid');
        }

        // check if the email is correct
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            throw Error('Email does not exists');
        } else {
            // check if the password is correct by bcrypt.compare()
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw Error('Password is invalid');
            } else {
                // creating a token
                const token = createToken(user._id, user.name, email);
                // sending a response
                return res.status(200).json({
                    success: true,
                    user: { _id: user._id, email: user.email, name: user.name, token: token },
                });
            }
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }

    // User.findOne({ email: email }, (err, result) => {
    //     if (err) {
    //         return res.status(400).json({ success: false, message: 'error' });
    //     }
    //     if (result) {
    //         if (result.password === password) {
    //             return res.status(201).json({
    //                 success: true,
    //                 data: { name: result.name, email: result.email, _id: result._id },
    //             });
    //         } else {
    //             return res
    //                 .status(200)
    //                 .json({ success: false, message: 'email or password does not exists' });
    //         }
    //     } else {
    //         return res
    //             .status(200)
    //             .json({ success: false, message: 'email or password does not exists' });
    //     }
    // });
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
                user: { name: result.name, email: result.email, _id: result._id },
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
                        user: { name: docs.name, email: docs.email, _id: docs._id },
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
