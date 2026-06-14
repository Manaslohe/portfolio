import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { githubProjects } from '../../data/portfolioData';

export default function ProjectCatalogModal({ isOpen, onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-dark-950/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl h-full max-h-[85vh] flex flex-col bg-dark-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 bg-dark-900/50 backdrop-blur-md z-10">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Project Catalog</h2>
                <p className="text-sm font-mono text-neon/70 tracking-widest uppercase mt-1">Full GitHub Archive</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubProjects.map((project, idx) => {
                  const repoName = project.repo !== '#' ? project.repo.split('/').pop() : '';
                  const previewImage = project.image || (repoName ? `https://opengraph.githubassets.com/1/Manaslohe/${repoName}` : '');
                  
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group relative flex flex-col rounded-lg border border-white/[0.06] bg-dark-800/30 hover:border-neon/20 hover:bg-neon/[0.02] transition-all duration-300 overflow-hidden shadow-sm"
                    >
                      {/* Image Preview */}
                      <div className="relative w-full h-40 bg-dark-950 border-b border-white/[0.06] overflow-hidden">
                        {previewImage ? (
                          <img 
                            src={previewImage} 
                            alt={`${project.name} preview`} 
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-white/10 group-hover:text-neon/20 transition-colors">
                            <SiGithub size={32} className="mb-2" />
                            <span className="font-mono text-xs uppercase tracking-widest">No Preview</span>
                          </div>
                        )}
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                      </div>

                      <div className="flex-1 p-6 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2 text-neon">
                             <span className="font-mono text-xs font-semibold tracking-wider">{project.language || 'Code'}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            {project.repo !== '#' && (
                              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors z-10 relative">
                                <SiGithub size={18} />
                              </a>
                            )}
                            {project.url !== '#' && (
                              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-neon transition-colors z-10 relative">
                                <ArrowUpRight size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-medium text-white mb-2 group-hover:text-neon transition-colors">{project.name}</h3>
                        <p className="text-sm text-dim leading-relaxed mb-6 line-clamp-3">
                          {project.description || 'No description provided.'}
                        </p>

                        {(project.url !== '#' || project.repo !== '#') && (
                          <a 
                            href={project.url !== '#' ? project.url : project.repo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/60 hover:text-neon transition-colors mt-auto w-max z-10 relative"
                          >
                            {project.url !== '#' ? 'View Live Site' : 'View Repository'} <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
