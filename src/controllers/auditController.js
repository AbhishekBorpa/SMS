const asyncHandler = require('express-async-handler');
const AuditLog = require('../models/AuditLog');

// @desc    Get all audit logs
// @route   GET /api/audit
// @access  Admin
const getAuditLogs = asyncHandler(async (req, res) => {
    const logs = await AuditLog.find({ school: req.schoolId })
        .populate('performedBy', 'name email role')
        .sort({ createdAt: -1 })
        .limit(100); // Limit to last 100 for performance
    res.json(logs);
});

// @desc    Log an action (Internal Helper)
const logAction = async ({ action, entity, entityId, details, performedBy, req }) => {
    try {
        await AuditLog.create({
            action,
            entity,
            entityId,
            details,
            performedBy,
            school: req?.schoolId || req?.user?.school,
            ipAddress: req?.ip || 'Unknown',
            userAgent: req?.get('User-Agent') || 'Unknown',
        });
    } catch (error) {
        console.error('Audit Log Error:', error);
        // Don't fail the request if logging fails
    }
};

module.exports = {
    getAuditLogs,
    logAction,
};
