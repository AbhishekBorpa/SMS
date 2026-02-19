
export default function StatsCard({ title, value, icon, color = "blue", subtext }) {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-emerald-50 text-emerald-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-500 tracking-wide uppercase mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                    {subtext && <p className="text-xs text-slate-400 mt-2 font-medium">{subtext}</p>}
                </div>
                <div className={`p-4 rounded-2xl ${colorClasses[color]}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
