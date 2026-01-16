const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        mobileNumber: { type: String, required: true },
        purpose: { type: String, required: true }, // e.g., 'Parents Meeting', 'Vendor', 'Admission'
        host: { type: String }, // Who they are meeting (optional)
        entryTime: { type: Date, default: Date.now },
        exitTime: { type: Date },
        status: { type: String, enum: ['In', 'Out'], default: 'In' },
        gatekeeper: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
