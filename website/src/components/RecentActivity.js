'use client';

export default function RecentActivity({ activities }) {
    if (!activities || activities.length === 0) {
        return (
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-slate-400">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                <p className="font-bold">No recent activities recorded.</p>
            </div>
        );
    }

    const getActionColor = (action) => {
        if (action.includes('CREATE')) return 'bg-emerald-500';
        if (action.includes('UPDATE')) return 'bg-orange-500';
        if (action.includes('DELETE')) return 'bg-rose-500';
        return 'bg-blue-500';
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-8">System Pulse</h3>
            <div className="space-y-6">
                {activities.map((activity, index) => (
                    <div key={activity._id} className="flex space-x-4 relative">
                        {index !== activities.length - 1 && (
                            <div className="absolute left-[7px] top-8 w-px h-[calc(100%+8px)] bg-slate-100"></div>
                        )}
                        <div className={`w-4 h-4 rounded-full mt-1 ${getActionColor(activity.action)} shrink-0 border-4 border-white shadow-sm ring-1 ring-slate-100`}></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-bold text-slate-700 capitalize">
                                    {activity.action.toLowerCase().replace('_', ' ')}: <span className="text-slate-400 font-medium">{activity.entity}</span>
                                </p>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Performed by <span className="font-bold text-slate-900">{activity.performedBy?.name || 'Admin'}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                View Full Audit Log
            </button>
        </div>
    );
}
