const express = require('express');
const router = express.Router();
const { getLessonPlans, addLessonPlan, updateLessonPlan, deleteLessonPlan } = require('../controllers/plannerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getLessonPlans)
    .post(protect, addLessonPlan);

router.route('/:id')
    .put(protect, updateLessonPlan)
    .delete(protect, deleteLessonPlan);

module.exports = router;
