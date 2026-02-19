const asyncHandler = require('express-async-handler');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enrollment/:courseId
// @access  Private (Student)
const enrollCourse = asyncHandler(async (req, res) => {
    const course = await Course.findOne({ _id: req.params.courseId, school: req.schoolId });

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    const alreadyEnrolled = await Enrollment.findOne({ student: req.user._id, course: course._id, school: req.schoolId });
    if (alreadyEnrolled) {
        res.status(400);
        throw new Error('Already enrolled');
    }

    const enrollment = await Enrollment.create({
        student: req.user._id,
        course: course._id,
        school: req.schoolId
    });

    res.status(201).json(enrollment);
});

// @desc    Mark lesson as completed
// @route   PUT /api/enrollment/lesson-complete
// @access  Private
const completeLesson = asyncHandler(async (req, res) => {
    const { courseId, lessonId } = req.body;

    const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId, school: req.schoolId });
    if (!enrollment) {
        res.status(404);
        throw new Error('Enrollment not found');
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId);

        // Calculate progress
        const course = await Course.findOne({ _id: courseId, school: req.schoolId });
        let totalLessons = 0;
        course.modules.forEach(m => totalLessons += m.lessons.length);

        enrollment.progress = (enrollment.completedLessons.length / totalLessons) * 100;
        await enrollment.save();
    }

    res.json(enrollment);
});

// @desc    Get my enrolled courses
// @route   GET /api/enrollment/my-courses
// @access  Private
const getMyCourses = asyncHandler(async (req, res) => {
    const enrollments = await Enrollment.find({ student: req.user._id, school: req.schoolId })
        .populate({
            path: 'course',
            populate: { path: 'teacher', select: 'name' }
        });
    res.json(enrollments);
});

module.exports = {
    enrollCourse,
    completeLesson,
    getMyCourses
};
