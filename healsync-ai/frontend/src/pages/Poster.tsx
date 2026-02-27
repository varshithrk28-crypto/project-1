import { useState } from 'react';
import { Download, Printer, Pill, LayoutGrid, List, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function Poster({ extractedData }: { extractedData?: any[] | null }) {
    const [view, setView] = useState<'poster' | 'list'>('poster');

    // Map extractedData format to Poster format
    const meds = extractedData && extractedData.length > 0 ? extractedData.map((d: any) => ({
        name: d.medicine.split(" ")[0].toUpperCase(),
        category: "Prescribed Medication",
        desc: d.medicine.substring(d.medicine.indexOf(" ") + 1) || "Pill",
        icon: Pill,
        iconColor: "text-blue-400 bg-blue-500/10",
        times: {
            morning: d.times?.includes("Morning") || false,
            afternoon: d.times?.includes("Afternoon") || false,
            night: d.times?.includes("Night") || false
        },
        instruction: d.foodIntake || "Follow Doctor's Advice",
        dosage: d.frequency || "1 Dose",
        dates: { start: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), end: "" },
        ongoing: true
    })) : [];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 print:hidden">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Medicine Poster & Reference</h1>
                    <p className="text-slate-400 max-w-xl">A personalized visual guide for your medication schedule. Designed to be printed and kept in a visible place like your refrigerator.</p>
                </div>
                <div className="flex items-center gap-3 print:hidden">
                    <button onClick={() => window.print()} className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 border border-slate-700 rounded-lg font-medium transition-all flex items-center gap-2">
                        <Download className="h-4 w-4" /> Download PDF
                    </button>
                    <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                        <Printer className="h-4 w-4" /> Print Poster
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-6 border-b border-slate-800 mb-8 px-2 print:hidden">
                <button
                    onClick={() => setView('poster')}
                    className={clsx(
                        "pb-3 text-sm font-bold tracking-wide flex items-center gap-2 transition-colors relative",
                        view === 'poster' ? "text-blue-500" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    <LayoutGrid className="h-4 w-4" /> Poster View
                    {view === 'poster' && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-500"></div>}
                </button>
                <button
                    onClick={() => setView('list')}
                    className={clsx(
                        "pb-3 text-sm font-bold tracking-wide flex items-center gap-2 transition-colors relative",
                        view === 'list' ? "text-blue-500" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    <List className="h-4 w-4" /> List View
                    {view === 'list' && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-500"></div>}
                </button>
            </div>

            {meds.length === 0 ? (
                <div className="card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2 min-h-[400px]">
                    <div className="bg-slate-800 p-4 rounded-full mb-4">
                        <AlertTriangle className="h-8 w-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">No Linked Prescriptions</h3>
                    <p className="text-slate-400 max-w-sm mb-6">
                        Upload a prescription to automatically generate your printable visual poster.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {meds.map((med, idx) => (
                        <div key={idx} className="card p-0 overflow-hidden border-slate-700/50 hover:border-blue-500/30 transition-colors group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-black text-blue-400 mb-1 tracking-tight">{med.name}</h2>
                                        <div className="text-slate-400 text-sm font-medium">{med.category} • {med.desc}</div>
                                    </div>
                                    <div className={clsx("p-3 rounded-full", med.iconColor)}>
                                        <med.icon className="h-6 w-6" />
                                    </div>
                                </div>

                                {/* Day Timeline */}
                                <div className="grid grid-cols-3 divide-x divide-slate-700/50 mb-8 bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
                                    <TimeSlot active={med.times.morning} icon="☀️" title="MORNING" />
                                    <TimeSlot active={med.times.afternoon} icon="🌤️" title="AFTERNOON" opacity={!med.times.afternoon} />
                                    <TimeSlot active={med.times.night} icon="🌙" title="EVENING" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Instruction</div>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            <span className="text-blue-400">🍴</span> {med.instruction}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Dosage</div>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            <span className="text-blue-400"><Pill className="h-4 w-4" /></span> {med.dosage}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/30 flex justify-between items-center text-xs font-semibold">
                                <div className="text-slate-500 flex items-center gap-1.5 border border-slate-700/50 px-2 py-1 rounded bg-slate-800">
                                    <CalendarIcon /> Started: {med.dates.start}
                                </div>
                                {med.ongoing ? (
                                    <div className="text-green-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Ongoing</div>
                                ) : (
                                    <div className="text-red-400 flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded border border-red-500/20"><CalendarIcon /> Ends: {med.dates.end}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {meds.length > 0 && (
                <div className="card p-8 border-dashed border-2 border-slate-700 bg-slate-800/20 text-center flex flex-col items-center justify-center relative overflow-hidden print:hidden mt-8">
                    <div className="absolute top-0 w-full h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KCTxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-20"></div>

                    <div className="bg-blue-500 rounded p-2 mb-4">
                        <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Emergency Contact & Safety</h2>
                    <p className="text-slate-400 mb-6 max-w-lg">If you experience any allergic reactions or missed dosages, please call your physician immediately. This poster is for reference only.</p>

                    <div className="flex gap-12 pt-4 border-t border-slate-800 uppercase tracking-widest text-[10px] font-bold text-slate-500 text-left">
                        <div>
                            <div className="mb-1">Primary Doctor</div>
                            <div className="text-lg font-bold text-white normal-case tracking-normal">Dr. Sarah Mitchell</div>
                        </div>
                        <div>
                            <div className="mb-1 text-blue-400">Emergency Phone</div>
                            <div className="text-lg font-bold text-blue-400 normal-case tracking-normal">(555) 123-4567</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function TimeSlot({ active, icon, title, opacity }: { active: boolean, icon: string, title: string, opacity?: boolean }) {
    return (
        <div className={clsx("flex flex-col items-center justify-center p-4 py-8", opacity ? "opacity-30" : "")}>
            <div className={clsx(
                "h-12 w-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 print:color-adjust-exact",
                active ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400 -translate-y-1 print:-translate-y-0" : "bg-slate-800"
            )}>
                {icon}
            </div>
            <div className={clsx("text-[10px] font-bold tracking-widest uppercase", active ? "text-blue-400 print:text-blue-600" : "text-slate-500")}>
                {title}
            </div>
        </div>
    )
}

const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
