import { useState, useEffect } from 'react';
import { Activity, Clock, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import LoginSuccess from '../components/LoginSuccess';

export default function Dashboard({ extractedData }: { extractedData?: any[] | null }) {
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const [medsTaken, setMedsTaken] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();

    const morningMeds = extractedData?.filter(med => med.times?.includes("Morning")) || [];
    const afternoonMeds = extractedData?.filter(med => med.times?.includes("Afternoon")) || [];
    const nightMeds = extractedData?.filter(med => med.times?.includes("Night")) || [];

    const toggleMed = (id: string) => setMedsTaken(prev => ({ ...prev, [id]: !prev[id] }));

    useEffect(() => {
        // Show login success just for demonstration purposes on component mount
        setShowLoginSuccess(true);
    }, []);
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Patient Dashboard</h1>
                    <p className="text-slate-400">Welcome. Let's manage your health.</p>
                </div>
                <button
                    onClick={() => navigate('/upload')}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                    <Activity className="h-4 w-4" /> Upload New Prescription
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card bg-slate-800/80 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Activity className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-slate-500/10 text-slate-400 rounded-full">Waiting</span>
                    </div>
                    <div className="text-sm font-medium text-slate-400 mb-1">Active Medications</div>
                    <div className="text-3xl font-bold text-white mb-4">0</div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full w-0"></div>
                    </div>
                </div>

                <div className="card bg-slate-800/80 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                            <Clock className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-slate-500/10 text-slate-400 rounded-full">Waiting</span>
                    </div>
                    <div className="text-sm font-medium text-slate-400 mb-1">Remaining Today</div>
                    <div className="text-3xl font-bold text-white mb-4">0 <span className="text-sm text-slate-500 font-normal">of 0</span></div>
                    <div className="flex gap-1 h-1.5">
                        <div className="flex-1 bg-slate-700 rounded-full"></div>
                    </div>
                </div>

                <div className="card bg-slate-800/80 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                            <ShieldAlert className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-400 rounded-full">All clear</span>
                    </div>
                    <div className="text-sm font-medium text-slate-400 mb-1">Safety Alerts</div>
                    <div className="text-3xl font-bold text-white mb-4">0</div>
                    <div className="text-xs text-slate-500">No interactions detected</div>
                </div>
            </div>

            <div className="card bg-gradient-to-r from-slate-800 to-slate-800/50 border-blue-900/40 mb-8 p-6 relative overflow-hidden ring-1 ring-white/5 shadow-2xl shadow-blue-900/10">
                <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="flex items-center justify-between relative z-10">
                    <div>
                        <div className="text-blue-400 font-medium mb-1 flex items-center gap-2">
                            Welcome to HealSync AI
                        </div>
                        <div className="text-xl font-bold text-white">
                            {!extractedData || extractedData.length === 0
                                ? "No Prescriptions Uploaded"
                                : `${extractedData.length} Active Medications`}
                            <span className="text-slate-400 font-normal text-base"> • Safe & Secure</span>
                        </div>
                        <p className="text-slate-400 text-sm mt-2 max-w-lg">
                            {!extractedData || extractedData.length === 0
                                ? "Get started by uploading your first medical prescription. Our AI will extract your medications and build a custom schedule for you automatically."
                                : "Your AI extracted prescription has been linked to your daily schedule. Track your adherence below."}
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
                            <FileText className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">Today's Schedule</h2>
                </div>

                {!extractedData || extractedData.length === 0 ? (
                    <div className="card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2">
                        <div className="bg-slate-800 p-4 rounded-full mb-4">
                            <Clock className="h-8 w-8 text-slate-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Your schedule is empty</h3>
                        <p className="text-slate-400 max-w-sm mb-6">
                            Upload a prescription to automatically generate your daily medication timeline and receive smart alerts.
                        </p>
                        <button
                            onClick={() => navigate('/upload')}
                            className="bg-blue-600/20 text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors px-4 py-2 rounded-lg"
                        >
                            Upload Prescription
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {morningMeds.length > 0 && (
                            <div className="card p-5 border-slate-700/50 bg-slate-800/60">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-orange-400"></div> Morning • 08:00 AM
                                </h3>
                                {morningMeds.map((med, idx) => (
                                    <div key={`m-${idx}`} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors mb-3">
                                        <label className="flex items-center gap-4 cursor-pointer flex-1">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={medsTaken[`m-${idx}`] || false}
                                                    onChange={() => toggleMed(`m-${idx}`)}
                                                    className="peer w-6 h-6 outline-none appearance-none border-2 border-slate-600 rounded-lg bg-slate-800 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                                                />
                                                <CheckCircle2 className="absolute text-white w-4 h-4 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={clsx("font-bold transition-all", medsTaken[`m-${idx}`] ? "text-slate-500 line-through" : "text-white")}>{med.medicine}</h4>
                                                <p className="text-xs text-slate-400">{med.foodIntake || "Take with water"}</p>
                                            </div>
                                        </label>
                                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700">1 Pill</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {afternoonMeds.length > 0 && (
                            <div className="card p-5 border-slate-700/50 bg-slate-800/60">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-yellow-400"></div> Afternoon • 01:00 PM
                                </h3>
                                {afternoonMeds.map((med, idx) => (
                                    <div key={`a-${idx}`} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors mb-3">
                                        <label className="flex items-center gap-4 cursor-pointer flex-1">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={medsTaken[`a-${idx}`] || false}
                                                    onChange={() => toggleMed(`a-${idx}`)}
                                                    className="peer w-6 h-6 outline-none appearance-none border-2 border-slate-600 rounded-lg bg-slate-800 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                                                />
                                                <CheckCircle2 className="absolute text-white w-4 h-4 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={clsx("font-bold transition-all", medsTaken[`a-${idx}`] ? "text-slate-500 line-through" : "text-white")}>{med.medicine}</h4>
                                                <p className="text-xs text-slate-400">{med.foodIntake || "Take with water"}</p>
                                            </div>
                                        </label>
                                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700">1 Pill</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {nightMeds.length > 0 && (
                            <div className="card p-5 border-slate-700/50 bg-slate-800/60">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-400"></div> Night • 08:00 PM
                                </h3>
                                {nightMeds.map((med, idx) => (
                                    <div key={`n-${idx}`} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors mb-3">
                                        <label className="flex items-center gap-4 cursor-pointer flex-1">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={medsTaken[`n-${idx}`] || false}
                                                    onChange={() => toggleMed(`n-${idx}`)}
                                                    className="peer w-6 h-6 outline-none appearance-none border-2 border-slate-600 rounded-lg bg-slate-800 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                                                />
                                                <CheckCircle2 className="absolute text-white w-4 h-4 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={clsx("font-bold transition-all", medsTaken[`n-${idx}`] ? "text-slate-500 line-through" : "text-white")}>{med.medicine}</h4>
                                                <p className="text-xs text-slate-400">{med.foodIntake || "Take with water"}</p>
                                            </div>
                                        </label>
                                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700">1 Pill</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <LoginSuccess
                isOpen={showLoginSuccess}
                onClose={() => setShowLoginSuccess(false)}
                userName="Sarah"
            />
        </div>
    );
}
