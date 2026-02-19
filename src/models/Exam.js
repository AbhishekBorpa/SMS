const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true,
        default: 100
    },
    syllabus: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Published'],
        default: 'Scheduled'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);
