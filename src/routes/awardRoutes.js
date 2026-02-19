const express = require('express');
const router = express.Router();
const { createAward, getMyAwards, getStudentAwards } = require('../controllers/awardController');
const { protect } = require('../middleware/authMiddleware');

const teacher = (req, res, next) => {
    if (req.user && req.user.role === 'Teacher') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as a teacher');
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

router.route('/')
    .post(protect, teacher, createAward);

router.get('/my', protect, getMyAwards);
router.get('/student/:id', protect, adminOrTeacher, getStudentAwards);

module.exports = router;
