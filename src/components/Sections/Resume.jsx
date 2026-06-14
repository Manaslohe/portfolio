import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { trajectory } from '../../data/portfolioData';

const colorMap = {
  cyan: {
    border: 'border-cyan-500/15 group-hover:border-cyan-400/45',
    text: 'text-cyan-400',
    dash: 'text-cyan-400',
    line: 'bg-cyan-500',
    segment: 'bg-cyan-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.06)]',
    borderRight: 'md:border-r-[3px] md:border-r-cyan-500',
    borderLeft: 'border-l-[3px] border-l-cyan-500',
  },
  emerald: {
    border: 'border-emerald-500/15 group-hover:border-emerald-400/45',
    text: 'text-emerald-400',
    dash: 'text-emerald-400',
    line: 'bg-emerald-500',
    segment: 'bg-emerald-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]',
    borderRight: 'md:border-r-[3px] md:border-r-emerald-500',
    borderLeft: 'border-l-[3px] border-l-emerald-500',
  },
  purple: {
    border: 'border-purple-500/15 group-hover:border-purple-400/45',
    text: 'text-purple-400',
    dash: 'text-purple-400',
    line: 'bg-purple-500',
    segment: 'bg-purple-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.06)]',
    borderRight: 'md:border-r-[3px] md:border-r-purple-500',
    borderLeft: 'border-l-[3px] border-l-purple-500',
  },
  gray: {
    border: 'border-zinc-500/15 group-hover:border-zinc-400/45',
    text: 'text-zinc-400',
    dash: 'text-zinc-400',
    line: 'bg-zinc-500',
    segment: 'bg-zinc-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(113,113,122,0.06)]',
    borderRight: 'md:border-r-[3px] md:border-r-zinc-500',
    borderLeft: 'border-l-[3px] border-l-zinc-500',
  }
};

function TimelineCard({ item, index, isLeft }) {
  const theme = colorMap[item.color] || colorMap.gray;
  
  // Highlight border facing the central timeline
  const borderHighlight = isLeft
    ? `${theme.borderRight} border-l-[3px] md:border-l-0 ${theme.borderLeft}`
    : `${theme.borderLeft}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative p-6 sm:p-7 rounded-sm border ${theme.border} bg-[#030303] backdrop-blur-md transition-all duration-400 ${theme.glow} ${borderHighlight}`}
    >
      {/* Date period and type aligned to top */}
      <div className="flex justify-between items-start gap-4 mb-2">
        <span className="font-mono text-[9px] tracking-wider text-white/30 uppercase select-none">
          {item.type}
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-white/40">
          {item.period}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-sans text-[17px] sm:text-[18px] font-bold text-white leading-snug mb-1">
        {item.title}
      </h3>

      {/* Institution / Company */}
      <p className={`font-mono text-[11px] sm:text-[12px] ${theme.text} uppercase tracking-wider mb-4 font-semibold`}>
        {item.subtitle}
      </p>

      {/* Bullet descriptions */}
      {item.bullets && item.bullets.length > 0 && (
        <ul className="space-y-2.5">
          {item.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 font-sans text-xs sm:text-[13px] text-white/70 leading-relaxed">
              <span className={`${theme.dash} mt-0.5 select-none font-semibold font-mono`}>-</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function Resume() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const sparkY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="resume" className="relative py-28 md:py-36 border-t border-white/[0.04]" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">
          
          {/* STICKY LEFT COLUMN */}
          <div className="lg:sticky lg:top-32 flex flex-col items-start select-none">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-neon mr-2 ">//</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-neon uppercase">
                EXPERIENCE & EDUCATION
              </span>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl font-bold leading-[1.1] text-white tracking-tight">
              The trajectory.
            </h2>
          </div>

          {/* TIMELINE COLUMN */}
          <div className="relative mt-8 lg:mt-0">
            
            {/* Global Timeline Lines (Only render on left for mobile, or centered for desktop) */}
            <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-20 pointer-events-none select-none">
              {/* White/Gray Line (Track 2) */}
              <div className="absolute left-[40px] top-0 bottom-0 w-[1px] bg-white/10">
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 right-0 bg-white/40 origin-top"
                  style={{ scaleY: scrollYProgress }}
                />
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-1.5 h-6 rounded-full bg-white shadow-[0_0_12px_#ffffff] z-20"
                  style={{ top: sparkY, marginTop: '-12px' }}
                />
              </div>
            </div>
            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16 relative z-10">
              {trajectory.map((item, index) => {
                const isEven = index % 2 === 0;
                const theme = colorMap[item.color] || colorMap.gray;
                
                return (
                  <div 
                    key={index} 
                    className={`relative flex flex-col md:flex-row items-start justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    
                    {/* Item Specific Center Track (Lines + Year + Dot + Segment) */}
                    <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-20 pointer-events-none">
                      
                      {/* Year Indicator (sits between Blue Line [20px] and White Line [40px]) */}
                      <div className="absolute left-[30px] -translate-x-1/2 top-1.5 z-20 select-none">
                        <span className="px-0.5 py-0.5 bg-black font-mono text-[9px] font-semibold text-white/50 tracking-wider">
                          {item.year}
                        </span>
                      </div>

                      {/* White Dot on the White Line [40px] */}
                      <div className="absolute left-[40px] -translate-x-1/2 top-[10px] w-1.5 h-1.5 rounded-full bg-white z-20 border border-black" />

                      {/* Segment Line [60px] */}
                      <div className={`absolute left-[60px] top-0 bottom-0 w-[1.5px] ${theme.segment}`} />
                    </div>

                    {/* Timeline Card */}
                    <div className="w-full pl-20 md:pl-0 md:w-[44%]">
                      <TimelineCard item={item} index={index} isLeft={isEven} />
                    </div>

                    {/* Spacer for structural balance */}
                    <div className="hidden md:block w-[44%]" />
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
