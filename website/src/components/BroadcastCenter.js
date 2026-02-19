'use client';
import axios from 'axios';
import { useState } from 'react';

export default function BroadcastCenter({ notices, onRefresh }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post('http://localhost:5002/api/notices', { title, content, priority }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle(''); setContent('');
            onRefresh();
        } catch (err) { alert('Broadcast failed'); } finally { setLoading(false); }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 sticky top-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">New Broadcast</h2>
                    <form onSubmit={handleSend} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none" placeholder="Emergency Holiday..." />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Priority</label>
                            <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none bg-white">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Message Content</label>
                            <textarea value={content} onChange={e => setContent(e.target.value)} required rows="4" className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none" placeholder="Type your message here..."></textarea>
                        </div>
                        <button type="submit" disabled={loading} className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all">
                            {loading ? 'Sending...' : 'Send Broadcast'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="xl:col-span-2 space-y-4">
                {notices.map(notice => (
                    <div key={notice._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${notice.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-500'}`}>
                                {notice.priority}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">{new Date(notice.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{notice.title}</h3>
                        <p className="text-slate-500 mt-2 text-sm leading-relaxed">{notice.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
