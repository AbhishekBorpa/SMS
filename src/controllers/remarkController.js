const asyncHandler = require('express-async-handler');
const Remark = require('../models/Remark');

// @desc    Add a remark for a student (Teacher)
// @route   POST /api/remarks
// @access  Private (Teacher)
const addRemark = asyncHandler(async (req, res) => {
    const { studentId, title, description } = req.body;

    const remark = await Remark.create({
        student: studentId,
        teacher: req.user._id,
        title,
        description,
        school: req.schoolId
    });

    res.status(201).json(remark);
});

// @desc    Get remarks for a student (Teacher/Student/Parent)
// @route   GET /api/remarks/:studentId
// @access  Private
const getRemarks = asyncHandler(async (req, res) => {
    // If student, can only view own. If teacher, can view any.
    if (req.user.role === 'Student' && req.params.studentId !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view these remarks');
    }

    const remarks = await Remark.find({ student: req.params.studentId, school: req.schoolId })
        .populate('teacher', 'name')
        .sort({ createdAt: -1 });

    res.json(remarks);
});

// @desc    Get my remarks (Student shortcut)
// @route   GET /api/remarks/my
// @access  Private (Student)
const getMyRemarks = asyncHandler(async (req, res) => {
    const remarks = await Remark.find({ student: req.user._id, school: req.schoolId })
        .populate('teacher', 'name')
        .sort({ createdAt: -1 });
    res.json(remarks);
});

module.exports = {
    addRemark,
    getRemarks,
    getMyRemarks
};
