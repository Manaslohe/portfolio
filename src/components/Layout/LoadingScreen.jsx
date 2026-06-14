import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEM...');

  useEffect(() => {
    const sequence = [
      { p: 15, msg: 'INITIALIZING SYSTEM...', time: 100 },
      { p: 25, msg: 'INITIALIZING SYSTEM...', time: 400 },
      { p: 28, msg: 'LOADING MODULES...', time: 1000 },
      { p: 45, msg: 'LOADING MODULES...', time: 1200 },
      { p: 65, msg: 'LOADING MODULES...', time: 1500 },
      { p: 68, msg: 'RENDERING INTERFACE...', time: 2000 },
      { p: 85, msg: 'RENDERING INTERFACE...', time: 2200 },
      { p: 100, msg: 'SYSTEM READY', time: 2500 },
    ];

    const timers = sequence.map((step) =>
      setTimeout(() => {
        setProgress(step.p);
        setStatusText(step.msg);
      }, step.time)
    );

    const finish = setTimeout(() => setIsLoading(false), 2900);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-void"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="font-mono text-sm tracking-[0.3em] text-neon uppercase">
                MANAS LOHE
              </h1>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-px bg-dark-400 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-neon transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status */}
            <div className="h-6 mt-2 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusText}
                  className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  {statusText}
                  <span className="animate-blink ml-1 text-neon">_</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
