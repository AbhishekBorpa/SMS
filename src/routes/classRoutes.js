const express = require('express');
const router = express.Router();
const { createClass, getTeacherClasses, getStudentClasses, getAllClasses, enrollStudent, deleteClass, updateClass } = require('../controllers/classController');
const { protect } = require('../middleware/authMiddleware');

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

const teacher = (req, res, next) => {
    if (req.user && req.user.role === 'Teacher') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as a teacher');
    }
};

const adminOrTeacher = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Teacher')) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
};

router.route('/')
    .post(protect, admin, createClass)
    .get(protect, admin, getAllClasses);

router.get('/teacher', protect, teacher, getTeacherClasses);
router.get('/student', protect, getStudentClasses);
router.post('/:id/enroll', protect, adminOrTeacher, enrollStudent);
router.route('/:id')
    .delete(protect, admin, deleteClass)
    .put(protect, admin, updateClass);

module.exports = router;
