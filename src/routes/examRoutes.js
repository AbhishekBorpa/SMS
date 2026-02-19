const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');
const {
    createExam,
    getClassExams,
    getAllExams,
    publishExam
} = require('../controllers/examController');

router.route('/')
    .post(protect, adminOrTeacher, createExam)
    .get(protect, admin, getAllExams);

router.route('/class/:classId')
    .get(protect, getClassExams);

router.route('/:id/publish')
    .put(protect, adminOrTeacher, publishExam);

module.exports = router;
