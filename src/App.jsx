import { useState, useEffect } from 'react';
import LoadingScreen from './components/Layout/LoadingScreen';
import GsapCursor from './components/Layout/GsapCursor';
import ParticleBackground from './components/Layout/ParticleBackground';
import Navbar from './components/Layout/Navbar';
import BottomHud from './components/Layout/BottomHud';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Resume from './components/Sections/Resume';
import TechStack from './components/Sections/TechStack';
import Awards from './components/Sections/Awards';
import Portfolio from './components/Sections/Portfolio';
import Contact from './components/Sections/Contact';
import Footer from './components/Sections/Footer';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      <GsapCursor />
      <ParticleBackground />
      {isReady && <Navbar />}
      {isReady && <BottomHud />}

      <main className={`relative z-10 transition-opacity duration-500 pb-20 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <About />
        <Resume />
        <TechStack />
        {/* <Awards /> */}
        <Portfolio />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
