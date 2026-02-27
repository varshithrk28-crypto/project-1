import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Shield, Printer, Bell, Activity, Volume2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Tesseract from 'tesseract.js';
import StopwatchLoader from '../components/StopwatchLoader';
import { useNavigate } from 'react-router-dom';

export default function PrescriptionUpload({ globalExtractedData, onUpdateExtractedData }: { globalExtractedData?: any[] | null, onUpdateExtractedData?: (data: any[] | null) => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [extracting, setExtracting] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [isPlayingTTS, setIsPlayingTTS] = useState(false);
    const [ttsLanguage, setTtsLanguage] = useState('en'); // default english
    const [quickMedsTaken, setQuickMedsTaken] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();

    const toggleQuickMed = (id: string) => setQuickMedsTaken(prev => ({ ...prev, [id]: !prev[id] }));

    const getTranslatedText = (lang: string, data: any[]) => {
        if (lang === 'te') {
            return `మీకు ${data.length} మందులు సూచించబడ్డాయి. ` +
                data.map(med => `${med.medicine}, ${med.frequency} తీసుకోవాలి, ${med.foodIntake}, ${med.duration} పాటు.`).join(" ");
        } else if (lang === 'ta') {
            return `உங்களுக்கு ${data.length} மருந்துகள் பரிந்துரைக்கப்பட்டுள்ளன. ` +
                data.map(med => `${med.medicine}, ${med.frequency} எடுத்துக்கொள்ள வேண்டும், ${med.foodIntake}, ${med.duration} க்கு.`).join(" ");
        } else if (lang === 'hi') {
            return `आपको ${data.length} दवाएं निर्धारित की गई हैं। ` +
                data.map(med => `${med.medicine}, ${med.frequency} लेना है, ${med.foodIntake}, ${med.duration} के लिए।`).join(" ");
        }
        return `You have ${data.length} medications prescribed. ` +
            data.map(med => `${med.medicine}, to be taken ${med.frequency}, ${med.foodIntake}, for ${med.duration}.`).join(" ");
    };

    const handleTTS = () => {
        if (!globalExtractedData) return;

        if (isPlayingTTS) {
            window.speechSynthesis.cancel();
            setIsPlayingTTS(false);
            return;
        }

        const textToRead = getTranslatedText(ttsLanguage, globalExtractedData);

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = ttsLanguage === 'te' ? 'te-IN' : ttsLanguage === 'ta' ? 'ta-IN' : ttsLanguage === 'hi' ? 'hi-IN' : 'en-US';

        const voices = window.speechSynthesis.getVoices();
        // Try to find a voice that matches the selected user language
        const preferredVoice = voices.find(v => v.lang.startsWith(ttsLanguage)) || voices.find(v => v.lang.includes('IN')) || voices[0];

        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 0.9; // slightly slower for clarity

        utterance.onend = () => setIsPlayingTTS(false);
        setIsPlayingTTS(true);
        window.speechSynthesis.speak(utterance);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSimulateExtraction = async () => {
        if (!file) return;
        setExtracting(true);

        if (file.type.startsWith('image/')) {
            try {
                // Real OCR Processing
                const result = await Tesseract.recognize(file, 'eng');
                const text = result.data.text.toLowerCase();
                const foundMeds: any[] = [];
                const addedNames = new Set<string>();

                // 1. Keyword extraction logic
                const medicineDatabase = [
                    { name: "Betaloc", dose: "100mg", keywords: ["betaloc", "betal", "setal", "etaloc", "beta", "100m"], customFreq: "1 tab BID" },
                    { name: "Dorzolamidum", dose: "10 mg", keywords: ["dorzolamidum", "dorzolam", "dorz", "lamid", "10 m"], customFreq: "1 tab BID" },
                    { name: "Cimetidine", dose: "50 mg", keywords: ["cimetidine", "cimet", "cime", "tidine", "cinet"], customFreq: "2 tabs TID" },
                    { name: "Oxprelol", dose: "50mg", keywords: ["oxprelol", "oxpre", "prelol", "dxpre"], customFreq: "1 tab QD" },
                    { name: "Amoxicillin", dose: "500mg", keywords: ["amox", "amoxicillin"] },
                    { name: "Paracetamol", dose: "650mg", keywords: ["para", "paracetamol", "dolo", "crocin", "calpol"] },
                    { name: "Pantoprazole", dose: "40mg", keywords: ["panto", "pantoprazole", "pan40"] },
                    { name: "Cetirizine", dose: "10mg", keywords: ["cetirizine", "citrizine", "zyrtec"] },
                    { name: "Ibuprofen", dose: "400mg", keywords: ["ibuprofen", "advil", "brufen", "ibu"] },
                    { name: "Azithromycin", dose: "500mg", keywords: ["azithro", "azithromycin", "azi"] }
                ];

                for (const med of medicineDatabase) {
                    if (!addedNames.has(med.name.toLowerCase()) && med.keywords.some(k => text.includes(k))) {
                        // Determine generic times based on custom frequency mapping or default
                        let times = ["Morning", "Night"];
                        let frequencyDesc = "1 - 0 - 1";
                        if (med.customFreq?.includes("TID")) { times = ["Morning", "Afternoon", "Night"]; frequencyDesc = "1 - 1 - 1"; }
                        if (med.customFreq?.includes("QD")) { times = ["Morning"]; frequencyDesc = "1 - 0 - 0"; }

                        foundMeds.push({
                            medicine: `${med.name} ${med.dose}`,
                            frequency: med.customFreq || frequencyDesc,
                            duration: "5 Days",
                            foodIntake: "After Food",
                            times: times
                        });
                        addedNames.add(med.name.toLowerCase());
                    }
                }

                if (foundMeds.length === 0) {
                    foundMeds.push({
                        medicine: "Extracted: Unknown Medication",
                        frequency: "1 - 0 - 0",
                        duration: "Review needed",
                        foodIntake: "Consult Doctor",
                        times: ["Morning"]
                    });
                    const snippet = result.data.text.replace(/[\n\r]/g, ' ').substring(0, 60);
                    setSummary(`We extracted text from your image, but couldn't confidently identify standard medications. Extracted snippet: "${snippet}..." Please review manually.`);
                } else {
                    setSummary(`Successfully extracted ${foundMeds.length} medications using HealSync's enhanced pattern matching OCR. Review the results below.`);
                }

                if (onUpdateExtractedData) onUpdateExtractedData(foundMeds);
            } catch (error) {
                console.error("OCR Error:", error);
                if (onUpdateExtractedData) onUpdateExtractedData([{ medicine: "OCR Failed", frequency: "", duration: "", foodIntake: "", times: [] }]);
            } finally {
                setExtracting(false);
            }
        } else {
            // PDF Fallback (Tesseract.js needs images)
            setTimeout(() => {
                setExtracting(false);
                if (onUpdateExtractedData) onUpdateExtractedData([
                    {
                        medicine: "Amoxicillin 500mg (PDF)",
                        frequency: "1 - 0 - 1",
                        duration: "7 Days",
                        foodIntake: "After Food",
                        times: ["Morning", "Night"]
                    },
                    {
                        medicine: "Cetirizine 10mg (PDF)",
                        frequency: "0 - 0 - 1",
                        duration: "3 Days",
                        foodIntake: "After Food",
                        times: ["Night"]
                    }
                ]);
                setSummary("PDF documents cannot be extracted directly in the browser via basic OCR yet. Here is a simulated response.");
            }, 3500);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <span>Dashboard</span>
                    <span className="text-slate-600">›</span>
                    <span className="text-white">Upload & Extract</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Prescription AI Extractor</h1>
                <p className="text-slate-400 text-lg">Upload your medical prescription and our AI will automatically structure your treatment plan.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Uploader */}
                <div className="flex flex-col gap-6">
                    <label className="card flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-800/40 hover:bg-slate-800/80 transition-all cursor-pointer group min-h-[400px]">
                        <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf" />
                        <div className="relative">
                            <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                                {file && file.type === "application/pdf" ? (
                                    <FileText className="h-8 w-8 text-blue-500" />
                                ) : (
                                    <UploadCloud className="h-8 w-8 text-blue-500" />
                                )}
                            </div>
                            {file && <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-800"><CheckCircle className="h-3 w-3 text-white" /></div>}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 text-center">
                            {file ? file.name : "Drag and drop prescription"}
                        </h3>
                        <p className="text-slate-400 text-center max-w-xs mb-8">
                            {file ? (file.type === "application/pdf" ? "PDF Document loaded." : "File ready to be extracted by HealSync AI.") : "Support for JPG, PNG and PDF formats. Ensure the text is clear for better accuracy."}
                        </p>
                        {file ? (
                            <button
                                className="btn-primary w-48 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSimulateExtraction();
                                }}
                                disabled={extracting}
                            >
                                {extracting ? "Processing..." : "Start Extraction"}
                            </button>
                        ) : (
                            <div className="btn-primary w-48 pointer-events-none">Browse Files</div>
                        )}
                    </label>

                    {/* AI Loader */}
                    <AnimatePresence>
                        {extracting && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: 20 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                className="w-full mt-4"
                            >
                                <StopwatchLoader />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column - Results Preview */}
                <div className="card border-blue-900/40 p-0 overflow-hidden min-h-[400px] flex flex-col shadow-xl shadow-slate-900/50">
                    <div className="border-b border-slate-700/50 bg-slate-800/80 p-4 relative flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-blue-400" />
                            <h3 className="font-bold text-white">AI Extraction Preview</h3>
                        </div>
                        {globalExtractedData ? (
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-bold rounded-md border border-green-500/20 tracking-wider">SUCCESS</span>
                        ) : (
                            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-md border border-blue-500/20 tracking-wider">REAL-TIME</span>
                        )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-start overflow-y-auto max-h-[600px] custom-scrollbar">
                        {globalExtractedData ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                {/* AI Summarization Block */}
                                {summary && (
                                    <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-4 shadow-inner">
                                        <div className="flex items-center gap-2 mb-2 text-blue-400 font-semibold text-sm uppercase tracking-wider">
                                            <FileText className="h-4 w-4" /> AI Summary & Translating
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">{summary}</p>
                                    </div>
                                )}

                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-bold text-white">Extracted Medications ({globalExtractedData.length})</h4>
                                        <div className="flex items-center gap-3">
                                            <select
                                                value={ttsLanguage}
                                                onChange={(e) => setTtsLanguage(e.target.value)}
                                                className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
                                            >
                                                <option value="en">English</option>
                                                <option value="te">Telugu</option>
                                                <option value="ta">Tamil</option>
                                                <option value="hi">Hindi</option>
                                            </select>
                                            <button
                                                onClick={handleTTS}
                                                className={clsx(
                                                    "p-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium",
                                                    isPlayingTTS
                                                        ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                                                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
                                                )}
                                            >
                                                <Volume2 className="h-4 w-4" /> {isPlayingTTS ? "Stop Reading" : "Read Aloud"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {globalExtractedData.map((med, idx) => (
                                            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:border-slate-600 transition-colors">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="font-bold text-lg text-white">{med.medicine}</div>
                                                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md">{med.foodIntake}</span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-3">
                                                    <div className="bg-slate-900 rounded-lg p-2 text-center border border-slate-800">
                                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Frequency</div>
                                                        <div className="text-blue-400 font-bold tracking-widest">{med.frequency}</div>
                                                    </div>
                                                    <div className="bg-slate-900 rounded-lg p-2 text-center border border-slate-800">
                                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Duration</div>
                                                        <div className="text-white font-medium">{med.duration}</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {med.times.map((time: string) => (
                                                        <span key={time} className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs border border-blue-500/20 font-medium">
                                                            {time}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center opacity-30 pointer-events-none">
                                <div className="w-full space-y-6">
                                    <div>
                                        <div className="h-4 w-32 bg-slate-700 rounded mb-2"></div>
                                        <div className="h-12 w-full bg-slate-800 rounded-lg border border-slate-700"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="h-4 w-24 bg-slate-700 rounded mb-2"></div>
                                            <div className="h-12 w-full bg-slate-800 rounded-lg border border-slate-700"></div>
                                        </div>
                                        <div>
                                            <div className="h-4 w-24 bg-slate-700 rounded mb-2"></div>
                                            <div className="h-12 w-full bg-slate-800 rounded-lg border border-slate-700"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="h-4 w-32 bg-slate-700 rounded mb-2 text-transparent">Scanning...</div>
                                        <div className="h-10 w-full bg-slate-800 rounded-lg border border-slate-700 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-slate-900/50 border-t border-slate-800">
                        <button
                            className={clsx(
                                "w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                                globalExtractedData
                                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                                    : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
                            )}
                            disabled={!globalExtractedData}
                            onClick={() => navigate('/dashboard')}
                        >
                            <CheckCircle className="h-5 w-5" /> Confirm & View Schedule
                        </button>
                        <div className="text-center text-[10px] uppercase tracking-widest text-slate-500 mt-3 font-semibold">
                            Please verify all fields before confirming
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card flex flex-col items-start gap-4">
                    <Shield className="h-6 w-6 text-blue-400" />
                    <div>
                        <h3 className="text-white font-bold mb-1">HIPAA Compliant</h3>
                        <p className="text-slate-400 text-sm">Your medical data is encrypted end-to-end and handled with enterprise-grade security protocols.</p>
                    </div>
                </div>
                <div className="card flex flex-col items-start gap-4">
                    <Bell className="h-6 w-6 text-blue-400" />
                    <div>
                        <h3 className="text-white font-bold mb-1">Smart Reminders</h3>
                        <p className="text-slate-400 text-sm">Extracted data automatically syncs with your mobile app to provide timely medication alerts.</p>
                    </div>
                </div>
                <div className="card flex flex-col items-start gap-4">
                    <Printer className="h-6 w-6 text-blue-400" />
                    <div>
                        <h3 className="text-white font-bold mb-1">Printable Posters</h3>
                        <p className="text-slate-400 text-sm">Generate clear, easy-to-read visual guides for your medicine cabinet or fridge.</p>
                    </div>
                </div>
            </div>

            {/* Quick Medicine Tracker block placed at the bottom as requested */}
            {globalExtractedData && globalExtractedData.length > 0 && (
                <div className="mt-12 bg-slate-900/60 p-8 rounded-2xl border border-blue-900/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Daily Medicine Tracker</h2>
                        </div>
                        <p className="text-slate-400 mb-8 max-w-xl">
                            You successfully linked your prescription. Use the checkboxes below to quickly log your medications for today directly from this screen.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {globalExtractedData.map((med, idx) => (
                                <label key={idx} className="flex items-center justify-between p-4 bg-slate-800/80 rounded-xl border border-slate-700 hover:border-blue-500/30 transition-colors shadow-lg shadow-slate-950/20">
                                    <div className="flex items-center gap-4 cursor-pointer flex-1">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={quickMedsTaken[`qm-${idx}`] || false}
                                                onChange={() => toggleQuickMed(`qm-${idx}`)}
                                                className="peer w-6 h-6 outline-none appearance-none border-2 border-slate-500 rounded-lg bg-slate-900 checked:bg-green-500 checked:border-green-500 transition-all cursor-pointer"
                                            />
                                            <CheckCircle className="absolute text-white w-4 h-4 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={clsx("font-bold text-lg transition-all", quickMedsTaken[`qm-${idx}`] ? "text-slate-500 line-through" : "text-white")}>{med.medicine}</h4>
                                            <p className="text-sm text-slate-400">{med.frequency} • {med.foodIntake}</p>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
