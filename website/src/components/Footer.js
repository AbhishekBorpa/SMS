const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <span className="text-3xl font-bold text-white mb-6 block">
                            Cortex<span className="text-orange-500">.</span>K12
                        </span>
                        <p className="text-slate-400 mb-6 text-sm">
                            The #1 Operating System for Modern K-12 Schools. built for CBSE, ICSE, and IGCSE curriculums.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Platform</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li><a href="/product/erp" className="hover:text-orange-500 transition-colors">School ERP</a></li>
                            <li><a href="/product/finance" className="hover:text-orange-500 transition-colors">Fee Management</a></li>
                            <li><a href="/product/lms" className="hover:text-orange-500 transition-colors">LMS & Exams</a></li>
                            <li><a href="/product/mobile-app" className="hover:text-orange-500 transition-colors">Mobile App</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Connect</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li><a href="/pricing" className="hover:text-orange-500 transition-colors">Pricing</a></li>
                            <li><a href="/about" className="hover:text-orange-500 transition-colors">About & Contact</a></li>
                            <li><a href="/login" className="hover:text-orange-500 transition-colors">Portal Login</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Legal</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li><a href="/legal" className="hover:text-orange-500 transition-colors">Legal & Privacy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
                    <p>&copy; 2024 Cortex K-12 Systems. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
