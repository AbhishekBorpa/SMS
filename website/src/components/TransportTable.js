'use client';

export default function TransportTable({ routes, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">Transport Routes</h2>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-500 border border-slate-200 shadow-sm">
                    {routes.length} Routes
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Route Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Driver</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {routes.length > 0 ? routes.map((route) => (
                            <tr key={route._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-700">{route.routeName}</div>
                                    <div className="text-xs text-slate-400">{route.stops?.length || 0} Stops</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-600">{route.vehicleNumber}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-600">{route.driverName}</div>
                                    <div className="text-xs text-slate-400">{route.driverPhone}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => onEdit(route)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-orange-500 transition-colors shadow-sm border border-transparent hover:border-slate-100">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                        </button>
                                        <button onClick={() => onDelete(route._id)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-500 transition-colors shadow-sm border border-transparent hover:border-slate-100">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium">
                                    No transport routes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
