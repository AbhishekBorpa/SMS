const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc    Get course certificate data
// @route   GET /api/certificate/:courseId
// @access  Private (Student)
const getCourseCertificate = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user._id;

    // 1. Fetch Course and Student
    const course = await Course.findOne({ _id: courseId, school: req.schoolId });
    const student = await User.findOne({ _id: studentId, school: req.schoolId }).select('name');

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    // 2. Check Enrollment and Completion
    const enrollment = await Enrollment.findOne({ course: courseId, student: studentId, school: req.schoolId });

    if (!enrollment) {
        res.status(400);
        throw new Error('Not enrolled in this course');
    }

    // Calculate total lessons
    let totalLessons = 0;
    course.modules.forEach(module => {
        totalLessons += module.lessons.length;
    });

    const completedLessons = enrollment.completedLessons.length;

    // Ensure 100% completion
    if (completedLessons < totalLessons && totalLessons > 0) {
        res.status(400);
        throw new Error('Course not completed yet');
    }

    // 3. Return Certificate Data
    res.json({
        studentName: student.name,
        courseTitle: course.title,
        completionDate: new Date(), // Or enrollment.updatedAt if we tracked completion time
        instructor: course.instructor || 'SMS Faculty', // Assuming instructor field exists or generic
        certificateId: `CERT-${courseId.toString().slice(-4)}-${studentId.toString().slice(-4)}`.toUpperCase()
    });
});

module.exports = { getCourseCertificate };
