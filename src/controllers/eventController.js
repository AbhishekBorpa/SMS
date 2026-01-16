const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Admin Only)
const createEvent = asyncHandler(async (req, res) => {
    const { title, description, date } = req.body;

    const event = await Event.create({
        title,
        description,
        date,
        createdBy: req.user._id,
        school: req.schoolId
    });

    res.status(201).json(event);
});

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
    // Return events sorted by date, closest first
    const events = await Event.find({ school: req.schoolId }).sort({ date: 1 });
    res.json(events);
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Admin Only)
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findOne({ _id: req.params.id, school: req.schoolId });

    if (event) {
        await event.deleteOne();
        res.json({ message: 'Event removed' });
    } else {
        res.status(404);
        throw new Error('Event not found');
    }
});

module.exports = {
    createEvent,
    getEvents,
    deleteEvent
};
