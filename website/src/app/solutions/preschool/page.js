export default function PreschoolPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-pink-500 font-bold uppercase tracking-wider text-sm">Solutions</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-6">
                        For Preschools
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        A gentle, colorful interface designed for kindergartens and daycare centers. Focus on safety and parent updates.
                    </p>
                </div>

                <div className="bg-pink-50 rounded-[3rem] p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-pink-900 mb-6">Features Parents Love</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center text-lg text-pink-800">
                                    <span className="bg-pink-200 p-2 rounded-full mr-4">🍼</span>
                                    <span>Food & Nap Updates</span>
                                </li>
                                <li className="flex items-center text-lg text-pink-800">
                                    <span className="bg-pink-200 p-2 rounded-full mr-4">📸</span>
                                    <span>Daily Activity Photos</span>
                                </li>
                                <li className="flex items-center text-lg text-pink-800">
                                    <span className="bg-pink-200 p-2 rounded-full mr-4">🩺</span>
                                    <span>Health & Medication Logs</span>
                                </li>
                                <li className="flex items-center text-lg text-pink-800">
                                    <span className="bg-pink-200 p-2 rounded-full mr-4">🚍</span>
                                    <span>Live Pickup/Drop Tracking</span>
                                </li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                                <div className="text-4xl mb-2">🎨</div>
                                <div className="font-bold text-slate-700">Art Class</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm text-center mt-8">
                                <div className="text-4xl mb-2">🎵</div>
                                <div className="font-bold text-slate-700">Music Time</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                                <div className="text-4xl mb-2">⚽</div>
                                <div className="font-bold text-slate-700">Play Time</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm text-center mt-8">
                                <div className="text-4xl mb-2">📝</div>
                                <div className="font-bold text-slate-700">Learning</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
