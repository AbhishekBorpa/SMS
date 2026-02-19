const asyncHandler = require('express-async-handler');
const BehaviorRecord = require('../models/BehaviorRecord');
const User = require('../models/User');
const { logAction } = require('./auditController');

// @desc    Get student behavior history
// @route   GET /api/behavior/student/:id
// @access  Private (Teacher/Parent/Student)
const getStudentBehavior = asyncHandler(async (req, res) => {
    const records = await BehaviorRecord.find({ student: req.params.id, school: req.schoolId })
        .populate('teacher', 'name')
        .sort({ date: -1 });

    const totalPoints = records.reduce((acc, curr) => acc + curr.points, 0);

    res.json({ totalPoints, history: records });
});

// @desc    Add behavior points
// @route   POST /api/behavior
// @access  Private (Teacher)
const addBehaviorPoints = asyncHandler(async (req, res) => {
    const { studentId, points, category, reason } = req.body;

    const record = await BehaviorRecord.create({
        student: studentId,
        teacher: req.user._id,
        points,
        category,
        reason,
        school: req.schoolId
    });

    if (record) {
        // Optionally update a totalPoints field on User model if performance is needed, 
        // but calculating on fly is fine for now.

        await logAction({
            action: 'ADD_BEHAVIOR_POINTS',
            entity: 'BehaviorRecord',
            entityId: record._id,
            details: { points, category, studentId },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(record);
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
});

module.exports = {
    getStudentBehavior,
    addBehaviorPoints,
};
