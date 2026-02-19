export default function K12Page() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Solutions</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-6">
                        For K-12 Schools
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Manage everyone from Kindergarten to Grade 12 with ease. Handles complex grading systems (CBSE/ICSE/IGCSE) and automated report cards.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="bg-orange-50 rounded-3xl p-8 h-96 flex items-center justify-center">
                        <span className="text-6xl">🎒</span>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Built for the Modern Campus</h2>
                        <ul className="space-y-4">
                            {[
                                "Automated Report Cards (CCE Format)",
                                "School Bus Tracking with GPS",
                                "Library Book Management",
                                "Parent Communication App",
                                "Admission Inquiry CRM"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-lg text-slate-700">
                                    <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
