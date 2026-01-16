const express = require('express');
const router = express.Router();
const { getMyLeaves, applyForLeave, getPendingLeaves } = require('../controllers/studentLeaveController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getMyLeaves)
    .post(protect, applyForLeave);

router.get('/pending', protect, getPendingLeaves);

module.exports = router;
