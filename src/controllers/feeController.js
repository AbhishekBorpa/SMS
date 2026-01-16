const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Class = require('../models/Class');
const FeeTransaction = require('../models/FeeTransaction');

// @desc    Get all students with fee status (Admin)
// @route   GET /api/fees/students
// @access  Private (Admin)
const getStudentsFeeStatus = asyncHandler(async (req, res) => {
    const students = await User.find({ role: 'Student', school: req.schoolId })
        .select('name email  feeStatus feeAmount feeDueDate')
        .sort({ name: 1 });
    res.json(students);
});

// @desc    Update student fee details (Admin)
// @route   PUT /api/fees/:id
// @access  Private (Admin)
const updateFeeDetails = asyncHandler(async (req, res) => {
    const { feeStatus, feeAmount, feeDueDate, remarks } = req.body;
    const student = await User.findOne({ _id: req.params.id, school: req.schoolId });

    if (student) {
        // Track changes for transaction log
        let transactionType = null;
        let transactionAmount = 0;

        if (feeStatus === 'Paid' && student.feeStatus !== 'Paid') {
            transactionType = 'Credit'; // Payment Received
            transactionAmount = feeAmount || student.feeAmount;
        } else if (feeStatus === 'Pending' && student.feeStatus === 'Paid') {
            transactionType = 'Debit'; // Reverting payment? Or just resetting.
            transactionAmount = feeAmount || student.feeAmount;
        } else if (feeAmount !== undefined && feeAmount !== student.feeAmount) {
            // Fee structure change
            transactionType = 'Debit'; // New fee levied or adjusted
            transactionAmount = feeAmount;
        }

        // Create transaction record if significant change
        if (transactionType || remarks) { // Also log if just remarks
            await FeeTransaction.create({
                student: student._id,
                amount: transactionAmount || 0,
                type: transactionType || 'Info',
                remarks: remarks || `Fee status updated to ${feeStatus}`,
                recordedBy: req.user._id,
                date: new Date()
            });
        }

        student.feeStatus = feeStatus || student.feeStatus;
        student.feeAmount = feeAmount !== undefined ? feeAmount : student.feeAmount;
        student.feeDueDate = feeDueDate || student.feeDueDate;

        await student.save();
        res.json({
            _id: student._id,
            name: student.name,
            feeStatus: student.feeStatus,
            feeAmount: student.feeAmount,
            feeDueDate: student.feeDueDate
        });
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});

// @desc    Get student fee transaction history (Admin)
// @route   GET /api/fees/history/:studentId
// @access  Private (Admin)
const getTransactionHistory = asyncHandler(async (req, res) => {
    const transactions = await FeeTransaction.find({ student: req.params.studentId })
        .populate('recordedBy', 'name')
        .sort({ date: -1 });

    res.json(transactions);
});

// @desc    Get my fee status (Student)
// @route   GET /api/fees/me
// @access  Private (Student)
const getMyFeeStatus = asyncHandler(async (req, res) => {
    const student = await User.findOne({ _id: req.user._id, school: req.schoolId }).select('feeStatus feeAmount feeDueDate');
    if (student) {
        res.json(student);
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});

// @desc    Get fee invoice data (Student)
// @route   GET /api/fees/invoice
// @access  Private (Student)
const getFeeInvoice = asyncHandler(async (req, res) => {
    const student = await User.findOne({ _id: req.user._id, school: req.schoolId });

    if (!student) {
        res.status(404);
        throw new Error('Student not found');
    }

    // Find student's class
    const studentClass = await Class.findOne({ students: student._id, school: req.schoolId });

    const transactionId = student.feeStatus === 'Paid'
        ? `TXN-${student._id.toString().slice(-6)}-${new Date().getFullYear()}`.toUpperCase()
        : null;

    res.json({
        invoiceNumber: `INV-${new Date().getFullYear()}-${student._id.toString().slice(-4)}`.toUpperCase(),
        date: new Date(),
        dueDate: student.feeDueDate,
        student: {
            name: student.name,
            id: student._id,
            email: student.email,
            class: studentClass ? studentClass.name : 'Unassigned'
        },
        items: [
            { description: 'Academic Tuition Fees (Term 1)', amount: Math.round(student.feeAmount * 0.6) },
            { description: 'Library & Lab Access', amount: Math.round(student.feeAmount * 0.2) },
            { description: 'Extracurricular Activities', amount: Math.round(student.feeAmount * 0.2) }
        ],
        totalAmount: student.feeAmount,
        status: student.feeStatus,
        transactionId
    });
});

module.exports = {
    getStudentsFeeStatus,
    updateFeeDetails,
    getTransactionHistory,
    getMyFeeStatus,
    getFeeInvoice
};
