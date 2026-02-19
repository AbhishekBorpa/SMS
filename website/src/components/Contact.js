'use client';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h2>
                    <p className="text-xl text-slate-600">
                        Ready to transform your school? detailed demo or have questions? We're here to help.
                    </p>
                </div>

                <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-8 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                placeholder="john@school.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows="4"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                placeholder="Tell us about your institution..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:-translate-y-1 ${status === 'loading' ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg hover:shadow-orange-500/25'
                                }`}
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>

                        {status === 'success' && (
                            <div className="p-4 bg-green-50 text-green-600 rounded-xl text-center font-medium animate-fade-in">
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium animate-fade-in">
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
