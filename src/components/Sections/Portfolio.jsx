import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectCatalogModal from '../UI/ProjectCatalogModal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const featuredProject = {
  title: 'SaralBanking',
  subtitle: 'AI-Powered Doorstep Banking — Inclusive Financial Services at Scale',
  metadata: 'Final Year Project • Patented • 2023-24',
  badge: 'PATENTED - FINAL YEAR PROJECT',
  badgeColor: 'text-green-400 border-green-400/30',
  url: 'https://saralbank.vercel.app/',
  image: '/assets/images/images/work/Saral Banking.png',
  details: [
    { label: 'CONTEXT', text: 'Rural and semi-urban populations in India face significant barriers to accessing formal banking services. Branch visits are costly, time-consuming, and often inaccessible — leaving millions unbanked.' },
    { label: 'APPROACH', text: 'Built a full-stack AI-driven banking platform that dispatches banking agents to customer doorsteps. Integrated intelligent scheduling, biometric KYC flows, and real-time transaction processing.' },
    { label: 'SYSTEM', text: 'Developed using modern frontend and backend architectures with AI algorithms to optimize agent routing and secure authentication workflows across low-bandwidth environments.' },
    { label: 'OUTCOME', text: 'Secured a patent as inventor. Enables financial inclusion for underserved communities, reducing banking friction by 80%+ for rural users.' }
  ]
};

const smallProjects = [
  {
    title: 'Konnect Packaging',
    subtitle: 'Corporate Website for a Packaging Solutions Company',
    metadata: 'Client Project • 2024',
    badge: 'CLIENT DELIVERY',
    badgeColor: 'text-green-400 border-green-400/30',
    url: 'https://www.konnectpackaging.com/',
    image: '/assets/images/images/work/Konnect Packaging.png',
    details: [
      { label: 'CONTEXT', text: 'The client needed a professional, conversion-optimised web presence to showcase their packaging product range to B2B buyers across India.' },
      { label: 'APPROACH', text: 'Designed and built a fast, responsive corporate site with product galleries, inquiry forms, and SEO-optimised pages.' },
      { label: 'SYSTEM', text: 'React and custom CSS for a high-performance frontend focused on fast load times and clean UI.' }
    ]
  },
  {
    title: 'Market Minds',
    subtitle: 'Financial Research Platform — Stock Insights at Enterprise Scale',
    metadata: 'Client Project • 2024',
    badge: 'CLIENT DELIVERY',
    badgeColor: 'text-green-400 border-green-400/30',
    url: 'https://marketmindsresearch.com/',
    image: '/assets/images/images/work/MarketMinds.png',
    details: [
      { label: 'CONTEXT', text: 'Retail investors lacked a consolidated, professional platform for stock recommendations, research reports, and market analysis in one place.' },
      { label: 'APPROACH', text: 'Developed a full-featured financial research web platform with structured report sections, market insights dashboards, and subscription-gated content.' },
      { label: 'SYSTEM', text: 'Built a robust architecture using React and modern web standards, designed for professional readability and high engagement.' }
    ]
  },
  {
    title: 'BB Minerals & Metals',
    subtitle: 'B2B Corporate Website for a Ferro Alloys Manufacturer',
    metadata: 'Client Project • 2024',
    badge: 'CLIENT DELIVERY',
    badgeColor: 'text-green-400 border-green-400/30',
    url: 'https://www.bbmam.in/',
    image: '/assets/images/images/work/BB Metals .png',
    details: [
      { label: 'CONTEXT', text: 'A leading metals and ferro alloys manufacturer needed a modern digital presence to showcase their industrial products and manufacturing capabilities.' },
      { label: 'APPROACH', text: 'Built a high-performance corporate site with detailed product sections, company credentials, and contact inquiry flows tailored for industrial buyers.' },
      { label: 'SYSTEM', text: 'Utilized modern web technologies to ensure optimal performance, responsive design, and effective presentation.' }
    ]
  },
];

