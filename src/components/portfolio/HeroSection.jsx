import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, FolderOpen, FileDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { base44 } from '@/api/base44Client';

const PHOTO_URL = 'https://media.base44.com/images/public/69ecf4e8453eee0057e250fb/9c72b3a69_fatehindp.jpg';
const RESUME_URL = 'https://media.base44.com/files/public/69ecf4e8453eee0057e250fb/e392c0f28_Fatehin_Resume_2026.pdf';
const EASING = [0.22, 1, 0.36, 1];

function handleResumeDownload() {
  base44.analytics.track({ eventName: 'resume_download_click', properties: { source: 'hero' } });
  const a = document.createElement('a');
  a.href = RESUME_URL;
  a.download = 'Fatehin_Resume_2026.pdf';
  a.target = '_blank';
  a.click();
}

// ── Magnetic button ────────────────────────────────────────────────────────────
function MagneticButton({ children, className, href, onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 });
  };

  const Tag = href ? 'a' : 'button';
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      animate={{ x: pos.x, y: pos.y, scale: hovered ? 1.04 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      <Tag href={href} onClick={onClick} className={className}>{children}</Tag>
    </motion.div>
  );
}

// ── Typing effect ──────────────────────────────────────────────────────────────
function TypingText({ text, delay = 0, className }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 32);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

// ── Glitch text ────────────────────────────────────────────────────────────────
function GlitchText({ text, className }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const loop = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
      setTimeout(loop, 4000 + Math.random() * 3000);
    };
    const t = setTimeout(loop, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className="relative z-10"
        style={glitching ? {
          textShadow: '2px 0 #06b6d4, -2px 0 #8b5cf6',
          transform: `translateX(${Math.random() > 0.5 ? 2 : -2}px)`,
        } : {}}
      >
        {text}
      </span>
      {glitching && (
        <>
          <span className="absolute inset-0 text-cyan-400/60" style={{ clipPath: 'inset(30% 0 40% 0)', transform: 'translateX(-3px)' }} aria-hidden>{text}</span>
          <span className="absolute inset-0 text-violet-400/60" style={{ clipPath: 'inset(60% 0 10% 0)', transform: 'translateX(3px)' }} aria-hidden>{text}</span>
        </>
      )}
    </span>
  );
}

// ── Floating data card ─────────────────────────────────────────────────────────
function FloatingDataCard({ value, label, color, delay, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASING }}
      className="absolute group cursor-default"
      style={style}
    >
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 0.5, -0.5, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08, zIndex: 50 }}
        className="relative px-3 py-2 rounded-xl border text-center min-w-[90px]"
        style={{
          background: `rgba(0,0,0,0.5)`,
          backdropFilter: 'blur(12px)',
          borderColor: `${color}40`,
          boxShadow: `0 0 12px ${color}20, inset 0 0 12px ${color}05`,
        }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `0 0 20px ${color}50, 0 0 40px ${color}20` }}
        />
        <p className="font-heading font-black text-sm" style={{ color }}>{value}</p>
        <p className="text-[9px] text-white/40 font-medium leading-tight mt-0.5">{label}</p>
      </motion.div>
    </motion.div>
  );
}

// ── Orbiting ring ──────────────────────────────────────────────────────────────
function OrbitRing({ size, duration, color, dashed = false, opacity = 0.5 }) {
  return (
    <motion.div
      className="absolute rounded-full border pointer-events-none"
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderStyle: dashed ? 'dashed' : 'solid',
        borderWidth: 1,
        opacity,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    />
  );
}

