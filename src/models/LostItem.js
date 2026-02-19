const mongoose = require('mongoose');

const lostItemSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        description: { type: String, required: true },
        category: { type: String, enum: ['Electronics', 'Books', 'Clothing', 'Other'], default: 'Other' },
        locationFound: { type: String, required: true },
        foundBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        contactInfo: { type: String }, // Phone or Email to contact
        image: { type: String }, // URL or base64
        status: { type: String, enum: ['Lost', 'Found', 'Returned'], default: 'Lost' },
        dateFound: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

const LostItem = mongoose.model('LostItem', lostItemSchema);

module.exports = LostItem;
