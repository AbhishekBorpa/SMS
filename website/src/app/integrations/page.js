export default function IntegrationsPage() {
    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Connect Your Tools</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        School SMS plays nicely with the software you already use.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { name: "Google Classroom", cat: "LMS" },
                        { name: "Zoom", cat: "Video Conferencing" },
                        { name: "Microsoft Teams", cat: "Communication" },
                        { name: "Tally", cat: "Accounting" },
                        { name: "QuickBooks", cat: "Accounting" },
                        { name: "Paytm", cat: "Payments" },
                        { name: "Razorpay", cat: "Payments" },
                        { name: "Stripe", cat: "Payments" },
                        { name: "BioMetric", cat: "Hardware" },
                        { name: "RFID Readers", cat: "Hardware" },
                        { name: "WhatsApp API", cat: "Messaging" },
                        { name: "AWS", cat: "Cloud Infrastructure" }
                    ].map((tool, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
                            <div className="w-16 h-16 bg-slate-100 rounded-full mb-4 flex items-center justify-center text-xs font-bold text-slate-400">
                                Logo
                            </div>
                            <h3 className="font-bold text-slate-900">{tool.name}</h3>
                            <span className="text-xs text-slate-500 mt-1">{tool.cat}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