function SmallCard({ project, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col border border-white/[0.25] rounded-xl bg-transparent p-4 hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6 gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-serif text-white mb-2">{project.title}</h3>
          <p className="text-white/70 text-sm leading-relaxed mb-3">{project.subtitle}</p>
          <p className="text-white/40 text-[11px] font-mono tracking-wide">{project.metadata}</p>
        </div>
        <span className={`shrink-0 text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase border ${project.badgeColor} whitespace-nowrap`}>
          {project.badge}
        </span>
      </div>

      <div className="relative">
        <div className="flex flex-col gap-5 max-h-[140px] group-hover:max-h-[1000px] transition-[max-height] duration-700 ease-in-out overflow-hidden">
          {project.details.map((detail) => (
            <div key={detail.label} className="grid grid-cols-[80px_1fr] gap-4 items-start">
              <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase mt-0.5">{detail.label}</span>
              <p className="text-white/60 text-[13px] leading-relaxed">{detail.text}</p>
            </div>
          ))}
          
          {/* Hover Image */}
          <div className="w-full h-40 mt-4 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 bg-white/5">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
          
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 text-xs font-mono tracking-widest text-white/50 hover:text-white transition-colors uppercase w-max"
          >
            View Live <ArrowUpRight size={14} className="text-white/50 group-hover:text-white transition-colors" />
          </a>
        </div>
        
        {/* Fade Out Mask for unhovered state */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="portfolio" className="relative py-32 border-t border-white/[0.04]">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24">

        {/* Header Section */}
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.2em] text-neon uppercase mb-8">// FEATURED</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight">
              What the arc produced.
            </h2>
            <button
              onClick={() => setIsCatalogOpen(true)}
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-mono tracking-widest text-white uppercase transition-all duration-300 hover:border-white/30 w-max shrink-0"
            >
              View Catalog
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Big Featured Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="group relative border border-white/[0.25] rounded-xl bg-transparent p-8 md:p-4 mb-6 hover:border-white/20 transition-all duration-500 overflow-hidden"
        >
          <div className="flex justify-between items-start mb-10 gap-4 flex-wrap">
            <div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3">{featuredProject.title}</h3>
              <p className="text-white/70 text-base md:text-lg max-w-3xl mb-4 leading-relaxed">{featuredProject.subtitle}</p>
              <p className="text-white/40 text-sm font-mono tracking-wide">{featuredProject.metadata}</p>
            </div>
            <span className={`text-[10px] md:text-[11px] font-mono tracking-widest px-3 py-1.5 rounded-full uppercase border ${featuredProject.badgeColor}`}>
              {featuredProject.badge}
            </span>
          </div>

          <div className="relative mt-6">
            <div className="flex flex-col md:flex-row gap-8 max-h-[160px] group-hover:max-h-[1500px] transition-[max-height] duration-700 ease-in-out overflow-hidden">
              
              {/* Left side details */}
              <div className="flex-1 flex flex-col gap-6">
                {featuredProject.details.map((detail) => (
                  <div key={detail.label} className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-8 items-start">
                    <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-white/30 uppercase mt-1">{detail.label}</span>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed">{detail.text}</p>
                  </div>
                ))}

                <div className="mt-8 flex items-center gap-6 pb-6">
                  <a
                    href={featuredProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono tracking-widest text-white hover:text-white/70 transition-colors uppercase"
                  >
                    View Live <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Right side hover image */}
              <div className="hidden md:block w-80 lg:w-[400px] xl:w-[450px] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 self-start mt-2">
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                  <img src={featuredProject.image} alt={featuredProject.title} className="w-full h-full object-cover object-top" />
                </div>
              </div>

            </div>

            {/* Fade Out Mask for unhovered state */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
          </div>
        </motion.div>

        {/* 3 Smaller Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {smallProjects.map((p, i) => (
            <SmallCard key={p.title} project={p} index={i} />
          ))}
        </div>

      </div>

      <ProjectCatalogModal isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
    </section>
  );
}
