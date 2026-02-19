const asyncHandler = require('express-async-handler');
const StudyMaterial = require('../models/StudyMaterial');
const Class = require('../models/Class'); // Import Class model

// @desc    Upload study material (Teacher)
// @route   POST /api/materials
// @access  Private (Teacher)
const uploadMaterial = asyncHandler(async (req, res) => {
    const { title, description, link, subject, grade } = req.body;

    const material = await StudyMaterial.create({
        title,
        description,
        link,
        subject,
        grade,
        teacher: req.user._id,
        school: req.schoolId
    });

    res.status(201).json(material);
});

// @desc    Get study materials (All)
// @route   GET /api/materials
// @access  Private
const getMaterials = asyncHandler(async (req, res) => {
    let query = { school: req.schoolId };

    // If the user is a student, filter materials by their enrolled classes' names
    if (req.user.role === 'Student') {
        const studentClasses = await Class.find({ students: req.user._id, school: req.schoolId }).select('name');
        if (studentClasses.length > 0) {
            const classNames = studentClasses.map(c => c.name);
            query.grade = { $in: classNames };
        } else {
            // If student is not in any class, they have no materials
            return res.json([]);
        }
    }

    const materials = await StudyMaterial.find(query)
        .populate('teacher', 'name')
        .sort({ createdAt: -1 });
    res.json(materials);
});

// @desc    Delete study material
// @route   DELETE /api/materials/:id
// @access  Private (Teacher Only)
const deleteMaterial = asyncHandler(async (req, res) => {
    const material = await StudyMaterial.findOne({ _id: req.params.id, school: req.schoolId });

    if (material) {
        if (material.teacher.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
            res.status(401);
            throw new Error('Not authorized to delete this material');
        }
        await material.deleteOne();
        res.json({ message: 'Study material removed' });
    } else {
        res.status(404);
        throw new Error('Study material not found');
    }
});

module.exports = {
    uploadMaterial,
    getMaterials,
    deleteMaterial
};
