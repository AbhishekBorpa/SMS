const express = require('express');
const router = express.Router();
const { getPlatformStats, getAllSchools, getGlobalAuditLogs } = require('../controllers/companyController');

router.get('/stats', getPlatformStats);
router.get('/schools', getAllSchools);
router.get('/audit-logs', getGlobalAuditLogs);

module.exports = router;
