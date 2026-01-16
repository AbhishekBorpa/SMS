const mongoose = require('mongoose');

const ptmSlotSchema = mongoose.Schema(
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
        student: { // Optional initially, filled when booked
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        date: { type: Date, required: true },
        startTime: { type: String, required: true }, // e.g., "10:00 AM"
        endTime: { type: String, required: true }, // e.g., "10:15 AM"
        status: { type: String, enum: ['Open', 'Booked', 'Completed', 'Cancelled'], default: 'Open' },
        link: { type: String }, // Optional meeting link
        notes: { type: String },
    },
    {
        timestamps: true,
    }
);

const PTMSlot = mongoose.model('PTMSlot', ptmSlotSchema);

module.exports = PTMSlot;
