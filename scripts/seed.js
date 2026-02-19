const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../src/config/db');
const User = require('../src/models/User');
const Class = require('../src/models/Class');
const School = require('../src/models/School');
const StudyMaterial = require('../src/models/StudyMaterial');
const Mark = require('../src/models/Mark');
const Attendance = require('../src/models/Attendance');
const Assignment = require('../src/models/Assignment');
const Notice = require('../src/models/Notice');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        // Clear all data
        await Class.deleteMany();
        await User.deleteMany();
        await School.deleteMany();
        await StudyMaterial.deleteMany();
        await Mark.deleteMany();
        await Attendance.deleteMany();
        await Assignment.deleteMany();
        await Notice.deleteMany();
        console.log('Old Data Destroyed...');

        // 1. Create School
        const school = await School.create({
            name: 'Demo Public School',
            slug: 'demo-school',
            contactEmail: 'admin@demo.com',
            address: '123 Education Lane',
            subscriptionStatus: 'Active'
        });
        console.log(`School Created: ${school.name}`);

        // 2. Create Admin
        const adminUser = await User.create({
            name: 'School Admin',
            email: 'admin@school.com',
            password: 'password123',
            role: 'Admin',
            mobileNumber: '9876543210',
            address: 'Admin Block',
            school: school._id
        });

        // 3. Create Teacher
        const teacherUser = await User.create({
            name: 'Sarah Teacher',
            email: 'teacher@school.com',
            password: 'password123',
            role: 'Teacher',
            mobileNumber: '9123456789',
            address: 'Faculty House',
            school: school._id
        });
        console.log(`Teacher Created: ${teacherUser.email}`);

        // 4. Create 10 Students
        const students = [];
        for (let i = 1; i <= 10; i++) {
            const student = await User.create({
                name: `Student ${i}`,
                email: `student${i}@school.com`,
                password: 'password123',
                role: 'Student',
                mobileNumber: `90000000${i.toString().padStart(2, '0')}`,
                address: `Hostel Room ${i}`,
                school: school._id
            });
            students.push(student);
        }
        console.log(`Created ${students.length} Students`);

        // 5. Create 2 Classes & Enroll 5 students each
        // Class A: Physics 12th (Students 1-5)
        const classA = await Class.create({
            name: 'Physics 12th',
            subject: 'Physics',
            teacher: teacherUser._id,
            school: school._id,
            students: students.slice(0, 5).map(s => s._id),
            schedule: [{ day: 'Monday', startTime: '10:00 AM', endTime: '11:00 AM' }]
        });

        // Class B: Mathematics 10th (Students 6-10)
        const classB = await Class.create({
            name: 'Mathematics 10th',
            subject: 'Mathematics',
            teacher: teacherUser._id,
            school: school._id,
            students: students.slice(5, 10).map(s => s._id),
            schedule: [{ day: 'Tuesday', startTime: '12:00 PM', endTime: '01:00 PM' }]
        });

        console.log('Classes Created & Students Enrolled!');
        console.log(`Class 1: ${classA.name} (${classA.students.length} students)`);
        console.log(`Class 2: ${classB.name} (${classB.students.length} students)`);

        // 6. Create Study Materials
        const materialsData = [
            {
                title: 'Algebra Complete Notes',
                subject: 'Mathematics',
                type: 'PDF',
                size: '2.5 MB',
                pages: 45,
                icon: 'file-pdf-box',
                color: '#F44336',
                description: 'Comprehensive algebra notes covering all topics',
                link: 'https://example.com/algebra-notes.pdf'
            },
            {
                title: 'Newton\'s Laws Video Lecture',
                subject: 'Physics',
                type: 'Video',
                duration: '45 min',
                icon: 'video',
                color: '#2196F3',
                description: 'Detailed explanation of Newton\'s three laws',
                link: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds'
            },
            {
                title: 'Periodic Table Interactive',
                subject: 'Chemistry',
                type: 'Link',
                icon: 'web',
                color: '#4CAF50',
                description: 'Interactive periodic table with element details',
                link: 'https://ptable.com/'
            },
            {
                title: 'Cell Biology Diagrams',
                subject: 'Biology',
                type: 'PDF',
                size: '5.2 MB',
                pages: 30,
                icon: 'file-pdf-box',
                color: '#F44336',
                description: 'Detailed cell diagrams with labels',
                link: 'https://example.com/cell-biology.pdf'
            },
            {
                title: 'Grammar Rules Cheat Sheet',
                subject: 'English',
                type: 'PDF',
                size: '1.8 MB',
                pages: 12,
                icon: 'file-pdf-box',
                color: '#F44336',
                description: 'Quick reference for English grammar',
                link: 'https://example.com/grammar.pdf'
            },
            {
                title: 'Calculus Tutorial Series',
                subject: 'Mathematics',
                type: 'Video',
                duration: '2 hours',
                icon: 'video',
                color: '#2196F3',
                description: 'Complete calculus tutorial from basics to advanced',
                link: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr'
            },
            {
                title: 'Photosynthesis Animation',
                subject: 'Biology',
                type: 'Video',
                duration: '15 min',
                icon: 'video',
                color: '#2196F3',
                description: 'Animated explanation of photosynthesis process',
                link: 'https://www.youtube.com/watch?v=UPBMG5EYydo'
            },
            {
                title: 'Chemical Equations Practice',
                subject: 'Chemistry',
                type: 'PDF',
                size: '3.1 MB',
                pages: 25,
                icon: 'file-pdf-box',
                color: '#F44336',
                description: 'Practice problems for balancing equations',
                link: 'https://example.com/chemistry-practice.pdf'
            },
            {
                title: 'World War II Timeline',
                subject: 'History',
                type: 'Link',
                icon: 'web',
                color: '#4CAF50',
                description: 'Interactive timeline of WWII events',
                link: 'https://www.worldwar2facts.org/world-war-2-timeline.html'
            },
            {
                title: 'Physics Formula Sheet',
                subject: 'Physics',
                type: 'PDF',
                size: '0.8 MB',
                pages: 8,
                icon: 'file-pdf-box',
                color: '#F44336',
                description: 'All important physics formulas',
                link: 'https://example.com/physics-formulas.pdf'
            }
        ];

        await StudyMaterial.create(materialsData.map(m => ({
            ...m,
            school: school._id,
            teacher: teacherUser._id,
            grade: '12th' // Default grade
        })));
        console.log(`Created ${materialsData.length} Study Materials`);

        // 7. Create Notices
        const notices = await Notice.create([
            {
                title: 'Upcoming Science Fair',
                message: 'The annual Science Fair will be held on April 15th. All students are encouraged to participate.',
                school: school._id,
                postedBy: adminUser._id,
                targetAudience: 'All'
            },
            {
                title: 'Holiday Announcement',
                message: 'School will remain closed on Friday for Good Friday.',
                school: school._id,
                postedBy: adminUser._id,
                targetAudience: 'All'
            },
            {
                title: 'Exam Schedule Released',
                message: 'The final exam schedule has been released. Please check your dashboard.',
                school: school._id,
                postedBy: adminUser._id,
                targetAudience: 'Student'
            }
        ]);
        console.log('Created 3 Notices');

        // 8. Create Assignments (For Class 1 & 2)
        const assignments = await Assignment.create([
            {
                title: 'Physics Chapter 1 Problems',
                description: 'Solve problems 1-10 from the textbook.',
                subject: 'Physics',
                class: classA._id,
                teacher: teacherUser._id,
                school: school._id,
                grade: '12th',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                totalMarks: 20
            },
            {
                title: 'Math Algebra Worksheet',
                description: 'Complete the attached worksheet on quadratic equations.',
                subject: 'Mathematics',
                class: classB._id,
                teacher: teacherUser._id,
                school: school._id,
                grade: '10th',
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
                totalMarks: 50
            }
        ]);
        console.log('Created 2 Assignments');

        // 9. Create Attendance (Last 5 days)
        const attendanceDocs = [];
        const today = new Date();

        // Helper to generate attendance for a class
        const generateClassAttendance = (cls, studentsList) => {
            for (let i = 0; i < 5; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                date.setHours(0, 0, 0, 0); // Normalize time

                const records = studentsList.map(student => ({
                    student: student._id,
                    status: Math.random() > 0.1 ? 'Present' : 'Absent'
                }));

                attendanceDocs.push({
                    class: cls._id,
                    school: school._id,
                    date: date,
                    records: records
                });
            }
        };

        // Generate for Class A (Students 1-5)
        generateClassAttendance(classA, students.slice(0, 5));

        // Generate for Class B (Students 6-10)
        generateClassAttendance(classB, students.slice(5, 10));

        await Attendance.insertMany(attendanceDocs);
        console.log(`Created ${attendanceDocs.length} Attendance Documents`);

        // 10. Create Marks (Mid-Term for all students)
        const marksRecords = [];
        for (const student of students) {
            const studentClass = student._id.toString() <= students[4]._id.toString() ? classA : classB;
            const subjects = studentClass === classA ? ['Physics', 'Chemistry', 'Math'] : ['Math', 'Science', 'English'];

            for (const sub of subjects) {
                marksRecords.push({
                    student: student._id,
                    class: studentClass._id,
                    subject: sub,
                    examType: 'Mid-Term',
                    score: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // Random 60-100
                    total: 100,
                    school: school._id,
                    teacher: teacherUser._id
                });
            }
        }
        await Mark.insertMany(marksRecords);
        console.log(`Created ${marksRecords.length} Marks Records`);

        console.log('-----------------------------------');
        console.log('LOGIN CREDENTIALS:');
        console.log('Teacher: teacher@school.com / password123');
        console.log('Admin:   admin@school.com   / password123');
        console.log('Student: student1@school.com / password123');
        console.log('-----------------------------------');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Class.deleteMany();
        await User.deleteMany();
        await School.deleteMany();
        await StudyMaterial.deleteMany();
        await Mark.deleteMany();
        await Attendance.deleteMany();
        await Assignment.deleteMany();
        await Notice.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
