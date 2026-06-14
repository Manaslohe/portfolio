import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function SectionHeading({ tag, title, subtitle, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div ref={ref} className={className}>
      <motion.p
        className="section-tag mb-6"
        initial={{ opacity: 0, y: 15 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        // {tag}
      </motion.p>
      {title && (
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-sans font-light leading-tight text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          className="text-base text-dim max-w-xl"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
