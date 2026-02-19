const express = require('express');
const router = express.Router();
const { getStudentsFeeStatus, updateFeeDetails, getMyFeeStatus, getFeeInvoice, getTransactionHistory, createUpiPayment, handleUpiWebhook } = require('../controllers/feeController');
const { protect } = require('../middleware/authMiddleware');

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

const studentOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Student') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as a student');
    }
};

router.get('/students', protect, adminOnly, getStudentsFeeStatus);
router.put('/:id', protect, adminOnly, updateFeeDetails);
router.get('/history/:studentId', protect, adminOnly, getTransactionHistory);
router.get('/invoice', protect, getFeeInvoice);
router.get('/me', protect, getMyFeeStatus);

router.post('/upi/initiate', protect, studentOnly, createUpiPayment);
router.post('/upi/webhook', handleUpiWebhook); // Webhooks are usually public and verified by secret/signature

module.exports = router;
