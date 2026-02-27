import { LayoutDashboard, FileText, Pill, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';

export default function PharmacistSidebar() {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/pharmacist/dashboard' },
        { name: 'Process Rx', icon: FileText, path: '/pharmacist/upload' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col pt-4">
            <div className="px-6 mb-8 flex items-center gap-2 text-green-500 font-bold text-xl">
                <Pill className="h-6 w-6" />
                <span className="text-white">HealSync Rx</span>
            </div>

            <div className="px-4 mb-6">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Account</div>
                <div className="bg-green-600/10 border border-green-500/20 text-green-400 rounded-lg p-3 flex items-center gap-3 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white border-2 border-slate-900 shadow-[0_0_20px_rgba(34,197,94,0.7)] ring-4 ring-green-400/30">
                        <span className="text-sm">PS</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-white">Pharmaco Store</div>
                        <div className="text-xs text-green-400">Admin</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 mt-4">Menu</div>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={clsx(
                                'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all',
                                isActive
                                    ? 'bg-green-600 text-white font-medium shadow-md shadow-green-900/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
                © 2026 HealSync AI
            </div>
        </aside>
    );
}
