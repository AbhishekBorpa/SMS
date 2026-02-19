const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String }, // Text content or link
    videoUrl: { type: String },
    duration: { type: String }, // e.g. "10:00"
    isFree: { type: Boolean, default: false }
}, { timestamps: true });

const moduleSchema = mongoose.Schema({
    title: { type: String, required: true },
    lessons: [lessonSchema]
}, { timestamps: true });

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String // URL to image
    },
    modules: [moduleSchema],
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
