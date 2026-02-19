const asyncHandler = require('express-async-handler');
const Mark = require('../models/Mark');
const Class = require('../models/Class');

// @desc    Upload marks for a student
// @route   POST /api/marks
// @access  Private (Teacher)
const uploadMark = asyncHandler(async (req, res) => {
    const { classId, studentId, examType, score, total } = req.body;

    // Check if mark exists for this specific exam/class/student
    let mark = await Mark.findOne({
        class: classId,
        student: studentId,
        examType,
        school: req.schoolId
    });

    if (mark) {
        // Update
        mark.score = score;
        mark.total = total;
        await mark.save();
        res.json({ message: 'Mark updated', mark });
    } else {
        // Create
        mark = await Mark.create({
            class: classId,
            student: studentId,
            examType,
            score,
            total,
            school: req.schoolId
        });
        res.status(201).json({ message: 'Mark uploaded', mark });
    }
});

// @desc    Get marks for a class (Teacher view) or Student (Student view)
// @route   GET /api/marks
// @access  Private
const getMarks = asyncHandler(async (req, res) => {
    const { classId, studentId } = req.query;

    let query = { school: req.schoolId };
    if (classId) query.class = classId;
    if (studentId) query.student = studentId;

    // If student is requesting, ensure they only see their own
    if (req.user.role === 'Student') {
        query.student = req.user._id;
    }

    const marks = await Mark.find(query)
        .populate('student', 'name')
        .populate('class', 'name subject');

    res.json(marks);
});

module.exports = {
    uploadMark,
    getMarks
};
