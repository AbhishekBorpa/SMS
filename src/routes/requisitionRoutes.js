const express = require('express');
const router = express.Router();
const { getRequisitions, createRequisition } = require('../controllers/requisitionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getRequisitions)
    .post(protect, createRequisition);

module.exports = router;
