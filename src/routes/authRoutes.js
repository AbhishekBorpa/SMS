const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser, loginUser, getMe, changePassword, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit'); // Import rateLimit

// Specific rate limiter for authentication routes (e.g., login, register)
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many authentication attempts from this IP, please try again after 5 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post('/register', authLimiter, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], registerUser);

router.post('/login', authLimiter, [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], loginUser);

router.post('/change-password', protect, changePassword);

router.post('/forgot-password', authLimiter, [
    check('email', 'Please include a valid email').isEmail()
], forgotPassword);

router.put('/reset-password/:resetToken', authLimiter, [
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], resetPassword);

router.get('/me', protect, getMe);

module.exports = router;
