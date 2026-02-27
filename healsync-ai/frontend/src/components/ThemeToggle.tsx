import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check initial system/saved preference (defaulting to dark for this app)
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className={clsx(
                "relative w-[72px] h-9 rounded-full px-1 transition-all flex items-center shadow-inner",
                isDark ? "bg-slate-800 border border-slate-700" : "bg-slate-200 border border-slate-300"
            )}
            aria-label="Toggle Theme"
        >
            <div className="absolute left-2.5 z-0">
                <Sun className="h-4 w-4 text-orange-400/80" />
            </div>
            <div className="absolute right-2.5 z-0">
                <Moon className="h-4 w-4 text-blue-300/80" />
            </div>

            <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className={clsx(
                    "w-7 h-7 rounded-full flex items-center justify-center shadow-md relative z-10",
                    isDark ? "bg-slate-900 border border-slate-700 ml-auto" : "bg-white border border-slate-200"
                )}
            >
                <AnimatePresence mode="popLayout">
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                        >
                            <Moon className="h-3.5 w-3.5 text-blue-400" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ scale: 0, rotate: 90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -90 }}
                        >
                            <Sun className="h-3.5 w-3.5 text-orange-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </button>
    );
}
