const asyncHandler = require('express-async-handler');
const Visitor = require('../models/Visitor');
const { logAction } = require('./auditController');

// @desc    Get all visitors
// @route   GET /api/visitors
// @access  Private (Admin)
const getVisitors = asyncHandler(async (req, res) => {
    const visitors = await Visitor.find({ school: req.schoolId }).sort({ entryTime: -1 });
    res.json(visitors);
});

// @desc    Log new visitor entry
// @route   POST /api/visitors
// @access  Private (Admin/Security)
const addVisitor = asyncHandler(async (req, res) => {
    const { name, mobileNumber, purpose, host } = req.body;

    const visitor = await Visitor.create({
        name,
        mobileNumber,
        purpose,
        host,
        gatekeeper: req.user._id,
        school: req.schoolId
    });

    if (visitor) {
        await logAction({
            action: 'VISITOR_ENTRY',
            entity: 'Visitor',
            entityId: visitor._id,
            details: { name, purpose },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(visitor);
    } else {
        res.status(400);
        throw new Error('Invalid visitor data');
    }
});

// @desc    Mark visitor exit
// @route   PUT /api/visitors/:id/exit
// @access  Private (Admin/Security)
const markVisitorExit = asyncHandler(async (req, res) => {
    const visitor = await Visitor.findOne({ _id: req.params.id, school: req.schoolId });

    if (visitor) {
        visitor.exitTime = Date.now();
        visitor.status = 'Out';
        const updatedVisitor = await visitor.save();

        await logAction({
            action: 'VISITOR_EXIT',
            entity: 'Visitor',
            entityId: visitor._id,
            details: { name: visitor.name },
            performedBy: req.user._id,
            req
        });

        res.json(updatedVisitor);
    } else {
        res.status(404);
        throw new Error('Visitor not found');
    }
});

module.exports = {
    getVisitors,
    addVisitor,
    markVisitorExit,
};
