import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const onEnter = (menu) => setActiveDropdown(menu);
    const onLeave = () => setActiveDropdown(null);

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex-shrink-0 flex items-center group">
                        <span className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-orange-600 transition-colors">
                            Cortex<span className="text-orange-500">.</span>K12
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">

                        <Link href="/" className="px-4 py-2 text-slate-600 hover:text-orange-500 font-bold transition-colors">Home</Link>

                        <Link href="/about" className="px-4 py-2 text-slate-600 hover:text-orange-500 font-bold transition-colors">About Us</Link>

                        {/* Features (Formerly Product) */}
                        <div className="relative group px-4 py-6" onMouseEnter={() => onEnter('product')} onMouseLeave={onLeave}>
                            <button className="text-slate-600 font-bold hover:text-orange-600 flex items-center gap-1">
                                Features <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            {activeDropdown === 'product' && (
                                <div className="absolute top-16 left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 animate-in fade-in slide-in-from-top-2">
                                    <Link href="/product/erp" className="block px-4 py-3 rounded-xl hover:bg-blue-50 text-slate-700 font-bold hover:text-blue-600 transition-colors">🏫 School ERP</Link>
                                    <Link href="/product/lms" className="block px-4 py-3 rounded-xl hover:bg-yellow-50 text-slate-700 font-bold hover:text-yellow-600 transition-colors">📚 LMS & Exams</Link>
                                    <Link href="/product/finance" className="block px-4 py-3 rounded-xl hover:bg-green-50 text-slate-700 font-bold hover:text-green-600 transition-colors">💰 Fee Collection</Link>
                                    <Link href="/product/hr" className="block px-4 py-3 rounded-xl hover:bg-purple-50 text-slate-700 font-bold hover:text-purple-600 transition-colors">👥 HR & Payroll</Link>
                                    <Link href="/product/security" className="block px-4 py-3 rounded-xl hover:bg-red-50 text-slate-700 font-bold hover:text-red-600 transition-colors">🔐 Security</Link>
                                    <Link href="/product/mobile-app" className="block px-4 py-3 rounded-xl hover:bg-orange-50 text-slate-700 font-bold hover:text-orange-600 transition-colors">📱 Mobile App</Link>
                                </div>
                            )}
                        </div>

                        <Link href="/pricing" className="px-4 py-2 text-slate-600 hover:text-orange-500 font-bold transition-colors">Pricing</Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        <Link href="/login" className="text-slate-900 font-bold hover:text-orange-600 transition-colors">
                            Portal Login
                        </Link>
                        <Link href="/register-school" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5">
                            Get Started
                        </Link>
                    </div>

                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full h-screen overflow-y-auto pb-20">
                    <div className="px-4 pt-4 space-y-2">
                        <Link href="/product/erp" className="block px-4 py-3 text-lg font-bold text-slate-700">School ERP</Link>
                        <Link href="/product/mobile-app" className="block px-4 py-3 text-lg font-bold text-slate-700">Mobile App</Link>

                        <div className="h-px bg-slate-100 my-6"></div>
                        <Link href="/login" className="block px-4 py-4 text-center text-slate-900 font-black border-2 border-slate-100 rounded-xl">Portal Login</Link>
                        <Link href="/register-school" className="block px-4 py-4 text-center bg-orange-500 text-white font-black rounded-xl mt-4">Get Started Free</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
