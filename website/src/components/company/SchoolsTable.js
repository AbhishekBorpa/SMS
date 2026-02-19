'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SchoolsTable() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const { data } = await axios.get('http://localhost:5002/api/company/schools');
                setSchools(data.map(s => ({
                    id: s._id,
                    name: s.name,
                    plan: s.plan || 'Growth',
                    status: s.status || 'Active',
                    region: s.region || 'Global',
                    users: s.users || 0,
                    lastLogin: 'Today' // Mock for now
                })));
            } catch (err) {
                console.error("Failed to fetch schools", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchools();
    }, []);

    const filteredSchools = schools.filter(s => {
        const matchesFilter = filter === 'All' || s.status === filter;
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading School Registry...</div>;

    return (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-in fade-in flex flex-col h-[600px]">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex gap-2">
                    {['All', 'Active', 'Pending', 'Suspended'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === f ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search schools..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-orange-500"
                    />
                    <span className="absolute left-3 top-2.5 text-slate-500">🔍</span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-auto flex-1">
                <table className="w-full text-left">
                    <thead className="bg-slate-700 text-slate-300 sticky top-0">
                        <tr>
                            <th className="p-4">School Name</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Region</th>
                            <th className="p-4">Users</th>
                            <th className="p-4">Last Activity</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {filteredSchools.map(s => (
                            <tr key={s.id} className="hover:bg-slate-700/50 transition-colors group">
                                <td className="p-4 font-bold flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white">
                                        {s.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    {s.name}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold border ${s.plan === 'Enterprise' ? 'bg-purple-500/10 border-purple-500 text-purple-400' :
                                        s.plan === 'Growth' ? 'bg-blue-500/10 border-blue-500 text-blue-400' :
                                            'bg-slate-500/10 border-slate-500 text-slate-400'
                                        }`}>
                                        {s.plan}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-400">{s.region}</td>
                                <td className="p-4 text-slate-300">{s.users}</td>
                                <td className="p-4 text-xs text-slate-500 font-mono">{s.lastLogin}</td>
                                <td className="p-4">
                                    <span className={`flex items-center gap-2 text-sm font-bold ${s.status === 'Active' ? 'text-green-500' :
                                        s.status === 'Pending' ? 'text-yellow-500' :
                                            'text-red-500'
                                        }`}>
                                        <span className={`w-2 h-2 rounded-full ${s.status === 'Active' ? 'bg-green-500 animate-pulse' :
                                            s.status === 'Pending' ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}></span>
                                        {s.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded hover:bg-slate-600" title="Settings">⚙️</button>
                                        <button className="text-orange-500 hover:text-orange-400 bg-slate-800 p-2 rounded hover:bg-slate-600 font-bold text-xs">LOGIN AS</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-slate-700 text-xs text-slate-500 flex justify-between">
                <span>Showing {filteredSchools.length} of {schools.length} schools</span>
                <div className="flex gap-2">
                    <button className="hover:text-white">Previous</button>
                    <button className="hover:text-white">Next</button>
                </div>
            </div>
        </div>
    );
}
