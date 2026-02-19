const express = require('express');
const router = express.Router();
console.log('Stats Routes Loaded');
router.use((req, res, next) => {
    console.log('Stats Route Hit:', req.originalUrl);
    next();
});
const { getStats, getTeacherStats, getSchoolAnalytics } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

router.get('/', protect, adminOnly, getStats);
router.get('/analytics', protect, adminOnly, getSchoolAnalytics);
router.get('/teacher/:id', protect, adminOnly, getTeacherStats);

module.exports = router;
