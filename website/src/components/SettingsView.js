import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SettingsView() {
    const [settings, setSettings] = useState({
        schoolName: '',
        logoUrl: '',
        themeColor: 'orange',
        contactEmail: '',
        academicYear: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get('http://localhost:5002/api/settings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data) setSettings(data);
        } catch (error) {
            console.error('Failed to fetch settings', error);
        }
    };

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('adminToken');
            await axios.put('http://localhost:5002/api/settings', settings, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Success! Settings updated.');
        } catch (error) {
            setMessage('Failed to update settings.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">System Settings</h1>
                <p className="text-slate-500 mt-2">Configure application-wide settings.</p>
            </header>

            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 max-w-4xl">
                {message && (
                    <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.includes('Success') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">School Name</label>
                            <input
                                type="text"
                                name="schoolName"
                                value={settings.schoolName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Academic Year</label>
                            <input
                                type="text"
                                name="academicYear"
                                value={settings.academicYear}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Email</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={settings.contactEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Logo URL</label>
                            <input
                                type="text"
                                name="logoUrl"
                                value={settings.logoUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Theme Color</label>
                            <select
                                name="themeColor"
                                value={settings.themeColor}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700 bg-white"
                            >
                                <option value="orange">Orange</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="purple">Purple</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                        >
                            {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
