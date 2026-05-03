import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const RESUME_URL = 'https://media.base44.com/files/public/69ecf4e8453eee0057e250fb/e392c0f28_Fatehin_Resume_2026.pdf';

export default function FloatingResumeCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY / document.documentElement.scrollHeight;
          setVisible(scrolled > 0.15 && scrolled < 0.88);
          ticking = false;
        });
        ticking = true;
      }
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
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.25 }}
          onClick={handleClick}
          aria-label="Download Resume"
          title="Download Resume"
          className="fixed bottom-6 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center border border-cyan-500/25 shadow-lg hover:border-cyan-500/50 transition-colors duration-200 focus:outline-none"
          style={{ background: 'rgba(5,15,40,0.9)' }}
        >
          <FileDown className="w-4 h-4 text-cyan-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}