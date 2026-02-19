const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    logo: {
        type: String
    },
    address: {
        type: String
    },
    contactEmail: {
        type: String,
        required: true
    },
    subscriptionStatus: {
        type: String,
        enum: ['Active', 'Suspended', 'Trial'],
        default: 'Trial'
    },
    adminUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('School', schoolSchema);
