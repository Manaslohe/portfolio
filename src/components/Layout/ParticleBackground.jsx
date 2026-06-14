import { useEffect, useRef } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    let container = null;

    const init = async () => {
      // 1. Initialize engine
      await loadSlim(tsParticles);

      if (!containerRef.current) return;

      // 2. Load particles directly into the referenced DOM element
      container = await tsParticles.load({
        id: 'tsparticles',
        element: containerRef.current,
        options: {
          fullScreen: { enable: true, zIndex: 1 },
          fpsLimit: 120,
          particles: {
            number: {
              value: 320,
              density: { enable: true, width: 1920, height: 1080 },
            },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: {
              value: { min: 0.15, max: 0.6 },
              animation: {
                enable: true,
                speed: 0.4,
                startValue: 'random',
                sync: false,
              },
            },
            size: {
              value: { min: 2.0, max: 3.8 },
              animation: {
                enable: true,
                speed: 0.5,
                startValue: 'random',
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: { min: 2.0, max: 3.5 },
              direction: 'bottom-right',
              random: true,
              straight: false,
              outModes: { default: 'out' },
              parallax: {
                enable: true,
                force: 40,
                smooth: 25,
              },
            },
            links: {
              enable: false,
            },
          },
          interactivity: {
            detectsOn: 'window',
            events: {
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              onClick: {
                enable: true,
                mode: 'push',
              },
            },
            modes: {
              repulse: {
                distance: 150,
                duration: 1.5,
              },
              push: {
                quantity: 4,
              },
            },
          },
          detectRetina: true,
          background: { color: 'transparent' },
        },
      });
    };

    init();

    return () => {
      if (container) {
        container.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="tsparticles"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
