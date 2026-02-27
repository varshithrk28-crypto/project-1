import { useState } from 'react';
import { Pill, ArrowRight, Lock, User, Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import { clsx } from 'clsx';

export default function Login({ onLogin }: { onLogin: (role: 'patient' | 'pharmacist') => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'patient' | 'pharmacist'>('patient');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would validate with the backend here
        onLogin(role);
        navigate(role === 'pharmacist' ? '/pharmacist/dashboard' : '/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center items-center p-4 transition-colors duration-300">
            <div className="absolute top-4 right-4"><ThemeToggle /></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4 transform -rotate-6">
                        <Pill className="h-8 w-8 text-white transform rotate-6" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-500 text-center">Enter your details to access your smart prescription manager.</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-8 border border-slate-100 dark:border-slate-700">

                    {/* Role Toggle */}
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-6">
                        <button
                            type="button"
                            onClick={() => setRole('patient')}
                            className={clsx(
                                "flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2",
                                role === 'patient'
                                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            <User className="h-4 w-4" /> Patient
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('pharmacist')}
                            className={clsx(
                                "flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2",
                                role === 'pharmacist'
                                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            <Stethoscope className="h-4 w-4" /> Pharmacist
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group mt-6"
                        >
                            Sign In
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Create an account</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
