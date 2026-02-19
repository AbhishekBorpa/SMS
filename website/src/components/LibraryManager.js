'use client';
import { useState } from 'react';

export default function LibraryManager({ books, loans, onIssue, onReturn, onAddBook, onDeleteBook }) {
    const [view, setView] = useState('inventory'); // 'inventory' or 'loans'

    return (
        <div className="space-y-6">
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setView('inventory')}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${view === 'inventory' ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                >
                    Inventory
                </button>
                <button
                    onClick={() => setView('loans')}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${view === 'loans' ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                >
                    Circulation
                </button>
            </div>

            {view === 'inventory' ? (
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Book Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Subject</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {books.map(book => (
                                <tr key={book._id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-700">{book.title}</div>
                                        <div className="text-xs text-slate-400">by {book.author}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{book.subject}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${book.availableCopies > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {book.availableCopies} / {book.totalCopies} Available
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => onDeleteBook(book._id)} className="text-red-400 hover:text-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Student</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Book</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Due Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loans.map(loan => (
                                <tr key={loan._id}>
                                    <td className="px-6 py-4 font-bold text-slate-700">{loan.student?.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{loan.book?.title}</td>
                                    <td className="px-6 py-4 text-slate-500">{new Date(loan.dueDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        {loan.status === 'Issued' && (
                                            <button
                                                onClick={() => onReturn(loan._id)}
                                                className="px-4 py-1 bg-orange-500 text-white rounded-lg text-xs font-bold"
                                            >
                                                Return
                                            </button>
                                        )}
                                        {loan.status === 'Returned' && (
                                            <span className="text-emerald-500 text-xs font-bold">Returned</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
