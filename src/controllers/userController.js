const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Class = require('../models/Class');
const Attendance = require('../models/Attendance');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { logAction } = require('./auditController');

// @desc    Create a new teacher
// @route   POST /api/users/teacher
// @access  Private/Admin
const createTeacher = asyncHandler(async (req, res) => {
    const { name, email, mobileNumber, address } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Generate random password
    const password = crypto.randomBytes(8).toString('hex');

    const user = await User.create({
        name,
        email,
        mobileNumber,
        address,
        password,
        role: 'Teacher',
        school: req.schoolId,
        isPasswordResetRequired: true
    });

    if (user) {
        // Send email with credentials
        const message = `
            <h3>Hello ${user.name},</h3>
            <p>Your Teacher account has been created for the School Management System.</p>
            <p>Here are your temporary credentials:</p>
            <ul>
                <li>Email: ${user.email}</li>
                <li>Password: <b>${password}</b></li>
            </ul>
            <p>Please login to the mobile app and reset your password immediately.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Your Teacher Account Credentials',
                html: message
            });

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: 'Teacher created and email sent'
            });
        } catch (error) {
            // If email fails, we still created the user, but we should let the admin know
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: 'Teacher created but failed to send email. Password is: ' + password
            });
        }

        // Log the action
        await logAction({
            action: 'CREATE_USER',
            entity: 'User',
            entityId: user._id,
            details: { name: user.name, role: 'Teacher', email: user.email },
            performedBy: req.user._id,
            req
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Create a new student
// @route   POST /api/users/student
// @access  Private (Admin/Teacher)
const createStudent = asyncHandler(async (req, res) => {
    const { name, email, mobileNumber, password, address } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Use provided password or generate random one
    const finalPassword = password || crypto.randomBytes(4).toString('hex');

    const user = await User.create({
        name,
        email,
        mobileNumber,
        address,
        password: finalPassword,
        role: 'Student',
        school: req.schoolId,
        isPasswordResetRequired: true // Force password change on first login
    });

    if (user) {
        // Optionally send email, but for now we'll return credentials
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            autoPassword: finalPassword, // Return to frontend to display
            message: 'Student created successfully. Password: ' + finalPassword
        });

        // Log the action
        await logAction({
            action: 'CREATE_USER',
            entity: 'User',
            entityId: user._id,
            details: { name: user.name, role: 'Student', email: user.email },
            performedBy: req.user._id,
            req
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get users by role
// @route   GET /api/users?role=Teacher&classId=...
// @access  Private (Admin/Teacher)
const getUsers = asyncHandler(async (req, res) => {
    const { role, classId } = req.query;
    let query = { school: req.schoolId };

    if (role) {
        query.role = role;
    }

    if (classId && role === 'Student') {
        const classDoc = await Class.findById(classId);
        if (classDoc) {
            query._id = { $in: classDoc.students };
        } else {
            // If class not found, return empty list
            return res.json([]);
        }
    }

    const users = await User.find(query).select('-password');
    res.json(users);
});

// @desc    Get dashboard stats
// @route   GET /api/stats
// @access  Private (Admin)
const getDashboardStats = asyncHandler(async (req, res) => {
    const teachers = await User.countDocuments({ role: 'Teacher', school: req.schoolId });
    const students = await User.countDocuments({ role: 'Student', school: req.schoolId });
    const activeClasses = await Class.countDocuments({ school: req.schoolId });

    // Calculate real revenue from paid fees
    const revenueAggregation = await User.aggregate([
        { $match: { school: req.schoolId, feeStatus: 'Paid' } },
        { $group: { _id: null, total: { $sum: '$feeAmount' } } }
    ]);

    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;

    // Calculate Attendance Trend (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const attendanceTrend = await Attendance.aggregate([
        {
            $match: {
                school: req.schoolId,
                date: { $gte: sevenDaysAgo }
            }
        },
        {
            $project: {
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                presentCount: {
                    $size: {
                        $filter: {
                            input: "$records",
                            as: "record",
                            cond: { $eq: ["$$record.status", "Present"] }
                        }
                    }
                },
                totalCount: { $size: "$records" }
            }
        },
        {
            $group: {
                _id: "$date",
                avgAttendance: { $avg: { $multiply: [{ $divide: ["$presentCount", "$totalCount"] }, 100] } }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    const stats = {
        teachers,
        students,
        totalRevenue,
        activeClasses,
        attendanceTrend: attendanceTrend.map(t => ({ date: t._id, value: Math.round(t.avgAttendance) }))
    };

    res.json(stats);
});

// @desc    Update user push token
// @route   PUT /api/users/push-token
// @access  Private
const updatePushToken = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id, school: req.schoolId });

    if (user) {
        user.expoPushToken = req.body.token;
        await user.save();
        res.json({ message: 'Push token updated' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id, school: req.schoolId });

    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id, school: req.schoolId });

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.mobileNumber = req.body.mobileNumber || user.mobileNumber;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            mobileNumber: updatedUser.mobileNumber
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    createTeacher,
    createStudent,
    getUsers,
    getDashboardStats,
    updatePushToken,
    deleteUser,
    updateUser
};
