'use client';
import axios from 'axios';
import { useState } from 'react';

export default function QuizBuilder({ onRefresh }) {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState(null);

    const handleGenerate = async () => {
        if (!topic) return alert('Enter a topic first');
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.post('http://localhost:5002/api/ai/quiz', { topic }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQuiz(data);
        } catch (err) { alert('AI Generation failed'); } finally { setLoading(false); }
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">AI Quiz Assistant</h2>
            <div className="flex space-x-4 mb-8">
                <input
                    type="text"
                    placeholder="e.g. Photosynthesis, Ancient Rome, Algebra..."
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                >
                    {loading ? 'Thinking...' : 'Generate Quiz'}
                </button>
            </div>

            {quiz && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 mb-6">
                        <h3 className="font-bold text-orange-800">{quiz.title}</h3>
                        <p className="text-xs text-orange-600 mt-1">Generated based on your topic. You can edit these before publishing.</p>
                    </div>
                    {quiz.questions.map((q, idx) => (
                        <div key={idx} className="p-6 rounded-2xl border border-slate-50 bg-slate-50/30">
                            <p className="font-bold text-slate-700 mb-4">Q{idx + 1}: {q.questionText}</p>
                            <div className="grid grid-cols-2 gap-3">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className={`p-3 rounded-xl border text-sm font-medium ${oIdx === q.correctAnswerIndex ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-100 text-slate-500'}`}>
                                        {opt}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-slate-400 italic">Rationale: {q.explanation}</p>
                        </div>
                    ))}
                    <button onClick={() => alert('Quiz published to student portal!')} className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold shadow-lg hover:bg-slate-900 transition-all">
                        Publish This Quiz
                    </button>
                </div>
            )}
        </div>
    );
}
