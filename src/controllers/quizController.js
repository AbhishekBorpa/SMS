const asyncHandler = require('express-async-handler');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');
const Class = require('../models/Class'); // Import Class model

// @desc    Create a new quiz or competition
// @route   POST /api/quizzes
// @access  Private/Teacher
const createQuiz = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        questions,
        passingScore,
        type,
        duration,
        startTime,
        endTime,
        classIds,
        isPublic
    } = req.body;

    const quiz = await Quiz.create({
        title,
        description,
        teacher: req.user._id,
        questions,
        passingScore,
        school: req.schoolId,
        type,
        status: type === 'Competition' ? 'Published' : 'Draft', // Auto-publish competitions for now or handle status
        duration,
        startTime,
        endTime,
        classIds,
        isPublic
    });

    if (quiz) {
        res.status(201).json(quiz);
    } else {
        res.status(400);
        throw new Error('Invalid quiz data');
    }
});

// @desc    Get quizzes available to the user (Student)
// @route   GET /api/quizzes/available
// @access  Private
// @desc    Get quizzes available to the user (Student)
// @route   GET /api/quizzes/available
// @access  Private
const getQuizzesAvailable = asyncHandler(async (req, res) => {
    let query = { school: req.schoolId };

    if (req.user.role === 'Student') {
        const Class = require('../models/Class'); // Import Class model here
        const studentClasses = await Class.find({ students: req.user._id, school: req.schoolId }).select('_id');
        const studentClassIds = studentClasses.map(c => c._id);

        query.$or = [
            { isPublic: true },
            { classIds: { $in: studentClassIds } }
        ];
        // Also filter by status (Published or Live)
        query.status = { $in: ['Published', 'Live'] };
    } else if (req.user.role === 'Teacher') {
        query.teacher = req.user._id;
    }

    const quizzes = await Quiz.find(query)
        .select('-questions.correctAnswerIndex')
        .sort('-createdAt');

    res.json(quizzes);
});

// @desc    Get full quiz with answers (for the taker) or details for start
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findOne({ _id: req.params.id, school: req.schoolId });

    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    // Populate linkedMaterial if it exists
    if (quiz.linkedMaterial) {
        await quiz.populate('linkedMaterial');
    }

    // If student, strip correct answers unless they are the teacher who created it
    if (req.user.role === 'Student' && quiz.teacher.toString() !== req.user._id.toString()) {
        quiz.questions.forEach(q => {
            q.correctAnswerIndex = undefined; // Strip correct answer for students
        });
    }

    res.json(quiz);
});

