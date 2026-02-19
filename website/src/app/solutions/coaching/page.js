export default function CoachingPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-purple-600 font-bold uppercase tracking-wider text-sm">Solutions</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-6">
                        For Training Centers
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Streamline tuition centers and coaching institutes. Focus on batch management and student performance.
                    </p>
                </div>

                <div className="bg-slate-900 text-white rounded-3xl p-12 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">High-Performance Batch Management</h2>
                            <p className="text-slate-300 mb-8">
                                Managing multiple batches on different days? Our conflict-free scheduler ensures no room is double-booked and no teacher is overworked.
                            </p>
                            <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100">
                                View Scheduler Demo
                            </button>
                        </div>
                        <div className="bg-white/10 rounded-2xl h-64 border border-white/20 flex items-center justify-center">
                            <span className="text-4xl">📅</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
