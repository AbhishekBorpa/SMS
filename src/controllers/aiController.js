const asyncHandler = require('express-async-handler');
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');
const QuizResult = require('../models/QuizResult');
// In a real app, you would import GoogleGenerativeAI or OpenAI here
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Chat with AI Tutor
// @route   POST /api/ai/chat
// @access  Private
const chatWithAI = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const mockResponse = `This is an AI Tutor response to: "${message}". I can help you with Math, Science, or History. (Integration pending API Key)`;
    res.json({ reply: mockResponse });
});

// @desc    Analyze Student Performance
// @route   GET /api/ai/analyze/:studentId
// @access  Private
const analyzePerformance = asyncHandler(async (req, res) => {
    const studentId = req.params.studentId || req.user._id;

    // 1. Fetch Academic Data
    const marks = await Mark.find({ student: studentId, school: req.schoolId });
    const attendanceRecords = await Attendance.find({ 'records.student': studentId, school: req.schoolId });
    const quizResults = await QuizResult.find({ student: studentId, school: req.schoolId }).populate('quiz', 'title');

    // 2. Data Aggregation & Calculation
    let totalMarksPct = 0;
    if (marks.length > 0) {
        totalMarksPct = marks.reduce((acc, curr) => acc + (curr.score / curr.total), 0) / marks.length;
    }

    let attendancePct = 0;
    if (attendanceRecords.length > 0) {
        const presentCount = attendanceRecords.filter(record =>
            record.students.find(s => s.student.toString() === studentId.toString() && s.status === 'Present')
        ).length;
        attendancePct = (presentCount / attendanceRecords.length) * 100;
    }

    const quizAvg = quizResults.length > 0
        ? quizResults.reduce((acc, curr) => acc + curr.score, 0) / quizResults.length
        : 0;

    // Advanced Quiz Analytics
    const performanceTrend = quizResults
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .slice(-5) // Last 5 quizzes
        .map(q => ({
            title: q.quiz.title,
            score: q.score,
            date: q.createdAt
        }));

    let totalQuestions = 0;
    let totalTime = 0;
    let correctTime = 0;
    let correctCount = 0;

    quizResults.forEach(result => {
        result.answers.forEach(ans => {
            totalQuestions++;
            totalTime += (ans.timeTaken || 0);
            if (ans.isCorrect) {
                correctTime += (ans.timeTaken || 0);
                correctCount++;
            }
        });
    });

    const avgTimePerQuestion = totalQuestions > 0 ? (totalTime / totalQuestions).toFixed(1) : 0;
    const avgTimeCorrect = correctCount > 0 ? (correctTime / correctCount).toFixed(1) : 0;

    // 3. AI Heuristic Engine (Logic-based feedback)
    let summary = '';
    let strengths = [];
    let weaknesses = [];
    let recommendations = [];

    if (totalMarksPct > 0.8) {
        summary = "Outstanding academic performance! You are showing mastery across your subjects.";
        strengths.push("High Academic Consistency", "Excellent Exam Scores");
    } else if (totalMarksPct > 0.6) {
        summary = "Good overall performance, though some subjects show room for deepening your understanding.";
        strengths.push("Solid foundation in core subjects");
        weaknesses.push("Inconsistent performance in complex topics");
    } else {
        summary = "Current scores indicate significant challenges in the curriculum. Immediate intervention is advised.";
        weaknesses.push("Below-average academic markers");
        recommendations.push("Schedule extra tutoring sessions", "Focus on core concept foundational building");
    }

    if (attendancePct < 75) {
        summary += " However, low attendance is likely impacting your grasp of the material.";
        weaknesses.push("Low Classroom Engagement (Attendance)");
        recommendations.push("Prioritize daily class attendance to avoid missing critical lectures");
    } else {
        strengths.push("Excellent Attendance & Discipline");
    }

    if (quizAvg > 80) {
        strengths.push("Strong interactive learning retention");
    } else if (quizResults.length > 0 && quizAvg < 50) {
        weaknesses.push("Poor performance in interactive assessments");
        recommendations.push("Review lesson materials more thoroughly before attempting quizzes");
    }

    if (avgTimePerQuestion > 60) {
        weaknesses.push("Slow response time in quizzes");
        recommendations.push("Practice time management in assessments");
    } else if (avgTimePerQuestion > 0 && avgTimePerQuestion < 10 && quizAvg < 60) {
        weaknesses.push("Rushing through questions");
        recommendations.push("Take more time to read questions carefully");
    }

    // Default recommendations if list is empty
    if (recommendations.length === 0) {
        recommendations.push("Keep up the consistent work", "Explore advanced modules for your favorite subjects");
    }

    res.json({
        rawStats: {
            academicScore: Math.round(totalMarksPct * 100),
            attendanceScore: Math.round(attendancePct),
            quizScore: Math.round(quizAvg),
        },
        advancedStats: {
            performanceTrend,
            avgTimePerQuestion,
            avgTimeCorrect
        },
        analysis: {
            summary,
            strengths,
            weaknesses,
            recommendations
        }
    });
});

