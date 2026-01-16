const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    class: {
        type: String, // e.g. "10th Grade" or "General"
        required: false,
    },
    availableCopies: {
        type: Number,
        default: 1,
    },
    totalCopies: {
        type: Number,
        default: 1,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', bookSchema);
