import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNext, onPrev }) {
  if (!isOpen) return null;
  const current = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-void/95 backdrop-blur-sm" onClick={onClose} />

          {/* Close */}
          <button onClick={onClose} className="absolute top-6 right-6 z-10 w-10 h-10 rounded border border-white/10 flex items-center justify-center text-muted hover:text-neon hover:border-neon/20 transition-all duration-300">
            <X size={16} />
          </button>

          {/* Nav */}
          {images.length > 1 && (
            <>
              <button onClick={onPrev} className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded border border-white/10 flex items-center justify-center text-muted hover:text-neon hover:border-neon/20 transition-all">
                <ChevronLeft size={16} />
              </button>
              <button onClick={onNext} className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded border border-white/10 flex items-center justify-center text-muted hover:text-neon hover:border-neon/20 transition-all">
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Image */}
          <motion.div className="relative z-10 max-w-[85vw] max-h-[85vh]" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
            <img src={current?.image} alt={current?.title} className="max-w-full max-h-[75vh] object-contain rounded" />
            <div className="mt-4 text-center">
              <p className="font-mono text-[10px] tracking-[0.15em] text-neon uppercase mb-1">{current?.description}</p>
              <h3 className="text-lg font-light text-white">{current?.fullTitle || current?.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
