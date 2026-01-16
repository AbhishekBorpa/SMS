const express = require('express');
const router = express.Router();
const { createTeacher, createStudent, getUsers, getDashboardStats, updatePushToken, deleteUser, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Middleware to check for Admin role
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

const adminOrTeacher = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Teacher')) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
};

router.post('/teacher', protect, admin, createTeacher);
router.post('/student', protect, adminOrTeacher, createStudent);
router.get('/', protect, adminOrTeacher, getUsers);
router.get('/stats', protect, admin, getDashboardStats);
router.put('/push-token', protect, updatePushToken);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser);

module.exports = router;
