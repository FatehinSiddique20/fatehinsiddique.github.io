import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function FloatingResumeCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past hero (approx 100vh)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const RESUME_URL = 'https://media.base44.com/files/public/69ecf4e8453eee0057e250fb/e392c0f28_Fatehin_Resume_2026.pdf';

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
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
          onClick={handleClick}
          className="fixed bottom-8 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl glass-strong border border-cyan-500/20 text-sm font-semibold text-foreground shadow-2xl shadow-black/40 hover:shadow-cyan-500/20 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <FileDown className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline">Download Resume</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}