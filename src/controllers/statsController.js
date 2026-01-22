const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Class = require('../models/Class');
const AuditLog = require('../models/AuditLog');
const Quiz = require('../models/Quiz');
const Assignment = require('../models/Assignment');
const FeeTransaction = require('../models/FeeTransaction');
const Attendance = require('../models/Attendance');
const Mark = require('../models/Mark');

// @desc    Get detailed school analytics for charts
// @route   GET /api/stats/analytics
// @access  Private (Admin)
const getSchoolAnalytics = asyncHandler(async (req, res) => {
    console.log('getSchoolAnalytics Controller Executing...');
    try {
        const school = req.schoolId;
        console.log('School ID:', school);

        // 1. Revenue Trends (Last 6 Months) - Simplified Mock for Stability
        const revenueTrend = {
            labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
            data: [15000, 18000, 12000, 25000, 22000, 30000]
        };

        // 2. Attendance Radar (By Class) - Simplified Mock
        const attendanceStats = {
            labels: ['Class X-A', 'Class IX-B', 'Class XII-Sci', 'Class VIII-A', 'Class VII-C'],
            data: [85, 92, 78, 88, 95]
        };

        // 3. Academic Performance (Avg Scores) - Simplified Mock
        const academicStats = {
            labels: ['Math', 'Physics', 'Chem', 'Eng', 'Bio'],
            data: [72, 85, 68, 90, 78]
        };

        // 4. Enrollment Growth (Students registered per month) - Simplified Mock
        const growthTrend = {
            labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
            data: [5, 8, 12, 4, 15, 20]
        };

        // 5. Faculty Leaderboard
        console.log('Aggregating Faculty Leaderboard...');
        const activeTeachers = await Quiz.aggregate([
            { $match: { school } },
            { $group: { _id: "$teacher", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'teacherInfo' } },
            { $unwind: '$teacherInfo' },
            { $project: { name: '$teacherInfo.name', count: 1 } }
        ]);
        console.log('Faculty Aggregation Complete. Count:', activeTeachers.length);

        const responseData = {
            revenueTrend,
            attendanceStats,
            academicStats,
            growthTrend,
            facultyLeaderboard: activeTeachers
        };

        res.json(responseData);

    } catch (error) {
        console.error('Error in getSchoolAnalytics:', error);
        res.status(500);
        throw new Error('Analytics failed: ' + error.message);
    }
});


// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private (Admin)
const getStats = asyncHandler(async (req, res) => {
    const school = req.schoolId;

    const totalStudents = await User.countDocuments({ role: 'Student', school });
    const totalTeachers = await User.countDocuments({ role: 'Teacher', school });
    const totalClasses = await Class.countDocuments({ school });

    const revenueData = await User.aggregate([
        { $match: { role: 'Student', school: req.schoolId, feeStatus: 'Paid' } },
        { $group: { _id: null, total: { $sum: '$feeAmount' } } }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // Chart Data: Students per Class
    const classStats = await Class.find({ school }).select('name students');
    const studentDistribution = classStats.map(c => ({
        name: c.name,
        students: c.students.length
    }));

    // Mock Revenue Trend (This would be more complex in prod)
    const revenueTrend = [
        { month: 'Jan', revenue: 4000 },
        { month: 'Feb', revenue: 3000 },
        { month: 'Mar', revenue: 5000 },
        { month: 'Apr', revenue: 2780 },
        { month: 'May', revenue: 1890 },
        { month: 'Jun', revenue: 2390 },
        { month: 'Jul', revenue: totalRevenue || 3490 },
    ];

    // Recent Activity
    const recentActivity = await AuditLog.find({ school })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('performedBy', 'name');

    res.json({
        students: totalStudents,
        teachers: totalTeachers,
        classes: totalClasses,
        totalRevenue: totalRevenue,
        studentDistribution,
        revenueTrend,
        recentActivity
    });
});

// @desc    Get specific teacher statistics
// @route   GET /api/stats/teacher/:id
// @access  Private (Admin)
const getTeacherStats = asyncHandler(async (req, res) => {
    const teacherId = req.params.id;
    const school = req.schoolId;

    const quizCount = await Quiz.countDocuments({ createdBy: teacherId, school });
    const assignmentCount = await Assignment.countDocuments({ createdBy: teacherId, school });

    // Calculate total submissions to this teacher's assignments (Workload proxy)
    // This is complex, skipping for now, keeping it simple count.

    res.json({
        quizzes: quizCount,
        assignments: assignmentCount
    });
});

module.exports = { getStats, getTeacherStats, getSchoolAnalytics };
