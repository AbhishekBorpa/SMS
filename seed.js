const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Class = require('./src/models/Class');
const School = require('./src/models/School');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        // Clear all data
        await Class.deleteMany();
        await User.deleteMany();
        await School.deleteMany();
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
