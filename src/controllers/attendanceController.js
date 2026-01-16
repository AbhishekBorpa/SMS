const asyncHandler = require('express-async-handler');
const Attendance = require('../models/Attendance');
const Class = require('../models/Class');

// @desc    Take attendance for a class
// @route   POST /api/attendance
// @access  Private (Teacher)
const takeAttendance = asyncHandler(async (req, res) => {
    const { classId, date, records } = req.body; // records: [{ student: Id, status: 'Present'/'Absent' }]

    // Check if class exists
    const classExists = await Class.findOne({ _id: classId, school: req.schoolId });
    if (!classExists) {
        res.status(404);
        throw new Error('Class not found');
    }

    // Check if attendance already taken for this date
    // Note: We might want to update it if it exists
    let attendance = await Attendance.findOne({ class: classId, date, school: req.schoolId });

    if (attendance) {
        // Update existing
        attendance.records = records;
        await attendance.save();
        res.json({ message: 'Attendance updated', attendance });
    } else {
        // Create new
        attendance = await Attendance.create({
            class: classId,
            date,
            records,
            school: req.schoolId
        });
        res.status(201).json({ message: 'Attendance recorded', attendance });
    }
});

// @desc    Get attendance for a class
// @route   GET /api/attendance/:classId
// @access  Private (Teacher/Admin/Student?)
const getAttendance = asyncHandler(async (req, res) => {
    const { classId } = req.params;
    const { date } = req.query;

    let query = { class: classId, school: req.schoolId };
    if (date) {
        query.date = date;
    }

    const attendance = await Attendance.find(query).populate('records.student', 'name email');
    res.json(attendance);
});

// @desc    Get attendance for a student (My Attendance)
// @route   GET /api/attendance/student/:studentId
// @access  Private
const getStudentAttendance = asyncHandler(async (req, res) => {
    // If student, force their own ID
    let studentId = req.params.studentId;
    if (req.user.role === 'Student') {
        studentId = req.user._id;
    }

    // Find all attendance docs where this student is in records
    const attendance = await Attendance.find({
        'records.student': studentId,
        school: req.schoolId
    }).populate('class', 'name subject').sort({ date: -1 });

    // Transform response to show date, class, and ONLY this student's status
    const result = attendance.map(doc => {
        const myRecord = doc.records.find(r => r.student.toString() === studentId.toString());
        return {
            _id: doc._id,
            date: doc.date,
            class: doc.class,
            status: myRecord ? myRecord.status : 'Unknown'
        };
    });

    res.json(result);
});

module.exports = {
    takeAttendance,
    getAttendance,
    getStudentAttendance
};
