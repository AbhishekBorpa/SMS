const express = require('express');
const router = express.Router();
const { uploadMark, getMarks } = require('../controllers/markController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.post('/', protect, adminOrTeacher, uploadMark);
router.get('/', protect, getMarks);

module.exports = router;
