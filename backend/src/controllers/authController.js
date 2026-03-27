const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

// Register
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        let { name, email, password } = req.body;

        name = name.trim();
        email = email.toLowerCase().trim();

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        res.status(201).json({
            success: true,
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            }
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Login
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        let { email, password } = req.body;

        email = email.toLowerCase().trim();

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        res.json({
            success: true,
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, data: user });

    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Update Profile
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        let { name, email, password } = req.body;

        if (email && email !== user.email) {
            const exists = await User.findOne({ email: email.toLowerCase().trim() });
            if (exists) {
                return res.status(400).json({ success: false, error: 'Email already in use' });
            }
            user.email = email.toLowerCase().trim();
        }

        if (name) user.name = name.trim();
        if (password) user.password = password;

        const updatedUser = await user.save();

        res.json({
            success: true,
            data: {
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                token: generateToken(updatedUser._id),
            }
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, error: 'Server error updating profile' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
};