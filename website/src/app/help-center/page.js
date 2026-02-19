export default function HelpCenterPage() {
    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">How can we help?</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for articles, guides, and tutorials..."
                            className="w-full px-6 py-4 rounded-2xl shadow-lg border-0 focus:ring-2 focus:ring-orange-500 outline-none text-lg"
                        />
                        <button className="absolute right-4 top-4 text-orange-600 font-bold">Search</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {[
                        { title: "Getting Started", icon: "🚀", articles: ["School Onboarding Guide", "Setting up Academic Years", "Importing Student Data"] },
                        { title: "Fee Management", icon: "💳", articles: ["Creating Fee Structures", "Generating Invoices", "Payment Gateway Setup"] },
                        { title: "Academics", icon: "🎓", articles: ["Creating Timetables", "Exam Scheduling", "Report Card Formats"] },
                        { title: "Mobile App", icon: "📱", articles: ["Parent Login Guide", "Push Notification Setup", "Troubleshooting"] }
                    ].map((section, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200">
                            <div className="flex items-center mb-4">
                                <span className="text-2xl mr-3">{section.icon}</span>
                                <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                            </div>
                            <ul className="space-y-3">
                                {section.articles.map((article, j) => (
                                    <li key={j}>
                                        <a href="#" className="text-blue-600 hover:underline">{article}</a>
                                    </li>
                                ))}
                            </ul>
                            <a href="#" className="inline-block mt-4 text-sm font-bold text-slate-500 hover:text-slate-800">View all &rarr;</a>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Can't find what you're looking for?</h3>
                    <p className="mb-6 opacity-90">Our support team is available 24/7 to assist you.</p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50">Chat with Us</button>
                        <button className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800">Email Support</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
