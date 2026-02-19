const express = require('express');
const router = express.Router();
const { registerSchool, getSchools, getSchoolBySlug } = require('../controllers/schoolController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerSchool);
router.get('/', getSchools);
router.get('/:slug', getSchoolBySlug);

module.exports = router;
