export default function PricingPage() {
    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Simple, Transparent <span className="text-orange-600">Pricing</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Choose a plan that fits your institution's size. No hidden setup fees.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
                    {/* Basic Plan */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg relative">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                        <p className="text-slate-500 text-sm mb-6">For small schools & preschools</p>
                        <div className="mb-6">
                            <span className="text-4xl font-extrabold text-slate-900">$499</span>
                            <span className="text-slate-500">/year</span>
                        </div>
                        <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors mb-8">
                            Get Started
                        </button>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Up to 200 Students</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Basic Student Records</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Fee Management</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Email Support</li>
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl">POPULAR</div>
                        <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
                        <p className="text-slate-400 text-sm mb-6">For growing K-12 schools</p>
                        <div className="mb-6">
                            <span className="text-4xl font-extrabold text-white">$1,499</span>
                            <span className="text-slate-400">/year</span>
                        </div>
                        <button className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors mb-8">
                            Get Started
                        </button>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li className="flex items-center"><svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Up to 1,000 Students</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Mobile App (Android)</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Online Exams & LMS</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Priority 24/7 Support</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Transport & Library Module</li>
                        </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
                        <p className="text-slate-500 text-sm mb-6">For large groups & universities</p>
                        <div className="mb-6">
                            <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                        </div>
                        <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors mb-8">
                            Contact Sales
                        </button>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Unlimited Students</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>White-label Mobile App (iOS & Android)</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Dedicated Account Manager</li>
                            <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Custom API Integrations</li>
                        </ul>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-2">Is there a setup fee?</h3>
                            <p className="text-slate-600">No, all our plans include free initial setup and data migration assistance.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-2">Can I upgrade later?</h3>
                            <p className="text-slate-600">Yes, you can upgrade your plan at any time. The billing will be adjusted on a pro-rata basis.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
