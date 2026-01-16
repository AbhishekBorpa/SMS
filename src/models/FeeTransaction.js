const mongoose = require('mongoose');

const feeTransactionSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Credit', 'Debit'], // Credit = Payment Received, Debit = Fee Levied (optional for now, mainly tracking payments)
        default: 'Credit'
    },
    paymentMethod: {
        type: String, // Cash, Online, Cheque
        default: 'Cash'
    },
    remarks: {
        type: String
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FeeTransaction', feeTransactionSchema);
