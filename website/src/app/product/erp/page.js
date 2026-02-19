export default function ERPPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-blue-500 font-bold uppercase tracking-wider text-sm border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/10">Core Module</span>
                    <h1 className="text-5xl md:text-7xl font-black mt-6 mb-8 leading-tight">
                        The Nerve Center <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Of Your Campus.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Eliminate paper trails. Orchestrate Admissions, Inventory, and Certificates from a single, intelligent command center.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all hover:-translate-y-1 group">
                        <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📋</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Admissions & CRM</h3>
                        <p className="text-slate-400 leading-relaxed">Paperless inquiry-to-enrollment workflow. Track lead sources, schedule entrance tests, and generate admission letters instantly.</p>
                    </div>

                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all hover:-translate-y-1 group">
                        <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🧪</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Smart Inventory</h3>
                        <p className="text-slate-400 leading-relaxed">Track every beaker in the lab and jersey in the sports room. Automated low-stock alerts and purchase order generation.</p>
                    </div>

                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all hover:-translate-y-1 group">
                        <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📜</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Certificates</h3>
                        <p className="text-slate-400 leading-relaxed">One-click generation of Bonafide, Transfer Certificates (TC), and Character Certificates. Digital signatures supported.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
