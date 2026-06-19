import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BootScreen } from './components/BootScreen';
import { Desktop } from './components/Desktop';

function App() {
  const [booted, setBooted] = useState(false);

  // Cursor spotlight effect for wallpaper-macos
  useEffect(() => {
    if (!booted) return;
    
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [booted]);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootScreen onComplete={handleBootComplete} />}
      </AnimatePresence>
      {booted && <Desktop />}
    </>
  );
}

export default App;
