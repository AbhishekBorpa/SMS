const express = require('express');
const router = express.Router();
const { uploadPhoto, getPhotos, deletePhoto } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.post('/', protect, adminOrTeacher, uploadPhoto);
router.get('/', protect, getPhotos);
router.delete('/:id', protect, adminOrTeacher, deletePhoto);

module.exports = router;
