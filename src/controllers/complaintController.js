const asyncHandler = require('express-async-handler');
const Complaint = require('../models/Complaint');

// @desc    Submit a complaint (Teacher/Student)
// @route   POST /api/complaints
// @access  Private
const submitComplaint = asyncHandler(async (req, res) => {
    const { title, description, isAnonymous } = req.body;

    const complaint = await Complaint.create({
        user: isAnonymous ? null : req.user._id,
        title,
        description,
        isAnonymous,
        school: req.schoolId
    });

    res.status(201).json(complaint);
});

// @desc    Get all complaints (Admin)
// @route   GET /api/complaints
// @access  Private (Admin)
const getComplaints = asyncHandler(async (req, res) => {
    const complaints = await Complaint.find({ school: req.schoolId })
        .populate('user', 'name email role')
        .sort({ createdAt: -1 });
    res.json(complaints);
});

// @desc    Resolve a complaint (Admin)
// @route   PUT /api/complaints/:id
// @access  Private (Admin)
const resolveComplaint = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findOne({ _id: req.params.id, school: req.schoolId });

    if (complaint) {
        complaint.status = 'Resolved';
        await complaint.save();
        res.json(complaint);
    } else {
        res.status(404);
        throw new Error('Complaint not found');
    }
});

module.exports = {
    submitComplaint,
    getComplaints,
    resolveComplaint
};
