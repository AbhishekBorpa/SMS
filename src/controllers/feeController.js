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
    // First, verify the student belongs to the admin's school to enforce multi-tenancy
    const student = await User.findOne({ _id: req.params.studentId, school: req.schoolId });
    if (!student) {
        res.status(404);
        throw new Error('Student not found in this school');
    }

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

// @desc    Initiate a UPI payment for self
// @route   POST /api/fees/upi/initiate
// @access  Private (Student)
const createUpiPayment = asyncHandler(async (req, res) => {
    const { amount } = req.body; // Assuming student pays for their own pending fee

    if (!amount || amount <= 0) {
        res.status(400);
        throw new Error('Valid amount is required to initiate payment');
    }

    const student = await User.findOne({ _id: req.user._id, school: req.schoolId });
    if (!student) {
        res.status(404);
        throw new Error('Student not found');
    }

    // Create a pending FeeTransaction for UPI
    const newTransaction = await FeeTransaction.create({
        student: req.user._id,
        amount: amount,
        type: 'Credit', // Payment initiated
        paymentMethod: 'UPI',
        upiStatus: 'PENDING',
        remarks: 'UPI Payment initiated',
        recordedBy: req.user._id // Student initiating payment
    });

    // --- Placeholder for UPI Gateway Integration ---
    // In a real scenario, you would call a UPI payment gateway API here
    // to generate a payment link or QR code.
    // The gateway would return a deep link or payment URI.

    const upiId = process.env.MERCHANT_UPI_ID || 'test@upi'; // Merchant UPI ID from env
    const merchantName = process.env.MERCHANT_NAME || 'SchoolSMS';
    const transactionRef = newTransaction._id.toString(); // Use our transaction ID as a reference

    const upiDeepLink = `upi://pay?pa=${upiId}&pn=${merchantName}&mc=0000&tid=${transactionRef}&tr=${transactionRef}&am=${amount}&cu=INR&url=https://your-school-app.com/payment-status?transactionId=${transactionRef}`;
    // The `url` parameter in UPI deep link is for post-payment redirect for status, often used with webhooks.

    res.status(200).json({
        message: 'UPI payment initiated',
        upiDeepLink,
        transactionId: newTransaction._id
    });
});

// @desc    Handle UPI webhook notifications (Placeholder)
// @route   POST /api/fees/upi/webhook
// @access  Public (Accessed by UPI Gateway) - No authentication needed here, but webhook secret verification would be vital
const handleUpiWebhook = asyncHandler(async (req, res) => {
    // 1. Verify webhook signature/secret to ensure it's from a legitimate source
    // In a real application, you'd perform a HMAC signature verification here
    // using a secret key shared with the UPI gateway.
    const WEBHOOK_SECRET = process.env.UPI_WEBHOOK_SECRET;
    // Example: if (!verifySignature(req.headers['x-upi-signature'], req.body, WEBHOOK_SECRET)) {
    //     res.status(401).json({ message: 'Unauthorized webhook' });
    //     return;
    // }

    // 2. Parse the webhook payload
    // Assuming a generic payload structure from a UPI gateway
    const { transactionId, status, refId, amount } = req.body; // Adapt this based on actual gateway payload

    if (!transactionId || !status) {
        res.status(400).json({ message: 'Missing transactionId or status in webhook payload' });
        return;
    }

    try {
        const feeTransaction = await FeeTransaction.findById(transactionId);

        if (!feeTransaction) {
            res.status(404).json({ message: 'FeeTransaction not found' });
            return;
        }

        // Prevent double processing if already successful
        if (feeTransaction.upiStatus === 'SUCCESS') {
            res.status(200).json({ message: 'Transaction already processed as successful' });
            return;
        }

        feeTransaction.upiStatus = status.toUpperCase(); // Ensure status is uppercase for enum
        feeTransaction.upiRefId = refId || feeTransaction.upiRefId; // Update RRN if provided

        if (feeTransaction.upiStatus === 'SUCCESS') {
            // Update the associated student's fee status
            const student = await User.findById(feeTransaction.student);
            if (student) {
                student.feeStatus = 'Paid';
                student.feeAmount = 0; // Assuming payment clears the amount due for simplicity
                // student.feeDueDate = undefined; // Clear due date if applicable
                await student.save();
            } else {
                console.error(`Student with ID ${feeTransaction.student} not found for successful transaction ${transactionId}`);
            }
        } else if (feeTransaction.upiStatus === 'FAILED' || feeTransaction.upiStatus === 'REFUNDED') {
            // Handle failed or refunded payments: maybe log, notify admin, etc.
            console.warn(`UPI transaction ${transactionId} ${feeTransaction.upiStatus}`);
        }

        await feeTransaction.save();
        res.status(200).json({ status: 'success', message: 'Webhook processed successfully' });

    } catch (error) {
        console.error('Error processing UPI webhook:', error);
        res.status(500).json({ message: 'Internal server error processing webhook' });
    }
});

module.exports = {
    getStudentsFeeStatus,
    updateFeeDetails,
    getTransactionHistory,
    getMyFeeStatus,
    getFeeInvoice,
    createUpiPayment,
    handleUpiWebhook // Add handleUpiWebhook
};
