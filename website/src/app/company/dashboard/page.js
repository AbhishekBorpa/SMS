'use client';
import { useState } from 'react';

// Import all feature modules
import AdminManager from '@/components/company/AdminManager';
import AuditLogs from '@/components/company/AuditLogs';
import BroadcastCenter from '@/components/company/BroadcastCenter';
import FeatureFlags from '@/components/company/FeatureFlags';
import FinancialReports from '@/components/company/FinancialReports';
import GlobalMap from '@/components/company/GlobalMap';
import OnboardingWizard from '@/components/company/OnboardingWizard';
import Overview from '@/components/company/Overview';
import PlansManager from '@/components/company/PlansManager';
import SchoolsTable from '@/components/company/SchoolsTable';
import SystemHealth from '@/components/company/SystemHealth';
import WhiteLabelConfig from '@/components/company/WhiteLabelConfig';

export default function CompanyDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    // Tab Mapping
    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <Overview />;
            case 'schools': return <SchoolsTable />;
            case 'map': return <GlobalMap />;
            case 'onboarding': return <OnboardingWizard />;
            case 'plans': return <PlansManager />;
            case 'financials': return <FinancialReports />;
            case 'broadcasts': return <BroadcastCenter />;
            case 'feature-flags': return <FeatureFlags />;
            case 'system-health': return <SystemHealth />;
            case 'audit-logs': return <AuditLogs />;
            case 'white-label': return <WhiteLabelConfig />;
            case 'admins': return <AdminManager />;
            default: return <Overview />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex font-sans selection:bg-orange-500 selection:text-white">

            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6 flex flex-col overflow-y-auto z-10">
                <div className="text-2xl font-black text-white mb-8 flex items-center tracking-tight">
                    <span className="text-orange-500 mr-2 text-3xl">⚡</span> Cortex
                </div>

                <div className="space-y-8 flex-1">
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 pl-2">Core</div>
                        <nav className="space-y-1">
                            {['overview', 'schools', 'map', 'onboarding'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold capitalize transition-all duration-200 border border-transparent ${activeTab === tab ? 'bg-orange-600 shadow-lg shadow-orange-900/50 translate-x-1' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                                    {tab === 'map' ? 'Global Map' : tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 pl-2">Platform</div>
                        <nav className="space-y-1">
                            {['plans', 'financials', 'broadcasts', 'feature-flags'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold capitalize transition-all duration-200 border border-transparent ${activeTab === tab ? 'bg-orange-600 shadow-lg shadow-orange-900/50 translate-x-1' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                                    {tab.replace('-', ' ')}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 pl-2">System</div>
                        <nav className="space-y-1">
                            {['system-health', 'audit-logs', 'white-label', 'admins'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold capitalize transition-all duration-200 border border-transparent ${activeTab === tab ? 'bg-orange-600 shadow-lg shadow-orange-900/50 translate-x-1' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                                    {tab.replace('-', ' ')}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-700/50 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-2 border-slate-600"></div>
                        <div>
                            <div className="font-bold text-sm text-white">Abhishek B.</div>
                            <div className="text-xs text-green-400 font-bold flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                                Super Admin
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-hidden relative bg-slate-900 flex flex-col">
                <header className="flex justify-between items-center p-8 pb-4">
                    <h1 className="text-4xl font-black capitalize tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        {activeTab.replace('-', ' ')}
                    </h1>
                    <div className="flex gap-4">
                        <div className="bg-slate-800 rounded-xl p-1 flex items-center border border-slate-700">
                            <input type="text" placeholder="Global Search..." className="bg-transparent border-none text-sm text-white px-4 focus:outline-none w-48" />
                            <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300">🔍</button>
                        </div>
                        <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors">🔔 Alerts (3)</button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 pt-4 pb-20 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
