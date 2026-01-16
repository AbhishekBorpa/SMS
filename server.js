const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db');


// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/schools', require('./src/routes/schoolRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/classes', require('./src/routes/classRoutes'));
app.use('/api/messages', require('./src/routes/messageRoutes'));
app.use('/api/attendance', require('./src/routes/attendanceRoutes'));
app.use('/api/marks', require('./src/routes/markRoutes'));
app.use('/api/ai', require('./src/routes/aiRoutes'));
app.use('/api/notices', require('./src/routes/noticeRoutes'));
app.use('/api/leaves', require('./src/routes/leaveRoutes'));
app.use('/api/events', require('./src/routes/eventRoutes'));
app.use('/api/fees', require('./src/routes/feeRoutes'));
app.use('/api/audit', require('./src/routes/auditRoutes'));
app.use('/api/inventory', require('./src/routes/inventoryRoutes'));
app.use('/api/visitors', require('./src/routes/visitorRoutes'));
app.use('/api/alumni', require('./src/routes/alumniRoutes'));
app.use('/api/planner', require('./src/routes/plannerRoutes'));
app.use('/api/ptm', require('./src/routes/ptmRoutes'));
app.use('/api/behavior', require('./src/routes/behaviorRoutes'));
app.use('/api/requisition', require('./src/routes/requisitionRoutes'));
app.use('/api/canteen', require('./src/routes/canteenRoutes'));
app.use('/api/lost-found', require('./src/routes/lostFoundRoutes'));
app.use('/api/student-leave', require('./src/routes/studentLeaveRoutes'));
app.use('/api/clubs', require('./src/routes/clubRoutes'));
app.use('/api/complaints', require('./src/routes/complaintRoutes'));
app.use('/api/assignments', require('./src/routes/assignmentRoutes'));
app.use('/api/submissions', require('./src/routes/submissionRoutes'));
app.use('/api/reports', require('./src/routes/reportRoutes'));
app.use('/api/certificate', require('./src/routes/certificateRoutes'));

app.use('/api/remarks', require('./src/routes/remarkRoutes'));
app.use('/api/gallery', require('./src/routes/galleryRoutes'));
app.use('/api/library', require('./src/routes/libraryRoutes'));
app.use('/api/materials', require('./src/routes/studyMaterialRoutes'));

app.use('/api/quizzes', require('./src/routes/quizRoutes'));
app.use('/api/awards', require('./src/routes/awardRoutes'));
app.use('/api/settings', require('./src/routes/settingRoutes'));
app.use('/api/transport', require('./src/routes/transportRoutes'));
app.use('/api/stats', require('./src/routes/statsRoutes'));

app.get('/', (req, res) => {
    res.send('School Management System API is running');
});

// Simple error handler for now
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket.io Connection logic
io.on('connection', (socket) => {
    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their private room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Export io so it can be used in controllers
app.set('socketio', io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
