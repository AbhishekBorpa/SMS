export default function GlobalMap() {
    return (
        <div className="bg-slate-800 h-[700px] rounded-3xl border border-slate-700 flex items-center justify-center relative overflow-hidden animate-in fade-in group cursor-crosshair">

            {/* World Map SVG Background (Simplified Mock) */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-30 text-slate-500 fill-current">
                <path d="M50,150 Q200,50 400,150 T800,150 T950,250" stroke="currentColor" strokeWidth="2" fill="none" />
                {/* Abstract Continents */}
                <rect x="150" y="100" width="150" height="100" rx="20" />
                <rect x="400" y="80" width="200" height="150" rx="40" />
                <rect x="700" y="120" width="180" height="120" rx="30" />
            </svg>

            {/* Live Data Overlay */}
            <div className="z-10 text-center pointer-events-none">
                <div className="text-8xl mb-6 animate-pulse">🌍</div>
                <h2 className="text-3xl font-black text-white mb-2">Live Global Footprint</h2>
                <div className="flex items-center justify-center gap-4 text-slate-400 font-mono">
                    <span>Active Sessions: <b className="text-white">14,204</b></span>
                    <span className="text-slate-600">|</span>
                    <span>rps: <b className="text-green-500">420</b></span>
                </div>
            </div>

            {/* Interactive Pins (Animated) */}
            {[
                { top: '30%', left: '25%', color: 'bg-orange-500', name: 'New York', activity: 'High' },
                { top: '45%', left: '48%', color: 'bg-blue-500', name: 'London', activity: 'Medium' },
                { top: '60%', left: '65%', color: 'bg-green-500', name: 'Bangalore', activity: 'Extreme' },
                { top: '75%', left: '75%', color: 'bg-purple-500', name: 'Singapore', activity: 'High' },
                { top: '35%', left: '85%', color: 'bg-red-500', name: 'Tokyo', activity: 'Medium' }
            ].map((pin, i) => (
                <div key={i} className="absolute group/pin" style={{ top: pin.top, left: pin.left }}>
                    <div className={`w-4 h-4 rounded-full ${pin.color} animate-ping absolute opacity-75`}></div>
                    <div className={`relative w-4 h-4 rounded-full ${pin.color} border-2 border-slate-800 shadow-xl`}></div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-slate-900 border border-slate-700 p-3 rounded-xl opacity-0 group-hover/pin:opacity-100 transition-opacity transform translate-y-2 group-hover/pin:translate-y-0 pointer-events-none z-20">
                        <div className="text-white font-bold">{pin.name}</div>
                        <div className="text-xs text-slate-400">Activity: <span className={pin.color.replace('bg-', 'text-')}>{pin.activity}</span></div>
                    </div>
                </div>
            ))}

            {/* Stats Legend */}
            <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-xl">
                <div className="text-xs font-bold text-slate-500 uppercase mb-2">Region Density</div>
                <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center"><div className="w-2 h-2 rounded bg-green-500 mr-2"></div> APAC (55%)</div>
                    <div className="flex items-center"><div className="w-2 h-2 rounded bg-orange-500 mr-2"></div> NAM (25%)</div>
                    <div className="flex items-center"><div className="w-2 h-2 rounded bg-blue-500 mr-2"></div> EMEA (20%)</div>
                </div>
            </div>
        </div>
    );
}
