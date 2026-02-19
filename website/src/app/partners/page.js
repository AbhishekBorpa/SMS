export default function PartnersPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Partner Program</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Grow your business by digitally transforming schools in your region.
                    </p>
                </div>

                <div className="bg-slate-900 rounded-3xl p-12 text-white mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Become a Reseller</h2>
                            <p className="text-slate-400 mb-8 text-lg">
                                Join our network of certified partners. We provide the technology, marketing materials, and technical support. You own the customer relationship.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-slate-300">✅ Generous Revenue Share (Up to 40%)</li>
                                <li className="flex items-center text-slate-300">✅ White-label Options Available</li>
                                <li className="flex items-center text-slate-300">✅ Exclusive Territory Rights</li>
                            </ul>
                            <button className="bg-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors">Apply Now</button>
                        </div>
                        <div className="max-w-sm mx-auto bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="font-bold text-xl mb-4">Partner Success Story</h3>
                            <p className="italic text-slate-400 mb-6">"Partnering with School SMS helped me onboard 50 schools in Gujarat within one year. The support team is phenomenal."</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-slate-700 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-bold">Rahul Verma</div>
                                    <div className="text-xs text-slate-500">EduTech Solutions, India</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
