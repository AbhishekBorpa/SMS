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
    schoolType: {
        type: String,
        enum: ['K-12', 'Primary', 'Secondary', 'University', 'Institute'],
        default: 'K-12'
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    subscriptionStatus: {
        type: String,
        enum: ['Active', 'Suspended', 'Trial'],
        default: 'Trial'
    },
    subscriptionPlan: {
        type: String,
        enum: ['Free', 'Basic', 'Premium'],
        default: 'Free'
    },
    subscriptionExpiry: {
        type: Date,
        default: () => new Date(+new Date() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    },
    customerBillingId: {
        type: String
    },
    adminUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('School', schoolSchema);
