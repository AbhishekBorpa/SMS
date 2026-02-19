const express = require('express');
const router = express.Router();
const { getStudentReportCard } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

router.get('/card', protect, getStudentReportCard);

module.exports = router;
