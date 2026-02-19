export default function FinancialReports() {
    return (
        <div className="space-y-8 animate-in fade-in">
            {/* Top Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-slate-400 font-bold mb-2">Monthly Recurring Revenue</div>
                        <div className="text-4xl font-black text-white">$124,500</div>
                        <div className="text-green-500 font-bold mt-2 flex items-center">
                            <span className="bg-green-500/20 p-1 rounded mr-2">↑ 12%</span> vs last month
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                    <div className="text-slate-400 font-bold mb-2">Net Revenue (YTD)</div>
                    <div className="text-4xl font-black text-white">$1.2M</div>
                    <div className="text-slate-500 font-bold mt-2">Fiscal Year 2025</div>
                </div>
                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                    <div className="text-slate-400 font-bold mb-2">Pending Invoices</div>
                    <div className="text-4xl font-black text-orange-500">$12,400</div>
                    <div className="text-slate-500 font-bold mt-2">14 Schools Overdue</div>
                </div>
            </div>

            {/* Main Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-slate-800 p-8 rounded-3xl border border-slate-700">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-xl">Revenue Growth</h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-slate-700 rounded text-xs font-bold hover:bg-white hover:text-slate-900 transition-colors">1M</button>
                            <button className="px-3 py-1 bg-orange-600 rounded text-xs font-bold text-white">6M</button>
                            <button className="px-3 py-1 bg-slate-700 rounded text-xs font-bold hover:bg-white hover:text-slate-900 transition-colors">1Y</button>
                        </div>
                    </div>
                    <div className="h-64 flex items-end justify-between space-x-4">
                        {[40, 45, 42, 55, 60, 58, 70, 75, 80, 95, 110, 124].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group">
                                <div className="bg-gradient-to-t from-orange-900 to-orange-500 rounded-t-lg transition-all opacity-80 hover:opacity-100 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]" style={{ height: `${(h / 130) * 100}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-500 font-bold uppercase border-t border-slate-700 pt-4">
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    </div>
                </div>

                {/* Churn Stat */}
                <div className="space-y-6">
                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <h3 className="font-bold text-xl mb-4">Churn Rate</h3>
                        <div className="text-5xl font-black text-red-500 mb-2">2.4%</div>
                        <p className="text-slate-400 text-sm mb-4">Revenue lost from cancellations this month.</p>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full w-[2.4%]"></div>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <h3 className="font-bold text-xl mb-4">LTV / CAC</h3>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-black text-white">4.2</span>
                            <span className="text-slate-500 font-bold mb-1">Ratio</span>
                        </div>
                        <p className="text-green-500 text-sm font-bold">Healthy (Target &gt; 3.0)</p>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Recent Transactions</h3>
                    <button className="text-sm font-bold text-orange-500">View All</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-700/50 text-slate-400 text-sm">
                        <tr>
                            <th className="p-4">School</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {[
                            { name: "Greenwood High", plan: "Enterprise", date: "Today, 10:42 AM", amt: "$2,999", status: "Paid" },
                            { name: "Oakridge Int.", plan: "Growth", date: "Yesterday, 4:15 PM", amt: "$999", status: "Paid" },
                            { name: "Little Elly", plan: "Starter", date: "Jan 12, 2025", amt: "$499", status: "Pending" },
                            { name: "Ryan Global", plan: "Enterprise", date: "Jan 10, 2025", amt: "$2,999", status: "Failed" },
                        ].map((t, i) => (
                            <tr key={i} className="hover:bg-slate-700/30">
                                <td className="p-4 font-bold">{t.name}</td>
                                <td className="p-4 text-slate-400 text-sm">{t.plan}</td>
                                <td className="p-4 text-slate-400 text-sm">{t.date}</td>
                                <td className="p-4 font-mono font-bold text-white">{t.amt}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${t.status === 'Paid' ? 'bg-green-500/20 text-green-500' :
                                        t.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                            'bg-red-500/20 text-red-500'
                                        }`}>{t.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
