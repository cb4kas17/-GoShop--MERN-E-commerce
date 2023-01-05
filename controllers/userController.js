const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const User = require('../models/userModel');
const Token = require('../models//tokenModel');
const createToken = (_id, name, email, role) => {
    return jwt.sign({ _id, name, email, role }, process.env.SECRET, { expiresIn: '1d' });
};
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

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
        const user = await User.create({ name, email, password: hash, role });

        // creating a token after account creation
        const token = createToken(user._id, name, email, role);
        if (user) {
            return res.status(201).json({
                success: true,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    token: token,
                },
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
                const token = createToken(user._id, user.name, email, user.role);
                // sending a response
                return res.status(200).json({
                    success: true,
                    user: {
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        token: token,
                    },
                });
            }
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
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

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            throw Error('Provide email');
        }
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid');
        }
        let user = await User.findOne({ email });
        if (!user) {
            throw Error('email address does not exists');
        }
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save();
        }
        const url = `http://localhost:3000/password-reset/${user._id}/${token.token}/`;
        // const url = `${process.env.PORT}password-reset/${user._id}/${token.token}/`;
        await sendEmail(user.email, 'Password Reset', url);
        res.status(200).json({ message: 'Password reset link sent to your email account' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const verifyResetToken = async (req, res) => {
    const { id, resetToken } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) return res.status(400).send({ message: 'Invalid link/token' });
        const token = await Token.findOne({
            userId: user._id,
            token: resetToken,
        });
        if (!token) return res.status(400).send({ message: 'Invalid link/token' });

        res.status(200).send('valid reset token');
    } catch (error) {
        res.status(500).send({ message: 'There is an error occured' });
    }
};

const resetPassword = async (req, res) => {
    const { id, resetToken } = req.params;
    const { newPassword } = req.body;
    try {
        if (!validator.isStrongPassword(newPassword)) {
            throw Error('Password not strong enough');
        }
        const user = await User.findOne({ _id: id });
        if (!user) {
            throw Error('Invalid link/token');
        }
        const token = await Token.findOne({
            userId: user._id,
            token: resetToken,
        });
        if (!token) {
            throw Error('Invalid link/token');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        await token.remove();
        res.status(200).send({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
module.exports = {
    registerUser,
    loginUser,
    getUserDetails,
    updateProfile,
    getUsers,
    deleteUser,
    forgotPassword,
    verifyResetToken,
    resetPassword,
};
