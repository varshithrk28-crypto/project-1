import { useState } from 'react';
import { Download, Search, Calendar, Activity, CheckCircle2, AlertTriangle, AlertCircle, ChevronDown, Award, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function History() {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const toggleAccordion = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Medicine History & Adherence</h1>
                    <p className="text-slate-400">Comprehensive analytics of your treatment compliance and historical data.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 w-fit">
                    <Download className="h-4 w-4" /> Export Report
                </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="card p-5 border-blue-900/30 bg-slate-800/80 hover:bg-slate-800 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Adherence</h3>
                        <div className="p-1.5 bg-green-500/10 rounded overflow-hidden text-green-400"><Activity className="h-4 w-4" /></div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-bold text-white">94.2%</span>
                        <span className="text-xs font-semibold text-green-400">+2.4%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[94.2%]"></div>
                    </div>
                </div>

                <div className="card p-5 border-slate-700/50 hover:bg-slate-800 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Courses</h3>
                        <div className="p-1.5 bg-blue-500/10 rounded overflow-hidden text-blue-400"><CheckCircle2 className="h-4 w-4" /></div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-bold text-white">12</span>
                        <span className="text-xs text-slate-500">Total</span>
                    </div>
                    <p className="text-xs text-slate-500 italic">2 courses ended this month</p>
                </div>

                <div className="card p-5 border-slate-700/50 hover:bg-slate-800 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ongoing Meds</h3>
                        <div className="p-1.5 bg-orange-500/10 rounded overflow-hidden text-orange-400"><Calendar className="h-4 w-4" /></div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-bold text-white">04</span>
                        <span className="text-xs text-slate-500">Active</span>
                    </div>
                    <p className="text-xs text-slate-500 italic">Next dose in 2 hours</p>
                </div>

                <div className="card p-5 border-red-900/30 bg-slate-800/80 hover:bg-slate-800 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full"></div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Missed Doses</h3>
                        <div className="p-1.5 bg-red-500/10 rounded overflow-hidden text-red-400"><AlertTriangle className="h-4 w-4" /></div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-bold text-white">02</span>
                        <span className="text-xs font-semibold text-red-400">-14%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-[14%]"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 card p-6 min-h-[300px] flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Adherence Analytics</h3>
                        <div className="flex gap-4 text-xs font-medium">
                            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded bg-blue-500"></div><span className="text-slate-400">Taken</span></div>
                            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded bg-slate-700 border border-slate-600"></div><span className="text-slate-400">Missed</span></div>
                        </div>
                    </div>
                    {/* Mock Chart Area */}
                    <div className="flex-1 border-b border-l border-slate-700 relative mt-4">
                        {/* Y-axis lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-full border-t border-slate-800 h-0"></div>
                            ))}
                        </div>

                        {/* Mock Bars */}
                        <div className="absolute inset-0 flex items-end justify-between px-4 sm:px-12 pt-8">
                            {[
                                { day: 'MON', val: 100 }, { day: 'TUE', val: 80, missed: true }, { day: 'WED', val: 100 },
                                { day: 'THU', val: 100 }, { day: 'FRI', val: 100 }, { day: 'SAT', val: 50, missed: true }, { day: 'SUN', val: 100 }
                            ].map((item, i) => (
                                <div key={i} className="w-8 sm:w-12 h-full flex flex-col justify-end group cursor-pointer">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${item.val}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className={clsx(
                                            "w-full rounded-t-md transition-all relative",
                                            item.val === 100 ? "bg-blue-500 group-hover:bg-blue-400" : "bg-slate-700 border border-slate-600"
                                        )}
                                    >
                                        {item.val !== 100 && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-b-sm" style={{ height: `${item.val}%` }}></div>
                                        )}
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* X-axis labels */}
                    <div className="flex justify-between px-4 sm:px-12 mt-4 text-[10px] font-bold text-slate-500 tracking-wider">
                        <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                    </div>
                </div>

                <div className="card p-6 border-slate-700/50">
                    <h3 className="font-bold text-white mb-6">History Filter</h3>

                    <div className="space-y-5">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input type="text" placeholder="Medicine, Doctor..." className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Date Range</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input type="text" placeholder="Last 30 Days" disabled className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white cursor-not-allowed opacity-80" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Status</label>
                            <div className="flex flex-wrap gap-2">
                                <button className="px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold">All</button>
                                <button className="px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-colors">Ongoing</button>
                                <button className="px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-colors">Completed</button>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-8 btn-secondary border border-slate-600 font-semibold py-2.5">
                        Apply Filters
                    </button>
                </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
                <Clock className="h-5 w-5 text-slate-400" />
                <h2 className="text-xl font-bold text-white">Prescription Logs</h2>
            </div>

            <div className="space-y-4">
                {/* Active Prescription Accordion */}
                <div className="card p-0 overflow-hidden border-blue-900/30 bg-slate-800/80 ring-1 ring-blue-500/10">
                    <div
                        onClick={() => toggleAccordion('rx-1')}
                        className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
                    >
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-full border-4 border-blue-500/20 flex items-center justify-center relative">
                                <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-blue-500" strokeWidth="3" strokeDasharray="80, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor" />
                                </svg>
                                <span className="text-xs font-bold text-white">80%</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-bold text-white">Hypertension Protocol</h3>
                                    <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded text-[10px] font-bold uppercase tracking-wider">Ongoing</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><UserIcon /> Dr. Sarah Mitchell</span>
                                    <span className="flex items-center gap-1"><CalendarIcon /> Oct 12, 2023 - Present</span>
                                    <span className="flex items-center gap-1"><PillIcon /> 3 items</span>
                                </div>
                            </div>
                        </div>
                        <ChevronDown className={clsx("h-5 w-5 text-slate-500 transition-transform duration-300", expandedIds.includes('rx-1') ? "transform rotate-180" : "")} />
                    </div>

                    <AnimatePresence>
                        {expandedIds.includes('rx-1') && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-5 pt-0 bg-slate-800/50 border-t border-slate-700/50">
                                    <div className="w-full text-left bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50 mb-3 mt-4">
                                        <table className="w-full text-sm">
                                            <thead className="bg-slate-800/80 border-b border-slate-700/50">
                                                <tr>
                                                    <th className="py-3 px-4 text-slate-400 font-semibold text-left">Tablet Name</th>
                                                    <th className="py-3 px-4 text-slate-400 font-semibold text-left">Dosage & Frequency</th>
                                                    <th className="py-3 px-4 text-slate-400 font-semibold text-left">Intake rules</th>
                                                    <th className="py-3 px-4 text-slate-400 font-semibold text-right">Adherence</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800/50">
                                                <tr className="hover:bg-slate-800/30 transition-colors">
                                                    <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                                                        <PillIcon className="text-blue-400" /> Lisinopril
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-300"><span className="text-white">10mg</span> <span className="text-slate-500">— 1x daily (Morning)</span></td>
                                                    <td className="py-3 px-4 text-slate-300">After Food</td>
                                                    <td className="py-3 px-4 text-right">
                                                        <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-bold border border-green-500/20">100%</span>
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors">
                                                    <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                                                        <PillIcon className="text-blue-400" /> Amlodipine
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-300"><span className="text-white">5mg</span> <span className="text-slate-500">— 1x daily (Evening)</span></td>
                                                    <td className="py-3 px-4 text-slate-300">Before Food</td>
                                                    <td className="py-3 px-4 text-right">
                                                        <span className="inline-flex items-center gap-1.5 text-yellow-500 text-xs font-bold bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20">
                                                            <AlertCircle className="h-3 w-3" /> 75%
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors">
                                                    <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                                                        <PillIcon className="text-blue-400" /> Hydrochlorothiazide
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-300"><span className="text-white">12.5mg</span> <span className="text-slate-500">— 1x daily (Morning)</span></td>
                                                    <td className="py-3 px-4 text-slate-300">After Food</td>
                                                    <td className="py-3 px-4 text-right">
                                                        <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-bold border border-green-500/20">92%</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Completed Prescription Accordion */}
                <div className="card p-0 overflow-hidden border-slate-700/50 bg-slate-800/40">
                    <div
                        onClick={() => toggleAccordion('rx-2')}
                        className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/80 transition-colors"
                    >
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-full border-4 border-green-500/20 flex items-center justify-center relative bg-green-500/5">
                                <span className="text-xs font-bold text-green-400">100%</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-bold text-white">Post-Op Recovery Course</h3>
                                    <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px] font-bold uppercase tracking-wider">Completed</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><UserIcon /> Dr. James Wong</span>
                                    <span className="flex items-center gap-1"><CalendarIcon /> Aug 28 - Sep 05, 2023</span>
                                    <span className="flex items-center gap-1"><PillIcon /> 2 items</span>
                                </div>
                            </div>
                        </div>
                        <ChevronDown className={clsx("h-5 w-5 text-slate-500 transition-transform duration-300", expandedIds.includes('rx-2') ? "transform rotate-180" : "")} />
                    </div>

                    <AnimatePresence>
                        {expandedIds.includes('rx-2') && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-5 pt-0 border-t border-slate-700/50">
                                    <div className="w-full text-left bg-slate-800/50 rounded-xl overflow-hidden mb-3 mt-4">
                                        <table className="w-full text-sm">
                                            <thead className="bg-slate-700/30 border-b border-slate-700/50">
                                                <tr>
                                                    <th className="py-3 px-4 text-slate-400 font-semibold text-left">Tablet Name</th>
                                                    <th className="py-3 px-4 text-slate-400 font-semibold text-left">Dosage & Frequency</th>
                                                    <th className="py-3 px-4 text-slate-400 font-semibold text-left">Intake rules</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700/50">
                                                <tr>
                                                    <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                                                        <PillIcon className="text-green-500" /> Cephalexin
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-300"><span className="text-white">500mg</span> <span className="text-slate-500">— 2x daily</span></td>
                                                    <td className="py-3 px-4 text-slate-300">After Food</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                                                        <PillIcon className="text-green-500" /> Ibuprofen
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-300"><span className="text-white">400mg</span> <span className="text-slate-500">— As needed for pain</span></td>
                                                    <td className="py-3 px-4 text-slate-300">After Food</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Low Adherence Log */}
                <div className="card p-0 overflow-hidden border-red-900/30 ring-1 ring-red-500/20 bg-slate-800/80 mt-4">
                    <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-full border-4 border-red-500/20 flex items-center justify-center relative bg-red-500/5">
                                <span className="text-xs font-bold text-red-400">43%</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-bold text-white">Antibiotics (Broad Spectrum)</h3>
                                    <span className="px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Incomplete Course</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><UserIcon /> Clinic Urgent Care</span>
                                    <span className="flex items-center gap-1"><CalendarIcon /> Aug 10 - Aug 17 (Failed)</span>
                                </div>
                            </div>
                        </div>
                        <button className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors">Review Intervention</button>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)] flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex items-center gap-4 text-white">
                    <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0">
                        <Award className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">AI Health Insight</h3>
                        <p className="text-blue-50 text-sm max-w-2xl">Your adherence improved by 12% since you enabled smart reminders. Continuing this trend will significantly improve your cardiovascular health markers by the next check-up.</p>
                    </div>
                </div>
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-lg font-bold transition-colors whitespace-nowrap shrink-0">
                    View Adherence Tips
                </button>
            </div>

        </div>
    );
}

// Simple internal icons to clean up imports
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
const PillIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 12} height={props.height || 12} className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg>
