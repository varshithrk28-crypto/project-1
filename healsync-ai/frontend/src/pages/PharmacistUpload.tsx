import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, IndianRupee, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import StopwatchLoader from '../components/StopwatchLoader';

export default function PharmacistUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [extracting, setExtracting] = useState(false);
    const [extractedData, setExtractedData] = useState<any[] | null>(null);
    const [billTotal, setBillTotal] = useState<number>(0);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSimulateExtraction = () => {
        // Works for any file type (PDF/PNG/JPG) as long as file state exists
        if (!file) return;
        setExtracting(true);

        setTimeout(() => {
            setExtracting(false);
            const mockData = [
                {
                    medicine: "Amoxicillin 500mg",
                    quantity: 14,
                    pricePerUnit: 12.50,
                },
                {
                    medicine: "Paracetamol 650mg",
                    quantity: 10,
                    pricePerUnit: 2.00,
                },
                {
                    medicine: "Pantoprazole 40mg",
                    quantity: 7,
                    pricePerUnit: 8.50,
                }
            ];

            // Calculate mock total
            const total = mockData.reduce((acc, curr) => acc + (curr.quantity * curr.pricePerUnit), 0);

            setExtractedData(mockData);
            setBillTotal(total);
        }, 3500);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <span>Pharmacist Portal</span>
                    <span className="text-slate-600">›</span>
                    <span className="text-white">Process Prescription</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">AI Prescription Billing</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Upload a patient's prescription (Image or PDF) to automatically extract medicines and generate a bill.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Uploader */}
                <div className="flex flex-col gap-6">
                    <label className="card flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500/50 bg-slate-50 dark:bg-slate-800/40 transition-all cursor-pointer group min-h-[400px]">
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

                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 text-center">
                            {file ? file.name : "Upload Prescription File"}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-center max-w-xs mb-8">
                            {file ? (file.type === "application/pdf" ? "PDF Document loaded." : "Image ready to be extracted.") : "Support for JPG, PNG and PDF formats. PDF extraction is fully supported."}
                        </p>

                        <button
                            className={clsx(
                                "btn-primary w-48 shadow-[0_0_20px_rgba(37,99,235,0.4)]",
                                !file && "pointer-events-none opacity-50"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSimulateExtraction();
                            }}
                            disabled={extracting || !file}
                        >
                            {extracting ? "Scanning..." : file ? "Extract & Bill" : "Browse Files"}
                        </button>
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
                <div className="card border-green-900/40 p-0 overflow-hidden min-h-[400px] flex flex-col shadow-xl shadow-slate-900/50">
                    <div className="border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/80 p-4 relative flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <IndianRupee className="h-5 w-5 text-green-500" />
                            <h3 className="font-bold text-slate-800 dark:text-white">Generated Bill Invoice</h3>
                        </div>
                        {extractedData ? (
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold rounded-md border border-green-500/20 tracking-wider">READY</span>
                        ) : (
                            <span className="px-2 py-0.5 bg-slate-500/10 text-slate-500 text-xs font-bold rounded-md border border-slate-500/20 tracking-wider">WAITING</span>
                        )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-start overflow-y-auto max-h-[600px] custom-scrollbar bg-white dark:bg-slate-900/20">
                        {extractedData ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-700 pb-2">
                                        <span className="text-sm font-semibold text-slate-500 uppercase">Item Description</span>
                                        <span className="text-sm font-semibold text-slate-500 uppercase">Amount</span>
                                    </div>

                                    {extractedData.map((med, idx) => (
                                        <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors px-2 rounded-lg -mx-2">
                                            <div>
                                                <div className="font-bold text-slate-800 dark:text-white">{med.medicine}</div>
                                                <div className="text-xs text-slate-500">{med.quantity} units @ ₹{med.pricePerUnit.toFixed(2)}/each</div>
                                            </div>
                                            <div className="font-bold text-slate-800 dark:text-white relative">
                                                ₹{(med.quantity * med.pricePerUnit).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-4 mt-6 border-t-2 border-dashed border-slate-300 dark:border-slate-700">
                                        <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800/50">
                                            <span className="text-lg font-bold text-slate-800 dark:text-white">Total Amount</span>
                                            <span className="text-2xl font-black text-green-600 dark:text-green-400">₹{billTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center opacity-30 pointer-events-none">
                                <div className="w-full space-y-4">
                                    <div className="flex justify-between border-b border-slate-700 pb-2">
                                        <div className="h-4 w-24 bg-slate-700 rounded"></div>
                                        <div className="h-4 w-12 bg-slate-700 rounded"></div>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <div className="h-6 w-48 bg-slate-800 rounded"></div>
                                        <div className="h-6 w-16 bg-slate-800 rounded"></div>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <div className="h-6 w-32 bg-slate-800 rounded"></div>
                                        <div className="h-6 w-16 bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                        <button
                            className={clsx(
                                "w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                                extractedData
                                    ? "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]"
                                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50"
                            )}
                            disabled={!extractedData}
                        >
                            <Download className="h-5 w-5" /> Generate & Print Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
