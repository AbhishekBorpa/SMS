const express = require('express');
const router = express.Router();
const { createNotice, getNotices, deleteNotice } = require('../controllers/noticeController');
const { protect } = require('../middleware/authMiddleware'); // Admin check usually combined, but will add specific check logic inside controller or separate middleware if strictly needed. 
// For simplicity in this stack, assuming protect gives us req.user

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

router.post('/', protect, adminOnly, createNotice);
router.get('/', protect, getNotices);
router.delete('/:id', protect, adminOnly, deleteNotice);

module.exports = router;
