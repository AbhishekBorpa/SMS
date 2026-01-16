const express = require('express');
const router = express.Router();
const { getLessonPlans, addLessonPlan, updateLessonPlan } = require('../controllers/plannerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getLessonPlans)
    .post(protect, addLessonPlan);

router.put('/:id', protect, updateLessonPlan);

module.exports = router;
