const asyncHandler = require('express-async-handler');
const Exam = require('../models/Exam');
const Mark = require('../models/Mark');

// @desc    Create a new exam
// @route   POST /api/exams
// @access  Private/Teacher/Admin
const createExam = asyncHandler(async (req, res) => {
    const { title, classId, subject, date, startTime, endTime, totalMarks, syllabus } = req.body;

    const exam = await Exam.create({
        title,
        school: req.schoolId,
        class: classId,
        subject,
        date,
        startTime,
        endTime,
        totalMarks,
        syllabus
    });

    res.status(201).json(exam);
});

// @desc    Get exams for a class
// @route   GET /api/exams/class/:classId
// @access  Private
const getClassExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find({ class: req.params.classId, school: req.schoolId })
        .sort({ date: 1 });
    res.json(exams);
});

// @desc    Get all exams (Admin)
// @route   GET /api/exams
// @access  Private/Admin
const getAllExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find({ school: req.schoolId })
        .populate('class', 'name')
        .sort({ date: -1 });
    res.json(exams);
});

// @desc    Publish exam results
// @route   PUT /api/exams/:id/publish
// @access  Private/Teacher/Admin
const publishExam = asyncHandler(async (req, res) => {
    const exam = await Exam.findOne({ _id: req.params.id, school: req.schoolId });

    if (exam) {
        exam.status = 'Published';
        await exam.save();
        res.json(exam);
    } else {
        res.status(404);
        throw new Error('Exam not found');
    }
});

module.exports = {
    createExam,
    getClassExams,
    getAllExams,
    publishExam
};