// @desc    Submit quiz attempt
// @route   POST /api/quizzes/:id/submit
// @access  Private/Student
// @desc    Submit quiz attempt
// @route   POST /api/quizzes/:id/submit
// @access  Private/Student
const submitQuiz = asyncHandler(async (req, res) => {
    const { answers, timeTaken, detailedAnswers } = req.body;
    // answers: Array of indices [0, 2, 1...] (Legacy/Simple)
    // detailedAnswers: Array of { questionIndex, selectedOption, timeTaken } (Advanced)

    const quiz = await Quiz.findOne({ _id: req.params.id, school: req.schoolId });

    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    let correctCount = 0;
    let totalPoints = 0;
    let obtainedPoints = 0;

    const results = quiz.questions.map((q, idx) => {
        let selectedOption = -1;
        let timeSpent = 0;

        // Handle both simple array of answers and detailed object array
        if (detailedAnswers && detailedAnswers[idx]) {
            selectedOption = detailedAnswers[idx].selectedOption;
            timeSpent = detailedAnswers[idx].timeTaken || 0;
        } else if (answers && answers[idx] !== undefined) {
            selectedOption = answers[idx];
        }

        const isCorrect = selectedOption === q.correctAnswerIndex;
        if (isCorrect) {
            correctCount++;
            obtainedPoints += (q.points || 1);
        }
        totalPoints += (q.points || 1);

        return {
            questionIndex: idx,
            selectedOption,
            isCorrect,
            timeTaken: timeSpent
        };
    });

    // Calculate score as percentage if needed, or raw points
    const score = (correctCount / quiz.questions.length) * 100;

    const Assignment = require('../models/Assignment');
    const AssignmentSubmission = require('../models/AssignmentSubmission');
    const Mark = require('../models/Mark');

    // ... imports ...

    // ... (inside submitQuiz function, after QuizResult creation) ...

    const quizResult = await QuizResult.create({
        quiz: quiz._id,
        student: req.user._id,
        score, // Storing percentage for standard
        totalQuestions: quiz.questions.length,
        answers: results,
        school: req.schoolId,
        timeTaken: timeTaken || 0 // Total time
    });

    // --- Auto-Grade Synchronization ---
    // Check if this quiz is linked to any assignment
    const linkedAssignment = await Assignment.findOne({
        linkedQuiz: quiz._id,
        school: req.schoolId
    });

    if (linkedAssignment) {
        // 1. Create/Update Assignment Submission
        await AssignmentSubmission.findOneAndUpdate(
            {
                assignment: linkedAssignment._id,
                student: req.user._id
            },
            {
                school: req.schoolId,
                fileUrl: 'QUIZ_AUTO_SUBMISSION', // Placeholder
                fileName: `Quiz: ${quiz.title}`,
                status: 'Graded',
                grade: score, // Store percentage or points? Using percentage as standard
                submittedAt: Date.now(),
                feedback: `Auto-graded from Quiz: ${quiz.title}`
            },
            { upsert: true, new: true }
        );

        // 2. Create/Update Mark Record (Gradebook)
        // The User model shows 'className' (String) but Mark model expects 'class' (ObjectId).
        // This mismatch usually implies we need to look up the Class object by name if the user only stores name.
        // OR if User stores ObjectId in a different field.
        // Let's safe-guard this: only proceed if we can resolve the Class ID.

        let markClassId;
        const studentClasses = await Class.find({ students: req.user._id, school: req.schoolId }).select('_id');
        const studentClassIds = studentClasses.map(c => c._id.toString());

        if (quiz.classIds && quiz.classIds.length > 0) {
            // Find an intersection between quiz's target classes and student's enrolled classes
            const commonClassId = quiz.classIds.find(quizClassId =>
                studentClassIds.includes(quizClassId.toString())
            );
            if (commonClassId) {
                markClassId = commonClassId;
            }
        }

        // If no specific class for quiz, or no common class found, use the student's first enrolled class
        if (!markClassId && studentClassIds.length > 0) {
            markClassId = studentClassIds[0];
        }

        if (markClassId) {
            await Mark.findOneAndUpdate(
                {
                    student: req.user._id,
                    examType: linkedAssignment.title, // Use Assignment title as Exam Name
                    class: markClassId
                },
                {
                    school: req.schoolId,
                    score: score,
                    total: 100, // Normalized to percentage
                    subject: linkedAssignment.subject
                },
                { upsert: true }
            );
        }
    }

    res.status(201).json({
        score,
        correctCount,
        totalQuestions: quiz.questions.length,
        passed: score >= quiz.passingScore,
        quizResult
    });
});

// @desc    Get all quizzes (Admin/Global list)
// @route   GET /api/quizzes
// @access  Private
const getAllQuizzes = asyncHandler(async (req, res) => {
    const quizzes = await Quiz.find({ school: req.schoolId })
        .populate('teacher', 'name')
        .select('-questions.correctAnswerIndex')
        .sort('-createdAt');
    res.json(quizzes);
});

// @desc    Get leaderboard (top students by total score)
// @route   GET /api/quizzes/leaderboard/global
// @access  Private
const getLeaderboard = asyncHandler(async (req, res) => {
    const leaderboard = await QuizResult.aggregate([
        { $match: { school: req.schoolId } },
        {
            $group: {
                _id: '$student',
                totalScore: { $sum: '$score' },
                quizzesTaken: { $sum: 1 }
            }
        },
        { $sort: { totalScore: -1 } },
        { $limit: 20 },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'student'
            }
        },
        { $unwind: '$student' },
        {
            $project: {
                _id: 1,
                totalScore: 1,
                quizzesTaken: 1,
                'student.name': 1,
                'student._id': 1
            }
        }
    ]);
    res.json(leaderboard);
});

module.exports = {
    createQuiz,
    getQuizzesAvailable,
    getQuizById,
    submitQuiz,
    getAllQuizzes,
    getLeaderboard
};
