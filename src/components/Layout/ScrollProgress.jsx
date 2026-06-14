import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <div className="fixed top-0 right-0 z-50 w-[1px] h-full bg-white/[0.03]">
      <div
        className="w-full bg-neon/60 transition-[height] duration-75"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}
