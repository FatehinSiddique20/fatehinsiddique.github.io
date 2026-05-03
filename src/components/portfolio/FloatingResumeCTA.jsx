import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const RESUME_URL = 'https://media.base44.com/files/public/69ecf4e8453eee0057e250fb/e392c0f28_Fatehin_Resume_2026.pdf';

export default function FloatingResumeCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show only after scrolling well past the hero+scale transition (>200vh)
      setVisible(window.scrollY > window.innerHeight * 2.2);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    base44.analytics.track({ eventName: 'resume_download_click', properties: { source: 'floating_cta' } });
    const a = document.createElement('a');
    a.href = RESUME_URL;
    a.download = 'Fatehin_Resume_2026.pdf';
    a.target = '_blank';
    a.click();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 22 }}
          onClick={handleClick}
          aria-label="Download Resume"
          title="Download Resume"
          className="fixed bottom-6 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center glass-strong border border-cyan-500/25 shadow-xl shadow-black/40 hover:shadow-cyan-500/20 hover:border-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          style={{ background: 'rgba(5,15,40,0.85)' }}
        >
          <FileDown className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}