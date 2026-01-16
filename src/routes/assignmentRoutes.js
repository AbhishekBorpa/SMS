const express = require('express');
const router = express.Router();
const { createAssignment, getAssignments, deleteAssignment } = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.post('/', protect, adminOrTeacher, createAssignment);
router.get('/', protect, getAssignments);
router.delete('/:id', protect, adminOrTeacher, deleteAssignment);

module.exports = router;
