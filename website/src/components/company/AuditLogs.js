'use client';
import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterAdmin, setFilterAdmin] = useState('All Admins');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const { data } = await axios.get('http://localhost:5002/api/company/audit-logs');
                setLogs(data.map(l => ({
                    id: l._id,
                    time: l.createdAt ? format(new Date(l.createdAt), 'MMM dd, h:mm a') : 'Unknown',
                    admin: l.performedBy ? l.performedBy.name : 'System',
                    action: l.action,
                    target: l.target || 'N/A',
                    ip: l.ipAddress || 'Internal',
                    status: l.status || 'Success'
                })));
            } catch (err) {
                console.error("Failed to fetch logs", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    // Unique admins for filter
    const admins = ['All Admins', ...new Set(logs.map(l => l.admin))];

    const filteredLogs = filterAdmin === 'All Admins' ? logs : logs.filter(l => l.admin === filterAdmin);

    if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading Security Trails...</div>;

    return (
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden animate-in fade-in shadow-xl">
            <div className="p-8 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Security Audit Log</h2>
                    <p className="text-slate-400">Immutable record of all administrative actions. (Real-time)</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-slate-700 rounded-lg text-sm font-bold hover:bg-white hover:text-slate-900 transition-colors">⬇ Export CSV</button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-slate-900/50 p-4 flex gap-4 border-b border-slate-700 overflow-x-auto">
                <select
                    className="bg-slate-800 border-none text-slate-300 rounded px-3 py-2 text-sm"
                    value={filterAdmin}
                    onChange={(e) => setFilterAdmin(e.target.value)}
                >
                    {admins.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select className="bg-slate-800 border-none text-slate-300 rounded px-3 py-2 text-sm"><option>All Actions</option></select>
                <select className="bg-slate-800 border-none text-slate-300 rounded px-3 py-2 text-sm"><option>Date Range</option></select>
            </div>

            <table className="w-full text-left">
                <thead className="bg-slate-800 text-slate-400 font-bold uppercase text-xs">
                    <tr>
                        <th className="p-6">Time</th>
                        <th className="p-6">Actor</th>
                        <th className="p-6">Action</th>
                        <th className="p-6">Target</th>
                        <th className="p-6">IP Address</th>
                        <th className="p-6">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {filteredLogs.map((l, i) => (
                        <tr key={i} className="hover:bg-slate-700/30 transition-colors font-mono text-sm">
                            <td className="p-6 text-slate-500">{l.time}</td>
                            <td className="p-6 font-bold text-blue-400">{l.admin}</td>
                            <td className="p-6 text-white">{l.action}</td>
                            <td className="p-6 text-slate-400">{l.target}</td>
                            <td className="p-6 text-slate-600">{l.ip}</td>
                            <td className="p-6">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${l.status === 'Success' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                                    {l.status.toUpperCase()}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {filteredLogs.length === 0 && (
                        <tr><td colSpan="6" className="p-8 text-center text-slate-500">No logs found.</td></tr>
                    )}
                </tbody>
            </table>
            <div className="p-6 border-t border-slate-700 text-center">
                <button className="text-slate-500 font-bold hover:text-white text-sm">Load Older Logs</button>
            </div>
        </div>
    );
}
