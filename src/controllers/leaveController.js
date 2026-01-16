const asyncHandler = require('express-async-handler');
const Leave = require('../models/Leave');

// @desc    Apply for leave (Teacher)
// @route   POST /api/leaves
// @access  Private (Teacher)
const applyLeave = asyncHandler(async (req, res) => {
    const { leaveType, startDate, endDate, reason } = req.body;

    const leave = await Leave.create({
        teacher: req.user._id,
        leaveType,
        startDate,
        endDate,
        reason,
        school: req.schoolId
    });

    res.status(201).json(leave);
});

// @desc    Get all leaves (Admin) or My Leaves (Teacher)
// @route   GET /api/leaves
// @access  Private
const getLeaves = asyncHandler(async (req, res) => {
    let query = { school: req.schoolId };

    // If Teacher, only show their leaves
    if (req.user.role === 'Teacher') {
        query.teacher = req.user._id;
    }

    const leaves = await Leave.find(query)
        .populate('teacher', 'name email')
        .sort({ createdAt: -1 });

    res.json(leaves);
});

// @desc    Update leave status (Admin)
// @route   PUT /api/leaves/:id
// @access  Private (Admin)
const updateLeaveStatus = asyncHandler(async (req, res) => {
    const { status } = req.body; // 'Approved' or 'Rejected'
    const leave = await Leave.findOne({ _id: req.params.id, school: req.schoolId });

    if (leave) {
        leave.status = status;
        await leave.save();
        res.json(leave);
    } else {
        res.status(404);
        throw new Error('Leave request not found');
    }
});

module.exports = {
    applyLeave,
    getLeaves,
    updateLeaveStatus
};
