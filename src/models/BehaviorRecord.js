const mongoose = require('mongoose');

const behaviorRecordSchema = mongoose.Schema(
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
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        points: { type: Number, required: true }, // Positive or negative
        category: { type: String, required: true }, // e.g., 'Homework', 'Discipline', 'Participation'
        reason: { type: String },
        date: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

const BehaviorRecord = mongoose.model('BehaviorRecord', behaviorRecordSchema);

module.exports = BehaviorRecord;
