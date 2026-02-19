const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail'); // Import sendEmail utility

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }

    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role: 'Student' // Default new registrations to 'Student' role
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            mobileNumber: user.mobileNumber,
            address: user.address,
            feeStatus: user.feeStatus,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }

    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            mobileNumber: user.mobileNumber,
            address: user.address,
            feeStatus: user.feeStatus,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            mobileNumber: user.mobileNumber,
            address: user.address,
            feeStatus: user.feeStatus,
            feeAmount: user.feeAmount,
            feeDueDate: user.feeDueDate
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Change user password
// @route   POST /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findOne({ _id: req.user._id, school: req.schoolId });

    if (user && (await user.matchPassword(currentPassword))) {
        user.password = newPassword;
        user.isPasswordResetRequired = false;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } else {
        res.status(401);
        throw new Error('Invalid current password');
    }
});

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        // Send a generic success message to prevent email enumeration
        return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false }); // Bypass validation as we're only updating token fields

    // Create reset URL
    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetURL}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Token',
            message
        });

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (err) {
        console.error(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500);
        throw new Error('Email could not be sent');
    }
});

// @desc    Reset Password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }

    // Hash URL token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired reset token');
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.isPasswordResetRequired = false; // Ensure this is set to false after reset

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
    changePassword,
    forgotPassword,
    resetPassword, // Add resetPassword
};
