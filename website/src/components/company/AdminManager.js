export default function AdminManager() {
    const admins = [
        { name: "Abhishek B", role: "Owner", email: "admin@schoolsms.com", status: "Active", lastActive: "Just now", avatar: "A" },
        { name: "Sarah Jenkins", role: "Support Lead", email: "sarah@schoolsms.com", status: "Active", lastActive: "2 hours ago", avatar: "S" },
        { name: "Mike Ross", role: "Developer", email: "mike@schoolsms.com", status: "Invited", lastActive: "Never", avatar: "M" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in">
            <div className="flex justify-between items-center bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <div>
                    <h2 className="text-2xl font-bold text-white">Team Management</h2>
                    <p className="text-slate-400">Manage access to the Company Dashboard.</p>
                </div>
                <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg flex items-center gap-2">
                    <span>✉️</span> New Invite
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {admins.map((a, i) => (
                    <div key={i} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 flex flex-col items-center text-center group hover:border-orange-500 transition-all relative">
                        <div className="absolute top-4 right-4">
                            <button className="text-slate-600 hover:text-white">•••</button>
                        </div>
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-4 ${a.role === 'Owner' ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white' : 'bg-slate-700 text-slate-300'
                            }`}>
                            {a.avatar}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{a.name}</h3>
                        <div className="text-sm text-slate-400 mb-4">{a.email}</div>
                        <div className="flex gap-2 mb-6">
                            <span className="px-2 py-1 bg-slate-900 rounded text-xs font-bold text-slate-300 border border-slate-700">{a.role}</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${a.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                                }`}>{a.status}</span>
                        </div>
                        <div className="w-full pt-6 border-t border-slate-700 flex justify-between text-xs font-bold text-slate-500">
                            <span>Last Active</span>
                            <span>{a.lastActive}</span>
                        </div>
                    </div>
                ))}

                {/* Invite Card Placeholder */}
                <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 border-dashed flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-800 hover:text-white transition-colors group h-full min-h-[300px]">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-slate-700 transition-colors">
                        <span className="text-2xl">+</span>
                    </div>
                    <span className="font-bold">Add Team Member</span>
                </div>
            </div>
        </div>
    );
}
