const mongoose = require('mongoose');

const lessonPlanSchema = mongoose.Schema(
    {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        date: { type: Date, required: true },
        subject: { type: String, required: true },
        className: { type: String, required: true }, // e.g., '10-A'
        topic: { type: String, required: true },
        objectives: { type: String }, // Learning outcomes
        materialsNeeded: { type: String },
        status: { type: String, enum: ['Planned', 'Ongoing', 'Completed'], default: 'Planned' },
        reflection: { type: String }, // Teacher's notes after class
    },
    {
        timestamps: true,
    }
);

const LessonPlan = mongoose.model('LessonPlan', lessonPlanSchema);

module.exports = LessonPlan;
