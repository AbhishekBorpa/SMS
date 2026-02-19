export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-black mb-8">
                        We Build for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Future Generations.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Cortex K-12 was founded with a single mission: To eliminate the administrative burden on teachers so they can focus on what matters—teaching.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-slate-800 py-12">
                    <div className="text-center">
                        <div className="text-4xl font-black text-white mb-2">500+</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500">Schools</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-white mb-2">2M+</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500">Students</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-white mb-2">99.9%</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500">Uptime</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-white mb-2">24/7</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500">Support</div>
                    </div>
                </div>

                {/* Contact Section (Consolidated) */}
                <div className="bg-slate-800 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-slate-400 mb-8 text-lg">
                                Have questions about pricing or features? Our team is ready to help you modernize your campus.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mr-4 text-2xl">📧</div>
                                    <div>
                                        <div className="text-sm text-slate-400">Email Us</div>
                                        <div className="text-xl font-bold">hello@cortexk12.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mr-4 text-2xl">📞</div>
                                    <div>
                                        <div className="text-sm text-slate-400">Call Us</div>
                                        <div className="text-xl font-bold">+1 (555) 123-4567</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mr-4 text-2xl">🏢</div>
                                    <div>
                                        <div className="text-sm text-slate-400">Headquarters</div>
                                        <div className="text-xl font-bold">San Francisco, CA</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">School Name</label>
                                    <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Ex. Springfield High" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Email Address</label>
                                    <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="principal@school.edu" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Message</label>
                                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors h-32" placeholder="Tell us about your requirements..."></textarea>
                                </div>
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
