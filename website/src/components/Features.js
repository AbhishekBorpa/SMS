const features = [
    {
        title: "Instant Admin Onboarding",
        description: "Create teacher accounts in seconds. The system automatically generates credentials and emails them securely.",
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        color: "bg-blue-50"
    },
    {
        title: "Mobile-First Teaching",
        description: "Teachers log in to the mobile app to view schedules, take attendance, and manage grades on the go.",
        icon: (
            <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        color: "bg-orange-50"
    },
    {
        title: "Secure Access Control",
        description: "Role-based security ensures Admins manage the platform while Teachers focus on the classroom.",
        icon: (
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        color: "bg-green-50"
    }
];

const Features = () => {
    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Streamlined Workflows</h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        A connected ecosystem where every role has the perfect tool for the job.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                            <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
