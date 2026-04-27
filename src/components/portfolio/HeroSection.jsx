import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, BarChart2, FileDown, Users, TrendingUp, Package, Star, Zap } from 'lucide-react';
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

// ── Canvas: Star field + network particles ─────────────────────────────────────
function DataUniverse() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.4 + 0.05,
    }));

    // Data nodes
    const nodes = Array.from({ length: 38 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2.5 + 1,
      color: ['#06b6d4', '#8b5cf6', '#3b82f6', '#10b981', '#f97316'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2,
    }));

    // Streaks
    const streaks = Array.from({ length: 4 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() + 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 0.3,
      len: Math.random() * 80 + 40,
      a: 0,
      delay: Math.random() * 300,
      t: 0,
    }));

    let t = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      t++;
      ctx.clearRect(0, 0, w, h);

      // Stars
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * (0.6 + 0.4 * Math.sin(t * 0.01 + s.r))})`;
        ctx.fill();
      });

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = (1 - dist / 160) * 0.12;
            ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach(n => {
        const pulse = 0.6 + 0.4 * Math.sin(n.pulse);
        // outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        grd.addColorStop(0, n.color + '55');
        grd.addColorStop(1, n.color + '00');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        // core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      });

      // Streaks
      streaks.forEach(s => {
        s.t++;
        if (s.t < s.delay) return;
        s.x += s.vx;
        s.a = Math.min(1, (s.t - s.delay) / 30) * Math.max(0, 1 - (s.t - s.delay - 80) / 40);
        if (s.x > w + 100) {
          s.x = -s.len;
          s.y = Math.random() * h;
          s.t = 0;
          s.delay = Math.random() * 200;
        }
        const grd = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
        grd.addColorStop(0, `rgba(6,182,212,0)`);
        grd.addColorStop(1, `rgba(6,182,212,${s.a * 0.35})`);
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

// ── Glitch text ────────────────────────────────────────────────────────────────
function GlitchText({ text, className }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const loop = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
      setTimeout(loop, 4000 + Math.random() * 3000);
    };
    const t = setTimeout(loop, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className={`relative inline-block ${className}`} style={{
      background: 'linear-gradient(135deg, #06b6d4 20%, #8b5cf6 60%, #f97316 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {text}
      {glitch && (
        <>
          <span className="absolute inset-0" style={{
            background: 'linear-gradient(135deg,#06b6d4 20%,#8b5cf6 60%,#f97316 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            clipPath: 'inset(20% 0 55% 0)', transform: 'translateX(-3px)', opacity: 0.7,
          }} aria-hidden>{text}</span>
          <span className="absolute inset-0" style={{
            background: 'linear-gradient(135deg,#06b6d4 20%,#8b5cf6 60%,#f97316 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            clipPath: 'inset(65% 0 5% 0)', transform: 'translateX(3px)', opacity: 0.7,
          }} aria-hidden>{text}</span>
        </>
      )}
    </span>
  );
}

// ── Typing effect ──────────────────────────────────────────────────────────────
function TypingText({ lines, className }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const currentLine = lines[lineIdx];
    if (!currentLine) { setDone(true); return; }
    if (charIdx < currentLine.text.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 28);
      return () => clearTimeout(t);
    } else if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 500);
      return () => clearTimeout(t);
    } else {
      setDone(true);
    }
  }, [charIdx, lineIdx, done, lines]);

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="flex items-start gap-2">
          {line.icon && <span className="mt-0.5 flex-shrink-0" style={{ color: line.color || '#9ca3af' }}>{line.icon}</span>}
          <span style={{ color: line.color || 'rgba(255,255,255,0.6)' }}>
            {i < lineIdx ? line.text : i === lineIdx ? line.text.slice(0, charIdx) : ''}
            {i === lineIdx && !done && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 align-middle"
              />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Magnetic button ────────────────────────────────────────────────────────────
function MagneticButton({ children, className, style, href, onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.28, y: (e.clientY - cy) * 0.28 });
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
      <Tag href={href} onClick={onClick} className={className} style={style}>{children}</Tag>
    </motion.div>
  );
}

// ── Metric card ────────────────────────────────────────────────────────────────
function MetricCard({ icon: Icon, value, title, subtitle, color, accent, delay, sparkline }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: EASING }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="relative group cursor-default flex-1 min-w-[140px] rounded-2xl p-4 border overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, ${accent}10 100%)`,
        borderColor: `${accent}30`,
        backdropFilter: 'blur(16px)',
        boxShadow: `0 0 0 1px ${accent}15, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `inset 0 0 30px ${accent}15, 0 0 30px ${accent}20` }}
      />
      {/* Top connector dot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border" style={{ background: accent, borderColor: accent + '80' }} />

      <div className="flex items-start gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
      </div>
      <div className="font-heading font-black text-2xl mb-0.5" style={{ color }}>{value}</div>
      <div className="text-xs font-bold text-white/70 mb-0.5">{title}</div>
      <div className="text-[10px] text-white/35 leading-tight">{subtitle}</div>

      {/* Sparkline */}
      {sparkline && (
        <svg className="absolute bottom-0 right-0 w-20 h-8 opacity-40" viewBox="0 0 80 32" fill="none">
          <polyline points={sparkline} stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </motion.div>
  );
}

// ── Live feed panel ────────────────────────────────────────────────────────────
function LiveFeedPanel({ isVisible }) {
  const stats = [
    { label: 'Events Processed', value: '8.24M / sec' },
    { label: 'Data Points', value: '231.7M' },
    { label: 'Active Systems', value: '24' },
    { label: 'Models Running', value: '12' },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => setTick(v => v + 1), 1800);
    return () => clearInterval(t);
  }, [isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 1.8, ease: EASING }}
      className="absolute right-0 top-1/2 -translate-y-1/2 rounded-xl border p-3 w-44 z-30"
      style={{
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(16px)',
        borderColor: 'rgba(6,182,212,0.2)',
        boxShadow: '0 0 20px rgba(6,182,212,0.1)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-widest uppercase">Live Feed</span>
      </div>
      {stats.map((s, i) => (
        <div key={i} className="mb-2 last:mb-0">
          <div className="text-[9px] text-white/30 font-mono">{s.label}</div>
          <motion.div
            key={tick + i}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="text-xs font-mono font-bold text-white/80"
          >
            {s.value}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

// ── Orbit rings + nodes around image ──────────────────────────────────────────
function ImageOrbit({ size }) {
  const nodes = [
    { angle: 30, r: size * 0.58, color: '#06b6d4', s: 7, speed: 18 },
    { angle: 150, r: size * 0.58, color: '#8b5cf6', s: 5, speed: 18 },
    { angle: 270, r: size * 0.58, color: '#10b981', s: 6, speed: 18 },
    { angle: 80, r: size * 0.72, color: '#f97316', s: 4, speed: 28 },
    { angle: 220, r: size * 0.72, color: '#3b82f6', s: 5, speed: 28 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translate(-50%,-50%)', left: '50%', top: '50%', width: size * 1.6, height: size * 1.6, marginLeft: -(size * 0.8), marginTop: -(size * 0.8) }}>
      {/* Ring 1 */}
      <motion.div
        className="absolute rounded-full border"
        style={{ inset: '10%', borderColor: 'rgba(6,182,212,0.25)', borderWidth: 1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      {/* Ring 2 dashed */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '2%',
          border: '1px dashed rgba(139,92,246,0.2)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      {/* Orbiting nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: '50%', left: '50%', marginTop: -n.s / 2, marginLeft: -n.s / 2 }}
          animate={{ rotate: 360 }}
          transition={{ duration: n.speed, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            style={{
              width: n.s, height: n.s,
              borderRadius: '50%',
              background: n.color,
              boxShadow: `0 0 8px ${n.color}, 0 0 20px ${n.color}80`,
              transform: `translate(${Math.cos((n.angle * Math.PI) / 180) * n.r}px, ${Math.sin((n.angle * Math.PI) / 180) * n.r}px)`,
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [showLiveFeed, setShowLiveFeed] = useState(false);

  const rawImageY = useTransform(scrollY, [0, 700], [0, 70]);
  const rawTextY = useTransform(scrollY, [0, 700], [0, -35]);
  const imageOpacity = useTransform(scrollY, [0, 600], [1, 0.5]);
  const imageY = useSpring(rawImageY, { stiffness: 70, damping: 22 });
  const textY = useSpring(rawTextY, { stiffness: 70, damping: 22 });

  useEffect(() => {
    const t = setTimeout(() => setShowLiveFeed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const metrics = [
    { icon: Users, value: '40M+', title: 'Subscribers', subtitle: 'Massive scale. Real impact.', color: '#06b6d4', accent: '#06b6d4', delay: 2.0, sparkline: '0,28 10,22 20,26 30,14 40,18 50,8 60,12 70,4 80,8' },
    { icon: Package, value: '14%', title: 'Stock Outage Reduction', subtitle: 'Smarter forecasting. Fewer stockouts.', color: '#f97316', accent: '#f97316', delay: 2.15, sparkline: '0,28 15,20 30,24 45,12 60,16 75,8 80,10' },
    { icon: TrendingUp, value: '25%', title: 'MAU Growth', subtitle: 'Data-powered product growth.', color: '#10b981', accent: '#10b981', delay: 2.3, sparkline: '0,28 12,24 24,18 36,20 48,10 60,14 72,6 80,8' },
    { icon: Star, value: '50%', title: 'Creator Growth', subtitle: 'More creators. Stronger ecosystem.', color: '#8b5cf6', accent: '#8b5cf6', delay: 2.45, sparkline: '0,28 10,26 20,20 30,22 40,12 50,16 60,8 70,10 80,6' },
  ];

  const typingLines = [
    { text: 'Building AI-driven decision systems at telecom scale.', color: 'rgba(255,255,255,0.65)' },
  ];
  const typingLines2 = [
    {
      text: 'Built the data architecture for Bangladesh\'s No. 1 OTT',
      color: '#06b6d4',
      icon: <Zap className="w-3.5 h-3.5" />,
    },
  ];

  // Connecting line positions between metric cards (horizontal connector)
  const connectorDots = ['#06b6d4', '#f97316', '#10b981', '#8b5cf6'];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 35% 40%, #020c22 0%, #010208 55%, #06001a 100%)' }}
    >
      {/* Animated canvas background */}
      <DataUniverse />

      {/* Gradient mesh layers */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div
          className="absolute top-[-15%] left-[25%] w-[700px] h-[700px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.14, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[5%] w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.6) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />
      </div>

      {/* ── MAIN HERO CONTENT ─────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-8">
        <div className="flex flex-col lg:flex-row items-center w-full gap-8 lg:gap-4">

          {/* TEXT COLUMN */}
          <motion.div
            style={{ y: textY }}
            className="w-full lg:w-[48%] flex flex-col items-start text-left z-20 order-2 lg:order-1"
          >
            {/* System online badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
              className="flex flex-col gap-0.5 mb-6"
            >
              <div className="flex items-center gap-2">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase">System Online</span>
              </div>
              <span className="text-[11px] font-mono text-white/30 ml-3.5">Data Command Center</span>
            </motion.div>

            {/* Name */}
            <h1 className="font-heading font-black leading-[0.9] tracking-tight mb-5" style={{ fontSize: 'clamp(3.2rem, 5.5vw, 5.5rem)' }}>
              {['Fatehin', 'Siddique'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.85, delay: 0.25 + i * 0.13, ease: EASING }}
                  className="block text-white"
                >
                  {word}
                </motion.span>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.51, ease: EASING }}
              >
                <GlitchText text="Chowdhury" className="font-heading font-black block" />
              </motion.div>
            </h1>

            {/* Typing subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="mb-1"
            >
              <TypingText
                lines={typingLines}
                className="text-base md:text-lg font-mono leading-relaxed text-white/60"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex items-center gap-1.5 mb-8 text-sm font-mono"
            >
              <TypingText
                lines={typingLines2}
                className="text-cyan-400/70"
              />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05, ease: EASING }}
              className="flex flex-row gap-3 mb-8 flex-wrap"
            >
              {/* Primary */}
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-bold text-sm tracking-wide group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0891b2 0%, #1d4ed8 60%, #7c3aed 100%)',
                  boxShadow: '0 0 24px rgba(6,182,212,0.35), 0 0 50px rgba(6,182,212,0.12), inset 0 1px 0 rgba(255,255,255,0.15)',
                  border: '1px solid rgba(6,182,212,0.5)',
                }}
              >
                <Mail className="w-4 h-4" />
                Hire Me
                <span className="text-white/60">›</span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.span
                  className="absolute inset-0 rounded-xl"
                  animate={{ boxShadow: ['0 0 0px rgba(6,182,212,0)', '0 0 30px rgba(6,182,212,0.5)', '0 0 0px rgba(6,182,212,0)'] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                />
              </MagneticButton>

              {/* Secondary */}
              <MagneticButton
                href="#projects"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide relative overflow-hidden group"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                <BarChart2 className="w-4 h-4" />
                View Projects
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(139,92,246,0.08)', boxShadow: '0 0 20px rgba(139,92,246,0.2)' }} />
              </MagneticButton>
            </motion.div>

            {/* Team collab row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {['#06b6d4', '#8b5cf6', '#10b981', '#f97316'].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-black/60 flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${c}88, ${c}44)`, zIndex: 4 - i }}
                  >
                    {['BI', 'PM', 'EG', '+'][i]}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-white/35 font-mono">Collaborating with product, BI,<br />engineering &amp; business teams</span>
            </motion.div>
          </motion.div>

          {/* IMAGE COLUMN */}
          <motion.div
            className="w-full lg:w-[52%] flex justify-center lg:justify-end relative order-1 lg:order-2"
            style={{ y: imageY, opacity: imageOpacity }}
          >
            {/* Live feed panel (right side) */}
            <LiveFeedPanel isVisible={showLiveFeed} />

            {/* Ambient glow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="w-[75%] h-[75%] blur-[100px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.22) 0%, rgba(139,92,246,0.12) 50%, transparent 70%)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(16px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, delay: 0.2, ease: EASING }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Orbit system */}
                <ImageOrbit size={420} />

                {/* Glow pulse frame */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ borderRadius: '40% 60% 55% 45% / 48% 44% 56% 52%' }}
                  animate={{
                    boxShadow: [
                      '0 0 50px rgba(6,182,212,0.25), 0 0 100px rgba(139,92,246,0.12)',
                      '0 0 80px rgba(6,182,212,0.5), 0 0 160px rgba(139,92,246,0.22)',
                      '0 0 50px rgba(6,182,212,0.25), 0 0 100px rgba(139,92,246,0.12)',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Organic image frame */}
                <motion.div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: '40% 60% 55% 45% / 48% 44% 56% 52%',
                    width: 'clamp(280px, 40vw, 500px)',
                    height: 'clamp(320px, 48vw, 580px)',
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.9) 0%, rgba(139,92,246,0.6) 50%, rgba(59,130,246,0.8) 100%)',
                  }}
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(6,182,212,0.9), rgba(139,92,246,0.6), rgba(59,130,246,0.8))',
                      'linear-gradient(220deg, rgba(59,130,246,0.8), rgba(6,182,212,0.9), rgba(139,92,246,0.7))',
                      'linear-gradient(135deg, rgba(6,182,212,0.9), rgba(139,92,246,0.6), rgba(59,130,246,0.8))',
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div
                    className="w-full h-full overflow-hidden"
                    style={{ borderRadius: 'inherit', background: '#05091a' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
                    <motion.img
                      src={PHOTO_URL}
                      alt="Fatehin Siddique Chowdhury"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2.4, ease: EASING }}
                      style={{ filter: 'brightness(0.9) contrast(1.1) saturate(1.1)' }}
                    />
                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{ background: 'linear-gradient(110deg, transparent 30%, rgba(6,182,212,0.08) 50%, transparent 70%)' }}
                      animate={{ x: ['-130%', '260%'] }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 7, ease: 'easeInOut' }}
                    />
                    {/* HUD corner accents */}
                    <div className="absolute top-3 left-3 z-30">
                      <div className="w-5 h-5 border-t border-l border-cyan-400/50" />
                    </div>
                    <div className="absolute top-3 right-3 z-30">
                      <div className="w-5 h-5 border-t border-r border-cyan-400/50" />
                    </div>
                    <div className="absolute bottom-3 left-3 z-30">
                      <div className="w-5 h-5 border-b border-l border-violet-400/50" />
                    </div>
                    <div className="absolute bottom-3 right-3 z-30">
                      <div className="w-5 h-5 border-b border-r border-violet-400/50" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── METRIC CARDS ROW ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-16">
        {/* Horizontal connector line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 2.0, ease: EASING }}
          className="hidden md:flex items-center justify-center mb-1 px-8"
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.15), rgba(139,92,246,0.15), rgba(16,185,129,0.15), rgba(139,92,246,0.15), transparent)' }} />
        </motion.div>
        {/* Connector dots */}
        <div className="hidden md:flex justify-around mb-0 px-16">
          {connectorDots.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2.0 + i * 0.12, ease: EASING }}
              className="w-2 h-2 rounded-full"
              style={{ background: c, boxShadow: `0 0 8px ${c}` }}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>
      </div>

      {/* ── SCROLL INDICATOR ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{ background: 'linear-gradient(to bottom, #06b6d4, #8b5cf6)' }}
            animate={{ height: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <motion.p
          className="text-[9px] font-mono tracking-[0.25em] uppercase"
          style={{ color: '#06b6d4' }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Explore My Systems
        </motion.p>
        <motion.div
          className="w-2 h-2 rounded-full border border-cyan-400/60"
          animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ background: 'rgba(6,182,212,0.3)' }}
        />
      </motion.div>
    </section>
  );
}