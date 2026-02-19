const asyncHandler = require('express-async-handler');
const Class = require('../models/Class');
const User = require('../models/User');

// @desc    Create a new class
// @route   POST /api/classes
// @access  Private/Admin
const createClass = asyncHandler(async (req, res) => {
    const { name, subject, teacherId, schedule } = req.body;

    const teacher = await User.findOne({ _id: teacherId, school: req.schoolId });
    if (!teacher || teacher.role !== 'Teacher') {
        res.status(400);
        throw new Error('Invalid teacher ID');
    }

    const newClass = await Class.create({
        name,
        subject,
        teacher: teacherId,
        school: req.schoolId,
        schedule
    });

    res.status(201).json(newClass);
});

// @desc    Get classes for logged in teacher
// @route   GET /api/classes/teacher
// @access  Private/Teacher
const getTeacherClasses = asyncHandler(async (req, res) => {
    const classes = await Class.find({ teacher: req.user._id, school: req.schoolId }).populate('students', 'name email mobileNumber');
    res.json(classes);
});

// @desc    Get all classes (Admin)
// @route   GET /api/classes
// @access  Private/Admin
const getAllClasses = asyncHandler(async (req, res) => {
    const classes = await Class.find({ school: req.schoolId }).populate('teacher', 'name email').populate('students', 'name');
    res.json(classes);
});

// @desc    Enroll student in class
// @route   POST /api/classes/:id/enroll
// @access  Private (Admin/Teacher)
const enrollStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.body;
    const classId = req.params.id;

    const classObj = await Class.findOne({ _id: classId, school: req.schoolId });
    if (!classObj) {
        res.status(404);
        throw new Error('Class not found');
    }

    // Check if student exists
    const student = await User.findOne({ _id: studentId, school: req.schoolId });
    if (!student || student.role !== 'Student') {
        res.status(400);
        throw new Error('Invalid student ID');
    }

    // Check if already enrolled
    if (classObj.students.includes(studentId)) {
        res.status(400);
        throw new Error('Student already enrolled');
    }

    classObj.students.push(studentId);
    await classObj.save();

    res.json({ message: 'Student enrolled successfully' });
});

// @desc    Get classes for logged in student
// @route   GET /api/classes/student
// @access  Private/Student
const getStudentClasses = asyncHandler(async (req, res) => {
    const classes = await Class.find({ students: req.user._id, school: req.schoolId }).populate('teacher', 'name email');
    res.json(classes);
});

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
const deleteClass = asyncHandler(async (req, res) => {
    const classObj = await Class.findOne({ _id: req.params.id, school: req.schoolId });

    if (classObj) {
        await classObj.deleteOne();
        res.json({ message: 'Class removed' });
    } else {
        res.status(404);
        throw new Error('Class not found');
    }
});

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private/Admin
const updateClass = asyncHandler(async (req, res) => {
    const classObj = await Class.findOne({ _id: req.params.id, school: req.schoolId });

    if (classObj) {
        classObj.name = req.body.name || classObj.name;
        classObj.subject = req.body.subject || classObj.subject;
        classObj.teacher = req.body.teacherId || classObj.teacher;
        classObj.schedule = req.body.schedule || classObj.schedule;

        const updatedClass = await classObj.save();
        res.json(updatedClass);
    } else {
        res.status(404);
        throw new Error('Class not found');
    }
});

module.exports = {
    createClass,
    getTeacherClasses,
    getStudentClasses,
    getAllClasses,
    enrollStudent,
    deleteClass,
    updateClass
};
