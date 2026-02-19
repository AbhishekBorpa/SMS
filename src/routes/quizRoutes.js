const express = require('express');
const router = express.Router();
const {
    createQuiz,
    getQuizzesAvailable,
    getQuizById,
    submitQuiz,
    getAllQuizzes,
    getLeaderboard
} = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.post('/', protect, adminOrTeacher, createQuiz);
router.get('/', protect, getAllQuizzes);
router.get('/leaderboard/global', protect, getLeaderboard);
router.get('/available', protect, getQuizzesAvailable);
router.get('/:id', protect, getQuizById);
router.post('/:id/submit', protect, submitQuiz);

module.exports = router;
