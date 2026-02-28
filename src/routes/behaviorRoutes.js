const express = require('express');
const router = express.Router();
const { getStudentBehavior, addBehaviorPoints, getMyBehavior } = require('../controllers/behaviorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, getMyBehavior);
router.get('/student/:id', protect, getStudentBehavior);
router.post('/', protect, addBehaviorPoints);

module.exports = router;
