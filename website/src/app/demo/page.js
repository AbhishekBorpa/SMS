'use client';
import { useState } from 'react';

export default function DemoPage() {
    const [step, setStep] = useState(1);

    return (
        <main className="min-h-screen bg-slate-900 text-white pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black mb-6">Schedule a Live Demo</h1>
                    <p className="text-xl text-slate-400">
                        See School SMS in action. Our product experts will show you how to solve your specific challenges.
                    </p>
                </div>

                <div className="bg-white text-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl">
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-2xl font-bold mb-6">1. Pick a Date & Time</h2>
                            {/* Fake Calendar UI */}
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-8">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                    <div key={day} className="text-center">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-2">{day}</div>
                                        <button className="w-full py-4 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-colors">
                                            <div className="text-xl font-bold">12</div>
                                            <div className="text-xs text-green-600">Available</div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button className="py-3 rounded-lg border border-slate-200 hover:bg-slate-50">10:00 AM</button>
                                <button className="py-3 rounded-lg border border-slate-200 hover:bg-slate-50">02:00 PM</button>
                                <button className="py-3 rounded-lg border border-orange-500 bg-orange-50 text-orange-700 font-bold">04:30 PM</button>
                                <button className="py-3 rounded-lg border border-slate-200 hover:bg-slate-50">05:00 PM</button>
                            </div>
                            <button onClick={() => setStep(2)} className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors">
                                Continue &rarr;
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-2xl font-bold mb-6">2. Your Details</h2>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500" />
                                    <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500" />
                                </div>
                                <input type="email" placeholder="Work Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500" />
                                <input type="text" placeholder="School Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500" />
                                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500" />

                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                                        Back
                                    </button>
                                    <button type="button" onClick={() => alert('Demo Booked!')} className="flex-1 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors">
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
