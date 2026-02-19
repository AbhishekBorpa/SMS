'use client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AcademicReporter({ students }) {
    const handleDownload = (student) => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.text('ACADEMIC REPORT CARD', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Student: ${student.name}`, 20, 40);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

        // Scores Table
        const body = [
            ['Mathematics', 'A', '92%'],
            ['Science', 'B+', '85%'],
            ['English', 'A-', '88%'],
            ['History', 'A', '95%'],
            ['Geography', 'B', '78%'],
        ];

        doc.autoTable({
            startY: 60,
            head: [['Subject', 'Grade', 'Percentage']],
            body: body,
            theme: 'striped',
            headStyles: { fillStyle: '#f97316' } // Orange accent
        });

        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(14);
        doc.text(`Overall GPA: 3.8 / 4.0`, 20, finalY);
        doc.text(`Rank: #3 in Class`, 20, finalY + 10);

        doc.save(`${student.name}_Report_Card.pdf`);
    };
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Academic Performance Reports</h2>
                    <p className="text-sm text-slate-500 mt-1">Aggregated term results and grade distribution.</p>
                </div>
                <button className="px-5 py-2 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                    Export All (CSV)
                </button>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Avg Attendance', val: '92%', color: 'blue' },
                        { label: 'Pass Rate', val: '88%', color: 'emerald' },
                        { label: 'Distinctions', val: '14', color: 'orange' },
                        { label: 'Incomplete', val: '3', color: 'red' }
                    ].map(stat => (
                        <div key={stat.label} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            <div className={`text-2xl font-black mt-1 text-${stat.color}-600`}>{stat.val}</div>
                        </div>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <th className="pb-4">Student Name</th>
                                <th className="pb-4">GPA / Avg</th>
                                <th className="pb-4">Rank</th>
                                <th className="pb-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {students.slice(0, 10).map((s, idx) => (
                                <tr key={s._id} className="group">
                                    <td className="py-4 font-bold text-slate-700">{s.name}</td>
                                    <td className="py-4">
                                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${70 + Math.random() * 20}%` }}></div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-slate-500 font-medium">#{idx + 1}</td>
                                    <td className="py-4 text-right">
                                        <button
                                            onClick={() => handleDownload(s)}
                                            className="p-2 text-slate-400 hover:text-orange-500 transition-colors font-bold text-xs border border-transparent hover:border-slate-100 rounded-lg"
                                        >
                                            Download Report Card
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
