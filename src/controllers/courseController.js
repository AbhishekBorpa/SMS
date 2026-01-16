const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
const getCourses = asyncHandler(async (req, res) => {
    const { category, level } = req.query;
    let query = { school: req.schoolId };
    if (category) query.category = category;
    if (level) query.level = level;

    const courses = await Course.find(query).populate('teacher', 'name email');
    res.json(courses);
});

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Private
const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findOne({ _id: req.params.id, school: req.schoolId }).populate('teacher', 'name email');

    if (course) {
        // Check if user is enrolled
        const enrollment = await Enrollment.findOne({ student: req.user._id, course: course._id, school: req.schoolId });
        res.json({
            course,
            isEnrolled: !!enrollment,
            enrollmentData: enrollment
        });
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private (Teacher/Admin)
const createCourse = asyncHandler(async (req, res) => {
    const { title, description, category, thumbnail, modules, level } = req.body;

    const course = await Course.create({
        title,
        description,
        category,
        thumbnail,
        modules,
        level,
        teacher: req.user._id,
        school: req.schoolId
    });

    res.status(201).json(course);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private (Teacher who owns it/Admin)
const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findOne({ _id: req.params.id, school: req.schoolId });

    if (course) {
        if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
            res.status(401);
            throw new Error('Not authorized to update this course');
        }

        course.title = req.body.title || course.title;
        course.description = req.body.description || course.description;
        course.category = req.body.category || course.category;
        course.thumbnail = req.body.thumbnail || course.thumbnail;
        course.modules = req.body.modules || course.modules;
        course.level = req.body.level || course.level;
        course.isPublished = req.body.isPublished !== undefined ? req.body.isPublished : course.isPublished;

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse
};
