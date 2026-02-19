const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./src/config/db');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors());

// Logging Middleware
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// Compression
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

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
app.use('/api/company', require('./src/routes/companyRoutes'));

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
        origin: process.env.CLIENT_URL || "http://localhost:19006", // Restrict to known client origins
        methods: ["GET", "POST"]
    }
});

const jwt = require('jsonwebtoken');
const User = require('./src/models/User'); // Import User model
const { createAndEmitMessage } = require('./src/services/messageService'); // Import message service

// Socket.io authentication middleware
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error: Token not provided'));
        }

        if (!process.env.JWT_SECRET) {
            return next(new Error('Server configuration error: JWT_SECRET not defined'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return next(new Error('Authentication error: User not found'));
        }

        socket.user = user;
        socket.schoolId = user.school; // Attach schoolId to the socket
        next();
    } catch (error) {
        console.error('Socket.IO authentication error:', error.message);
        next(new Error('Authentication error: Invalid token'));
    }
});

// Socket.io Connection logic
io.on('connection', (socket) => {
    console.log(`User ${socket.user.name} (${socket.user._id}) connected to Socket.IO`);
    console.log(`Associated School ID: ${socket.schoolId}`);

    // User automatically joins their own private room and their school room
    socket.join(socket.user._id.toString());
    socket.join(socket.schoolId.toString()); // Join a room for their school

    console.log(`User ${socket.user._id} joined their private room and school room`);

    // Listen for incoming messages from clients
    socket.on('sendMessage', async (data) => {
        const { recipientId, content } = data;

        if (!recipientId || !content) {
            socket.emit('messageError', { message: 'Recipient and content are required' });
            return;
        }

        try {
            // Use the service function to create and emit the message
            await createAndEmitMessage(
                io, // Pass the io instance
                socket.user._id,
                recipientId,
                content,
                socket.schoolId
            );
            // Success is handled by the emit inside createAndEmitMessage
        } catch (error) {
            console.error('Error sending message via socket:', error);
            socket.emit('messageError', { message: error.message || 'Failed to send message' });
        }
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.user.name} (${socket.user._id}) disconnected`);
    });
});

// Export io so it can be used in controllers
app.set('socketio', io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        const mongoose = require('mongoose');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        const mongoose = require('mongoose');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});
