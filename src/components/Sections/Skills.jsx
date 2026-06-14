import { motion } from 'framer-motion';
import SectionHeading from '../UI/SectionHeading';
import { skills } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function Skills() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <SectionHeading tag="TECH STACK" title="Skills & Technologies" />

        <motion.div
          ref={ref}
          className="flex flex-wrap gap-2.5 mt-10"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              className="px-4 py-2 rounded border border-white/[0.06] font-mono text-xs tracking-wider text-dim hover:text-neon hover:border-neon/20 hover:bg-neon/[0.03] transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ scale: 1.04 }}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
