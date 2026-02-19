const axios = require('axios');

const testDeepSeekAI = async () => {
    console.log('Testing DeepSeek AI Integration...\n');

    try {
        // Test 1: Login as student
        console.log('[1] Logging in as student...');
        const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
            email: 'student1@school.com',
            password: 'password123'
        });

        const token = loginRes.data.token;
        console.log('✓ Login successful\n');

        // Test 2: Send message to AI
        console.log('[2] Sending message to DeepSeek AI...');
        const aiRes = await axios.post(
            'http://localhost:5001/api/ai/chat',
            {
                message: 'What is photosynthesis?',
                subject: 'Biology'
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        console.log('✓ AI Response received:');
        console.log('---');
        console.log(aiRes.data.reply);
        console.log('---\n');

        if (aiRes.data.usage) {
            console.log('Token usage:', aiRes.data.usage);
        }

        console.log('\n✅ DeepSeek AI is working correctly!');

    } catch (error) {
        console.error('\n❌ Error:', error.response?.data || error.message);

        if (error.response?.data?.error) {
            console.log('\nNote: Using fallback response. Check:');
            console.log('1. DeepSeek API key is valid');
            console.log('2. API endpoint is correct');
            console.log('3. Network connection is working');
        }
    }
};

testDeepSeekAI();
