const express = require('express');
const router = express.Router();
const { uploadMaterial, getMaterials, deleteMaterial } = require('../controllers/studyMaterialController');
const { protect } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.post('/', protect, adminOrTeacher, uploadMaterial);
router.get('/', protect, getMaterials);
router.delete('/:id', protect, adminOrTeacher, deleteMaterial);

module.exports = router;
