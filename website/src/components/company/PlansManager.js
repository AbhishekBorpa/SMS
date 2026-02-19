'use client';
import { useState } from 'react';

export default function PlansManager() {
    const [plans, setPlans] = useState([
        { id: 'starter', name: "Starter", price: 499, active: true, features: ["Basic SIS", "Attendance", "Report Cards"], limit: 500 },
        { id: 'growth', name: "Growth", price: 999, active: true, features: ["Basic SIS", "Attendance", "Finance", "HR", "Mobile App"], limit: 2000 },
        { id: 'enterprise', name: "Enterprise", price: 2999, active: true, features: ["All Features", "White-label", "Priority Support", "API Access"], limit: 'Unlimited' },
    ]);

    return (
        <div className="space-y-8 animate-in fade-in">
            {/* Header / Actions */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Subscription Tiers</h2>
                    <p className="text-slate-400">Manage pricing and feature access globally.</p>
                </div>
                <button className="bg-orange-600 px-6 py-2 rounded-xl font-bold hover:bg-orange-700 transition-colors">
                    + Create New Tier
                </button>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p, i) => (
                    <div key={i} className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden group hover:border-orange-500 transition-all">
                        {/* Status Bar */}
                        <div className={`h-2 w-full ${p.active ? 'bg-green-500' : 'bg-red-500'}`}></div>

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold">{p.name}</h3>
                                <div className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400 font-mono">ID: {p.id}</div>
                            </div>

                            {/* Price Config */}
                            <div className="mb-6">
                                <label className="text-xs font-bold text-slate-500 uppercase">Monthly Price ($)</label>
                                <div className="flex items-center mt-1">
                                    <span className="text-2xl text-slate-500 mr-2">$</span>
                                    <input
                                        type="number"
                                        defaultValue={p.price}
                                        className="bg-transparent text-4xl font-black text-white w-full focus:outline-none border-b border-transparent focus:border-orange-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* User Limit */}
                            <div className="mb-6 bg-slate-900/50 p-4 rounded-xl">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-400">Student Limit</span>
                                    <span className="text-white font-bold">{p.limit}</span>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="space-y-2 mb-8">
                                <label className="text-xs font-bold text-slate-500 uppercase">Features Enabled</label>
                                {p.features.map((f, j) => (
                                    <div key={j} className="flex items-center text-sm text-slate-300">
                                        <span className="text-green-500 mr-2">✓</span> {f}
                                    </div>
                                ))}
                                <button className="text-orange-500 text-sm font-bold mt-2 hover:underline">+ Add Feature</button>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 py-3 bg-slate-700 rounded-xl font-bold hover:bg-slate-600 transition-colors">Config</button>
                                <button className="flex-1 py-3 bg-slate-700 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-colors">Archive</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Global Config Section */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <h3 className="font-bold text-xl mb-6">Global Billing Settings</h3>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <label className="block text-slate-400 mb-2 font-bold">Currency</label>
                        <select className="w-full bg-slate-900 border border-slate-600 p-3 rounded-xl">
                            <option>USD ($)</option>
                            <option>INR (₹)</option>
                            <option>EUR (€)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-slate-400 mb-2 font-bold">Billing Cycle</label>
                        <select className="w-full bg-slate-900 border border-slate-600 p-3 rounded-xl">
                            <option>Monthly & Annual</option>
                            <option>Monthly Only</option>
                            <option>Annual Only</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
