const express = require('express');
const router = express.Router();

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
router.get('/:userId', getUserDetails);
router.post('/:userId', updateProfile);
router.get('/', getUsers);
router.delete('/:userId', deleteUser);

module.exports = router;
