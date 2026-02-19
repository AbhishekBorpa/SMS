'use client';
import { useState } from 'react';

export default function BroadcastCenter() {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([
        { id: 1, msg: "Scheduled maintenance tonight at 2 AM UTC.", date: "2 days ago", sentTo: "All Schools", type: "Info" },
        { id: 2, msg: "New HR Module is now live! Check your dashboard.", date: "1 week ago", sentTo: "All Schools", type: "Feature" },
        { id: 3, msg: "Urgent: Payment Gateway downtime expected.", date: "1 month ago", sentTo: "Admins Only", type: "Alert" }
    ]);

    const handleSend = () => {
        if (!message) return;
        const newMsg = {
            id: history.length + 1,
            msg: message,
            date: "Just now",
            sentTo: "All Schools",
            type: "Info"
        };
        setHistory([newMsg, ...history]);
        setMessage('');
        alert('Broadcast Sent!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">📢 Compose Broadcast</h2>
                        <p className="text-slate-400">Push global notifications to client dashboards.</p>
                    </div>
                </div>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 p-4 rounded-xl h-40 mb-6 text-white text-lg focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-600"
                    placeholder="Type your announcement here... supports Markdown."
                ></textarea>

                <div className="flex flex-col md:flex-row gap-6 justify-between items-center p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                    <div className="flex gap-6">
                        <label className="flex items-center space-x-3 text-slate-300 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 accent-orange-500 rounded" defaultChecked />
                            <span className="font-bold">Pin to Dashboard</span>
                        </label>
                        <label className="flex items-center space-x-3 text-slate-300 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 accent-orange-500 rounded" />
                            <span className="font-bold">Send Email Alert</span>
                        </label>
                        <label className="flex items-center space-x-3 text-slate-300 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 accent-orange-500 rounded" />
                            <span className="font-bold">Push Notification</span>
                        </label>
                    </div>
                    <button
                        onClick={handleSend}
                        className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-2"
                    >
                        🚀 Send Blast
                    </button>
                </div>
            </div>

            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
                <div className="p-6 bg-slate-700/50 border-b border-slate-700">
                    <h3 className="font-bold text-slate-300 uppercase tracking-wider text-xs">Transmission History</h3>
                </div>
                <div className="divide-y divide-slate-700">
                    {history.map(h => (
                        <div key={h.id} className="p-6 hover:bg-slate-700/30 transition-colors flex justify-between items-start">
                            <div>
                                <div className="flex gap-2 items-center mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${h.type === 'Alert' ? 'bg-red-500/20 text-red-500' :
                                            h.type === 'Feature' ? 'bg-purple-500/20 text-purple-500' :
                                                'bg-blue-500/20 text-blue-500'
                                        }`}>{h.type}</span>
                                    <span className="text-slate-500 text-sm">{h.sentTo}</span>
                                    <span className="text-slate-600 text-sm">• {h.date}</span>
                                </div>
                                <p className="text-slate-200 font-medium">{h.msg}</p>
                            </div>
                            <button className="text-slate-500 hover:text-white text-sm font-bold">Resend</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
