'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CompanyLogin() {
    const [email, setEmail] = useState('superadmin@school.com');
    const [password, setPassword] = useState('password123');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Real API Call
            const res = await fetch('http://localhost:5002/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                if (data.role === 'SuperAdmin') {
                    // Store token (in real app, use HTTP-only cookies or secure storage)
                    localStorage.setItem('companyToken', data.token);
                    router.push('/company/dashboard');
                } else {
                    alert('Access Denied: You are not a Super Admin');
                }
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Connection Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-3xl w-full max-w-md border border-slate-700 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                        🚀
                    </div>
                    <h1 className="text-3xl font-bold text-white">Super Admin</h1>
                    <p className="text-slate-400">Access Global Control Panel</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-slate-300 text-sm font-bold mb-2 block">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-orange-500 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-slate-300 text-sm font-bold mb-2 block">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-orange-500 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button disabled={loading} className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-orange-900/50 transition-all disabled:opacity-50">
                        {loading ? 'Authenticating...' : 'Unlock Dashboard'}
                    </button>
                    <div className="text-center text-xs text-slate-500">
                        Restricted Access. IP Logged.
                    </div>
                </form>
            </div>
        </div>
    );
}
