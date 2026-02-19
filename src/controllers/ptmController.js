const asyncHandler = require('express-async-handler');
const PTMSlot = require('../models/PTMSlot');
const { logAction } = require('./auditController');

// @desc    Get teacher's PTM slots
// @route   GET /api/ptm
// @access  Private (Teacher)
const getTeacherSlots = asyncHandler(async (req, res) => {
    const slots = await PTMSlot.find({ teacher: req.user._id, school: req.schoolId })
        .populate('student', 'name email')
        .sort({ date: 1, startTime: 1 });
    res.json(slots);
});

// @desc    Create PTM slots
// @route   POST /api/ptm
// @access  Private (Teacher)
const createSlots = asyncHandler(async (req, res) => {
    const { date, startTime, endTime, link } = req.body;

    const slot = await PTMSlot.create({
        teacher: req.user._id,
        date,
        startTime,
        endTime,
        link,
        school: req.schoolId
    });

    if (slot) {
        await logAction({
            action: 'CREATE_PTM_SLOT',
            entity: 'PTMSlot',
            entityId: slot._id,
            details: { date, time: `${startTime}-${endTime}` },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(slot);
    } else {
        res.status(400);
        throw new Error('Invalid slot data');
    }
});

// @desc    Update PTM slot (cancel, complete, update link)
// @route   PUT /api/ptm/:id
// @access  Private (Teacher)
const updateSlot = asyncHandler(async (req, res) => {
    const slot = await PTMSlot.findOne({ _id: req.params.id, school: req.schoolId });

    if (slot && slot.teacher.toString() === req.user._id.toString()) {
        slot.status = req.body.status || slot.status;
        slot.link = req.body.link || slot.link;
        slot.notes = req.body.notes || slot.notes;

        const updatedSlot = await slot.save();
        res.json(updatedSlot);
    } else {
        res.status(404);
        throw new Error('Slot not found or unauthorized');
    }
});

module.exports = {
    getTeacherSlots,
    createSlots,
    updateSlot,
};
