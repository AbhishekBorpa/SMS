
const EditIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

export default function ClassTable({ classes, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase">Class Name</th>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase">Teacher</th>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase">Schedule</th>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase">Students</th>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {classes.map((cls) => (
                            <tr key={cls._id} className="hover:bg-slate-50 group transition-colors">
                                <td className="px-8 py-5">
                                    <div className="font-bold text-slate-900">{cls.name}</div>
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">{cls.subject}</div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                            {cls.teacher?.name?.[0] || 'T'}
                                        </div>
                                        <span className="font-medium text-slate-700">{cls.teacher?.name || 'Unassigned'}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    {cls.schedule.map((s, i) => (
                                        <div key={i} className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg inline-block">
                                            {s.day.slice(0, 3)} • {s.startTime}
                                        </div>
                                    ))}
                                </td>
                                <td className="px-8 py-5">
                                    <div className="text-sm font-bold text-slate-900">{cls.students?.length || 0}</div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(cls)}
                                            className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            onClick={() => onDelete(cls._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {classes.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-8 py-12 text-center text-slate-400">
                                    No classes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
