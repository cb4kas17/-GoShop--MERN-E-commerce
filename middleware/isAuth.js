const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const isAuth = async (req, res, next) => {
    // verify authentication
    // getting the authorization from the headers
    const { authorization } = req.headers;
    // throw an error if there is none
    if (!authorization) {
        return res.status(401).json({ success: false, message: 'Authorization token required' });
    }
    // If it exists, split it because it is formed like this 'Bearer token'
    // Just get the token so we will split and get the 2nd value of an array
    const token = authorization.split(' ')[1];
    try {
        // We will use jwt to verify the token and get a data from it like _id
        const { _id } = await jwt.verify(token, process.env.SECRET);
        // we will find if the user exist in our database
        const user = await User.findOne({ _id }).select('_id');
        // throw an error if the user does not exist
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        // assign a req.user for the next middleware or we can manipulate it in controller
        // we could use it as a data for verification later
        req.user = user;
        // this is important because we will call next() in order for the API to continue
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized request' });
    }
};
module.exports = isAuth;
