const asyncHandler = require('express-async-handler');
const LostItem = require('../models/LostItem');
const { logAction } = require('./auditController');

// @desc    Get all lost/found items
// @route   GET /api/lost-found
// @access  Private
const getItems = asyncHandler(async (req, res) => {
    const items = await LostItem.find({ status: { $ne: 'Returned' }, school: req.schoolId })
        .populate('foundBy', 'name')
        .sort({ dateFound: -1 });
    res.json(items);
});

// @desc    Report found item
// @route   POST /api/lost-found
// @access  Private
const reportItem = asyncHandler(async (req, res) => {
    const { name, description, category, locationFound, contactInfo, image } = req.body;

    const item = await LostItem.create({
        name,
        description,
        category,
        locationFound,
        contactInfo,
        image,
        foundBy: req.user._id,
        school: req.schoolId
    });

    if (item) {
        await logAction({
            action: 'REPORT_LOST_ITEM',
            entity: 'LostItem',
            entityId: item._id,
            details: { name },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(item);
    } else {
        res.status(400);
        throw new Error('Invalid item data');
    }
});

// @desc    Mark item as returned
// @route   PUT /api/lost-found/:id/resolve
// @access  Private (Admin or Reporter)
const resolveItem = asyncHandler(async (req, res) => {
    const item = await LostItem.findOne({ _id: req.params.id, school: req.schoolId });

    if (item) {
        item.status = 'Returned';
        await item.save();
        res.json({ message: 'Item marked as returned' });
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

module.exports = {
    getItems,
    reportItem,
    resolveItem,
};
