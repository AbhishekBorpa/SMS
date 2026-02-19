const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
    linkedMaterial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudyMaterial'
    },
    type: {
        type: String,
        enum: ['Practice', 'Competition'],
        default: 'Practice'
    },
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Live', 'Ended'],
        default: 'Draft'
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number, // in minutes
        default: 30
    },
    classIds: [{
        type: String // We will store class names or IDs as strings to simplify assignment
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    questions: [{
        questionText: { type: String, required: true },
        image: { type: String }, // URL or base64
        options: [{ type: String, required: true }],
        correctAnswerIndex: { type: Number, required: true },
        explanation: { type: String },
        points: { type: Number, default: 1 }
    }],
    passingScore: {
        type: Number,
        default: 60,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Quiz', quizSchema);
