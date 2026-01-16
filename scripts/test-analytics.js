const API_URL = 'http://localhost:5001/api';

const testAnalytics = async () => {
    try {
        // 1. Login as Admin
        console.log('Logging in as Admin...');
        const loginRes = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@school.com',
                password: 'password123'
            })
        });

        if (!loginRes.ok) {
            const errText = await loginRes.text();
            throw new Error(`Login Failed: ${loginRes.status} - ${errText}`);
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Login Successful. Token received.');

        // 2. Test Analytics Endpoint
        console.log('Fetching Analytics...');
        const statsRes = await fetch(`${API_URL}/stats/analytics`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('Analytics Response Status:', statsRes.status);
        if (statsRes.ok) {
            const data = await statsRes.json();
            console.log('Analytics Data Keys:', Object.keys(data));
            console.log('SUCCESS! Endpoint is working.');
        } else {
            const errText = await statsRes.text();
            console.error('FAILED. Status:', statsRes.status);
            console.error('Response:', errText);
        }

    } catch (error) {
        console.error('FAILED. Error:', error.message);
    }
};

testAnalytics();
