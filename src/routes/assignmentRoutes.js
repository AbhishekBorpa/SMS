const express = require('express');
const router = express.Router();
const { 
    createAssignment, 
    getAssignments, 
    getAssignmentById,
    updateAssignment,
    deleteAssignment 
} = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.route('/')
    .post(protect, adminOrTeacher, createAssignment)
    .get(protect, getAssignments);

router.route('/:id')
    .get(protect, getAssignmentById)
    .put(protect, adminOrTeacher, updateAssignment)
    .delete(protect, adminOrTeacher, deleteAssignment);

module.exports = router;
