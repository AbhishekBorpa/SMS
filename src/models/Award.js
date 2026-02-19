const mongoose = require('mongoose');

const awardSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'School'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String, // e.g., Academic, Sports, Behavior, Attendance
        required: true
    },
    icon: {
        type: String, // MaterialCommunityIcon name
        default: 'star-circle'
    },
    color: {
        type: String,
        default: '#ffd700'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Award = mongoose.model('Award', awardSchema);
module.exports = Award;
