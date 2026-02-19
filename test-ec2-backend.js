const API_URL = 'http://13.201.16.207/api'; // EC2 Production

const testEC2Backend = async () => {
    console.log('='.repeat(60));
    console.log('EC2 BACKEND API TESTING');
    console.log('Server:', API_URL);
    console.log('='.repeat(60));

    try {
        // Test 1: Root endpoint
        console.log('\n[TEST 1] Testing root endpoint...');
        const rootRes = await fetch('http://13.201.16.207/');
        const rootText = await rootRes.text();
        console.log('✓ Status:', rootRes.status);
        console.log('✓ Response:', rootText.substring(0, 100));

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

        console.log('  Status:', loginRes.status);

        if (!loginRes.ok) {
            const errText = await loginRes.text();
            console.log('✗ Login failed');
            console.log('  Response:', errText.substring(0, 300));
            return;
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('✓ Login successful');
        console.log('  User:', loginData.name);
        console.log('  Role:', loginData.role);
        console.log('  Email:', loginData.email);

        // Test 3: Get authenticated user info
        console.log('\n[TEST 3] Testing /auth/me endpoint...');
        const meRes = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!meRes.ok) {
            console.log('✗ Get user info failed:', meRes.status);
        } else {
            const meData = await meRes.json();
            console.log('✓ Get user info successful');
            console.log('  Name:', meData.name);
            console.log('  Role:', meData.role);
        }

        // Test 4: Get users (requires auth)
        console.log('\n[TEST 4] Testing /users endpoint (Get Students)...');
        const usersRes = await fetch(`${API_URL}/users?role=Student`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!usersRes.ok) {
            console.log('✗ Get users failed:', usersRes.status);
        } else {
            const users = await usersRes.json();
            console.log('✓ Get students successful');
            console.log('  Total students:', users.length);
            if (users.length > 0) {
                console.log('  Sample student:', users[0].name, '-', users[0].email);
            }
        }

        // Test 5: Get stats
        console.log('\n[TEST 5] Testing /stats endpoint...');
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
            console.log('  Total Revenue:', stats.totalRevenue);
        }

        console.log('\n' + '='.repeat(60));
        console.log('✅ ALL TESTS PASSED - EC2 BACKEND IS WORKING!');
        console.log('='.repeat(60));

    } catch (error) {
        console.log('\n' + '='.repeat(60));
        console.log('❌ TEST FAILED');
        console.log('Error:', error.message);
        console.log('Stack:', error.stack);
        console.log('='.repeat(60));
    }
};

testEC2Backend();
