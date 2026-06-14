import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import { marqueeSkills } from '../../data/portfolioData';

export default function BottomHud() {
  const [istTime, setIstTime] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [sessionMin, setSessionMin] = useState('00:00');
  const [mouseNorm, setMouseNorm] = useState({ x: '+0.0000', y: '+0.0000' });
  const [scrollPct, setScrollPct] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const startRef = useRef(Date.now());

  // Clock + session
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const fmt = (d) => {
        const h = String(d.getHours()).padStart(2, '0');
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        return `${h}:${m}:${s}`;
      };
      setIstTime(fmt(now));
      setLocalTime(fmt(now));

      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      const em = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const es = String(elapsed % 60).padStart(2, '0');
      setSessionMin(`${em}:${es}`);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  // Mouse coords
  useEffect(() => {
    const handler = (e) => {
      const rawX = (e.clientX / window.innerWidth) * 2 - 1;
      const rawY = -((e.clientY / window.innerHeight) * 2 - 1);
      const x = rawX.toFixed(4);
      const y = rawY.toFixed(4);
      setMouseNorm({
        x: rawX >= 0 ? `+${x}` : x,
        y: rawY >= 0 ? `+${y}` : y,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Scroll progress + show/hide scroll-to-top
  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollPct(pct);
      setShowScrollTop(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (scrollPct / 100) * circumference;

  const marqueeText = marqueeSkills.join('  ·  ');

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 h-20 flex items-center justify-between px-4 md:px-6 bg-transparent pointer-events-none"
      initial={{ y: 70 }}
      animate={{ y: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
    >
      {/* Left — IST + Local time */}
      <div className="flex items-center gap-4 sm:gap-6 shrink-0 pointer-events-auto">
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-wider text-muted">
          <span className="text-[9px] opacity-60">◎</span>
          <span className="text-neon text-[9px] sm:text-[10px] font-semibold">IST</span>
          <span className="text-soft/70">{istTime}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-wider text-muted">
          <span className="text-[9px] opacity-60">◎</span>
          <span className="text-dim text-[9px] sm:text-[10px]">LOC</span>
          <span className="text-soft/70">{localTime}</span>
        </div>
      </div>

      {/* Spacer to push content to the edges */}
      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-5 sm:gap-7 shrink-0 pointer-events-auto">
        {/* Session timer + compass */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-wider text-muted">
            <span className="text-[10px] opacity-50">◷</span>
            <span className="text-soft/70">{sessionMin}</span>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-900/20 border border-amber-800/20 flex items-center justify-center">
            <Compass size={13} className="text-amber-500/80" />
          </div>
        </div>

        {/* X / Y Coordinates + Scroll to Top Button wrapper */}
        <div className="relative flex flex-col items-end justify-center min-w-[70px] sm:min-w-[80px]">
          {/* Scroll-to-top with ring progress — only shows after scrolling past hero */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                onClick={scrollToTop}
                className="absolute -top-14 right-0 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center group cursor-hover pointer-events-auto z-50"
                title="Scroll to top"
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <svg className="absolute inset-0 w-11 h-11 sm:w-12 sm:h-12 -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                  <circle
                    cx="24" cy="24" r={radius} fill="none"
                    stroke="#00ff88"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="transition-[stroke-dashoffset] duration-150 ease-out"
                  />
                </svg>
                <svg width="9" height="9" sm:width="11" sm:height="11" viewBox="0 0 10 10" className="text-white/50 group-hover:text-neon transition-colors duration-200">
                  <path d="M5 8V2M2 4.5L5 1.5L8 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* X / Y Coordinates */}
          <div className="flex flex-col font-mono text-[10px] sm:text-[12px] tracking-wider leading-[1.3] text-right">
            <span className="text-muted">X <span className="text-white/70 ml-1">{mouseNorm.x}</span></span>
            <span className="text-muted">Y <span className="text-white/70 ml-1">{mouseNorm.y}</span></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
