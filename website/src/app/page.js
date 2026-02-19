'use client';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-600 font-sans">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        {/* Animated Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40">
          <div className="absolute -top-[40%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-blue-600 to-violet-600 blur-[120px] animate-pulse"></div>
          <div className="absolute top-[40%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold tracking-wide uppercase mb-8 backdrop-blur-sm animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-ping"></span>
              #1 Platform for CBSE / ICSE / IGCSE Schools
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1] animate-fade-in-up delay-100 drop-shadow-2xl">
              Transform Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">K-12 Campus.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
              Stop using clunky legacy software. Switch to the only OS built for the
              <span className="text-white font-semibold"> AI Era</span>.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up delay-300">
              <a href="/register-school" className="group relative px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1">
                <span className="relative z-10 flex items-center">
                  Start Free Trial
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </span>
              </a>
              <a href="/features" className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 rounded-2xl font-bold text-lg transition-all flex items-center justify-center">
                <svg className="w-5 h-5 mr-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                View K-12 Demo
              </a>
            </div>
          </div>
        </div>

        {/* Floating UI Mockup */}
        <div className="mt-20 relative max-w-6xl mx-auto animate-fade-in-up delay-500">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-20 h-40 bottom-0 top-auto w-full"></div>

          {/* Floating 'Live' Notification Cards */}
          <div className="absolute -left-12 top-20 z-30 animate-float-slow hidden md:block">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-white/20 flex items-center gap-4">
              <div className="bg-green-100 p-2 rounded-full text-xl">🚌</div>
              <div>
                <div className="font-bold text-slate-800">Bus 12 Arriving</div>
                <div className="text-xs text-slate-500">2 mins away • Route 4</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-8 top-40 z-30 animate-float-delayed hidden md:block">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-white/20 flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-full text-xl">💳</div>
              <div>
                <div className="font-bold text-slate-800">Fees Collected</div>
                <div className="text-xs text-slate-500">₹1.2L received today</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 shadow-2xl overflow-hidden opacity-90 backdrop-blur-sm transform rotate-x-12 perspective-1000 origin-bottom scale-95 hover:scale-100 transition-transform duration-700 ease-out">
            <img
              src="/assets/hero_dashboard_ui_1769393882473.png"
              alt="Cortex K-12 Dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE CORTEX (New Section) --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3">Why Top Schools Switch</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Built for the Future of Education.</h3>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Legacy ERPs are slow and clunky. Cortex is fast, beautiful, and intelligent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Pages load in under 100ms. No more waiting for spinny wheels during admission season."
              },
              {
                icon: "🎨",
                title: "Beautiful UI",
                desc: "Designed like a modern consumer app, not 90s enterprise software. Teachers love using it."
              },
              {
                icon: "🤖",
                title: "AI Powered",
                desc: "Automated report card comments, fee reminders, and timetable generation."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 hover:bg-orange-50 transition-colors group cursor-default">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LOGO STRIP --- */}
      <div className="py-10 bg-slate-900 border-t border-slate-800 overflow-hidden">
        <p className="text-center text-slate-500 text-sm font-bold uppercase tracking-widest mb-8">Trusted by Top K-12 Institutions</p>
        <div className="flex justify-center space-x-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-2xl font-black text-white">GREENWOOD HIGH</span>
          <span className="text-2xl font-black text-white">OAKRIDGE INT.</span>
          <span className="text-2xl font-black text-white">VIBGYOR</span>
          <span className="text-2xl font-black text-white">RYAN GLOBAL</span>
          <span className="text-2xl font-black text-white">DPS SCHOOLS</span>
        </div>
      </div>

      {/* --- BENTO GRID FEATURES --- */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Complete Control from Nursery to Grade 12</h2>
            <p className="text-xl text-slate-500 md:max-w-2xl mx-auto">One platform that handles admission, fees, grades, and transport seamlessly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-8 h-auto md:h-[800px]">
            {/* Large Card Left */}
            <div className="md:row-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden group hover:border-orange-200 transition-all">
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🎓</div>
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">AI Powered</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Report Cards & Grading</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  Automatically generate report cards in CBSE / ICSE formats. <strong className="text-slate-700">AI-generated student remarks</strong> based on performance and behavior.
                </p>
                <div className="flex-1 rounded-2xl overflow-hidden border border-slate-100 relative group-hover:shadow-lg transition-all">
                  <img src="/assets/report_card_ui_1769393940801.png" alt="CCE Report Card" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>

            {/* Wide Card Top Right */}
            <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/30 transition-all"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start md:justify-between h-full">
                <div className="max-w-md relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">School Bus GPS Tracking</h3>
                  <p className="text-slate-400 mb-6">Real-time live tracking for parents. Automated alerts for delays. <strong className="text-white">Route optimization algorithms</strong> to save fuel.</p>
                  <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                    <img src="/assets/bus_tracking_map_1769393918721.png" alt="GPS Tracking" className="w-full h-48 object-cover" />
                  </div>
                </div>
                <div className="mt-8 md:mt-0 px-6 py-2 bg-white/10 backdrop-blur rounded-full text-white text-sm font-bold border border-white/20">
                  Live Demo 🛰️
                </div>
              </div>
            </div>

            {/* Card Bottom Center */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Student & Parent App</h3>
                <p className="text-slate-500 mb-4">
                  Homework, fees, <strong className="text-slate-700">Digital ID Card</strong>, <strong className="text-slate-700">Canteen Pre-ordering</strong>, and Health Records.
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 rounded-xl overflow-hidden shadow-lg border border-slate-100 rotate-[-10deg] group-hover:rotate-0 transition-all">
                <img src="/assets/mobile_app_student_1769393900013.png" alt="Mobile App" className="w-full h-auto" />
              </div>
            </div>

            {/* Card Bottom Right */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-xl">💳</div>
                <div className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded text-xs">NEW</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fee Collections</h3>
              <p className="text-slate-500">Automated invoices and <strong className="text-slate-700">WhatsApp Payment Reminders</strong> for parents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (New Section) --- */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white text-center mb-20">Loved by Principals & Parents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-md p-10 rounded-3xl border border-slate-700">
              <div className="flex text-orange-500 mb-6">★★★★★</div>
              <p className="text-xl text-slate-300 italic mb-8">"Finally, a school software that doesn't strictly look like an Excel sheet. The mobile app has reduced our parent helpdesk calls by 80%."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-600 rounded-full mr-4"></div>
                <div>
                  <div className="text-white font-bold">Dr. Sarah Johnson</div>
                  <div className="text-slate-500 text-sm">Principal, Oakridge International</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-md p-10 rounded-3xl border border-slate-700">
              <div className="flex text-orange-500 mb-6">★★★★★</div>
              <p className="text-xl text-slate-300 italic mb-8">"The GPS tracking is a lifesaver. I know exactly when to walk to the bus stop. Simple, effective, and beautiful."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-600 rounded-full mr-4"></div>
                <div>
                  <div className="text-white font-bold">Priya Sharma</div>
                  <div className="text-slate-500 text-sm">Parent, Grade 5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-24 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-slate-800">
            <div>
              <div className="text-4xl md:text-5xl font-black text-orange-500 mb-2 counter">2M+</div>
              <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Students</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2 counter">500+</div>
              <div className="text-sm font-bold uppercase tracking-wider text-slate-500">K-12 Schools</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-purple-500 mb-2 counter">100%</div>
              <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Exam Uptime</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-green-500 mb-2 counter">24/7</div>
              <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Parent Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-orange-500/30">
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mb-16 blur-2xl"></div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10">
              Modernize Your School <br />Today.
            </h2>
            <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto relative z-10">
              Join 500+ schools using our K-12 optimized platform. Start your 14-day free trial.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/register-school" className="px-10 py-5 bg-white text-orange-600 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Get Started Free
              </a>
              <a href="/contact" className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main >
  );
}
