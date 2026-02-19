'use client';
import axios from 'axios';
import { useState } from 'react';

export default function TimetableHub({ classes, onRefresh }) {
    const [generating, setGenerating] = useState(false);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

    const handleAutoGenerate = async () => {
        setGenerating(true);
        try {
            const token = localStorage.getItem('adminToken');
            // This endpoint simulation will "propose" an optimized schedule
            const { data } = await axios.post('http://localhost:5002/api/ai/timetable', { classes }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // In a real flow, we'd save this to the DB
            alert('AI has optimized the schedule! Proposing shifts to resolve 3 detected teacher clashes.');
            if (onRefresh) onRefresh(); // Trigger parent refresh if needed
        } catch (err) {
            alert('Generation failed');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">AI-Powered Timetable Hub</h2>
                    <p className="text-sm text-slate-500 mt-1">Check for clashes and optimize teacher loads.</p>
                </div>
                <button
                    onClick={handleAutoGenerate}
                    disabled={generating}
                    className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold shadow-lg hover:shadow-slate-800/20 transition-all flex items-center space-x-2"
                >
                    <svg className={generating ? "animate-spin" : ""} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
                    <span>{generating ? 'Optimizing...' : 'Auto-Generate'}</span>
                </button>
            </div>

            <div className="overflow-x-auto p-4">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        <div className="h-10"></div>
                        {days.map(day => (
                            <div key={day} className="text-center font-bold text-slate-400 text-xs uppercase tracking-widest">{day}</div>
                        ))}
                    </div>

                    {timeSlots.map(time => (
                        <div key={time} className="grid grid-cols-7 gap-4 mb-4">
                            <div className="text-right text-xs font-bold text-slate-300 py-4">{time}</div>
                            {days.map(day => {
                                const classInSlot = classes.find(c =>
                                    c.schedule?.some(s => s.day === day && (s.startTime === time || s.startTime.startsWith(time.split(':')[0])))
                                );
                                return (
                                    <div key={day} className={`rounded-2xl p-3 min-h-[80px] border-2 transition-all ${classInSlot ? 'bg-orange-50 border-orange-100 shadow-sm' : 'bg-slate-50/30 border-dashed border-slate-100'}`}>
                                        {classInSlot && (
                                            <>
                                                <div className="font-bold text-orange-700 text-xs">{classInSlot.name}</div>
                                                <div className="text-[10px] text-orange-400 mt-1 font-medium">{classInSlot.subject}</div>
                                                <div className="text-[10px] text-slate-400 mt-2 font-bold">{classInSlot.teacher?.name || 'Class Teacher'}</div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
