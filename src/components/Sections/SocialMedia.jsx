import { motion } from 'framer-motion';
import { LinkedinIcon, InstagramIcon, TwitterIcon, GithubIcon } from '../UI/SocialIcons';
import SectionHeading from '../UI/SectionHeading';
import { socialLinks } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const iconMap = {
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  Github: GithubIcon,
};

export default function SocialMedia() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-32 md:py-40 pb-40 md:pb-52">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading tag="GET IN TOUCH" title="Social-Media" />

        <motion.p
          className="text-base text-gray-muted mb-10 -mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Ping me on my handles to get connected now
        </motion.p>

        <div ref={ref} className="flex flex-wrap gap-4">
          {socialLinks.map((social, i) => {
            const Icon = iconMap[social.icon] || GithubIcon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-gray-muted hover:text-accent-gold hover:border-accent-gold/30 hover:bg-accent-gold/5 transition-all duration-400 group glow-border"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                title={social.name}
              >
                <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
              </motion.a>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-gray-muted/60">
            © {new Date().getFullYear()} Manas Lohe. Built with React & Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
