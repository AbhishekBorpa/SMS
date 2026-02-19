'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Overview() {
    const [stats, setStats] = useState({
        schools: 0,
        users: 0,
        mrr: 0,
        latency: 42
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('http://localhost:5002/api/company/stats');
                setStats({
                    schools: data.schools,
                    users: data.users,
                    mrr: data.mrr,
                    latency: 45 // Mock for now
                });
            } catch (err) {
                console.error("Failed to fetch stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading Platform Data...</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "MRR", val: `$${stats.mrr.toLocaleString()}`, change: "+12%", color: "text-green-500", icon: "💰" },
                    { label: "Active Schools", val: stats.schools, change: "+5", color: "text-blue-500", icon: "🏫" },
                    { label: "Total Users", val: stats.users.toLocaleString(), change: "+45k", color: "text-purple-500", icon: "👥" },
                    { label: "Avg. Latency", val: `${stats.latency}ms`, change: "-2ms", color: "text-orange-500", icon: "⚡" }
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                        <div className="text-slate-400 text-xs font-bold uppercase mb-2">{stat.label}</div>
                        <div className="text-3xl font-black">{stat.val}</div>
                        <div className={`text-sm font-bold mt-2 ${stat.color}`}>{stat.change}</div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Revenue Trend</h3>
                        <select className="bg-slate-900 border-none text-xs rounded text-slate-400 p-1">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    {/* CSS Bar Chart */}
                    <div className="h-64 flex items-end justify-between space-x-2 px-2">
                        {[35, 42, 45, 60, 55, 65, 70, 85, 90, 105, 115, 124].map((h, i) => (
                            <div key={i} className="w-full flex flex-col justify-end group">
                                <div
                                    className="bg-orange-600 rounded-t-sm hover:bg-orange-500 transition-all opacity-80 hover:opacity-100 relative"
                                    style={{ height: `${(h / 130) * 100}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        ${h}k
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-500 font-bold uppercase">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Server Load Distribution</h3>
                        <div className="text-xs text-green-500 font-bold flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                            Healthy
                        </div>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: "Web Nodes (US-East)", load: 45, color: "bg-blue-500" },
                            { name: "Web Nodes (Asia-South)", load: 78, color: "bg-red-500" },
                            { name: "Database Primary", load: 32, color: "bg-green-500" },
                            { name: "Worker Queues", load: 12, color: "bg-purple-500" },
                            { name: "Storage Buckets", load: 55, color: "bg-yellow-500" }
                        ].map((server, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400 font-bold">{server.name}</span>
                                    <span className="font-mono text-white">{server.load}%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className={`h-full ${server.color}`} style={{ width: `${server.load}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
