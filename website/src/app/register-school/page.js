'use client';

import axios from 'axios';
import { useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

export default function RegisterSchool() {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        contactEmail: '',
        adminName: '',
        adminEmail: '',
        adminPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSlugChange = (e) => {
        const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        setFormData({ ...formData, slug: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5002/api/schools', formData);
            setSuccess(true);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong during registration');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 text-center shadow-2xl">
                    <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Registration Successful!</h2>
                    <p className="text-slate-300 mb-8">
                        Your school <strong>{formData.name}</strong> has been registered. You can now login to your admin dashboard.
                    </p>
                    <a href="/login" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all">
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-900">
            <Navbar />
            <div className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Start Your School's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Digital Journey</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Join hundreds of schools modernizing their operations. Get your dedicated dashboard and mobile app ecosystem in minutes.
                        </p>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-center space-x-3">
                                <span className="w-6 h-6 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center text-sm">✓</span>
                                <span>Complete Student Management</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="w-6 h-6 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center text-sm">✓</span>
                                <span>Teacher Mobile App Access</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="w-6 h-6 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center text-sm">✓</span>
                                <span>Integrated Inventory & Analytics</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-slate-300 mb-2 text-sm font-medium">School Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        placeholder="Global Academy"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-slate-300 mb-2 text-sm font-medium">Unique URL (Slug)</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        placeholder="global-academy"
                                        value={formData.slug}
                                        onChange={handleSlugChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-300 mb-2 text-sm font-medium">Contact Email</label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                    placeholder="info@school.com"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="border-t border-white/10 pt-6">
                                <h3 className="text-white font-bold mb-4">Admin Account Setup</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="adminName"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                                        placeholder="Admin Full Name"
                                        value={formData.adminName}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="email"
                                        name="adminEmail"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                                        placeholder="Admin Email"
                                        value={formData.adminEmail}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="password"
                                        name="adminPassword"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                                        placeholder="Admin Password"
                                        value={formData.adminPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {error && <div className="text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20">{error}</div>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Registering...' : 'Complete School Registration'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
