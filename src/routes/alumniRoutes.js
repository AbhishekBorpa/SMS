const express = require('express');
const router = express.Router();
const { getAlumni, addAlumni } = require('../controllers/alumniController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getAlumni)
    .post(protect, adminOnly, addAlumni);

module.exports = router;
