import React, { useState, useEffect } from 'react';
import { ActivePage } from './types';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ResumePage } from './components/ResumePage';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  // Sync page with URL hash if present (#about or #home)
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#about') {
      return 'about';
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'about' || hash === 'home') {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      <Header activePage={activePage} onNavigate={handleNavigate} />

      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          {activePage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <HomePage onNavigate={handleNavigate} />
            </motion.div>
          ) : (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <ResumePage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
