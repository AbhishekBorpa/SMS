const mongoose = require('mongoose');

const clubSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        description: { type: String, required: true },
        president: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Usually a student
        },
        facultyAdvisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Teacher
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        meetingDay: { type: String }, // e.g. "Friday"
        meetingTime: { type: String }, // e.g. "3:00 PM"
        image: { type: String }, // URL or placeholder
    },
    {
        timestamps: true,
    }
);

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
