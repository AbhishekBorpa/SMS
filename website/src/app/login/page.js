'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Adjust API URL if needed. Assuming backend is on port 5002
            const { data } = await axios.post('http://localhost:5002/api/auth/login', { email, password });

            if (data.role !== 'Admin') {
                setError('Access Denied. Admins only.');
                return;
            }

            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminName', data.name);
            localStorage.setItem('userInfo', JSON.stringify(data));
            router.push('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Admin Portal</h1>
                    <p className="text-slate-500">Sign in to manage your school</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-slate-700 to-slate-900 hover:shadow-lg transition-all"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
