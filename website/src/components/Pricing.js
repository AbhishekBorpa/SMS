const plans = [
    {
        name: "Starter",
        price: "49",
        description: "Perfect for small schools",
        features: ["Up to 200 Students", "Basic Reporting", "Email Support"],
        highlighted: false,
        buttonVariant: "outline"
    },
    {
        name: "Professional",
        price: "199",
        description: "For growing institutions",
        features: ["Up to 1000 Students", "Advanced Analytics", "24/7 Priority Support", "Parent App Access"],
        highlighted: true,
        buttonVariant: "primary"
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations",
        features: ["Unlimited Students", "Custom Integrations", "Dedicated Manager", "White-labeling"],
        highlighted: false,
        buttonVariant: "outline"
    }
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Choose the plan that fits your institution's size and needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {plans.map((plan, index) => (
                        <div key={index} className={`relative p-8 rounded-2xl ${plan.highlighted ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}>
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold px-4 py-1 rounded-full text-center">
                                    MOST POPULAR
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className={`mb-6 ${plan.highlighted ? 'text-slate-300' : 'text-slate-500'}`}>{plan.description}</p>
                            <div className="flex items-baseline mb-8">
                                <span className="text-4xl font-bold">{plan.price === 'Custom' ? '' : '$'}</span>
                                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                                {plan.price !== 'Custom' && (
                                    <span className={`ml-1 text-xl ${plan.highlighted ? 'text-slate-300' : 'text-slate-500'}`}>/mo</span>
                                )}
                            </div>
                            <button className={`w-full py-4 rounded-xl font-bold text-lg mb-8 transition-all ${plan.buttonVariant === 'primary'
                                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:shadow-orange-500/25'
                                    : 'bg-white border-2 border-slate-200 text-slate-900 hover:border-slate-900'
                                }`}>
                                {plan.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
                            </button>
                            <ul className="space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <svg className={`w-5 h-5 mr-3 ${plan.highlighted ? 'text-orange-400' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={plan.highlighted ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
