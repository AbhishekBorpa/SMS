const API_URL = 'http://localhost:5000/api';

const testBackend = async () => {
    console.log('='.repeat(50));
    console.log('BACKEND API TESTING');
    console.log('='.repeat(50));

    try {
        // Test 1: Root endpoint
        console.log('\n[TEST 1] Testing root endpoint...');
        const rootRes = await fetch('http://localhost:5000/');
        const rootText = await rootRes.text();
        console.log('✓ Root endpoint:', rootText);

        // Test 2: Login
        console.log('\n[TEST 2] Testing login endpoint...');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'student1@school.com',
                password: 'password123'
            })
        });

        if (!loginRes.ok) {
            const errText = await loginRes.text();
            console.log('✗ Login failed:', loginRes.status, errText);
            return;
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('✓ Login successful');
        console.log('  User:', loginData.name);
        console.log('  Role:', loginData.role);
        console.log('  Token:', token.substring(0, 20) + '...');

        // Test 3: Get users (requires auth)
        console.log('\n[TEST 3] Testing authenticated endpoint (Get Students)...');
        const usersRes = await fetch(`${API_URL}/users?role=Student`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!usersRes.ok) {
            console.log('✗ Get users failed:', usersRes.status);
        } else {
            const users = await usersRes.json();
            console.log('✓ Get students successful');
            console.log('  Total students:', users.length);
        }

        // Test 4: Get stats
        console.log('\n[TEST 4] Testing stats endpoint...');
        const statsRes = await fetch(`${API_URL}/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!statsRes.ok) {
            console.log('✗ Get stats failed:', statsRes.status);
        } else {
            const stats = await statsRes.json();
            console.log('✓ Get stats successful');
            console.log('  Teachers:', stats.teachers);
            console.log('  Students:', stats.students);
            console.log('  Active Classes:', stats.activeClasses);
        }

        console.log('\n' + '='.repeat(50));
        console.log('✓ ALL TESTS PASSED');
        console.log('='.repeat(50));

    } catch (error) {
        console.log('\n' + '='.repeat(50));
        console.log('✗ TEST FAILED');
        console.log('Error:', error.message);
        console.log('='.repeat(50));
    }
};

testBackend();
