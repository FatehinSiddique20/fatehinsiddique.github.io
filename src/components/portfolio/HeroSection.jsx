import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Coffee, FolderOpen, FileDown, ArrowDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { base44 } from '@/api/base44Client';

const PHOTO_URL = 'https://media.base44.com/images/public/69ecf4e8453eee0057e250fb/9c72b3a69_fatehindp.jpg';

const trustBadges = [
  '40M+ Subscriber Ecosystem',
  '14% Stock Runout Reduction',
  '25% MAU Growth',
  '50% Creator Participation Growth',
  '20+ Hours/Month Automation Saved',
];

function MagneticButton({ children, className, href, onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const Tag = href ? 'a' : 'button';
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Tag href={href} onClick={onClick} className={className}>{children}</Tag>
    </motion.div>
  );
}

const RESUME_URL = 'https://media.base44.com/files/public/69ecf4e8453eee0057e250fb/e392c0f28_Fatehin_Resume_2026.pdf';

function handleResumeDownload() {
  base44.analytics.track({ eventName: 'resume_download_click', properties: { source: 'hero' } });
  const a = document.createElement('a');
  a.href = RESUME_URL;
  a.download = 'Fatehin_Resume_2026.pdf';
  a.target = '_blank';
  a.click();
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 80]);
  const imageScale = useTransform(scrollY, [0, 600], [1, 1.05]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" ref={containerRef}>
      <ParticleBackground />

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#020817] via-[#030d1e] to-[#070012]" />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-blue-500/3 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0 min-h-screen flex items-center">
        <div className="flex flex-col-reverse lg:flex-row items-center w-full gap-8 lg:gap-0">

          {/* Text — 25% on desktop */}
          <motion.div
            style={{ y: textY }}
            className="w-full lg:w-[28%] flex flex-col items-center lg:items-start text-center lg:text-left z-20 py-8 lg:py-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Banglalink Digital · Dhaka
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="font-heading font-bold text-3xl sm:text-4xl leading-tight tracking-tight mb-4"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="block text-foreground"
              >Fatehin</motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="block text-foreground"
              >Siddique</motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="block text-gradient"
              >Chowdhury</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm md:text-base text-foreground/70 leading-relaxed mb-6"
            >
              Data Science Manager building AI-driven decision systems at telecom scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="flex flex-col gap-2.5 w-full mb-6"
            >
              <MagneticButton
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 w-full"
              >
                <Mail className="w-4 h-4" />
                Hire Me
              </MagneticButton>
              <MagneticButton
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass text-foreground/90 font-semibold text-sm hover:bg-muted/40 transition-all duration-300 w-full"
              >
                <FolderOpen className="w-4 h-4" />
                View Projects
              </MagneticButton>
              <MagneticButton
                onClick={handleResumeDownload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass text-foreground/90 font-semibold text-sm hover:bg-muted/40 transition-all duration-300 w-full cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-1.5"
            >
              {trustBadges.map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-1 rounded-md bg-muted/30 text-[10px] font-medium text-muted-foreground border border-border/40"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Image — 72% on desktop */}
          <motion.div
            className="w-full lg:w-[72%] flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ y: imageY, scale: imageScale }}
          >
            {/* Outer glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] bg-gradient-to-br from-cyan-500/15 via-violet-500/10 to-blue-500/15 blur-[80px] rounded-[60%_40%_70%_30%/40%_60%_30%_70%]" />
            </div>

            {/* Gradient border frame */}
            <div className="relative p-[2px] rounded-[40%_60%_70%_30%/40%_40%_60%_60%] lg:rounded-[38%_62%_60%_40%/45%_35%_65%_55%] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.6), rgba(139,92,246,0.4), rgba(59,130,246,0.5))',
                width: 'min(72vw, 620px)',
                height: 'min(80vh, 700px)',
              }}
            >
              {/* Inner container with image */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius: 'inherit',
                  background: 'linear-gradient(160deg, #0a0f1e 0%, #050816 100%)',
                }}
              >
                {/* Dark overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent z-10" />

                <img
                  src={PHOTO_URL}
                  alt="Fatehin Siddique Chowdhury"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.9) contrast(1.05) saturate(1.05)' }}
                />

                {/* Subtle animated shimmer */}
                <motion.div
                  className="absolute inset-0 z-20"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(6,182,212,0.04) 50%, transparent 60%)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 6, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}