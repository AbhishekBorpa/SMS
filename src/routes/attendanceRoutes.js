const express = require('express');
const router = express.Router();
const { takeAttendance, getAttendance, getStudentAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.post('/', protect, adminOrTeacher, takeAttendance);
router.get('/student/:studentId', protect, getStudentAttendance); // New specific route
router.get('/:classId', protect, getAttendance);

module.exports = router;
