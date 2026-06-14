import { useRef } from 'react';
import { useScroll, motion } from 'framer-motion';
import {
  SiReact, SiJavascript, SiTailwindcss, SiPython, SiMongodb, SiFirebase,
  SiGithub, SiFigma, SiNodedotjs, SiCplusplus, SiHtml5, SiCss,
  SiWondersharefilmora, SiTypescript, SiGnubash,  SiApachekafka, SiSelenium, SiSwagger,
  SiLangchain,  SiOllama, SiDocker, SiKubernetes, SiGithubactions, SiAngular, SiNgrx, SiSpringboot
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { TbSql } from 'react-icons/tb';
import { 
  FaNetworkWired, FaCubes, FaBolt, FaShieldAlt, FaWeightHanging,
  FaDatabase, FaServer, FaLayerGroup,FaArrowsAlt, FaAws, FaPuzzlePiece, FaJava
} from 'react-icons/fa';

const categories = [
  {
    name: 'LANGUAGES',
    colorClass: 'text-purple-400',
    items: [
      { icon: FaJava, label: 'Java', sub: 'Backend', color: '#5382a1' },
      { icon: SiPython, label: 'Python', sub: 'Async', color: '#3776AB' },
      { icon: SiTypescript, label: 'TypeScript', sub: 'Superset', color: '#3178C6' },
      { icon: SiJavascript, label: 'JavaScript', sub: 'ES6+', color: '#F7DF1E' },
      { icon: SiCplusplus, label: 'C / C++', sub: 'DSA', color: '#00599C' },
      { icon: TbSql, label: 'SQL', sub: 'PostgreSQL', color: '#00758F' },
      { icon: SiGnubash, label: 'Bash', sub: 'Scripting', color: '#4EAA25' },
      { icon: SiHtml5, label: 'HTML5', sub: 'Semantic', color: '#E34F26' },
      { icon: SiCss, label: 'CSS3', sub: 'Layouts', color: '#1572B6' },
    ],
  },
   {
    name: 'FRONTEND & UI',
    colorClass: 'text-rose-400',
    items: [
      { icon: SiReact, label: 'React', sub: 'Web Apps', color: '#61DAFB' },
      { icon: SiAngular, label: 'Angular', sub: 'Framework', color: '#DD0031' },
      { icon: SiNgrx, label: 'NgRx', sub: 'State', color: '#BA2BD2' },
      { icon: FaPuzzlePiece, label: 'MicroFrontend', sub: 'Arch', color: '#ffffff' },
      { icon: SiTailwindcss, label: 'Tailwind', sub: 'Utility CSS', color: '#06B6D4' },
      { icon: SiNodedotjs, label: 'Node.js', sub: 'Runtime', color: '#339933' },
      { icon: SiFigma, label: 'Figma', sub: 'Design', color: '#F24E1E' },
      { icon: SiWondersharefilmora, label: 'Filmora', sub: 'Video', color: '#00C4B4' },
    ],
  },
  {
    name: 'BACKEND & SYSTEMS',
    colorClass: 'text-emerald-400',
    items: [
      { icon: SiSpringboot, label: 'Spring Boot', sub: 'Framework', color: '#6DB33F' },
      { icon: FaDatabase, label: 'DB Design', sub: 'SQL/NoSQL', color: '#336791' },
      { icon: SiMongodb, label: 'MongoDB', sub: 'NoSQL', color: '#47A248' },
      { icon: SiFirebase, label: 'Firebase', sub: 'BaaS', color: '#FFCA28' },
      { icon: FaNetworkWired, label: 'Distributed', sub: 'Systems', color: '#61DAFB' },
      { icon: FaCubes, label: 'Microservices', sub: 'Arch', color: '#06B6D4' },
      { icon: SiSwagger, label: 'REST/OpenAPI', sub: 'APIs', color: '#85EA2D' },
      { icon: SiApachekafka, label: 'Event-driven', sub: 'Kafka/PubSub', color: '#ffffff' },
      { icon: FaBolt, label: 'Concurrency', sub: 'Performance', color: '#FFCA28' },
      { icon: FaShieldAlt, label: 'Fault Tolerance', sub: 'Resilience', color: '#ffffff' },
      { icon: SiSelenium, label: 'Browser Auto', sub: 'Selenium', color: '#43B02A' },
      { icon: FaWeightHanging, label: 'Load Testing', sub: 'Locust', color: '#ffffff' },
    ],
  },
  {
    name: 'AI / ML SYSTEMS',
    colorClass: 'text-yellow-400',
    items: [
      { icon: FaServer, label: 'On-prem AI', sub: 'Local', color: '#ffffff' },
      { icon: FaLayerGroup, label: 'RAG', sub: 'Retrieval', color: '#ffffff' },
      { icon: SiLangchain, label: 'Agentic', sub: 'LangChain', color: '#ffffff' },
      { icon: SiOllama, label: 'Ollama', sub: 'Local LLMs', color: '#ffffff' },
    ],
  },
  {
    name: 'CLOUD & DEVOPS',
    colorClass: 'text-cyan-400',
    items: [
      { icon: VscAzure, label: 'Azure', sub: 'Res Graph', color: '#0089D6' },
      { icon: FaAws, label: 'AWS', sub: 'Working', color: '#FF9900' },
      { icon: SiDocker, label: 'Docker', sub: 'Containers', color: '#2496ED' },
      { icon: SiKubernetes, label: 'Kubernetes', sub: 'Orchestration', color: '#326CE5' },
      { icon: FaArrowsAlt, label: 'Autoscaling', sub: 'Scale', color: '#ffffff' },
      { icon: SiGithubactions, label: 'CI/CD', sub: 'Automation', color: '#2088FF' },
      { icon: SiGithub, label: 'GitHub', sub: 'Git VCS', color: '#ffffff' },
    ],
  },
];

function TechItem({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      className="flex flex-col items-center text-center gap-2 group"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      {/* Icon with scaling effect on hover, no border/box background */}
      <div className="w-12 h-12 flex items-center justify-center select-none">
        <Icon size={30} style={{ color: item.color }} className="group-hover:scale-115 transition-transform duration-300" />
      </div>
      
      {/* Label and description */}
      <div className="flex flex-col items-center">
        <p className="text-[11px] sm:text-[12px] text-white font-medium leading-tight group-hover:text-white transition-colors duration-300">
          {item.label}
        </p>
        <p className="text-[9px] text-white/40 font-mono mt-0.5 select-none">
          ({item.sub})
        </p>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative py-28 md:py-36 border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">
          
          {/* STICKY LEFT COLUMN */}
          <div className="lg:sticky lg:top-32 flex flex-col items-start select-none">
            <div className="flex items-center gap-2 mb-4">
            <span className="text-neon mr-2 ">//</span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-neon uppercase">
                STACK
              </span>
            </div>            
            <h2 className="font-serif text-5xl sm:text-6xl font-bold leading-[1.1] text-white tracking-tight">
              What I run in<br />production.
            </h2>
            
            <p className="text-[11px] font-mono text-white/50 mt-4">
              Profiled under load. Not just imported.
            </p>
          </div>

          {/* RIGHT COLUMN — CATEGORIZED LIST */}
          <div className="flex flex-col mt-8 lg:mt-0">
            {categories.map((cat, catIdx) => (
              <div 
                key={cat.name} 
                className="py-10 first:pt-0 border-t first:border-t-0 border-white/5 grid md:grid-cols-[160px_1fr] gap-6 items-start"
              >
                {/* Category Label */}
                <motion.span 
                  className={`font-mono text-[10px] sm:text-[11px] tracking-[0.2em] font-semibold uppercase md:pt-4 ${cat.colorClass} select-none`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  {cat.name}
                </motion.span>

                {/* Items Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
                  {cat.items.map((item, i) => (
                    <TechItem 
                      key={item.label} 
                      item={item} 
                      index={i + catIdx * cat.items.length} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
