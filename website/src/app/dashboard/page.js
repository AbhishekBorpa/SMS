'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AcademicReporter from '../../components/AcademicReporter';
import BroadcastCenter from '../../components/BroadcastCenter';
import CanteenManager from '../../components/CanteenManager';
import ChatHub from '../../components/ChatHub';
import ClassTable from '../../components/ClassTable';
import DashboardCharts from '../../components/DashboardCharts';
import LibraryManager from '../../components/LibraryManager';
import QuizBuilder from '../../components/QuizBuilder';
import RecentActivity from '../../components/RecentActivity';
import SettingsView from '../../components/SettingsView';
import Sidebar from '../../components/Sidebar';
import StatsCard from '../../components/StatsCard';
import TimetableHub from '../../components/TimetableHub';
import TransportTable from '../../components/TransportTable';
import UserTable from '../../components/UserTable';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [books, setBooks] = useState([]);
    const [loans, setLoans] = useState([]);
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Edit Mode State
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // User Form States
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newMobile, setNewMobile] = useState('');

    // Class Form States
    const [className, setClassName] = useState('');
    const [classSubject, setClassSubject] = useState('');
    const [classTeacher, setClassTeacher] = useState('');
    const [classDay, setClassDay] = useState('Monday');
    const [classStart, setClassStart] = useState('');
    const [classEnd, setClassEnd] = useState('');

    // Transport Form States
    const [routeName, setRouteName] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [driverName, setDriverName] = useState('');
    const [driverPhone, setDriverPhone] = useState('');

    // Library Form States
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookCopies, setBookCopies] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/login');
            return;
        }
        fetchStats();
    }, [router]);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get('http://localhost:5002/api/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUsers = async (role) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get(`http://localhost:5002/api/users?role=${role}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (role === 'Teacher') setTeachers(data);
            if (role === 'Student') setStudents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get('http://localhost:5002/api/classes', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setClasses(data);
            if (teachers.length === 0) fetchUsers('Teacher');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoutes = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get('http://localhost:5002/api/transport', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRoutes(data);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    const fetchLibrary = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const booksRes = await axios.get('http://localhost:5002/api/library', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const loansRes = await axios.get('http://localhost:5002/api/library/loans', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(booksRes.data);
            setLoans(loansRes.data);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    const fetchNotices = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get('http://localhost:5002/api/notices', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotices(data);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    useEffect(() => {
        setMessage('');
        setEditMode(false);
        resetForms();
        if (activeTab === 'teachers') fetchUsers('Teacher');
        if (activeTab === 'students') fetchUsers('Student');
        if (activeTab === 'classes') fetchClasses();
        if (activeTab === 'transport') fetchRoutes();
        if (activeTab === 'library') fetchLibrary();
        if (activeTab === 'broadcasts') fetchNotices();
    }, [activeTab]);

    const resetForms = () => {
        setNewName(''); setNewEmail(''); setNewMobile('');
        setClassName(''); setClassSubject(''); setClassTeacher(''); setClassStart(''); setClassEnd('');
        setRouteName(''); setVehicleNo(''); setDriverName(''); setDriverPhone('');
        setBookTitle(''); setBookAuthor(''); setBookCopies(1);
        setEditMode(false); setEditId(null);
    };

    const handleCreateOrUpdateUser = async (e, role) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('adminToken');
            const endpoint = role === 'Teacher' ? 'teacher' : 'student';

            if (editMode) {
                await axios.put(`http://localhost:5002/api/users/${editId}`, {
                    name: newName,
                    email: newEmail,
                    mobileNumber: newMobile
                }, { headers: { Authorization: `Bearer ${token}` } });
                setMessage('User updated successfully!');
            } else {
                await axios.post(`http://localhost:5002/api/users/${endpoint}`, {
                    name: newName,
                    email: newEmail,
                    mobileNumber: newMobile
                }, { headers: { Authorization: `Bearer ${token}` } });
                setMessage(`Success! Created ${role}.`);
            }

            resetForms();
            fetchUsers(role);
            fetchStats();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id, role) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:5002/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers(role);
            fetchStats();
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const startEditUser = (user) => {
        setEditMode(true);
        setEditId(user._id);
        setNewName(user.name);
        setNewEmail(user.email);
        setNewMobile(user.mobileNumber || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCreateOrUpdateClass = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const token = localStorage.getItem('adminToken');
            const payload = {
                name: className,
                subject: classSubject,
                teacherId: classTeacher,
                schedule: [{ day: classDay, startTime: classStart, endTime: classEnd }]
            };

            if (editMode) {
                await axios.put(`http://localhost:5002/api/classes/${editId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage('Class updated successfully!');
            } else {
                await axios.post('http://localhost:5002/api/classes', payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage('Class created successfully!');
            }

            resetForms();
            fetchClasses();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClass = async (id) => {
        if (!confirm('Are you sure you want to delete this class?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:5002/api/classes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchClasses();
        } catch (err) {
            alert('Failed to delete class');
        }
    };

    const startEditClass = (cls) => {
        setEditMode(true);
        setEditId(cls._id);
        setClassName(cls.name);
        setClassSubject(cls.subject);
        setClassTeacher(cls.teacher?._id || cls.teacher);
        if (cls.schedule && cls.schedule[0]) {
            setClassDay(cls.schedule[0].day);
            setClassStart(cls.schedule[0].startTime);
            setClassEnd(cls.schedule[0].endTime);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        router.push('/login');
    };

    const handleCreateOrUpdateRoute = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const payload = { routeName, vehicleNumber: vehicleNo, driverName, driverPhone };
            if (editMode) {
                await axios.put(`http://localhost:5002/api/transport/${editId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                await axios.post('http://localhost:5002/api/transport', payload, { headers: { Authorization: `Bearer ${token}` } });
            }
            resetForms();
            fetchRoutes();
        } catch (err) { setMessage('Operation failed'); } finally { setLoading(false); }
    };

    const handleDeleteRoute = async (id) => {
        if (!confirm('Delete route?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:5002/api/transport/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchRoutes();
        } catch (err) { alert('Delete failed'); }
    };

    const handleReturnBook = async (loanId) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`http://localhost:5002/api/library/loans/${loanId}/return`, {}, { headers: { Authorization: `Bearer ${token}` } });
            fetchLibrary();
        } catch (err) { alert('Return failed'); }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />

            <main className="flex-1 ml-64 p-10 transition-all bg-slate-50/50">
                {/* Global Header */}
                <div className="flex justify-between items-center mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="relative w-96 group">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search students, teachers, or reports..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 outline-none transition-all text-sm font-medium" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-3 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all relative">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-10 w-px bg-slate-100 mx-2"></div>
                        <div className="flex items-center space-x-3 pl-2">
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-800">Administrator</p>
                                <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Master Access</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-500 border border-slate-50">
                                AD
                            </div>
                        </div>
                    </div>
                </div>

                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <header className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                                <p className="text-slate-500 mt-2">Welcome back to your command center.</p>
                            </div>
                            <div className="flex space-x-3">
                                <button onClick={fetchStats} className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-slate-400 hover:text-orange-500">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                </button>
                                <button className="px-5 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 transition-all">
                                    Export Statistics
                                </button>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <StatsCard
                                title="Teachers"
                                value={stats?.teachers || 0}
                                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                                color="blue"
                                subtext="Academic Staff"
                            />
                            <StatsCard
                                title="Students"
                                value={stats?.students || 0}
                                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 0 6-3 6-3s3 3 6 3v-5"></path></svg>}
                                color="green"
                                subtext="Total enrollment"
                            />
                            <StatsCard
                                title="Revenue"
                                value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
                                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                                color="orange"
                                subtext="+12% this month"
                            />
                            <StatsCard
                                title="Classes"
                                value={stats?.classes || 0}
                                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>}
                                color="purple"
                                subtext="Active sessions"
                            />
                        </div>

                        <DashboardCharts
                            revenueTrend={stats?.revenueTrend || []}
                            studentDistribution={stats?.studentDistribution || []}
                        />

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            <div className="xl:col-span-2">
                                <RecentActivity activities={stats?.recentActivity || []} />
                            </div>
                            <div className="bg-gradient-to-br from-orange-500 to-rose-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black mb-2">School AI Assistant</h3>
                                    <p className="text-orange-100 text-sm mb-8 leading-relaxed">
                                        Ask LexAI to generate lesson plans, analyze results, or optimize bus routes.
                                    </p>
                                    <button className="px-6 py-3 bg-white text-orange-600 rounded-xl font-bold shadow-lg hover:shadow-orange-900/20 transition-all flex items-center space-x-2">
                                        <span>Start AI Chat</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.3 8.3 8.3 0 0 1 2.8.5l4.5-2.2z"></path></svg>
                                    </button>
                                </div>
                                <svg className="absolute -right-8 -bottom-8 text-white/10 w-48 h-48 transform -rotate-12 group-hover:scale-110 transition-transform duration-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                            </div>
                        </div>
                    </div>
                )}

                {(activeTab === 'teachers' || activeTab === 'students') && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Manage {activeTab === 'teachers' ? 'Teachers' : 'Students'}</h1>
                                <p className="text-slate-500 mt-2">View, create, update, and delete users.</p>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            <div className="xl:col-span-1">
                                <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 sticky top-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-slate-800">
                                            {editMode ? 'Edit User' : `Add New ${activeTab === 'teachers' ? 'Teacher' : 'Student'}`}
                                        </h2>
                                        {editMode && <button onClick={resetForms} className="text-xs text-red-500 font-bold hover:underline">Cancel Edit</button>}
                                    </div>

                                    {message && (
                                        <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.includes('Success') || message.includes('successfully') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {message}
                                        </div>
                                    )}

                                    <form onSubmit={(e) => handleCreateOrUpdateUser(e, activeTab === 'teachers' ? 'Teacher' : 'Student')} className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                                            <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700 placeholder-slate-300" placeholder="e.g. John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                                            <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700 placeholder-slate-300" placeholder="e.g. email@school.com" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
                                            <input type="tel" required value={newMobile} onChange={(e) => setNewMobile(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700 placeholder-slate-300" placeholder="e.g. +1 234 567 8900" />
                                        </div>
                                        <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-white ${editMode ? 'bg-slate-800 hover:bg-slate-900' : 'bg-gradient-to-r from-orange-500 to-orange-600'}`}>
                                            {loading ? 'Processing...' : (editMode ? 'Update User' : `Create ${activeTab === 'teachers' ? 'Teacher' : 'Student'}`)}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="xl:col-span-2">
                                <UserTable
                                    users={activeTab === 'teachers' ? teachers : students}
                                    role={activeTab === 'teachers' ? 'Teacher' : 'Student'}
                                    onEdit={startEditUser}
                                    onDelete={(id) => handleDeleteUser(id, activeTab === 'teachers' ? 'Teacher' : 'Student')}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'classes' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header>
                            <h1 className="text-3xl font-bold text-slate-900">Manage Classes</h1>
                            <p className="text-slate-500 mt-2">Organize schedules and assign teachers.</p>
                        </header>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            <div className="xl:col-span-1">
                                <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 sticky top-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-slate-800">
                                            {editMode ? 'Edit Class' : 'Create New Class'}
                                        </h2>
                                        {editMode && <button onClick={resetForms} className="text-xs text-red-500 font-bold hover:underline">Cancel Edit</button>}
                                    </div>

                                    {message && (
                                        <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.includes('Success') || message.includes('successfully') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {message}
                                        </div>
                                    )}

                                    <form onSubmit={handleCreateOrUpdateClass} className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class Name</label>
                                            <input type="text" required value={className} onChange={(e) => setClassName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700 placeholder-slate-300" placeholder="e.g. Math 101" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                                            <input type="text" required value={classSubject} onChange={(e) => setClassSubject(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700 placeholder-slate-300" placeholder="e.g. Mathematics" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Teacher</label>
                                            <select required value={classTeacher} onChange={(e) => setClassTeacher(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700 bg-white">
                                                <option value="">Select Teacher</option>
                                                {teachers.map(teacher => (
                                                    <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Day</label>
                                                <select value={classDay} onChange={(e) => setClassDay(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700 bg-white">
                                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                                        <option key={day} value={day}>{day}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Start Time</label>
                                                <input type="time" required value={classStart} onChange={(e) => setClassStart(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">End Time</label>
                                            <input type="time" required value={classEnd} onChange={(e) => setClassEnd(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-slate-700" />
                                        </div>

                                        <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-white ${editMode ? 'bg-slate-800 hover:bg-slate-900' : 'bg-gradient-to-r from-orange-500 to-orange-600'}`}>
                                            {loading ? 'Processing...' : (editMode ? 'Update Class' : 'Create Class')}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="xl:col-span-2">
                                <ClassTable
                                    classes={classes}
                                    onEdit={startEditClass}
                                    onDelete={handleDeleteClass}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'transport' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header>
                            <h1 className="text-3xl font-bold text-slate-900">Transport Routes</h1>
                            <p className="text-slate-500 mt-2">Manage bus routes and driver assignments.</p>
                        </header>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            <div className="xl:col-span-1">
                                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                                    <h2 className="text-xl font-bold mb-6 text-slate-800">Add/Edit Route</h2>
                                    <form onSubmit={handleCreateOrUpdateRoute} className="space-y-4">
                                        <input type="text" placeholder="Route Name" value={routeName} onChange={e => setRouteName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none" required />
                                        <input type="text" placeholder="Vehicle Number" value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none" required />
                                        <input type="text" placeholder="Driver Name" value={driverName} onChange={e => setDriverName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none" required />
                                        <input type="text" placeholder="Driver Phone" value={driverPhone} onChange={e => setDriverPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none" required />
                                        <button type="submit" className="w-full py-4 rounded-xl font-bold bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                                            {loading ? 'Processing...' : 'Save Route'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="xl:col-span-2">
                                <TransportTable routes={routes} onDelete={handleDeleteRoute} onEdit={(r) => { setEditMode(true); setEditId(r._id); setRouteName(r.routeName); setVehicleNo(r.vehicleNumber); setDriverName(r.driverName); setDriverPhone(r.driverPhone); }} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'library' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header>
                            <h1 className="text-3xl font-bold text-slate-900">Library Circulation</h1>
                            <p className="text-slate-500 mt-2">Track book sets and student loans.</p>
                        </header>
                        <LibraryManager books={books} loans={loans} onReturn={handleReturnBook} onDeleteBook={async (id) => { if (confirm('Delete book?')) { await axios.delete(`http://localhost:5002/api/library/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }); fetchLibrary(); } }} />
                    </div>
                )}


                {activeTab === 'timetable' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header>
                            <h1 className="text-3xl font-bold text-slate-900">Weekly Timetable</h1>
                            <p className="text-slate-500 mt-2">Optimize schedules using AI-powered clash detection.</p>
                        </header>
                        <TimetableHub classes={classes} />
                    </div>
                )}

                {activeTab === 'timetable' && (
                    <div className="mt-12">
                        <QuizBuilder />
                    </div>
                )}

                {activeTab === 'broadcasts' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header>
                            <h1 className="text-3xl font-bold text-slate-900">Communication Center</h1>
                            <p className="text-slate-500 mt-2">Broadcast urgent notices and newsletters.</p>
                        </header>
                        <BroadcastCenter notices={notices} onRefresh={fetchNotices} />
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header>
                            <h1 className="text-3xl font-bold text-slate-900">Academic Reports</h1>
                            <p className="text-slate-500 mt-2">Generate and distribute digital report cards.</p>
                        </header>
                        <AcademicReporter students={students} />
                    </div>
                )}

                {activeTab === 'canteen' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header>
                            <h1 className="text-3xl font-bold text-slate-900">Canteen Inventory</h1>
                            <p className="text-slate-500 mt-2">Manage stock levels and menu availability.</p>
                        </header>
                        <CanteenManager />
                    </div>
                )}

                {activeTab === 'chat' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header>
                            <h1 className="text-3xl font-bold text-slate-900">Parent-Teacher Chat Hub</h1>
                            <p className="text-slate-500 mt-2">Real-time communication with school staff and parents.</p>
                        </header>
                        <ChatHub />
                    </div>
                )}

                {activeTab === 'settings' && (
                    <SettingsView />
                )}
            </main>
        </div>
    );
}
