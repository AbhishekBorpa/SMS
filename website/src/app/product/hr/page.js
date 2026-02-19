export default function HRPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-purple-500 font-bold uppercase tracking-wider text-sm border border-purple-500/30 px-3 py-1 rounded-full bg-purple-500/10">Staff Management</span>
                    <h1 className="text-5xl md:text-7xl font-black mt-6 mb-8 leading-tight">
                        Power Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Teaching Workforce.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        From recruitment to retirement. Manage attendance, payroll, and performance with human-centric technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: "👆", title: "Biometric Sync", desc: "Start the day instantly. Syncs with fingerprint/FaceID machines for real-time attendance logging." },
                        { icon: "🏝️", title: "Smart Leave Workflow", desc: "Staff apply on mobile. Principal approves on mobile. Auto-adjustment in payroll." },
                        { icon: "💸", title: "One-Click Payroll", desc: "Auto-calculate PF, tax, and allowances. Direct bank transfer file generation." },
                        { icon: "📂", title: "Digital Service Books", desc: "Secure vault for degrees, contracts, and increment letters. Zero paperwork." },
                        { icon: "📈", title: "Performance AI", desc: "Track teacher effectiveness based on student results and anonymous parent feedback." },
                        { icon: "👥", title: "Recruitment Pipeline", desc: "Manage vacancies, schedule interviews, and onboard new staff digitally." }
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-purple-500/50 transition-all hover:-translate-y-1 group">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
