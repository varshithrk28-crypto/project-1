import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

export default function LoginSuccess({ isOpen, onClose, userName = "Shiva" }: { isOpen: boolean, onClose: () => void, userName?: string }) {
    // Auto-close after 4 seconds
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    {/* Confetti Background Elements (Animated CSS positions could go here, simulating static for now) */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -20, opacity: 0, rotate: 0 }}
                                animate={{ y: window.innerHeight, opacity: [0, 1, 1, 0], rotate: 360 }}
                                transition={{ duration: 3 + Math.random() * 2, delay: Math.random(), repeat: Infinity }}
                                className="absolute w-2 h-4"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    backgroundColor: ['#4dbbf3', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)]
                                }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-sm bg-slate-800 text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50 overflow-hidden p-6"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="text-center mb-6">
                            <h2 className="text-white text-xl flex items-center justify-center gap-2 font-semibold">
                                Welcome back, <span className="text-orange-400 font-bold">{userName}</span>! <span className="text-2xl animate-wave">👋</span>
                            </h2>
                        </div>

                        <div className="h-px w-full bg-slate-700/50 mb-6"></div>

                        <div className="text-center space-y-3">
                            <h3 className="text-lg font-bold text-white">Login Successful!</h3>
                            <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                                <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>
                                You have successfully logged in!
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
