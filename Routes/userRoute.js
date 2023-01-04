const express = require('express');
const router = express.Router();
// import the isAuth middleware
const isAuth = require('../middleware/isAuth');
const {
    registerUser,
    loginUser,
    getUserDetails,
    updateProfile,
    getUsers,
    deleteUser,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:userId', isAuth, getUserDetails);
router.post('/:userId', isAuth, updateProfile);
router.get('/', isAuth, getUsers);
router.delete('/:userId', isAuth, deleteUser);

module.exports = router;
