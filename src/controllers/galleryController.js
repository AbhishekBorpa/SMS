const asyncHandler = require('express-async-handler');
const Gallery = require('../models/Gallery');

// @desc    Upload photo to gallery (Teacher)
// @route   POST /api/gallery
// @access  Private (Teacher)
const uploadPhoto = asyncHandler(async (req, res) => {
    const { title, imageUrl, description, className } = req.body;

    const photo = await Gallery.create({
        title,
        imageUrl,
        description,
        class: className,
        teacher: req.user._id,
        school: req.schoolId
    });

    res.status(201).json(photo);
});

// @desc    Get gallery photos (All)
// @route   GET /api/gallery
// @access  Private
const getPhotos = asyncHandler(async (req, res) => {
    const photos = await Gallery.find({ school: req.schoolId })
        .populate('teacher', 'name')
        .sort({ createdAt: -1 });
    res.json(photos);
});

// @desc    Delete photo
// @route   DELETE /api/gallery/:id
// @access  Private (Teacher Only)
const deletePhoto = asyncHandler(async (req, res) => {
    const photo = await Gallery.findOne({ _id: req.params.id, school: req.schoolId });

    if (photo) {
        if (photo.teacher.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
            res.status(401);
            throw new Error('Not authorized to delete this photo');
        }
        await photo.deleteOne();
        res.json({ message: 'Photo removed' });
    } else {
        res.status(404);
        throw new Error('Photo not found');
    }
});

module.exports = {
    uploadPhoto,
    getPhotos,
    deletePhoto
};
