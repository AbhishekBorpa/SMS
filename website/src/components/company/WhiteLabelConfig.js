export default function WhiteLabelConfig() {
    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-8">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h2 className="text-3xl font-bold">🎨 Whitelabeling</h2>
                    <p className="text-slate-400">Customize the look and feel for Enterprise tenants.</p>
                </div>
                <button className="bg-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-900/20">Save Branding</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Config */}
                <div className="space-y-6">
                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <h3 className="font-bold text-xl mb-6">Global Assets</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 mb-2 font-bold text-xs uppercase">Login Logo (Light)</label>
                                <div className="w-full h-32 bg-slate-900 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center flex-col cursor-pointer hover:border-orange-500 hover:bg-slate-800 transition-all group">
                                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">☀️</span>
                                    <span className="text-xs text-slate-500 font-bold">Upload PNG</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 mb-2 font-bold text-xs uppercase">Login Logo (Dark)</label>
                                <div className="w-full h-32 bg-slate-900 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center flex-col cursor-pointer hover:border-orange-500 hover:bg-slate-800 transition-all group">
                                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🌙</span>
                                    <span className="text-xs text-slate-500 font-bold">Upload PNG</span>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-slate-400 mb-2 font-bold text-xs uppercase">Favicon</label>
                                <div className="w-full h-16 bg-slate-900 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center flex-row gap-2 cursor-pointer hover:border-orange-500 hover:bg-slate-800 transition-all">
                                    <span className="text-xl">⭐️</span>
                                    <span className="text-xs text-slate-500 font-bold">Upload ICO</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <h3 className="font-bold text-xl mb-6">Theme Colors</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                                    <span>Primary Brand Color</span>
                                    <span className="text-white">#EA580C</span>
                                </label>
                                <div className="flex gap-2">
                                    <input type="color" className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-none" value="#ea580c" />
                                    <input type="text" value="#EA580C" className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 font-mono text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                                    <span>Sidebar Background</span>
                                    <span className="text-white">#1E293B</span>
                                </label>
                                <div className="flex gap-2">
                                    <input type="color" className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-none" value="#1e293b" />
                                    <input type="text" value="#1E293B" className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 font-mono text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Preview */}
                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-4 right-4 bg-orange-600 text-xs font-bold px-2 py-1 rounded text-white z-10">LIVE PREVIEW</div>
                    <div className="scale-[0.8] origin-top-left w-[125%] h-[125%] pointer-events-none select-none border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                        {/* Mock Login Page */}
                        <div className="w-full h-full bg-slate-950 flex">
                            <div className="w-1/2 bg-slate-900 flex flex-col justify-center p-12">
                                <div className="w-12 h-12 bg-orange-600 rounded-lg mb-4"></div>
                                <div className="h-8 bg-slate-700 w-3/4 rounded mb-2"></div>
                                <div className="h-4 bg-slate-800 w-1/2 rounded mb-8"></div>
                                <div className="space-y-4">
                                    <div className="h-10 bg-slate-800 rounded border border-slate-700"></div>
                                    <div className="h-10 bg-slate-800 rounded border border-slate-700"></div>
                                    <div className="h-10 bg-orange-600 rounded"></div>
                                </div>
                            </div>
                            <div className="w-1/2 bg-orange-900/20 flex items-center justify-center">
                                <div className="text-orange-800 text-9xl opactcity-20">⚡</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
