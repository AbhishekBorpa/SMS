const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    records: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent', 'Late'],
            default: 'Absent'
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);
