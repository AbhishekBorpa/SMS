const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    schedule: [{
        day: { type: String, required: true }, // e.g., "Monday"
        startTime: { type: String, required: true }, // e.g., "10:00 AM"
        endTime: { type: String, required: true } // e.g., "11:00 AM"
    }],
    meetingLink: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
