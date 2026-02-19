const asyncHandler = require('express-async-handler');
const StudentLeave = require('../models/StudentLeave');
const { logAction } = require('./auditController');

// @desc    Get my leave applications
// @route   GET /api/student-leave
// @access  Private (Student)
const getMyLeaves = asyncHandler(async (req, res) => {
    const leaves = await StudentLeave.find({ student: req.user._id, school: req.schoolId }).sort({ createdAt: -1 });
    res.json(leaves);
});

// @desc    Apply for leave
// @route   POST /api/student-leave
// @access  Private (Student)
const applyForLeave = asyncHandler(async (req, res) => {
    const { startDate, endDate, reason, type } = req.body;

    const leave = await StudentLeave.create({
        student: req.user._id,
        startDate,
        endDate,
        reason,
        type,
        school: req.schoolId
    });

    if (leave) {
        await logAction({
            action: 'APPLY_LEAVE',
            entity: 'StudentLeave',
            entityId: leave._id,
            details: { type, startDate, endDate },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(leave);
    } else {
        res.status(400);
        throw new Error('Invalid leave data');
    }
});

// @desc    (Admin/Teacher) Get all pending leaves
// @route   GET /api/student-leave/pending
// @access  Private (Admin/Teacher)
const getPendingLeaves = asyncHandler(async (req, res) => {
    const leaves = await StudentLeave.find({ status: 'Pending', school: req.schoolId })
        .populate('student', 'name email') // Removed 'className' as it's not on User model
        .sort({ createdAt: 1 });
    res.json(leaves);
});

module.exports = {
    getMyLeaves,
    applyForLeave,
    getPendingLeaves,
};
