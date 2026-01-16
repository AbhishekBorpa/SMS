const asyncHandler = require('express-async-handler');
const Assignment = require('../models/Assignment');

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
    // If Teacher, separate logic if needed (e.g. only their created ones)
    // But usually techers want to see all or just theirs. 
    // If Student, maybe filter by their grade? For now, list all for simplicity or modify later.

    const assignments = await Assignment.find(query)
        .populate('teacher', 'name')
        .sort({ dueDate: 1 });

    res.json(assignments);
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
    deleteAssignment
};
