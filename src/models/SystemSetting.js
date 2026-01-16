const mongoose = require('mongoose');

const systemSettingSchema = mongoose.Schema({
    schoolName: {
        type: String,
        default: 'School Management System'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
        unique: true // One setting per school
    },
    logoUrl: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    themeColor: {
        type: String,
        default: 'orange' // blue, green, orange, purple
    },
    contactEmail: {
        type: String,
        default: 'admin@school.com'
    },
    academicYear: {
        type: String,
        default: '2025-2026'
    },
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SystemSetting', systemSettingSchema);
