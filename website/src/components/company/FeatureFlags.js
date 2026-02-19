export default function FeatureFlags() {
    return (
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden animate-in fade-in shadow-xl">

            <div className="p-8 border-b border-slate-700 flex justify-between items-center bg-slate-800">
                <div>
                    <h2 className="text-2xl font-bold text-white">Feature Toggles</h2>
                    <p className="text-slate-400">Control feature rollout and beta access.</p>
                </div>
                <div className="flex gap-4">
                    <select className="bg-slate-900 border border-slate-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                        <option>Env: Production</option>
                        <option>Env: Staging</option>
                        <option>Env: Dev</option>
                    </select>
                    <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-700 transition-colors">+ New Flag</button>
                </div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-slate-900/50 text-slate-400 font-bold uppercase text-xs">
                    <tr>
                        <th className="p-6">Flag Key</th>
                        <th className="p-6">Description</th>
                        <th className="p-6">State</th>
                        <th className="p-6">Rollout</th>
                        <th className="p-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {[
                        { key: "AI_TUTOR_BETA", desc: "Generative AI Agent for Students", state: true, rollout: "20%", type: "Experiment" },
                        { key: "WHATSAPP_INTEGRATION", desc: "Native API Messaging Wrapper", state: true, rollout: "100%", type: "Release" },
                        { key: "DARK_MODE_V2", desc: "New UI Theme engine implementation", state: false, rollout: "0%", type: "Ops" },
                        { key: "AUTO_PAYROLL", desc: "One-click salary disbursement logic", state: true, rollout: "100%", type: "Release" },
                        { key: "NEW_ONBOARDING", desc: "Revised sign-up flow steps", state: true, rollout: "50%", type: "Experiment" }
                    ].map((f, i) => (
                        <tr key={i} className="hover:bg-slate-700/30 transition-colors group">
                            <td className="p-6">
                                <div className="font-mono font-bold text-orange-400 mb-1">{f.key}</div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${f.type === 'Release' ? 'bg-green-500/10 border-green-500 text-green-500' :
                                        f.type === 'Experiment' ? 'bg-purple-500/10 border-purple-500 text-purple-500' :
                                            'bg-slate-500/10 border-slate-500 text-slate-500'
                                    }`}>{f.type}</span>
                            </td>
                            <td className="p-6 text-slate-300 font-medium max-w-xs">{f.desc}</td>
                            <td className="p-6">
                                <div className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${f.state ? 'bg-green-500' : 'bg-slate-600'}`}>
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${f.state ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </div>
                            </td>
                            <td className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-full bg-slate-700 h-2 rounded-full w-24 overflow-hidden">
                                        <div className="bg-blue-500 h-full" style={{ width: f.rollout }}></div>
                                    </div>
                                    <span className="font-mono text-xs font-bold">{f.rollout}</span>
                                </div>
                            </td>
                            <td className="p-6 text-right">
                                <button className="text-slate-500 hover:text-white font-bold text-sm bg-slate-800 px-3 py-1 rounded hover:bg-slate-600">Config</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
