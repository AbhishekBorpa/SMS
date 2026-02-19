'use client';
import { useState } from 'react';

export default function OnboardingWizard() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(step + 1);
        }, 800);
    };

    return (
        <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8">

            {/* Steps Indicator */}
            <div className="mb-12 flex justify-between items-center px-10">
                {[1, 2, 3, 4].map(s => (
                    <div key={s} className="flex flex-col items-center relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors border-4 ${step >= s ? 'bg-orange-600 border-orange-600 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'
                            }`}>
                            {step > s ? '✓' : s}
                        </div>
                        <div className="text-xs font-bold mt-2 uppercase tracking-wide text-slate-500">
                            {s === 1 ? 'Details' : s === 2 ? 'Config' : s === 3 ? 'Admin' : 'Done'}
                        </div>
                    </div>
                ))}
                {/* Progress Bar Line */}
                <div className="absolute left-0 right-0 top-5 h-1 bg-slate-800 -z-0 mx-auto w-3/4">
                    <div className="h-full bg-orange-600 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                </div>
            </div>

            <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">

                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur z-20 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <div className="text-white font-bold">Processing System Config...</div>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-white">School Identity</h2>
                            <p className="text-slate-400">Basic details to provision the tenant.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <input type="text" placeholder="School Name" className="w-full bg-slate-900 border border-slate-600 p-4 rounded-xl text-white outline-none focus:border-orange-500 transition-colors" />
                            <input type="text" placeholder="Tenant ID (Subdomain)" className="w-full bg-slate-900 border border-slate-600 p-4 rounded-xl text-white outline-none focus:border-orange-500 transition-colors" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <select className="w-full bg-slate-900 border border-slate-600 p-4 rounded-xl text-white outline-none">
                                <option>Region: India (Mumbai)</option>
                                <option>Region: USA (N. Virginia)</option>
                                <option>Region: UAE (Dubai)</option>
                            </select>
                            <select className="w-full bg-slate-900 border border-slate-600 p-4 rounded-xl text-white outline-none">
                                <option>Type: K-12</option>
                                <option>Type: University</option>
                                <option>Type: Training Center</option>
                            </select>
                        </div>
                        <button onClick={handleNext} className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-900/20 transition-all">
                            Continue Setup &rarr;
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-white">License & Modules</h2>
                            <p className="text-slate-400">Configure what this school can access.</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {['Starter Plan', 'Growth Plan', 'Enterprise Plan'].map((p, i) => (
                                <div key={i} className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${i === 1 ? 'border-orange-500 bg-orange-500/10' : 'border-slate-700 hover:border-slate-500'}`}>
                                    <div className="font-bold text-lg mb-2">{p}</div>
                                    <div className="text-sm text-slate-400">Includes core features + {i * 5} addons</div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Beta Modules</label>
                            <div className="mt-2 flex gap-4">
                                <label className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 cursor-pointer">
                                    <input type="checkbox" className="accent-orange-500" />
                                    <span>AI Tutor</span>
                                </label>
                                <label className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 cursor-pointer">
                                    <input type="checkbox" className="accent-orange-500" />
                                    <span>WhatsApp API</span>
                                </label>
                            </div>
                        </div>
                        <button onClick={handleNext} className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                            Next: Admin Setup &rarr;
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-white">Super Admin Invite</h2>
                            <p className="text-slate-400">Who will manage this school?</p>
                        </div>
                        <input type="email" placeholder="Principal/IT Admin Email" className="w-full bg-slate-900 border border-slate-600 p-4 rounded-xl text-white outline-none focus:border-orange-500" />

                        <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl text-sm text-blue-300">
                            ℹ️ An invite link valid for 48 hours will be sent to this email.
                        </div>

                        <button onClick={handleNext} className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            🚀 Launch Instance
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="text-center py-10 animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                            <span className="text-5xl">🎉</span>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-4">School Provisioned!</h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                            The instance is live at <a href="#" className="underline text-orange-400">davpublic.schoolsms.com</a>. Credentials sent.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button className="px-6 py-3 bg-slate-700 rounded-xl font-bold hover:bg-slate-600">View Logs</button>
                            <button onClick={() => setStep(1)} className="px-6 py-3 bg-orange-600 rounded-xl font-bold hover:bg-orange-700">Add Another</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
