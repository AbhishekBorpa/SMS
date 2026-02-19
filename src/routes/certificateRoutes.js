const express = require('express');
const router = express.Router();
const { getCourseCertificate } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:courseId', protect, getCourseCertificate);

module.exports = router;
