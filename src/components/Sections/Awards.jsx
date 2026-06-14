import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../UI/SectionHeading';
import { awards, stats } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function AwardCard({ award, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-lg border border-white/[0.04] bg-dark-900/30 hover:border-neon/10 transition-colors duration-400"
      initial={{ opacity: 0, y: 25 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <p className="font-mono text-[10px] tracking-[0.15em] text-neon uppercase mb-3">{award.title}</p>
      <p className="text-sm text-dim leading-relaxed">{award.description}</p>
    </motion.div>
  );
}

function StatItem({ value, label, index }) {
  const [ref, isVisible] = useScrollAnimation();
  const [display, setDisplay] = useState('0');
  const animated = useRef(false);

  useEffect(() => {
    if (!isVisible || animated.current) return;
    animated.current = true;
    const m = value.match(/(\d+)/);
    if (!m) { setDisplay(value); return; }
    const target = parseInt(m[1]);
    const pre = value.substring(0, value.indexOf(m[1]));
    const suf = value.substring(value.indexOf(m[1]) + m[1].length);
    let curr = 0;
    const inc = Math.max(1, Math.ceil(target / 30));
    const iv = setInterval(() => {
      curr = Math.min(curr + inc, target);
      setDisplay(`${pre}${curr}${suf}`);
      if (curr >= target) clearInterval(iv);
    }, 40);
    return () => clearInterval(iv);
  }, [isVisible, value]);

  return (
    <motion.div
      ref={ref}
      className="p-5 rounded-lg border border-white/[0.04] bg-dark-900/30 text-center hover:border-neon/10 transition-colors duration-400"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <p className="text-3xl md:text-4xl font-sans font-extralight text-white mb-1">{display}</p>
      <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase">{label}</p>
    </motion.div>
  );
}

export default function Awards() {
  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <SectionHeading tag="ACHIEVEMENTS" title="Honors & Awards" />

        {/* Award cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {awards.map((a, i) => (
            <AwardCard key={i} award={a} index={i} />
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {stats.map((s, i) => (
            <StatItem key={i} value={s.value} label={s.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
