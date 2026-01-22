const asyncHandler = require('express-async-handler');
const axios = require('axios');
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');
const QuizResult = require('../models/QuizResult');

// DeepSeek API Configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
    console.warn('WARNING: DEEPSEEK_API_KEY is not defined in environment variables.');
}
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Helper function to call DeepSeek API
const callDeepSeek = async (messages, maxTokens = 500, temperature = 0.7, jsonMode = false) => {
    try {
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                model: 'deepseek-chat',
                messages: messages,
                temperature: temperature,
                max_tokens: maxTokens,
                stream: false,
                response_format: jsonMode ? { type: "json_object" } : undefined
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API Error:', error.response?.data || error.message);
        throw new Error('Failed to communicate with AI service');
    }
};

// @desc    Chat with AI Tutor (DeepSeek)
// @route   POST /api/ai/chat
// @access  Private
const chatWithAI = asyncHandler(async (req, res) => {
    const { message, subject, conversationHistory } = req.body;
    const userRole = req.user.role;

    // Build system prompt based on user role
    let systemPrompt = '';
    if (userRole === 'Student') {
        systemPrompt = `You are an expert AI tutor for students. Your role is to:
- Explain concepts clearly and simply
- Provide step-by-step solutions
- Be patient and supportive
- Use examples when helpful
${subject ? `- Focus on ${subject} subject` : ''}

IMPORTANT: Keep responses concise and mobile-friendly. Avoid excessive formatting, headers, or separators. Use simple paragraphs with line breaks between key points. Maximum 200 words unless explaining complex topics.`;
    } else if (userRole === 'Teacher') {
        systemPrompt = `You are an AI teaching assistant. Your role is to:
- Help with lesson planning
- Suggest teaching strategies
- Provide curriculum insights
- Assist with assessment creation

Keep responses concise and practical. Maximum 200 words.`;
    } else {
        systemPrompt = 'You are a helpful AI assistant for school management. Keep responses brief and clear.';
    }

    const messages = [
        { role: 'system', content: systemPrompt },
        ...(conversationHistory || []),
        { role: 'user', content: message }
    ];

    try {
        const aiReply = await callDeepSeek(messages, 400, 0.6);
        res.json({ reply: aiReply });
    } catch (error) {
        // Fallback response
        const fallbackMessage = userRole === 'Student'
            ? `I'm here to help you learn! While I'm having trouble connecting right now, I can still assist you. Could you tell me more about what you'd like to understand about "${message}"?`
            : `I'm your AI teaching assistant. While experiencing connection issues, I'm still here to help. What would you like assistance with regarding "${message}"?`;

        res.json({
            reply: fallbackMessage,
            error: 'API connection issue, using fallback response'
        });
    }
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
            title: q.quiz ? q.quiz.title : 'Unknown Quiz',
            score: q.score || 0,
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

    // 3. Prepare AI Prompt
    const prompt = `
    Analyze the following student performance data:
    - Academic Score: ${(totalMarksPct * 100).toFixed(1)}%
    - Attendance: ${attendancePct.toFixed(1)}%
    - Quiz Average: ${quizAvg.toFixed(1)}%
    - Avg Time Per Question: ${avgTimePerQuestion}s
    
    Provide a JSON response with the following structure:
    {
        "summary": "A 2-sentence summary of overall performance.",
        "strengths": ["List 2-3 specific strengths"],
        "weaknesses": ["List 2-3 specific areas for improvement"],
        "recommendations": ["List 2-3 actionable steps for the student"]
    }
    Ensure the tone is constructive and encouraging.
    `;

    try {
        const rawResponse = await callDeepSeek([
            { role: 'system', content: 'You are an educational data analyst. You must analyze student data and return ONLY valid JSON.' },
            { role: 'user', content: prompt }
        ], 600, 0.7, true);

        // Attempt to parse JSON
        let analysis;
        try {
            analysis = JSON.parse(rawResponse);
        } catch (e) {
            // Fallback if AI doesn't return clean JSON (try to strip markdown blocks if present)
            const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                analysis = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("Invalid JSON from AI");
            }
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
            analysis
        });

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        // Fallback to logic-based response if AI fails
        const fallbackAnalysis = {
            summary: "AI analysis is currently unavailable. Based on the data, please review your attendance and test scores.",
            strengths: ["Data tracking is active"],
            weaknesses: ["AI service temporarily unreachable"],
            recommendations: ["Ensure consistent attendance", "Review class materials regularly"]
        };

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
            analysis: fallbackAnalysis
        });
    }
});

