export default function BlogPage() {
    const posts = [
        { title: "The Future of AI in Classrooms", date: "Jan 12, 2025", cat: "EdTech" },
        { title: "How to Switch from Paper to Digital in 30 Days", date: "Jan 05, 2025", cat: "Guides" },
        { title: "Top 5 Features Every School Admin Needs", date: "Dec 28, 2024", cat: "Product" },
        { title: "Understanding NEP 2024 Guidelines", date: "Dec 15, 2024", cat: "Policy" }
    ];

    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Latest Insights</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                            <div className="w-full h-48 bg-slate-200 rounded-2xl mb-6 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest">
                                Image Placeholder
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                                <span className="text-orange-600 font-bold">{post.cat}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                {post.title}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
