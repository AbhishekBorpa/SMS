export default function FeaturesPage() {
    const modules = [
        {
            title: "School Administration",
            description: "Complete control over your institution's operations.",
            icon: "🏫",
            features: [
                "Student Information System (SIS)",
                "Staff & HR Management",
                "Advanced Fee Management",
                "Library & Transport Management",
                "Inventory & Asset Tracking",
                "Automated Certificate Generation"
            ]
        },
        {
            title: "Academic Excellence",
            description: "Tools to elevate teaching standards and student performance.",
            icon: "🎓",
            features: [
                "AI-Powered Lesson Planning",
                "Automated Timetable Generator",
                "Online Examination System",
                "Report Card Generation (CBSE/ICSE)",
                "Learning Management System (LMS)",
                "Homework & Assignment Tracking"
            ]
        },
        {
            title: "Smart Communication",
            description: "Bridge the gap between parents, teachers, and key stakeholders.",
            icon: "💬",
            features: [
                "Real-time Push Notifications",
                "SMS & Email Gateways",
                "Parent-Teacher Chat App",
                "Polls & Surveys",
                "Event Calendar & Circulars",
                "Automated Attendance Alerts"
            ]
        },
        {
            title: "Modern Security",
            description: "Enterprise-grade security for your data.",
            icon: "🔒",
            features: [
                "Role-Based Access Control",
                "Encrypted Data Storage",
                "Daily Automated Backups",
                "Audit Logs & Tracking",
                "Secure Payment Gateway",
                "GDPR & ISO Compliant"
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Powerful Features for <br />
                        <span className="text-orange-600">Modern Schools</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Everything you need to run your educational institution efficiently, all in one unified platform.
                    </p>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {modules.map((module, index) => (
                        <div key={index} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl transition-all duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl mb-6">
                                {module.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{module.title}</h3>
                            <p className="text-slate-600 mb-8">{module.description}</p>

                            <ul className="space-y-4">
                                {module.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-slate-700">
                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTO Quote / Tech Section */}
                <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">Built on Cutting-Edge Technology</h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            "We don't just digitize schools; we transform them. Our platform runs on a scalable microservices architecture, ensuring 99.9% uptime and lightning-fast performance even during peak result days."
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 opacity-70">
                            <span className="px-4 py-2 border border-slate-700 rounded-full text-sm">Next.js</span>
                            <span className="px-4 py-2 border border-slate-700 rounded-full text-sm">Node.js</span>
                            <span className="px-4 py-2 border border-slate-700 rounded-full text-sm">MongoDB</span>
                            <span className="px-4 py-2 border border-slate-700 rounded-full text-sm">AWS Cloud</span>
                            <span className="px-4 py-2 border border-slate-700 rounded-full text-sm">React Native</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
