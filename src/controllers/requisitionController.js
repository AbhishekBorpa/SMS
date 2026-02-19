const asyncHandler = require('express-async-handler');
const Requisition = require('../models/Requisition');
const { logAction } = require('./auditController');

// @desc    Get teacher's requisitions
// @route   GET /api/requisition
// @access  Private (Teacher)
const getRequisitions = asyncHandler(async (req, res) => {
    const requisitions = await Requisition.find({ teacher: req.user._id, school: req.schoolId })
        .populate('item', 'name category')
        .sort({ createdAt: -1 });
    res.json(requisitions);
});

// @desc    Create a requisition
// @route   POST /api/requisition
// @access  Private (Teacher)
const createRequisition = asyncHandler(async (req, res) => {
    const { itemId, quantity, reason } = req.body;

    const requisition = await Requisition.create({
        teacher: req.user._id,
        item: itemId,
        quantity,
        reason,
        school: req.schoolId
    });

    if (requisition) {
        await logAction({
            action: 'CREATE_REQUISITION',
            entity: 'Requisition',
            entityId: requisition._id,
            details: { quantity, itemId },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(requisition);
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
});

module.exports = {
    getRequisitions,
    createRequisition,
};