// @desc    Generate Lesson Plan using AI
// @route   POST /api/ai/lesson-plan
// @access  Private
const generateLessonPlan = asyncHandler(async (req, res) => {
    const { topic, subject, className } = req.body;

    const prompt = `
    Create a detailed lesson plan for a ${className} class on the subject "${subject}" dealing with the topic "${topic}".
    Return a JSON object with this exact structure:
    {
        "objectives": "List of learning objectives separated by newlines",
        "materialsNeeded": "Comma-separated list of materials",
        "activities": [
            { "name": "Activity Name", "duration": "Duration (e.g. 10 mins)", "desc": "Short description" },
            ...
        ]
    }
    Provide 3-4 distinct activities including an introduction and a wrap-up.
    `;

    try {
        const rawResponse = await callDeepSeek([
            { role: 'system', content: 'You are an expert curriculum developer. Return ONLY valid JSON.' },
            { role: 'user', content: prompt }
        ], 1000, 0.7, true);

        let plan = JSON.parse(rawResponse);

        res.json({
            topic,
            subject,
            className,
            ...plan
        });
    } catch (error) {
        console.error("Lesson Plan Generation Error:", error);
        res.status(500).json({ message: "Failed to generate lesson plan." });
    }
});

// @desc    Generate Quiz using AI
// @route   POST /api/ai/quiz
// @access  Private
const generateQuiz = asyncHandler(async (req, res) => {
    const { topic, count = 5 } = req.body;

    const prompt = `
    Generate a multiple-choice quiz with ${count} questions on the topic "${topic}".
    Return a JSON object with the following structure:
    {
        "title": "Quiz Title",
        "questions": [
            {
                "questionText": "Question string?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswerIndex": 0 (integer 0-3),
                "explanation": "Brief explanation of the correct answer"
            }
        ]
    }
    `;

    try {
        const rawResponse = await callDeepSeek([
            { role: 'system', content: 'You are a quiz generator. Return ONLY valid JSON.' },
            { role: 'user', content: prompt }
        ], 1000, 0.7, true);

        const quizData = JSON.parse(rawResponse);
        res.json(quizData);

    } catch (error) {
        console.error("Quiz Generation Error:", error);
        res.status(500).json({ message: "Failed to generate quiz." });
    }
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

    const prompt = `
    Generate a weekly timetable for the following classes:
    ${JSON.stringify(classes.map(c => c.name || c.subject || c.id))}

    Constraints:
    - School hours are 8:00 AM to 3:00 PM.
    - Each class should have 3 sessions per week.
    - No overlapping sessions for a single class (obviously).
    - Distribute sessions somewhat evenly across Monday to Friday.

    Return a JSON object where keys are the class identifiers and values are arrays of schedule objects.
    Example JSON Structure:
    {
        "Class A": [
            { "day": "Monday", "startTime": "09:00 AM", "endTime": "10:00 AM", "room": "Room 101" },
            ...
        ]
    }
    `;

    try {
        const rawResponse = await callDeepSeek([
            { role: 'system', content: 'You are a school timetable scheduler. Return ONLY valid JSON.' },
            { role: 'user', content: prompt }
        ], 1500, 0.5, true);

        const scheduleMap = JSON.parse(rawResponse);

        // Merge schedule back into class objects
        const updatedClasses = classes.map(cls => {
            const key = cls.name || cls.subject || cls.id;
            return {
                ...cls,
                schedule: scheduleMap[key] || []
            };
        });

        res.json(updatedClasses);

    } catch (error) {
        console.error("Timetable Generation Error:", error);
        // Fallback to simulation if AI fails
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

        const updatedClasses = classes.map(cls => {
            const schedule = [];
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
    }
});

module.exports = {
    chatWithAI,
    analyzePerformance,
    generateLessonPlan,
    generateQuiz,
    generateTimetable
};
