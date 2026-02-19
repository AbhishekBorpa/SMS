const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/models/User');
const School = require('../src/models/School');

dotenv.config();

const createSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Find a school to link to (required by schema)
        const school = await School.findOne();
        if (!school) {
            console.error('No school found. Please seed the database first.');
            process.exit(1);
        }

        const email = 'superadmin@school.com';
        const password = 'password123';

        // Check if exists
        let user = await User.findOne({ email });
        if (user) {
            console.log('Super Admin already exists.');
            user.role = 'SuperAdmin'; // Ensure role is correct
            user.password = password; // Reset password to known value
            await user.save();
            console.log('Super Admin updated.');
        } else {
            user = await User.create({
                name: 'Super Admin',
                email,
                password,
                role: 'SuperAdmin',
                mobileNumber: '0000000000',
                address: 'Global HQ',
                school: school._id
            });
            console.log('Super Admin created successfully.');
        }

        console.log('Credentials: superadmin@school.com / password123');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createSuperAdmin();
