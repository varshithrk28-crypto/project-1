import { FileText, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PharmacistDashboard() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Pharmacist Portal</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage prescriptions, automate billing, and view pharmacy analytics.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card border-blue-900/40 bg-slate-800/80 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl"><FileText className="h-6 w-6" /></div>
                        </div>
                        <h3 className="text-4xl font-bold text-white mb-2">18</h3>
                        <p className="text-sm font-medium text-slate-400">Pending Prescriptions</p>
                    </div>
                </div>

                <div className="card border-green-900/40 bg-slate-800/80 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-green-500/20 text-green-400 rounded-xl"><IndianRupee className="h-6 w-6" /></div>
                        </div>
                        <h3 className="text-4xl font-bold text-white mb-2">₹4,250</h3>
                        <p className="text-sm font-medium text-slate-400">Today's Revenue</p>
                    </div>
                </div>

                <div className="card border-slate-700/50 bg-slate-800/40 border-dashed p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/60 transition-all group lg:col-span-2">
                    <Link to="/pharmacist/upload" className="flex flex-col items-center w-full h-full justify-center">
                        <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                            <FileText className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Process New Prescription</h3>
                        <p className="text-slate-400 text-sm">Upload to generate AI bill</p>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8">
                <div className="card p-6 border-slate-700/50 min-h-[400px]">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Bills Generated</h3>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-700 text-sm text-slate-400">
                                    <th className="pb-3 font-semibold">Invoice #</th>
                                    <th className="pb-3 font-semibold">Patient Name</th>
                                    <th className="pb-3 font-semibold">Items</th>
                                    <th className="pb-3 font-semibold">Total Amount</th>
                                    <th className="pb-3 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                                    <td className="py-4 font-medium text-white">INV-2023-001</td>
                                    <td className="py-4 text-slate-300">Sumit Sharma</td>
                                    <td className="py-4 text-slate-300">3 Meds</td>
                                    <td className="py-4 font-bold text-white">₹850.00</td>
                                    <td className="py-4"><span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded border border-green-500/20">Paid</span></td>
                                </tr>
                                <tr className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                                    <td className="py-4 font-medium text-white">INV-2023-002</td>
                                    <td className="py-4 text-slate-300">Anita Rao</td>
                                    <td className="py-4 text-slate-300">1 Med</td>
                                    <td className="py-4 font-bold text-white">₹120.00</td>
                                    <td className="py-4"><span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded border border-blue-500/20">Pending</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
