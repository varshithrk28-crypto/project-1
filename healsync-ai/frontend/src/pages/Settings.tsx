import { User, Bell, Sun, LogOut } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function Settings({ onLogout }: { onLogout: () => void }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Settings</h1>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-1">
                            <User className="h-5 w-5 text-blue-500" />
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Profile Information</h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 ml-8">Manage your personal details</p>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full" />
                            </div>
                            <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Change Avatar</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Display Name</label>
                                <input type="text" defaultValue="Sarah Mitchell" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                <input type="email" defaultValue="sarah@example.com" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-1">
                            <Sun className="h-5 w-5 text-orange-500" />
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">App Preferences</h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 ml-8">Customize your experience</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-slate-800 dark:text-white">Dark Mode</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Toggle dark mode appearance</div>
                            </div>
                            <ThemeToggle />
                        </div>
                        <div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-slate-800 dark:text-white flex items-center gap-2"><Bell className="h-4 w-4" /> Push Notifications</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Receive alerts for medications</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-500"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-6">
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 font-medium transition-colors"
                        >
                            <LogOut className="h-5 w-5" /> Sign Out from HealSync
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
