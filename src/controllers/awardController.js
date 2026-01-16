const asyncHandler = require('express-async-handler');
const Award = require('../models/Award');
const User = require('../models/User');

// @desc    Award a badge to a student
// @route   POST /api/awards
// @access  Private/Teacher
const createAward = asyncHandler(async (req, res) => {
    const { studentId, title, category, icon, color } = req.body;

    const student = await User.findOne({ _id: studentId, school: req.schoolId });
    if (!student || student.role !== 'Student') {
        res.status(400);
        throw new Error('Invalid student ID or student belongs to another school');
    }

    const award = await Award.create({
        student: studentId,
        teacher: req.user._id,
        title,
        category,
        icon,
        color,
        school: req.schoolId
    });

    res.status(201).json(award);
});

// @desc    Get my awards (Student)
// @route   GET /api/awards/private
// @access  Private/Student
const getMyAwards = asyncHandler(async (req, res) => {
    const awards = await Award.find({ student: req.user._id, school: req.schoolId })
        .populate('teacher', 'name')
        .sort({ date: -1 });
    res.json(awards);
});

// @desc    Get awards by student ID (Admin/Teacher)
// @route   GET /api/awards/student/:id
// @access  Private/Admin/Teacher
const getStudentAwards = asyncHandler(async (req, res) => {
    const awards = await Award.find({ student: req.params.id, school: req.schoolId })
        .populate('teacher', 'name')
        .sort({ date: -1 });
    res.json(awards);
});

module.exports = {
    createAward,
    getMyAwards,
    getStudentAwards
};
