const Hero = () => {
    return (
        <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-600/20 blur-3xl"></div>
                <div className="absolute top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-orange-500/10 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                        Manage School on Web. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Teach on Mobile.</span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        The complete ecosystem: Admins onboard staff instantly via the Web Portal, while Teachers access everything they need from our dedicated Mobile App.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/register-school" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-orange-500/25 transition-all transform hover:-translate-y-1">
                            Register your School
                        </a>
                        <a href="#features" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                            Learn More
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-t border-white/10">
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">500+</div>
                            <div className="text-slate-400">Partner Schools</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">50k+</div>
                            <div className="text-slate-400">Active Students</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                            <div className="text-slate-400">Uptime Guarantee</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
