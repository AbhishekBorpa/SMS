const asyncHandler = require('express-async-handler');
const Assignment = require('../models/Assignment');
const Class = require('../models/Class'); // Import Class model

// @desc    Create an assignment (Teacher)
// @route   POST /api/assignments
// @access  Private (Teacher)
const createAssignment = asyncHandler(async (req, res) => {
    const { title, description, subject, grade, dueDate } = req.body;

    const assignment = await Assignment.create({
        title,
        description,
        subject,
        grade,
        dueDate,
        teacher: req.user._id,
        school: req.schoolId
    });

    res.status(201).json(assignment);
});

// @desc    Get assignments (Teacher/Student)
// @route   GET /api/assignments
// @access  Private
const getAssignments = asyncHandler(async (req, res) => {
    let query = { school: req.schoolId };

    // If the user is a student, filter assignments by their enrolled classes' names
    if (req.user.role === 'Student') {
        const studentClasses = await Class.find({ students: req.user._id, school: req.schoolId }).select('name');
        if (studentClasses.length > 0) {
            const classNames = studentClasses.map(c => c.name);
            query.grade = { $in: classNames };
        } else {
            // If student is not in any class, they have no assignments
            return res.json([]);
        }
    }
    // Future enhancement for Teachers: filter by their own assignments
    // else if (req.user.role === 'Teacher' && req.query.mine === 'true') {
    //     query.teacher = req.user._id;
    // }

    const assignments = await Assignment.find(query)
        .populate('teacher', 'name')
        .sort({ dueDate: 1 });

    res.json(assignments);
});

// @desc    Get an assignment by ID
// @route   GET /api/assignments/:id
// @access  Private
const getAssignmentById = asyncHandler(async (req, res) => {
    const assignment = await Assignment.findOne({ _id: req.params.id, school: req.schoolId })
        .populate('teacher', 'name');

    if (assignment) {
        res.json(assignment);
    } else {
        res.status(404);
        throw new Error('Assignment not found');
    }
});

// @desc    Update an assignment
// @route   PUT /api/assignments/:id
// @access  Private (Teacher Only)
const updateAssignment = asyncHandler(async (req, res) => {
    const { title, description, subject, grade, dueDate } = req.body;

    const assignment = await Assignment.findOne({ _id: req.params.id, school: req.schoolId });

    if (assignment) {
        if (assignment.teacher.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
            res.status(401);
            throw new Error('Not authorized to update this assignment');
        }

        assignment.title = title || assignment.title;
        assignment.description = description || assignment.description;
        assignment.subject = subject || assignment.subject;
        assignment.grade = grade || assignment.grade;
        assignment.dueDate = dueDate || assignment.dueDate;

        const updatedAssignment = await assignment.save();
        res.json(updatedAssignment);
    } else {
        res.status(404);
        throw new Error('Assignment not found');
    }
});

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private (Teacher Only)
const deleteAssignment = asyncHandler(async (req, res) => {
    const assignment = await Assignment.findOne({ _id: req.params.id, school: req.schoolId });

    if (assignment) {
        if (assignment.teacher.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
            res.status(401);
            throw new Error('Not authorized to delete this assignment');
        }
        await assignment.deleteOne();
        res.json({ message: 'Assignment removed' });
    } else {
        res.status(404);
        throw new Error('Assignment not found');
    }
});

module.exports = {
    createAssignment,
    getAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
};
