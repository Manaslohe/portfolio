import { motion } from 'framer-motion';
import { aboutText, personalInfo } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function About() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="about" className="relative py-32 border-t border-white/[0.04]">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24">

        {/* Header Section */}
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.2em] text-neon uppercase mb-8">// THE PHILOSOPHY</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight max-w-4xl">
            Building resilient systems.<br />Not just writing code.
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-24 items-start"
        >
          {/* Main About Text */}
          <div className="flex flex-col gap-10">
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-sans">
              {aboutText}
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mt-4 pt-10 border-t border-white/[0.05]">
              {/* Core Pillars matching the premium transparent card style */}
              {[
                { label: 'ARCHITECTURE', title: 'Scalable Systems', desc: 'Designing full-stack infrastructures that handle complex workflows, from AI orchestration to high-volume financial transactions.' },
                { label: 'ENGINEERING', title: 'Performance First', desc: 'Deep focus on optimization, database structuring, and crafting responsive frontend interfaces that feel instantaneous.' },
                { label: 'INNOVATION', title: 'AI Integration', desc: 'Building intelligent applications with voice-assisted workflows, real-time analytics, and automated decision making.' },
                { label: 'DELIVERY', title: 'Client Outcomes', desc: 'Delivering end-to-end solutions that solve real business problems, from startups to enterprise-scale organizations.' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <span className="font-mono text-[10px] tracking-widest text-white/30 group-hover:text-neon transition-colors duration-300 uppercase">{item.label}</span>
                  <h4 className="text-xl md:text-2xl text-white font-serif">{item.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile / Image Side */}
          <div className="relative">
            <div className="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.05] bg-transparent relative group">
              <img
                src={personalInfo.aboutImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />

              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div>
                  <p className="text-white font-serif text-3xl mb-2">{personalInfo.name}</p>
                  <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase">{personalInfo.role}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-white/30 text-[9px] font-mono tracking-widest uppercase">Base</span>
                  <span className="text-neon text-xs font-mono uppercase tracking-widest">{personalInfo.locations[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
