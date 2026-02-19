const express = require('express');
const router = express.Router();
const { submitComplaint, getComplaints, resolveComplaint } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

router.post('/', protect, submitComplaint); // Teachers & Students
router.get('/', protect, adminOnly, getComplaints);
router.put('/:id', protect, adminOnly, resolveComplaint);

module.exports = router;
