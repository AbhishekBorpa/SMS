const express = require('express');
const router = express.Router();
const { enrollCourse, completeLesson, getMyCourses } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:courseId', protect, enrollCourse);
router.put('/lesson-complete', protect, completeLesson);
router.get('/my-courses', protect, getMyCourses);

module.exports = router;
