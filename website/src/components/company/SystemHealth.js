export default function SystemHealth() {
    const logs = [
        { time: "10:42 AM", level: "INFO", msg: "Backup job started (job_id: 8842)" },
        { time: "10:45 AM", level: "INFO", msg: "Backup job completed successfully (3.2GB)" },
        { time: "11:01 AM", level: "WARN", msg: "API Latency spike observed in region: us-east-1" },
        { time: "11:02 AM", level: "INFO", msg: "Auto-scaling group triggered. Adding 2 instances." },
        { time: "11:05 AM", level: "INFO", msg: "Latency normalized." },
    ];

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "CPU Usage", val: "24", color: "green" },
                    { label: "Memory (RAM)", val: "62", color: "yellow" },
                    { label: "Disk I/O", val: "12", color: "blue" }
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="text-slate-400 font-bold mb-4 uppercase tracking-wider text-sm">{stat.label}</div>
                        {/* CSS Progress Circle Simulation */}
                        <div className="relative w-40 h-40">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-700" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent"
                                    className={`${stat.color === 'green' ? 'text-green-500' : stat.color === 'yellow' ? 'text-yellow-500' : 'text-blue-500'} 
                                    transition-all duration-1000 ease-out`}
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * stat.val) / 100}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-white">
                                {stat.val}%
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 animate-pulse w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black text-green-400 font-mono p-6 rounded-3xl h-96 overflow-hidden border border-slate-700 shadow-inner flex flex-col">
                    <div className="flex border-b border-green-900 pb-2 mb-2 justify-between">
                        <span className="font-bold">🖥️ Live System Logs (tail -f)</span>
                        <span className="animate-pulse">● Live</span>
                    </div>
                    <div className="overflow-y-auto flex-1 space-y-1 text-sm font-medium opacity-90">
                        {logs.map((l, i) => (
                            <div key={i} className="flex gap-2">
                                <span className="text-slate-500">[{l.time}]</span>
                                <span className={l.level === 'WARN' ? 'text-yellow-400' : 'text-green-400'}>{l.level}:</span>
                                <span>{l.msg}</span>
                            </div>
                        ))}
                        <div className="text-slate-500 animate-pulse">_</div>
                    </div>
                </div>

                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                    <h3 className="font-bold text-xl mb-6">Infrastructure Status</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Website Frontend", status: "Operational", uptime: "99.99%" },
                            { name: "API Gateway", status: "Operational", uptime: "99.95%" },
                            { name: "Database (Postgres)", status: "Operational", uptime: "100.00%" },
                            { name: "Redis Cache", status: "Operational", uptime: "99.99%" },
                            { name: "Email Service (SES)", status: "Degraded", uptime: "98.50%" },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${s.status === 'Operational' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                                    <span className="font-bold">{s.name}</span>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-bold ${s.status === 'Operational' ? 'text-green-500' : 'text-yellow-500'}`}>{s.status}</div>
                                    <div className="text-xs text-slate-500">{s.uptime} uptime</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
