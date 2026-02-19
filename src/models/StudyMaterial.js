const mongoose = require('mongoose');

const studyMaterialSchema = mongoose.Schema({
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
    link: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // New fields for mobile app UI fidelity
    type: {
        type: String,
        required: true,
        enum: ['PDF', 'Video', 'Link'],
        default: 'PDF'
    },
    size: String,
    pages: Number,
    duration: String,
    icon: {
        type: String,
        default: 'file'
    },
    color: {
        type: String,
        default: '#2196F3'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
