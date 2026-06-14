import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/portfolioData';
import { useActiveSection } from '../../hooks/useScrollAnimation';

const sectionIds = navItems.map((i) => i.id);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop — full-width horizontal nav */}
      <motion.nav
        className="hidden lg:flex fixed top-0 left-0 right-0 z-50 items-center justify-center py-4 px-8 bg-void/60 backdrop-blur-md border-b border-white/[0.03]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="flex items-center gap-8 md:gap-14">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 cursor-hover py-1 ${isActive ? 'text-neon' : 'text-muted hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile */}
      <motion.button
        className="lg:hidden fixed right-5 top-5 z-[60] w-10 h-10 flex items-center justify-center cursor-hover"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {isMobileMenuOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
      </motion.button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-void/98"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col items-center gap-3">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`font-mono text-sm tracking-[0.2em] uppercase transition-all py-2 ${isActive ? 'text-neon' : 'text-muted hover:text-white'
                      }`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