// ── Orbiting node ──────────────────────────────────────────────────────────────
function OrbitNode({ radius, duration, color, startAngle = 0, size = 6 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: '50%', left: '50%' }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: color,
          boxShadow: `0 0 8px ${color}, 0 0 16px ${color}80`,
          top: -radius,
          left: -size / 2,
          transform: `rotate(${startAngle}deg)`,
          transformOrigin: `${size / 2}px ${radius}px`,
        }}
      />
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const rawImageY = useTransform(scrollY, [0, 700], [0, 80]);
  const rawTextY = useTransform(scrollY, [0, 700], [0, -40]);
  const imageOpacity = useTransform(scrollY, [0, 600], [1, 0.5]);

  const imageY = useSpring(rawImageY, { stiffness: 70, damping: 20 });
  const textY = useSpring(rawTextY, { stiffness: 70, damping: 20 });

  // Scroll progress for fill line indicator
  const { scrollYProgress } = useScroll({ target: containerRef });
  const lineHeight = useTransform(scrollYProgress, [0, 0.3], ['0%', '100%']);

  const dataCards = [
    { value: '40M+', label: 'Subscribers', color: '#06b6d4', delay: 1.6, style: { top: '8%', right: '2%' } },
    { value: '25%', label: 'MAU Growth', color: '#3b82f6', delay: 1.75, style: { top: '30%', right: '-3%' } },
    { value: '14%', label: 'Runout Cut', color: '#10b981', delay: 1.9, style: { bottom: '30%', right: '0%' } },
    { value: '50%', label: 'Creator Growth', color: '#8b5cf6', delay: 2.05, style: { bottom: '10%', right: '4%' } },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 30% 40%, #020c1f 0%, #010208 60%, #040010 100%)' }}
    >
      {/* Three.js particle field */}
      <ParticleBackground />

      {/* Deep gradient layers */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div
          className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[15%] w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          className="absolute top-[40%] left-[-5%] w-[350px] h-[350px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center py-24 lg:py-0">
        <div className="flex flex-col-reverse lg:flex-row items-center w-full gap-12 lg:gap-0">

          {/* ── TEXT COLUMN ─────────────────────────────────────────────── */}
          <motion.div
            style={{ y: textY }}
            className="w-full lg:w-[42%] flex flex-col items-center lg:items-start text-center lg:text-left z-20"
          >
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-mono font-medium text-cyan-300/80 border border-cyan-500/20"
              style={{ background: 'rgba(6,182,212,0.06)', backdropFilter: 'blur(10px)' }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>SYSTEM ONLINE</span>
              <span className="text-white/30">·</span>
              <span className="text-white/50">Banglalink Digital · Dhaka</span>
            </motion.div>

            {/* Name */}
            <h1 className="font-heading font-black leading-[0.95] tracking-tight mb-5" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              {['Fatehin', 'Siddique'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.14, ease: EASING }}
                  className="block text-white"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.58, ease: EASING }}
                className="block"
              >
                <GlitchText
                  text="Chowdhury"
                  className="font-heading font-black"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                />
              </motion.span>
            </h1>

            {/* Role tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASING }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="text-xs font-mono text-cyan-500/60 uppercase tracking-widest">Data Science Manager</span>
            </motion.div>

            {/* Typing subtitle */}
            <div className="text-sm md:text-base text-white/55 leading-relaxed mb-2 font-mono min-h-[1.5rem]">
              <TypingText
                text="Building AI-driven decision systems at telecom scale."
                delay={1.1}
                className="text-white/60"
              />
            </div>
            <div className="text-sm md:text-base text-white/40 leading-relaxed mb-8 font-mono min-h-[1.5rem]">
              <TypingText
                text="Architected Bangladesh's #1 OTT data infrastructure."
                delay={2.8}
                className="text-cyan-400/50"
              />
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: EASING }}
              className="flex flex-col gap-3 w-full max-w-xs mb-8"
            >
              {/* Primary — Hire Me */}
              <MagneticButton
                href="#contact"
                className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm overflow-hidden group w-full"
                style={{
                  background: 'linear-gradient(135deg, #0891b2, #1d4ed8)',
                  boxShadow: '0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.1), inset 0 1px 0 rgba(255,255,255,0.15)',
                  border: '1px solid rgba(6,182,212,0.5)',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 30px rgba(6,182,212,0.5), inset 0 0 20px rgba(6,182,212,0.1)' }} />
                <Mail className="w-4 h-4 relative z-10" />
                <span className="relative z-10 tracking-wide">HIRE ME</span>
              </MagneticButton>

              {/* Secondary — View Projects */}
              <MagneticButton
                href="#projects"
                className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm w-full group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(139,92,246,0.08)', boxShadow: '0 0 20px rgba(139,92,246,0.2)' }} />
                <FolderOpen className="w-4 h-4 relative z-10" />
                <span className="relative z-10">View Projects</span>
              </MagneticButton>

              {/* Tertiary — Resume */}
              <MagneticButton
                onClick={handleResumeDownload}
                className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm w-full cursor-pointer group"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(249,115,22,0.06)', boxShadow: '0 0 16px rgba(249,115,22,0.15)' }} />
                <FileDown className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Download Resume</span>
              </MagneticButton>
            </motion.div>

            {/* Signal dots row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1 }}
              className="flex items-center gap-2"
            >
              {['#06b6d4', '#8b5cf6', '#10b981', '#f97316'].map((color, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: color }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
              <span className="text-[10px] font-mono text-white/20 ml-1">LIVE · 40M SUBSCRIBERS</span>
            </motion.div>
          </motion.div>

          {/* ── IMAGE COLUMN ─────────────────────────────────────────────── */}
          <motion.div
            className="w-full lg:w-[58%] flex justify-center lg:justify-end relative"
            style={{ y: imageY, opacity: imageOpacity }}
          >
            {/* Floating data cards */}
            {dataCards.map((card, i) => (
              <FloatingDataCard key={i} {...card} />
            ))}

            {/* Outer ambient glow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="w-[70%] h-[70%] blur-[100px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(139,92,246,0.10) 50%, transparent 70%)' }}
              />
            </motion.div>

            {/* Floating wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASING }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Orbiting rings */}
                <div
                  className="absolute pointer-events-none"
                  style={{ inset: '-40px' }}
                >
                  <OrbitRing size="100%" duration={18} color="rgba(6,182,212,0.3)" opacity={0.5} />
                  <OrbitRing size="85%" duration={24} color="rgba(139,92,246,0.25)" dashed opacity={0.4} />
                  <OrbitRing size="115%" duration={32} color="rgba(59,130,246,0.15)" opacity={0.3} />

                  {/* Orbiting data nodes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <OrbitNode radius={140} duration={12} color="#06b6d4" startAngle={0} size={7} />
                    <OrbitNode radius={140} duration={12} color="#8b5cf6" startAngle={120} size={5} />
                    <OrbitNode radius={140} duration={12} color="#10b981" startAngle={240} size={6} />
                    <OrbitNode radius={170} duration={20} color="#f97316" startAngle={60} size={4} />
                    <OrbitNode radius={170} duration={20} color="#3b82f6" startAngle={200} size={5} />
                  </div>
                </div>

                {/* Glow pulse */}
                <motion.div
                  className="absolute inset-0 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 40px rgba(6,182,212,0.2), 0 0 80px rgba(139,92,246,0.1)',
                      '0 0 70px rgba(6,182,212,0.4), 0 0 120px rgba(139,92,246,0.2)',
                      '0 0 40px rgba(6,182,212,0.2), 0 0 80px rgba(139,92,246,0.1)',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Asymmetric image frame */}
                <motion.div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%',
                    width: 'clamp(280px, 42vw, 520px)',
                    height: 'clamp(320px, 50vw, 620px)',
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.8), rgba(139,92,246,0.5), rgba(59,130,246,0.7))',
                  }}
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(6,182,212,0.8), rgba(139,92,246,0.5), rgba(59,130,246,0.7))',
                      'linear-gradient(225deg, rgba(59,130,246,0.7), rgba(6,182,212,0.8), rgba(139,92,246,0.6))',
                      'linear-gradient(135deg, rgba(6,182,212,0.8), rgba(139,92,246,0.5), rgba(59,130,246,0.7))',
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div
                    className="relative w-full h-full overflow-hidden"
                    style={{
                      borderRadius: 'inherit',
                      background: 'linear-gradient(160deg, #080f22 0%, #04081a 100%)',
                    }}
                  >
                    {/* Edge fades */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />

                    {/* Photo */}
                    <motion.img
                      src={PHOTO_URL}
                      alt="Fatehin Siddique Chowdhury"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2.2, ease: EASING }}
                      style={{ filter: 'brightness(0.92) contrast(1.08) saturate(1.1)' }}
                    />

                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{ background: 'linear-gradient(110deg, transparent 30%, rgba(6,182,212,0.07) 50%, transparent 70%)' }}
                      animate={{ x: ['-120%', '240%'] }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
                    />

                    {/* Corner HUD elements */}
                    <div className="absolute top-4 left-4 z-30 flex flex-col gap-1">
                      {[1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="h-px bg-cyan-400/40"
                          style={{ width: i === 1 ? 24 : 14 }}
                          animate={{ opacity: [0.4, 1, 0.4], scaleX: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        />
                      ))}
                    </div>
                    <div className="absolute bottom-4 right-4 z-30">
                      <motion.div
                        className="w-4 h-4 border-b border-r border-cyan-400/40"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        {/* Fill line */}
        <div className="w-px h-12 bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{ height: lineHeight, background: 'linear-gradient(to bottom, #06b6d4, #8b5cf6)' }}
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{ background: 'linear-gradient(to bottom, #06b6d4, #8b5cf6)', opacity: 0.3 }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <motion.p
          className="text-[9px] font-mono tracking-[0.2em] text-white/25 uppercase"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Explore My Systems
        </motion.p>
        {/* Pulse dot */}
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}