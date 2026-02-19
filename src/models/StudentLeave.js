const mongoose = require('mongoose');

const studentLeaveSchema = mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        reason: { type: String, required: true },
        type: { type: String, enum: ['Sick', 'Casual', 'Emergency', 'Other'], default: 'Sick' },
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        adminNotes: { type: String },
        respondedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const StudentLeave = mongoose.model('StudentLeave', studentLeaveSchema);

module.exports = StudentLeave;
