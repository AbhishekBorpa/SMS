const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');
const Remark = require('../models/Remark');

// @desc    Get student report card data
// @route   GET /api/reports/card
// @access  Private (Student)
const getStudentReportCard = asyncHandler(async (req, res) => {
    const studentId = req.user._id;

    // 1. Fetch Student Details (already in req.user, but ensuring fresh data)
    const student = await User.findOne({ _id: studentId, school: req.schoolId }).select('-password');

    // 2. Fetch Marks
    const marks = await Mark.find({ student: studentId }).populate('subject', 'name code');

    // 3. Fetch Attendance Stats
    const attendanceRecords = await Attendance.find({ student: studentId });
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(a => a.status === 'Present').length;
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;

    // 4. Fetch Remarks
    const remarks = await Remark.find({ student: studentId }).sort({ date: -1 }).limit(5).populate('teacher', 'name');

    // 5. Structure Data for Report
    const reportData = {
        student: {
            name: student.name,
            id: student._id,
            class: 'Standard 10 - A', // Hardcoded for demo if not in model
            rollNumber: '101',      // Hardcoded for demo
            academicYear: '2025-2026'
        },
        academicPerformance: marks.map(m => ({
            subject: m.subject?.name || 'Unknown',
            score: m.marksObtained,
            total: m.totalMarks,
            grade: calculateGrade(m.marksObtained, m.totalMarks)
        })),
        attendance: {
            totalDays,
            presentDays,
            percentage: attendancePercentage
        },
        remarks: remarks.map(r => ({
            teacher: r.teacher?.name || 'Teacher',
            note: r.note,
            date: r.date
        })),
        generatedAt: new Date()
    };

    res.json(reportData);
});

const calculateGrade = (obtained, total) => {
    const percentage = (obtained / total) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
};

module.exports = { getStudentReportCard };
