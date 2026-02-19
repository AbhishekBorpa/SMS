const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const School = require('../models/School');
const AuditLog = require('../models/AuditLog');

// @desc    Get global platform statistics (Super Admin)
// @route   GET /api/company/stats
// @access  Public (for demo) or SuperAdmin
const getPlatformStats = asyncHandler(async (req, res) => {
    // 1. Total Active Schools
    const totalSchools = await School.countDocuments({});

    // 2. Total Users (Global)
    const totalUsers = await User.countDocuments({});

    // 3. Estimated MRR (Mock calculation based on plans)
    // In a real app, this would sum actual subscriptions.
    // Assuming avg revenue per school = $500 for now.
    const mrr = totalSchools * 500;

    // 4. Server Mock Data (Since we can't easily measure real CPU in Node.js portable)
    const serverHealth = {
        cpu: Math.floor(Math.random() * 30) + 10, // 10-40%
        memory: Math.floor(Math.random() * 40) + 20, // 20-60%
        uptime: process.uptime()
    };

    res.json({
        schools: totalSchools,
        users: totalUsers,
        mrr,
        serverHealth
    });
});

// @desc    Get all schools with detailed stats
// @route   GET /api/company/schools
// @access  Public (for demo)
const getAllSchools = asyncHandler(async (req, res) => {
    const schools = await School.find({}).lean();

    // Enrich with user counts
    const enrichedSchools = await Promise.all(schools.map(async (s) => {
        const userCount = await User.countDocuments({ school: s._id });
        return {
            ...s,
            users: userCount,
            plan: 'Growth', // Mock default
            status: 'Active', // Mock default
            region: 'Global'
        };
    }));

    res.json(enrichedSchools);
});

// @desc    Get global audit logs
// @route   GET /api/company/audit-logs
// @access  Public (for demo)
const getGlobalAuditLogs = asyncHandler(async (req, res) => {
    const logs = await AuditLog.find({})
        .sort({ createdAt: -1 })
        .limit(20)
        .populate('performedBy', 'name email role')
        .populate('school', 'name');

    res.json(logs);
});

module.exports = {
    getPlatformStats,
    getAllSchools,
    getGlobalAuditLogs
};
