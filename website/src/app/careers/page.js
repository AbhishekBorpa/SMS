export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Join Our Mission</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Help us transform education for millions of students worldwide.
                    </p>
                </div>

                <div className="bg-orange-50 rounded-3xl p-12 mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Open Positions</h2>
                    <div className="space-y-4">
                        {[
                            { role: "Senior Full Stack Engineer", loc: "Remote / Bangalore", type: "Engineering" },
                            { role: "Product Designer (UI/UX)", loc: "Bangalore", type: "Design" },
                            { role: "Enterprise Sales Manager", loc: "Mumbai", type: "Sales" },
                            { role: "Customer Success Executive", loc: "Remote", type: "Support" }
                        ].map((job, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                                    <p className="text-slate-500">{job.loc} • <span className="text-orange-600 font-bold">{job.type}</span></p>
                                </div>
                                <button className="mt-4 md:mt-0 px-6 py-2 border border-slate-200 rounded-lg hover:border-orange-500 hover:text-orange-500 font-bold transition-colors">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-slate-600 mb-4">Don't see a role that fits?</p>
                    <a href="mailto:careers@schoolsms.com" className="text-orange-600 font-bold hover:underline">
                        Send us your resume anyway &rarr;
                    </a>
                </div>
            </div>
        </main>
    );
}
