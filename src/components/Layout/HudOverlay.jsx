import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HudOverlay() {
  const [time, setTime] = useState('');
  const [sessionTime, setSessionTime] = useState('00:00');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const startTime = useRef(Date.now());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);

      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      const em = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const es = String(elapsed % 60).padStart(2, '0');
      setSessionTime(`${em}:${es}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <>
      {/* Top left — Clock */}
      <motion.div
        className="fixed top-5 left-6 z-40 hidden lg:flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-neon">IND</span>
        <span>{time}</span>
      </motion.div>

      {/* Top right — Session + Coords */}
      <motion.div
        className="fixed top-5 right-6 z-40 hidden lg:flex items-center gap-6 font-mono text-[10px] tracking-[0.15em] text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
      >
        <span>SESSION {sessionTime}</span>
        <span className="text-dim">
          X:{String(mousePos.x).padStart(4, '0')} Y:{String(mousePos.y).padStart(4, '0')}
        </span>
      </motion.div>
    </>
  );
}
