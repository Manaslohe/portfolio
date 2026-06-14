import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GsapCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    // Don't show cursor on touch devices or smaller viewports
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let mouseX = -100, mouseY = -100;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth follow with GSAP ticker
    const tick = () => {
      gsap.to(inner, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
      gsap.to(outer, { x: mouseX, y: mouseY, duration: 0.35, ease: 'power2.out' });
    };

    gsap.ticker.add(tick);
    window.addEventListener('mousemove', onMove);

    // Hover effects
    const onEnter = () => {
      gsap.to(outer, { scale: 2.2, borderColor: 'rgba(0,255,136,0.5)', duration: 0.3 });
      gsap.to(inner, { scale: 0, duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to(outer, { scale: 1, borderColor: 'rgba(255,255,255,0.15)', duration: 0.3 });
      gsap.to(inner, { scale: 1, duration: 0.2 });
    };

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, .cursor-hover').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // Delay so DOM is ready
    const t = setTimeout(addListeners, 1500);
    // Re-add on scroll (new elements may appear)
    const scrollHandler = () => { clearTimeout(t2); t2 = setTimeout(addListeners, 300); };
    let t2;
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Hide on leave, show on enter
    const onDocEnter = () => { gsap.to([outer, inner], { opacity: 1, duration: 0.2 }); };
    const onDocLeave = () => { gsap.to([outer, inner], { opacity: 0, duration: 0.2 }); };
    document.addEventListener('mouseenter', onDocEnter);
    document.addEventListener('mouseleave', onDocLeave);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('mouseenter', onDocEnter);
      document.removeEventListener('mouseleave', onDocLeave);
      clearTimeout(t);
    };
  }, []);

  // Hide on mobile / tablet width
  if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024)) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/15"
        style={{ willChange: 'transform' }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-neon"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
