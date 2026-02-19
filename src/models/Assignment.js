const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    grade: {
        type: String, // e.g., "10th Grade"
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    gradingType: {
        type: String,
        enum: ['Manual', 'Quiz'],
        default: 'Manual'
    },
    linkedQuiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Assignment', assignmentSchema);
