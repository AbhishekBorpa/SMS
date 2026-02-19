const express = require('express');
const router = express.Router();
const { addRemark, getRemarks, getMyRemarks } = require('../controllers/remarkController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.post('/', protect, adminOrTeacher, addRemark);
router.get('/my', protect, getMyRemarks); // Route order matters! Specific paths first.
router.get('/:studentId', protect, getRemarks);

module.exports = router;
