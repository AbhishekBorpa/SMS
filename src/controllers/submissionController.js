const asyncHandler = require('express-async-handler');
const AssignmentSubmission = require('../models/AssignmentSubmission');
const Assignment = require('../models/Assignment');

// @desc    Submit an assignment
// @route   POST /api/submissions
// @access  Private (Student)
const submitAssignment = asyncHandler(async (req, res) => {
    const { assignmentId, fileUrl, fileName } = req.body;

    const assignment = await Assignment.findOne({ _id: assignmentId, school: req.schoolId });
    if (!assignment) {
        res.status(404);
        throw new Error('Assignment not found');
    }

    // Check if already submitted
    const existingSubmission = await AssignmentSubmission.findOne({
        assignment: assignmentId,
        student: req.user._id,
        school: req.schoolId
    });

    if (existingSubmission) {
        // Update existing submission
        existingSubmission.fileUrl = fileUrl;
        existingSubmission.fileName = fileName;
        existingSubmission.submittedAt = Date.now();
        const updatedSubmission = await existingSubmission.save();
        res.status(200).json(updatedSubmission);
    } else {
        // Create new submission
        const submission = await AssignmentSubmission.create({
            assignment: assignmentId,
            student: req.user._id,
            fileUrl,
            fileName,
            school: req.schoolId
        });
        res.status(201).json(submission);
    }
});

// @desc    Get my submission for an assignment
// @route   GET /api/submissions/my/:assignmentId
// @access  Private (Student)
const getMySubmission = asyncHandler(async (req, res) => {
    const submission = await AssignmentSubmission.findOne({
        assignment: req.params.assignmentId,
        student: req.user._id,
        school: req.schoolId
    });

    if (submission) {
        res.json(submission);
    } else {
        res.status(404).json({ message: 'Not submitted yet' });
    }
});

// @desc    Get all submissions for an assignment (Teacher)
// @route   GET /api/submissions/assignment/:assignmentId
// @access  Private (Teacher)
const getSubmissionsForAssignment = asyncHandler(async (req, res) => {
    const submissions = await AssignmentSubmission.find({ assignment: req.params.assignmentId, school: req.schoolId })
        .populate('student', 'name email')
        .sort({ submittedAt: -1 });
    res.json(submissions);
});

// @desc    Grade a submission
// @route   PUT /api/submissions/:id/grade
// @access  Private (Teacher)
const gradeSubmission = asyncHandler(async (req, res) => {
    const { grade, feedback } = req.body;
    const submission = await AssignmentSubmission.findOne({ _id: req.params.id, school: req.schoolId });

    if (submission) {
        submission.grade = grade;
        submission.feedback = feedback;
        submission.status = 'Graded';

        const updatedSubmission = await submission.save();
        res.json(updatedSubmission);
    } else {
        res.status(404);
        throw new Error('Submission not found');
    }
});

module.exports = {
    submitAssignment,
    getMySubmission,
    getSubmissionsForAssignment,
    gradeSubmission
};
