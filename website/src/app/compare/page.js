export default function ComparePage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Why Choose Us?</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        See how School SMS stacks up against traditional legacy software.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 border-b-2 border-slate-100 w-1/3">Feature</th>
                                <th className="p-4 border-b-2 border-orange-500 bg-orange-50 text-orange-900 font-bold w-1/3 rounded-t-xl text-center">School SMS</th>
                                <th className="p-4 border-b-2 border-slate-100 text-slate-500 font-medium w-1/3 text-center">Legacy ERPs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { feature: "User Interface", us: "Modern, Mobile-First", them: "Clunky, Windows 98 style" },
                                { feature: "Mobile App", us: "Native iOS & Android", them: "Web Wrapper / None" },
                                { feature: "Setup Time", us: "Instantly (Cloud)", them: "Weeks (On-Premise)" },
                                { feature: "Pricing", us: "Transparent Subscription", them: "High Upfront CapEx" },
                                { feature: "Updates", us: "Automatic, Free", them: "Paid Annual Upgrades" },
                                { feature: "Support", us: "24/7 Live Chat", them: "Email Tickets (Slow)" }
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                                    <td className="p-6 font-bold text-slate-900">{row.feature}</td>
                                    <td className="p-6 bg-orange-50/30 text-center font-bold text-green-600">
                                        ✅ {row.us}
                                    </td>
                                    <td className="p-6 text-center text-slate-400">
                                        ❌ {row.them}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
