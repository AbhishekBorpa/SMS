const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, updateCourse } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.route('/')
    .get(protect, getCourses)
    .post(protect, adminOrTeacher, createCourse);

router.route('/:id')
    .get(protect, getCourseById)
    .put(protect, adminOrTeacher, updateCourse);

module.exports = router;
