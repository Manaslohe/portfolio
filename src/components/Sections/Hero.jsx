import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import { LinkedinIcon, TwitterIcon, GithubIcon } from '../UI/SocialIcons';

export default function Hero() {
  const [dotVisible, setDotVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => setDotVisible((v) => !v), 800);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="intro" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Content */}
      <div className="flex-1 flex items-start relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pb-12 pt-18 md:pt-16 lg:pt-22">
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-2 lg:gap-6 w-full items-end">

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-end">
            {/* Tagline with leading line */}
            <motion.div
              className="flex items-center mb-2 max-w-2xl cursor-hover"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <p className="font-mono text-[10px] sm:text-[11px] leading-[1.6] text-white/80 tracking-wide">
                <span className="text-neon mr-2 ">//</span>{personalInfo.tagline}
              </p>
            </motion.div>

            {/* BIG NAME — using serif with glow and absolute HUD overlay */}
            <div className="relative w-fit">
              <motion.h1
                className="font-serif text-[5.5rem] sm:text-[7.2rem] md:text-[9rem] lg:text-[10.5rem] xl:text-[11rem] font-bold leading-[0.85] tracking-[-0.02em] text-white mb-8 cursor-hover w-fit"
                style={{ textShadow: '0 0 35px rgba(255, 255, 255, 0.12)' }}
                whileHover={{
                  x: 10,
                  textShadow: '0 0 55px rgba(255, 255, 255, 0.28)',
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  x: { type: 'spring', stiffness: 150, damping: 18 },
                  textShadow: { duration: 0.3 },
                  delay: 2,
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1]
                }}
              >
                Manas<br />Lohe
              </motion.h1>
            </div>

            {/* Role + Company */}
            <motion.div
              className="flex flex-wrap gap-x-16 gap-y-4 mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.5 }}
            >
              <motion.div
                className="cursor-hover transition-all duration-300"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <p className="font-mono text-[9px] tracking-[0.25em] text-white/45 uppercase mb-1.5">ROLE</p>
                <p className="font-sans text-[14px] sm:text-[15px] text-white font-medium leading-relaxed">{personalInfo.role}</p>
              </motion.div>
              <motion.div
                className="cursor-hover transition-all duration-300"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <p className="font-mono text-[9px] tracking-[0.25em] text-white/45 uppercase mb-1.5">COMPANY</p>
                <p className="font-sans text-[14px] sm:text-[15px] text-white font-medium leading-relaxed mb-0.5">{personalInfo.company}</p>
                <p className="font-mono text-[9px] sm:text-[10px] text-white/30">{personalInfo.companyPeriod}</p>
              </motion.div>
            </motion.div>

            {/* Social icons + Download Resume */}
            <motion.div
              className="flex items-center gap-2.5 mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="w-9 h-9 rounded-full border border-white/18 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 cursor-hover"
                title="Email"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Mail size={14} strokeWidth={1.5} />
              </motion.a>

              {socialLinks.find(s => s.name === 'GitHub') && (
                <motion.a
                  href={socialLinks.find(s => s.name === 'GitHub').url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/18 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 cursor-hover"
                  title="GitHub"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <GithubIcon size={14} strokeWidth={1.5} />
                </motion.a>
              )}

              {socialLinks.find(s => s.name === 'LinkedIn') && (
                <motion.a
                  href={socialLinks.find(s => s.name === 'LinkedIn').url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/18 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 cursor-hover"
                  title="LinkedIn"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <LinkedinIcon size={14} strokeWidth={1.5} />
                </motion.a>
              )}

              <motion.a
                href={personalInfo.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2 border border-white/18 rounded-full font-mono text-[10px] tracking-[0.15em] uppercase text-white/90 hover:border-white/40 hover:bg-white/[0.02] hover:text-white transition-all duration-300 cursor-hover ml-2"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Download size={12} strokeWidth={1.5} />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Status card badge */}
            <motion.div
              className="border border-white/18 rounded-md px-4 py-2 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 cursor-hover w-fit flex items-center gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7 }}
              whileHover={{ scale: 1.03, x: 5 }}
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] ${dotVisible ? 'opacity-100' : 'opacity-30'} transition-all duration-300`} />
              <p className="font-mono text-[10px] tracking-[0.15em] text-white/70 uppercase select-none">
                {personalInfo.statusText}
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Photo + Education below */}
          <motion.div
            className="flex flex-col mt-10 lg:mt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Photo with crosshair overlay */}
            <motion.div
              className="relative w-full aspect-[3/4] max-h-[350px] sm:max-h-[420px] lg:max-h-[480px] overflow-hidden border border-white/5 rounded-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient fade at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
            </motion.div>

            {/* Education info below image */}
            <div className="mt-4 flex gap-8 mb-10 lg:mb-0">
              <div>
                <p className="font-mono text-[8px] tracking-[0.25em] text-muted uppercase mb-1">EDUCATION</p>
                <p className="font-mono text-[11px] text-white/80">BTech CSE</p>
                <p className="font-mono text-[9px] text-muted">VIT Vellore · 2021-2025</p>
              </div>
              <div>
                <p className="font-mono text-[8px] tracking-[0.25em] text-muted uppercase mb-1">LOCATION</p>
                <p className="font-mono text-[11px] text-white/80">{personalInfo.locations.join(' · ')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
