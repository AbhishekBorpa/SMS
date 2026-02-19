const express = require('express');
const router = express.Router();
const { chatWithAI, analyzePerformance, generateLessonPlan, generateQuiz, generateTimetable } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, chatWithAI);
router.get('/analyze', protect, analyzePerformance);
router.get('/analyze/:studentId', protect, analyzePerformance);

router.post('/lesson-plan', protect, generateLessonPlan);
router.post('/quiz', protect, generateQuiz);
router.post('/timetable', protect, generateTimetable);

module.exports = router;
