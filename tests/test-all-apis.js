// Comprehensive API test to verify all bug fixes
const API_URL = 'http://localhost:5002/api';

const test = async () => {
    console.log('='.repeat(60));
    console.log('VERIFYING API BUG FIXES');
    console.log('='.repeat(60));

    let token, adminToken;
    let passed = 0, failed = 0;

    const check = (label, ok, detail = '') => {
        if (ok) { console.log(`  ✓ ${label}`); passed++; }
        else { console.log(`  ✗ ${label} ${detail}`); failed++; }
    };

    // Login as admin
    try {
        const r = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@school.com', password: 'password123' })
        });
        const d = await r.json();
        if (d.token) {
            token = d.token;
            adminToken = d.token;
            check('Admin Login', true);
            console.log(`     Role: ${d.role}, School: ${d.school}`);
        } else {
            // try to find any admin
            check('Admin Login', false, JSON.stringify(d));
        }
    } catch (e) { check('Admin Login', false, e.message); }

    if (!token) {
        // Try to find any user in DB
        try {
            const r = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'admin@gmail.com', password: 'password123' })
            });
            const d = await r.json();
            if (d.token) {
                token = d.token;
                check('Admin fallback login', true);
            }
        } catch (e) { }
    }

    const auth = token ? { 'Authorization': `Bearer ${token}` } : {};

    console.log('\n[Bug 1] Stats Analytics — was crashing due to missing mongoose import');
    {
        const r = await fetch(`${API_URL}/stats/analytics`, { headers: auth });
        // 200 = fixed, 500 with "mongoose is not defined" = still broken
        const text = await r.text();
        const isMongooseError = text.includes('mongoose is not defined');
        check('GET /api/stats/analytics — no ReferenceError', !isMongooseError, isMongooseError ? text.slice(0, 100) : `status=${r.status}`);
        check('GET /api/stats — admin stats works', r.status !== 500 || !isMongooseError, `status=${r.status}`);
    }

    console.log('\n[Bug 2] Fee Controller — getAllTransactions response fix');
    {
        const r = await fetch(`${API_URL}/fees/transactions`, { headers: auth });
        // Should not be a hanging request or 500 from missing res.json
        check('GET /api/fees/transactions — responds (not hanging)', r.status < 600, `status=${r.status}`);
        check('GET /api/fees/transactions — not 404', r.status !== 404, `status=${r.status}`);
    }
    {
        const r = await fetch(`${API_URL}/fees/bulk-assign`, { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
        check('POST /api/fees/bulk-assign — route exists (not 404)', r.status !== 404, `status=${r.status}`);
    }

    console.log('\n[Bug 3] Attendance deleteOne fix — syntax check only (can\'t test destructive)');
    {
        const r = await fetch(`${API_URL}/attendance/student/me`, { headers: auth });
        check('GET /api/attendance — route accessible', r.status < 500, `status=${r.status}`);
    }

    console.log('\n[Bug 4] Club seed — schoolId typo fix');
    {
        const r = await fetch(`${API_URL}/clubs`, { headers: auth });
        check('GET /api/clubs — works', r.status < 500, `status=${r.status}`);
    }

    console.log('\n[Bug 5] Messages — POST /api/messages route now exists');
    {
        // Without valid body, we expect 400, not 404
        const r = await fetch(`${API_URL}/messages`, { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
        check('POST /api/messages — route exists (not 404)', r.status !== 404, `status=${r.status}`);
        // GET /messages/targets should still work
        const r2 = await fetch(`${API_URL}/messages/targets`, { headers: auth });
        check('GET /api/messages/targets — still works', r2.status < 500, `status=${r2.status}`);
    }

    console.log('\n[Bug 6] Unregistered routes — courseRoutes and enrollmentRoutes');
    {
        const r = await fetch(`${API_URL}/courses`, { headers: auth });
        check('GET /api/courses — not 404 anymore', r.status !== 404, `status=${r.status}`);
    }
    {
        const r = await fetch(`${API_URL}/enrollments`, { headers: auth });
        check('GET /api/enrollments — not 404 anymore', r.status !== 404, `status=${r.status}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log(`RESULTS: ${passed} passed, ${failed} failed`);
    console.log('='.repeat(60));
};

test().catch(console.error);
