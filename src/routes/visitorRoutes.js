const express = require('express');
const router = express.Router();
const {
    getVisitors,
    addVisitor,
    markVisitorExit,
} = require('../controllers/visitorController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, adminOnly, getVisitors)
    .post(protect, adminOnly, addVisitor);

router.put('/:id/exit', protect, adminOnly, markVisitorExit);

module.exports = router;
