const asyncHandler = require('express-async-handler');
const School = require('../models/School');
const User = require('../models/User');

// @desc    Register a new school
// @route   POST /api/schools
// @access  Public (or Super Admin)
const registerSchool = asyncHandler(async (req, res) => {
    const { name, slug, contactEmail, adminName, adminEmail, adminPassword } = req.body;

    const schoolExists = await School.findOne({ slug });

    if (schoolExists) {
        res.status(400);
        throw new Error('School with this slug already exists');
    }

    const school = await School.create({
        name,
        slug,
        contactEmail
    });

    if (school) {
        // Create the first admin user for this school
        const adminUser = await User.create({
            name: adminName,
            email: adminEmail,
            password: adminPassword,
            role: 'Admin',
            school: school._id
        });

        school.adminUser = adminUser._id;
        await school.save();

        res.status(201).json({
            _id: school._id,
            name: school.name,
            slug: school.slug,
            admin: {
                _id: adminUser._id,
                name: adminUser.name,
                email: adminUser.email
            }
        });
    } else {
        res.status(400);
        throw new Error('Invalid school data');
    }
});

// @desc    Get all schools
// @route   GET /api/schools
// @access  Super Admin (Hypothetical)
const getSchools = asyncHandler(async (req, res) => {
    const schools = await School.find({});
    res.json(schools);
});

// @desc    Get school by slug
// @route   GET /api/schools/:slug
// @access  Public
const getSchoolBySlug = asyncHandler(async (req, res) => {
    const school = await School.findOne({ slug: req.params.slug });

    if (school) {
        res.json(school);
    } else {
        res.status(404);
        throw new Error('School not found');
    }
});

module.exports = {
    registerSchool,
    getSchools,
    getSchoolBySlug
};
