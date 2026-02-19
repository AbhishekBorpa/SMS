export default function LMSPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-yellow-500 font-bold uppercase tracking-wider text-sm border border-yellow-500/30 px-3 py-1 rounded-full bg-yellow-500/10">E-Learning</span>
                    <h1 className="text-5xl md:text-7xl font-black mt-6 mb-8 leading-tight">
                        Classroom <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-300">Without Walls.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        A modern Learning Management System that students actually want to use. Interactive, mobile-first, and gamified.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Feature 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl font-bold text-white mb-6">Interactive Course Builder</h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                Teachers can drag-and-drop videos, PDFs, and assignments to create immersive learning paths. Support for <span className="text-yellow-400">Live Zoom/Meet integration</span> for hybrid classes.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center text-slate-300"><span className="text-yellow-500 mr-3">✓</span> Drip-feed content scheduling</li>
                                <li className="flex items-center text-slate-300"><span className="text-yellow-500 mr-3">✓</span> Discussion forums per topic</li>
                            </ul>
                        </div>
                        <div className="order-1 md:order-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-[3rem] h-80 flex items-center justify-center text-8xl border border-yellow-500/30 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                            <div className="transform group-hover:scale-110 transition-transform duration-500">📚</div>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-[3rem] h-80 flex items-center justify-center text-8xl border border-blue-500/30 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                            <div className="transform group-hover:scale-110 transition-transform duration-500">🎓</div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">AI-Proctored Exams</h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                Conduct secure semester exams from home. Our AI detects multiple faces, tab switching, and background noise to ensure integrity.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center text-slate-300"><span className="text-blue-500 mr-3">✓</span> Auto-grading for MCQs</li>
                                <li className="flex items-center text-slate-300"><span className="text-blue-500 mr-3">✓</span> Plagiarism checker for essays</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
