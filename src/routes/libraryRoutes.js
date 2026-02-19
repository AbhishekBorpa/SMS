const express = require('express');
const router = express.Router();
const { getBooks, addBook, deleteBook, issueBook, returnBook, getLoans } = require('../controllers/libraryController');
const { protect, admin } = require('../middleware/authMiddleware');
const adminOrTeacher = require('../middleware/adminOrTeacherMiddleware');

router.get('/', protect, getBooks);
router.post('/', protect, adminOrTeacher, addBook);
router.delete('/:id', protect, admin, deleteBook);

router.get('/loans', protect, admin, getLoans);
router.post('/loans', protect, admin, issueBook);
router.put('/loans/:loanId/return', protect, admin, returnBook);

module.exports = router;
