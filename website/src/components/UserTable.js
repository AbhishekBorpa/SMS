
const EditIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

export default function UserTable({ users, role, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase">Name</th>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase">Email</th>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase">Mobile</th>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase">Status</th>
                            <th className="px-8 py-5 font-bold text-slate-500 text-xs tracking-wider uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50 group transition-colors">
                                <td className="px-8 py-5">
                                    <div className="font-bold text-slate-900">{user.name}</div>
                                </td>
                                <td className="px-8 py-5 text-slate-500 font-medium">{user.email}</td>
                                <td className="px-8 py-5 text-slate-500 font-medium">{user.mobileNumber || '-'}</td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${role === 'Teacher' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                        {role}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            onClick={() => onDelete(user._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-8 py-12 text-center text-slate-400">
                                    No {role.toLowerCase()}s found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
