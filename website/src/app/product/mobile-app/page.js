export default function MobileAppPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-32 pb-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-600/20 blur-[120px]"></div>
                <div className="absolute bottom-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/20 blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-8 border border-white/10 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-sm font-bold text-slate-300">v2.0 Now Live</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
                            Your Entire School <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">In Your Pocket.</span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
                            Forget WhatsApp groups and paper circulars. Experience the only mobile app with built-in <span className="text-white font-semibold">Digital ID</span>, <span className="text-white font-semibold">Canteen Ordering</span>, and <span className="text-white font-semibold">Health Records</span>.
                        </p>

                        <div className="space-y-8 mb-12">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-5 border border-blue-500/30">
                                    <span className="text-2xl">🪪</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-1">Digital Campus Pass</h3>
                                    <p className="text-slate-400">QR-code based entry/exit. No more lost plastic ID cards.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-5 border border-orange-500/30">
                                    <span className="text-2xl">🍔</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-1">Canteen Pre-ordering</h3>
                                    <p className="text-slate-400">Beat the queue. Pre-order meals during class breaks.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mr-5 border border-pink-500/30">
                                    <span className="text-2xl">🩺</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-1">Health & Wellness</h3>
                                    <p className="text-slate-400">Track BMI, infirmary visits, and dental checkups.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-bold transition-all flex items-center">
                                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.45 2.11a5.6 5.6 0 00-1.63 4.26c.03 2.56 2.27 4.34 2.27 4.34s-1.57 4.41-3.26 6.84c-1.42 2.05-2.9 4.12-4.98 4.16-2.01.07-2.65-1.2-4.95-1.2-2.3 0-3.03 1.18-4.94 1.25-2 .08-3.56-2.03-4.84-4.14C3.89 15.35 2 11.23 2 7.74c0-4.66 3.1-7.1 6.13-7.1 1.95 0 3.3.96 4.34.96.96 0 2.66-1.02 4.98-.96 1.43.05 3.01.76 4 1.47z" /></svg>
                                App Store
                            </button>
                            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-2xl font-bold transition-all flex items-center">
                                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.983 2.983 0 01-.297-.474L1.498 3.868a2.96 2.96 0 012.111-2.054zM15.688 13.896l4.634-2.675-4.634-2.678-2.693 2.678 2.693 2.675zM15.938 3.99l-1.928 1.93 4.887 4.856 2.628-1.516c1.107-.639 1.107-1.685 0-2.324l-5.587-3.226a.916.916 0 00-1.096.223zM5.383 22.65l8.627-8.63-4.887-4.859-9.123 9.12a.915.915 0 00.28.643l5.103 3.726z" /></svg>
                                Google Play
                            </button>
                        </div>
                    </div>

                    {/* Mobile Mockup */}
                    <div className="relative animate-float-slow">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 blur-[80px] opacity-40"></div>
                        <div className="relative z-10 w-[320px] mx-auto rounded-[3rem] border-8 border-slate-800 shadow-2xl bg-slate-900 overflow-hidden">
                            <img src="/assets/mobile_app_student_1769393900013.png" alt="Cortex Mobile App" className="w-full h-auto" />
                        </div>

                        {/* Floating Feature Badges */}
                        <div className="absolute top-20 -right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl animate-float-delayed hidden lg:block">
                            <div className="text-2xl mb-1">🍔</div>
                            <div className="text-xs font-bold text-white">Pre-ordered</div>
                            <div className="text-[10px] text-slate-300">Veg Sandwich</div>
                        </div>
                        <div className="absolute bottom-40 -left-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl animate-float-reverse hidden lg:block">
                            <div className="text-2xl mb-1">✅</div>
                            <div className="text-xs font-bold text-white">Attendance</div>
                            <div className="text-[10px] text-slate-300">Marked Present</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
