const express = require('express');
const router = express.Router();
const { protect, admin, teacher } = require('../middleware/authMiddleware');
const {
    createExam,
    getClassExams,
    getAllExams,
    publishExam
} = require('../controllers/examController');

router.route('/')
    .post(protect, teacher, createExam)
    .get(protect, admin, getAllExams);

router.route('/class/:classId')
    .get(protect, getClassExams);

router.route('/:id/publish')
    .put(protect, teacher, publishExam);

module.exports = router;
