const express = require('express');
const router = express.Router();
const { createEvent, getEvents, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

router.post('/', protect, adminOnly, createEvent);
router.get('/', protect, getEvents);
router.delete('/:id', protect, adminOnly, deleteEvent);

module.exports = router;
