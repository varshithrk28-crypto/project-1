import { motion } from 'framer-motion';

export default function StopwatchLoader() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm mx-auto border border-slate-200 dark:border-slate-800">
            <div className="relative w-32 h-32 mb-8">
                {/* Stopwatch Body */}
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute inset-0 rounded-full border-[10px] border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-inner flex items-center justify-center p-1"
                >
                    {/* Clock Face Details */}
                    <div className="w-full h-full rounded-full border border-slate-200 dark:border-slate-600 relative bg-white dark:bg-slate-900 overflow-hidden">
                        {/* Colored pie segment indicating progress */}
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                            className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left bg-orange-100 dark:bg-orange-900/30"
                        ></motion.div>

                        {/* Tick marks */}
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute w-1 h-3 bg-slate-800 dark:bg-slate-500 rounded-full origin-bottom top-1 left-1/2 -translate-x-1/2`}
                                style={{ transform: `translateX(-50%) rotate(${i * 30}deg)`, transformOrigin: '50% 100%', height: i % 3 === 0 ? '12px' : '6px' }}
                            ></div>
                        ))}
                    </div>

                    {/* Hand */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 w-1.5 h-12 bg-slate-800 dark:bg-white origin-bottom rounded-full -translate-x-1/2 -translate-y-full"
                    >
                        {/* Center dot */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 dark:bg-white rounded-full"></div>
                    </motion.div>
                </motion.div>

                {/* Stopwatch Buttons */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-800 dark:bg-slate-700 rounded-t-md"></div>
                <div className="absolute top-2 right-1 rotate-45 w-5 h-3 bg-slate-800 dark:bg-slate-700 rounded-md"></div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Optimizing your experience...</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2 mb-6">
                Brewing fresh data ☕
            </p>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-blue-500 rounded-full"
                ></motion.div>
            </div>
        </div>
    );
}
