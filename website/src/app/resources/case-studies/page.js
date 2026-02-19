export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Success Stories</h1>
                    <p className="text-xl text-slate-600">See how schools transformed their operations with School SMS.</p>
                </div>

                <div className="space-y-12">
                    <div className="bg-slate-900 text-white rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <div className="text-orange-500 font-bold uppercase tracking-wider mb-4">Greenwood High International</div>
                            <h2 className="text-3xl font-bold mb-6">"Reduced administrative workload by 40% in just 3 months."</h2>
                            <p className="text-slate-400 mb-8">
                                Greenwood High struggled with manual fee collection and messy paper records. By switching to School SMS ERP, they automated 90% of their finance operations.
                            </p>
                            <button className="text-white font-bold border-b-2 border-orange-500 pb-1">Read Full Story</button>
                        </div>
                        <div className="w-full md:w-1/3 bg-white/10 h-64 rounded-2xl flex items-center justify-center">
                            Logo
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
