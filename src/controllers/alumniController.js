const asyncHandler = require('express-async-handler');
const Alumni = require('../models/Alumni');
const { logAction } = require('./auditController');

// @desc    Get all alumni
// @route   GET /api/alumni
// @access  Private
const getAlumni = asyncHandler(async (req, res) => {
    const alumni = await Alumni.find({ school: req.schoolId }).sort({ graduationYear: -1, name: 1 });
    res.json(alumni);
});

// @desc    Add new alumni
// @route   POST /api/alumni
// @access  Private (Admin)
const addAlumni = asyncHandler(async (req, res) => {
    const { name, email, mobileNumber, graduationYear, currentCompany, designation, linkedInProfile } = req.body;

    const alumni = await Alumni.create({
        name,
        email,
        mobileNumber,
        graduationYear,
        currentCompany,
        designation,
        linkedInProfile,
        school: req.schoolId
    });

    if (alumni) {
        await logAction({
            action: 'ADD_ALUMNI',
            entity: 'Alumni',
            entityId: alumni._id,
            details: { name, year: graduationYear },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(alumni);
    } else {
        res.status(400);
        throw new Error('Invalid alumni data');
    }
});

module.exports = {
    getAlumni,
    addAlumni,
};
