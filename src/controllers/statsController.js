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
// @desc    Get detailed school analytics for charts
// @route   GET /api/stats/analytics
// @access  Private (Admin)
const getSchoolAnalytics = asyncHandler(async (req, res) => {
    try {
        const school = req.schoolId;
        const { classId } = req.query;
        const matchStage = { school };

        if (classId) {
            matchStage.class = new mongoose.Types.ObjectId(classId);
        }

        // 1. Revenue Trends (Last 6 Months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const revenueAggregation = await FeeTransaction.aggregate([
            { $match: { school, status: 'Completed', createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const revenueTrend = {
            labels: revenueAggregation.map(r => new Date(0, r._id - 1).toLocaleString('default', { month: 'short' })),
            data: revenueAggregation.map(r => r.total)
        };

        // 2. Attendance Stats
        let attendancematch = { school, date: { $gte: sixMonthsAgo } };
        if (classId) {
            attendancematch.class = new mongoose.Types.ObjectId(classId);
        }

        const attendanceData = await Attendance.aggregate([
            { $match: attendancematch },
            { $unwind: "$records" },
            {
                $group: {
                    _id: classId ? { $dateToString: { format: "%Y-%m-%d", date: "$date" } } : "$class",
                    present: {
                        $sum: { $cond: [{ $eq: ["$records.status", "Present"] }, 1, 0] }
                    },
                    total: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } } // Sort by date or class ID
        ]);

        // If filtering by class, lookup class name isn't needed for label (use date). 
        // If global, we need class names.
        let attendanceLabels = [];
        let attendanceValues = [];

        if (classId) {
            attendanceLabels = attendanceData.map(a => a._id); // Date strings
        } else {
            // Populate class names manually since $lookup inside group is complex or requires another stage
            const classIds = attendanceData.map(a => a._id);
            const classes = await Class.find({ _id: { $in: classIds } }).select('name');
            const classMap = classes.reduce((acc, c) => ({ ...acc, [c._id]: c.name }), {});
            attendanceLabels = attendanceData.map(a => classMap[a._id] || 'Unknown');
        }

        attendanceValues = attendanceData.map(a => Math.round((a.present / a.total) * 100));

        const attendanceStats = {
            labels: attendanceLabels,
            data: attendanceValues
        };

        // 3. Academic Performance
        // Global: Avg score per Subject
        // Filtered: Avg score per Exam Type

        let academicMatch = { school };
        if (classId) academicMatch.class = new mongoose.Types.ObjectId(classId);

        const academicData = await Mark.aggregate([
            { $match: academicMatch },
            {
                $lookup: {
                    from: "classes",
                    localField: "class",
                    foreignField: "_id",
                    as: "classInfo"
                }
            },
            { $unwind: "$classInfo" },
            {
                $group: {
                    _id: classId ? "$examType" : "$classInfo.subject",
                    avgScore: {
                        $avg: { $multiply: [{ $divide: ["$score", "$total"] }, 100] }
                    }
                }
            }
        ]);

        const academicStats = {
            labels: academicData.map(a => a._id),
            data: academicData.map(a => Math.round(a.avgScore))
        };

        // 4. Enrollment Growth (Mock for now as User creation date might vary)
        const growthTrend = {
            labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
            data: [5, 8, 12, 4, 15, 20]
        };

        // 5. Faculty Leaderboard
        const activeTeachers = await Quiz.aggregate([
            { $match: { school } },
            { $group: { _id: "$teacher", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'teacherInfo' } },
            { $unwind: '$teacherInfo' },
            { $project: { name: '$teacherInfo.name', count: 1 } }
        ]);

        res.json({
            revenueTrend,
            attendanceStats,
            academicStats,
            growthTrend,
            facultyLeaderboard: activeTeachers
        });

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
