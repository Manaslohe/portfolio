import { motion } from 'framer-motion';
import { LinkedinIcon, InstagramIcon, TwitterIcon, GithubIcon } from '../UI/SocialIcons';
import { socialLinks } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const iconMap = { Linkedin: LinkedinIcon, Instagram: InstagramIcon, Twitter: TwitterIcon, Github: GithubIcon };

export default function Footer() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <footer className="relative py-16 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left — Name and copyright */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            <p className="font-mono text-sm text-white mb-1">MANAS LOHE</p>
            <p className="font-mono text-[10px] text-muted tracking-wider">
              © {new Date().getFullYear()} · BUILT WITH REACT & TAILWIND
            </p>
          </motion.div>

          {/* Right — Social links */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {socialLinks.map((s) => {
              const Icon = iconMap[s.icon] || GithubIcon;
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded border border-white/[0.06] flex items-center justify-center text-muted hover:text-neon hover:border-neon/20 transition-all duration-300"
                  title={s.name}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
