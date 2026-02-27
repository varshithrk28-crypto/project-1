import { Bell, Search, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 w-full print:hidden">
            <div className="flex items-center max-w-md w-full">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search medications, prescriptions..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-full pl-10 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <ThemeToggle />

                <button className="relative p-2 text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-full hidden sm:block">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1.5 h-2 w-2 bg-red-500 rounded-full animate-pulse border border-slate-800"></span>
                </button>

                <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-medium text-white">Sarah Mitchell</div>
                        <div className="text-xs text-slate-400">Patient Profile</div>
                    </div>
                    <div className="h-9 w-9 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center relative shadow-[0_0_15px_rgba(77,187,243,0.5)] cursor-pointer ring-2 ring-brand-500/30 animate-pulse-glow">
                        <User className="h-5 w-5 text-slate-300" />
                    </div>
                </div>
            </div>
        </header>
    );
}