// @desc    Generate Lesson Plan using AI
// @route   POST /api/ai/lesson-plan
// @access  Private
const generateLessonPlan = asyncHandler(async (req, res) => {
    const { topic, subject, className } = req.body;

    // AI Simulation logic for high-fidelity responses
    const objectives = [
        `Understand the fundamental concepts of ${topic}.`,
        `Apply ${subject} principles to real-world scenarios.`,
        `Critically analyze the impact of ${topic} on modern society.`
    ];

    const activities = [
        { name: "Introduction", duration: "10 mins", desc: `Brief lecture on the origins of ${topic}.` },
        { name: "Group Discussion", duration: "20 mins", desc: "Students brainstorm applications." },
        { name: "Hands-on Exercise", duration: "20 mins", desc: `Solving 3 problems related to ${topic}.` },
        { name: "Quiz/Wrap-up", duration: "10 mins", desc: "Recap and check for understanding." }
    ];

    res.json({
        topic,
        subject,
        className,
        objectives: objectives.join('\n'),
        materialsNeeded: "Whiteboard, Textbooks, Digital Projector",
        activities
    });
});

// @desc    Generate Quiz using AI
// @route   POST /api/ai/quiz
// @access  Private
const generateQuiz = asyncHandler(async (req, res) => {
    const { topic, count = 5 } = req.body;

    const questions = Array.from({ length: count }).map((_, i) => ({
        questionText: `What is the significance of ${topic} in chapter ${i + 1}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswerIndex: Math.floor(Math.random() * 4),
        explanation: `This relates to the core principles of ${topic} discussed in class.`
    }));

    res.json({
        title: `AI Generated Quiz: ${topic}`,
        questions
    });
});

// @desc    Generate Timetable using AI
// @route   POST /api/ai/timetable
// @access  Private (Admin)
const generateTimetable = asyncHandler(async (req, res) => {
    const { classes } = req.body; // Array of class objects

    if (!classes || classes.length === 0) {
        res.status(400);
        throw new Error('No classes provided for generation');
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

    // Simulation of AI optimization:
    // We'll iterate through classes and assign them to slots
    const updatedClasses = classes.map(cls => {
        const schedule = [];
        // Assign 3 random slots per class for demo
        for (let i = 0; i < 3; i++) {
            schedule.push({
                day: days[Math.floor(Math.random() * days.length)],
                startTime: timeSlots[Math.floor(Math.random() * timeSlots.length)],
                endTime: "1 Hour",
                room: `Room ${Math.floor(Math.random() * 20) + 101}`
            });
        }
        return { ...cls, schedule };
    });

    res.json(updatedClasses);
});

module.exports = {
    chatWithAI,
    analyzePerformance,
    generateLessonPlan,
    generateQuiz,
    generateTimetable
};
