const express = require('express');
const router = express.Router();
const { submitAssignment, getMySubmission, getSubmissionsForAssignment, gradeSubmission } = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, submitAssignment);
router.get('/my/:assignmentId', protect, getMySubmission);
router.get('/assignment/:assignmentId', protect, getSubmissionsForAssignment);
router.put('/:id/grade', protect, gradeSubmission);

module.exports = router;
