const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    class: {
        type: String, // e.g. "10th Grade" - Optional, can be general
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Gallery', gallerySchema);
