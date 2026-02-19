export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-red-500 font-bold uppercase tracking-wider text-sm border border-red-500/30 px-3 py-1 rounded-full bg-red-500/10">Trust Center</span>
                    <h1 className="text-5xl md:text-7xl font-black mt-6 mb-8 leading-tight">
                        Fort Knox <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Standard Security.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        We don't take risks with student data. Enterprise-grade encryption, physical security, and compliance built-in.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-slate-800/50 p-10 rounded-[3rem] border border-slate-700 hover:border-red-500/50 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                            <span className="mr-4 text-4xl">🔐</span> Data Privacy
                        </h2>
                        <ul className="space-y-6 text-lg text-slate-400">
                            <li className="flex items-center"><span className="text-green-500 mr-4 font-bold text-xl">✓</span> <span><strong className="text-white">AES-256</strong> Encryption at rest</span></li>
                            <li className="flex items-center"><span className="text-green-500 mr-4 font-bold text-xl">✓</span> <span><strong className="text-white">GDPR & ISO 27001</strong> Compliant</span></li>
                            <li className="flex items-center"><span className="text-green-500 mr-4 font-bold text-xl">✓</span> <span>Automated <strong className="text-white">Cloud Backups</strong> (AWS S3)</span></li>
                            <li className="flex items-center"><span className="text-green-500 mr-4 font-bold text-xl">✓</span> <span>Role-Based Access Control (RBAC)</span></li>
                        </ul>
                    </div>

                    <div className="bg-slate-800/50 p-10 rounded-[3rem] border border-slate-700 hover:border-red-500/50 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                            <span className="mr-4 text-4xl">🚧</span> Physical Security
                        </h2>
                        <ul className="space-y-6 text-lg text-slate-400">
                            <li className="flex items-center"><span className="text-green-500 mr-4 font-bold text-xl">✓</span> <span><strong className="text-white">RFID</strong> Smart Gate Access</span></li>
                            <li className="flex items-center"><span className="text-green-500 mr-4 font-bold text-xl">✓</span> <span>OTP-based <strong className="text-white">Visitor Management</strong></span></li>
                            <li className="flex items-center"><span className="text-green-500 mr-4 font-bold text-xl">✓</span> <span>Live <strong className="text-white">Bus GPS</strong> Tracking</span></li>
                            <li className="flex items-center"><span className="text-green-500 mr-4 font-bold text-xl">✓</span> <span>CCTV Integration Support</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
