const express = require('express');
const router = express.Router();
const { applyLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

router.post('/', protect, adminOrTeacher, applyLeave);
router.get('/', protect, adminOrTeacher, getLeaves);
router.put('/:id', protect, adminOnly, updateLeaveStatus);

module.exports = router;
