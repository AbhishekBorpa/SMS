const mongoose = require('mongoose');

const assignmentSubmissionSchema = mongoose.Schema({
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Graded'],
        default: 'Pending',
    },
    grade: {
        type: Number,
    },
    feedback: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);
