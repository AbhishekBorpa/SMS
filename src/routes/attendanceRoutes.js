const express = require('express');
const router = express.Router();
const { 
    takeAttendance, 
    getAttendance, 
    getStudentAttendance,
    getAttendanceById,
    deleteAttendance
} = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.post('/', protect, adminOrTeacher, takeAttendance);
router.get('/student/:studentId', protect, getStudentAttendance);
router.get('/:classId', protect, getAttendance);
router.route('/:id')
    .get(protect, getAttendanceById)
    .delete(protect, adminOrTeacher, deleteAttendance);

module.exports = router;
