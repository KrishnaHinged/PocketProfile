const express = require('express');
const { check } = require('express-validator');
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email required').isEmail(),
    check('password', 'Min 6 characters').isLength({ min: 6 })
], registerUser);

router.post('/login', [
    check('email', 'Valid email required').isEmail(),
    check('password', 'Password required').exists()
], loginUser);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;