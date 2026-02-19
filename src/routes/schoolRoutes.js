const express = require('express');
const router = express.Router();
const { registerSchool, getSchools, getSchoolBySlug, getSubscriptionStatus, upgradeSubscription } = require('../controllers/schoolController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerSchool);
router.get('/', getSchools);
router.get('/:slug', getSchoolBySlug);

router.get('/subscription/status', protect, admin, getSubscriptionStatus);
router.post('/subscription/upgrade', protect, admin, upgradeSubscription);

module.exports = router;
