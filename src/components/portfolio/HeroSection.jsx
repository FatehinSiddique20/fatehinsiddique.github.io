import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, FolderOpen, FileDown, ArrowDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { base44 } from '@/api/base44Client';

const PHOTO_URL = 'https://media.base44.com/images/public/69ecf4e8453eee0057e250fb/9c72b3a69_fatehindp.jpg';
const EASING = [0.22, 1, 0.36, 1];

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
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.28, y: (e.clientY - cy) * 0.28 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  const Tag = href ? 'a' : 'button';
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      animate={{ x: pos.x, y: pos.y, scale: hovered ? 1.03 : 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
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

// Name words for staggered reveal
const nameWords = ['Fatehin', 'Siddique', 'Chowdhury'];

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const rawImageY = useTransform(scrollY, [0, 700], [0, 90]);
  const rawTextY = useTransform(scrollY, [0, 700], [0, -45]);
  const imageOpacity = useTransform(scrollY, [0, 500], [1, 0.6]);
  const imageScale = useTransform(scrollY, [0, 700], [1, 1.06]);

  const imageY = useSpring(rawImageY, { stiffness: 80, damping: 20 });
  const textY = useSpring(rawTextY, { stiffness: 80, damping: 20 });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" ref={containerRef}>
      <ParticleBackground />

      {/* Animated gradient mesh — multiple layers */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#020817] via-[#030d1e] to-[#070012]" />
        <motion.div
          className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[130px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-violet-500/6 rounded-full blur-[110px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-blue-500/4 rounded-full blur-[90px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0 min-h-screen flex items-center">
        <div className="flex flex-col-reverse lg:flex-row items-center w-full gap-8 lg:gap-0">

          {/* Text column */}
          <motion.div
            style={{ y: textY }}
            className="w-full lg:w-[28%] flex flex-col items-center lg:items-start text-center lg:text-left z-20 py-8 lg:py-0"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              Banglalink Digital · Dhaka
            </motion.div>

            {/* Name — staggered word reveal */}
            <h1 className="font-heading font-bold text-3xl sm:text-4xl leading-tight tracking-tight mb-4">
              {nameWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.75, delay: 0.4 + i * 0.12, ease: EASING }}
                  className={`block ${i === 2 ? 'text-gradient' : 'text-foreground'}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.82, ease: EASING }}
              className="text-sm md:text-base text-foreground/70 leading-relaxed mb-6"
            >
              Data Science Manager building AI-driven decision systems at telecom scale.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: EASING }}
              className="flex flex-col gap-2.5 w-full mb-6"
            >
              <MagneticButton
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300 w-full active:scale-[0.97]"
              >
                <Mail className="w-4 h-4" />
                Hire Me
              </MagneticButton>
              <MagneticButton
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass text-foreground/90 font-semibold text-sm hover:bg-muted/40 hover:shadow-md transition-all duration-300 w-full active:scale-[0.97]"
              >
                <FolderOpen className="w-4 h-4" />
                View Projects
              </MagneticButton>
              <MagneticButton
                onClick={handleResumeDownload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass text-foreground/90 font-semibold text-sm hover:bg-muted/40 hover:shadow-md transition-all duration-300 w-full cursor-pointer active:scale-[0.97]"
              >
                <FileDown className="w-4 h-4" />
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-1.5"
            >
              {trustBadges.map((badge, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.35 + i * 0.07, ease: EASING }}
                  className="inline-flex items-center px-2 py-1 rounded-md bg-muted/30 text-[10px] font-medium text-muted-foreground border border-border/40"
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Image column */}
          <motion.div
            className="w-full lg:w-[72%] flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.93, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.15, ease: EASING }}
            style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
          >
            {/* Outer ambient glow — slow breathing */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-[85%] h-[85%] bg-gradient-to-br from-cyan-500/20 via-violet-500/12 to-blue-500/16 blur-[90px] rounded-[60%_40%_70%_30%/40%_60%_30%_70%]"
                animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Floating subtle movement */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Gradient border frame */}
              <motion.div
                className="relative p-[2px] overflow-hidden"
                style={{
                  borderRadius: 'clamp(38%, 40%, 70%) / clamp(35%, 45%, 65%)',
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.7), rgba(139,92,246,0.45), rgba(59,130,246,0.6))',
                  width: 'min(72vw, 620px)',
                  height: 'min(80vh, 700px)',
                }}
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(6,182,212,0.7), rgba(139,92,246,0.45), rgba(59,130,246,0.6))',
                    'linear-gradient(200deg, rgba(59,130,246,0.6), rgba(6,182,212,0.7), rgba(139,92,246,0.5))',
                    'linear-gradient(135deg, rgba(6,182,212,0.7), rgba(139,92,246,0.45), rgba(59,130,246,0.6))',
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Inner container */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: 'inherit',
                    background: 'linear-gradient(160deg, #0a0f1e 0%, #050816 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent z-10" />

                  {/* Cinematic zoom-in on load */}
                  <motion.img
                    src={PHOTO_URL}
                    alt="Fatehin Siddique Chowdhury"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease: EASING }}
                    style={{ filter: 'brightness(0.9) contrast(1.05) saturate(1.05)' }}
                  />

                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 z-20"
                    style={{
                      background: 'linear-gradient(105deg, transparent 35%, rgba(6,182,212,0.05) 50%, transparent 65%)',
                    }}
                    animate={{ x: ['-100%', '220%'] }}
                    transition={{ duration: 5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}