const asyncHandler = require('express-async-handler');
const SystemSetting = require('../models/SystemSetting');

// @desc    Get system settings
// @route   GET /api/settings
// @access  Private
const getSettings = asyncHandler(async (req, res) => {
    let settings = await SystemSetting.findOne({ school: req.schoolId });

    // Create default settings if none exist
    if (!settings) {
        settings = await SystemSetting.create({ school: req.schoolId });
    }

    res.json(settings);
});

// @desc    Update system settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = asyncHandler(async (req, res) => {
    const { schoolName, logoUrl, themeColor, contactEmail, academicYear } = req.body;

    let settings = await SystemSetting.findOne({ school: req.schoolId });

    if (!settings) {
        settings = new SystemSetting({ school: req.schoolId });
    }

    settings.schoolName = schoolName || settings.schoolName;
    settings.logoUrl = logoUrl || settings.logoUrl;
    settings.themeColor = themeColor || settings.themeColor;
    settings.contactEmail = contactEmail || settings.contactEmail;
    settings.academicYear = academicYear || settings.academicYear;
    settings.lastUpdatedBy = req.user._id;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
});

module.exports = {
    getSettings,
    updateSettings
};
