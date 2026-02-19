export default function FinancePage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="animate-fade-in-up">
                        <span className="text-green-500 font-bold uppercase tracking-wider text-sm border border-green-500/30 px-3 py-1 rounded-full bg-green-500/10">Finance Module</span>
                        <h1 className="text-5xl md:text-7xl font-black mt-6 mb-8 leading-tight">
                            Zero Leakage <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Fee Collection.</span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                            Stop chasing parents with Excel sheets. Automate reminders, offer online payments, and reconcile accounts in real-time.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-5 border border-green-500/30">
                                    <span className="text-2xl">💳</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-1">Universal Payments</h3>
                                    <p className="text-slate-400">Accept Credit Cards, UPI, Netbanking, and Wallets via integrated gateways (Razorpay/Stripe).</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-5 border border-emerald-500/30">
                                    <span className="text-2xl">💬</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-1">WhatsApp Reminders</h3>
                                    <p className="text-slate-400">Automated polite payment nudges sent directly to parents' WhatsApp. Improves collection by 40%.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mr-5 border border-teal-500/30">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-1">Defaulter Dashboard</h3>
                                    <p className="text-slate-400">Single-view list of all pending dues. Block report card access for long-term defaulters automatically.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-[3rem] p-8 border border-slate-700 shadow-2xl relative">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/30 rounded-full blur-[80px]"></div>
                        {/* Mock Dashboard UI */}
                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <div className="text-slate-400 text-sm">Total Collection (Today)</div>
                                    <div className="text-3xl font-bold text-white">₹ 24,50,000</div>
                                </div>
                                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm font-bold">+12% vs yest</div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[75%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Target: ₹ 30L</span>
                                    <span className="text-white font-bold">75% Achieved</span>
                                </div>
                            </div>
                        </div>
                        {/* Transaction List Mock */}
                        <div className="mt-4 space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">₹</div>
                                        <div>
                                            <div className="text-white font-bold text-sm">Tuition Fee - Class 10</div>
                                            <div className="text-slate-500 text-xs">Arjun Singh • via UPI</div>
                                        </div>
                                    </div>
                                    <div className="text-green-400 font-bold text-sm">+ ₹45,000</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
