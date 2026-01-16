const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const BookLoan = require('../models/BookLoan');

// @desc    Get all books with optional search
// @route   GET /api/library
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
    const { keyword, subject } = req.query;

    let query = { school: req.schoolId };

    if (keyword) {
        query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { author: { $regex: keyword, $options: 'i' } }
            ]
        };
    }

    if (subject) {
        query.subject = { $regex: subject, $options: 'i' };
    }

    const books = await Book.find(query).sort({ title: 1 });
    res.json(books);
});

// @desc    Add a book (Admin/Teacher)
// @route   POST /api/library
// @access  Private (Admin/Teacher)
const addBook = asyncHandler(async (req, res) => {
    const { title, author, subject, class: className, totalCopies } = req.body;

    const book = await Book.create({
        title,
        author,
        subject,
        class: className,
        totalCopies: totalCopies || 1,
        availableCopies: totalCopies || 1,
        school: req.schoolId
    });

    res.status(201).json(book);
});

// @desc    Delete a book
// @route   DELETE /api/library/:id
// @access  Private (Admin Only)
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findOne({ _id: req.params.id, school: req.schoolId });

    if (book) {
        await book.deleteOne();
        res.json({ message: 'Book removed' });
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Issue a book
// @route   POST /api/library/loans
// @access  Private/Admin
const issueBook = asyncHandler(async (req, res) => {
    const { bookId, studentId, dueDate } = req.body;

    const book = await Book.findOne({ _id: bookId, school: req.schoolId });
    if (!book || book.availableCopies < 1) {
        res.status(400);
        throw new Error('Book not available');
    }

    const loan = await BookLoan.create({
        school: req.schoolId,
        book: bookId,
        student: studentId,
        dueDate
    });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(loan);
});

// @desc    Return a book
// @route   PUT /api/library/loans/:loanId/return
// @access  Private/Admin
const returnBook = asyncHandler(async (req, res) => {
    const loan = await BookLoan.findOne({ _id: req.params.loanId, school: req.schoolId });

    if (!loan || loan.status === 'Returned') {
        res.status(400);
        throw new Error('Invalid loan or already returned');
    }

    loan.returnDate = Date.now();
    loan.status = 'Returned';
    await loan.save();

    const book = await Book.findById(loan.book);
    if (book) {
        book.availableCopies += 1;
        await book.save();
    }

    res.json(loan);
});

// @desc    Get all loans
// @route   GET /api/library/loans
// @access  Private/Admin
const getLoans = asyncHandler(async (req, res) => {
    const loans = await BookLoan.find({ school: req.schoolId })
        .populate('book', 'title author')
        .populate('student', 'name email')
        .sort({ createdAt: -1 });
    res.json(loans);
});

module.exports = {
    getBooks,
    addBook,
    deleteBook,
    issueBook,
    returnBook,
    getLoans
};
