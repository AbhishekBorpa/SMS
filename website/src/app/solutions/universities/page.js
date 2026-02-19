export default function UniversitiesPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Solutions</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-6">
                        For Universities & Colleges
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Scalable infrastructure for higher education. Manage departments, semester-based exams, and course electives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { title: "Semester Management", icon: "🏛️", desc: "Handle rigorous semester schedules and credit-based grading systems." },
                        { title: "Alumni Network", icon: "🎓", desc: "Dedicated portal for alumni to connect, donate, and mentor students." },
                        { title: "Research Grants", icon: "🔬", desc: "Track research papers, grants, and department funding." }
                    ].map((card, i) => (
                        <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
                            <div className="text-4xl mb-4">{card.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                            <p className="text-slate-600">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
