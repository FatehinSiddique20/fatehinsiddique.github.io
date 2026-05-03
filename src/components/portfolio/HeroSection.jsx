import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, BarChart2, FileDown, Users, TrendingUp, Package, Star, Zap, Activity } from 'lucide-react';
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

// ── Canvas background ──────────────────────────────────────────────────────────
function DataUniverse() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w, h;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 110 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.1 + 0.2, a: Math.random() * 0.35 + 0.05,
    }));
    const nodes = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 2.2 + 1,
      color: ['#06b6d4', '#8b5cf6', '#3b82f6', '#10b981', '#f97316'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2,
    }));
    const streaks = Array.from({ length: 3 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() + 0.6) * 1.4, len: Math.random() * 70 + 40, t: 0, delay: Math.random() * 300,
    }));

    let t = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      t++;
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * (0.6 + 0.4 * Math.sin(t * 0.01 + s.r))})`; ctx.fill();
      });
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.03;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 155) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${(1 - dist / 155) * 0.1})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const p = 0.6 + 0.4 * Math.sin(n.pulse);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        g.addColorStop(0, n.color + '44'); g.addColorStop(1, n.color + '00');
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * p, 0, Math.PI * 2); ctx.fillStyle = n.color; ctx.fill();
      });
      streaks.forEach(s => {
        s.t++;
        if (s.t < s.delay) return;
        s.x += s.vx;
        const age = s.t - s.delay;
        const a = Math.min(1, age / 25) * Math.max(0, 1 - (age - 80) / 35) * 0.3;
        if (s.x > w + 100) { s.x = -s.len; s.y = Math.random() * h; s.t = 0; s.delay = Math.random() * 200; }
        const g = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
        g.addColorStop(0, 'rgba(6,182,212,0)'); g.addColorStop(1, `rgba(6,182,212,${a})`);
        ctx.beginPath(); ctx.moveTo(s.x - s.len, s.y); ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.stroke();
      });
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

// ── Cinematic shutter reveal ───────────────────────────────────────────────────
function CinematicShutter({ onDone }) {
  return (
    <motion.div className="fixed inset-0 z-[100] pointer-events-none flex">
      {[0, 1].map(i => (
        <motion.div
          key={i}
          className="flex-1 h-full"
          style={{ background: '#000', originY: i === 0 ? 0 : 1 }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={i === 1 ? onDone : undefined}
        />
      ))}
    </motion.div>
  );
}

// ── Rotating typing effect ─────────────────────────────────────────────────────
const TYPING_LINES = [
  {
    plain: 'Building ',
    parts: [
      { text: 'AI-driven decision systems', color: '#06b6d4' },
      { text: ' at ', color: null },
      { text: 'telecom scale', color: '#f97316' },
      { text: '.', color: null },
    ],
  },
  {
    plain: "Built the data architecture for ",
    parts: [
      { text: "Bangladesh's No. 1 OTT platform", gradient: true },
      { text: '.', color: null },
    ],
  },
];

function RotatingTyper() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  const currentLine = TYPING_LINES[lineIdx];
  const fullText = currentLine.plain + currentLine.parts.map(p => p.text).join('');

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setDeleting(true); setPaused(false); }, 1800);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (charCount < fullText.length) {
        const t = setTimeout(() => setCharCount(c => c + 1), 38);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (charCount > 0) {
        const t = setTimeout(() => setCharCount(c => c - 1), 18);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setLineIdx(l => (l + 1) % TYPING_LINES.length);
      }
    }
  }, [charCount, deleting, paused, fullText]);

  // Render colored spans up to charCount
  const renderColored = () => {
    let built = currentLine.plain.slice(0, Math.min(charCount, currentLine.plain.length));
    let remaining = Math.max(0, charCount - currentLine.plain.length);
    const spans = [<span key="plain" className="text-white/60">{built}</span>];
    for (let i = 0; i < currentLine.parts.length; i++) {
      const part = currentLine.parts[i];
      const take = Math.min(remaining, part.text.length);
      if (take <= 0) break;
      const text = part.text.slice(0, take);
      remaining -= take;
      if (part.gradient) {
        spans.push(
          <span key={i} style={{ background: 'linear-gradient(90deg,#06b6d4,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{text}</span>
        );
      } else if (part.color) {
        spans.push(<span key={i} style={{ color: part.color }}>{text}</span>);
      } else {
        spans.push(<span key={i} className="text-white/60">{text}</span>);
      }
    }
    return spans;
  };

  return (
    <div className="font-mono text-sm md:text-base leading-relaxed min-h-[1.8rem]">
      {renderColored()}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity }}
        className="inline-block w-0.5 h-[1em] bg-cyan-400 ml-0.5 align-middle"
      />
    </div>
  );
}

// ── Glitch text ────────────────────────────────────────────────────────────────
function GlitchText({ text, className, style }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const loop = () => { setGlitch(true); setTimeout(() => setGlitch(false), 160); setTimeout(loop, 4500 + Math.random() * 3000); };
    const t = setTimeout(loop, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <span className={`relative inline-block ${className}`} style={style}>
      {text}
      {glitch && (
        <>
          <span className="absolute inset-0" style={{ ...style, clipPath: 'inset(20% 0 55% 0)', transform: 'translateX(-3px)', opacity: 0.65 }} aria-hidden>{text}</span>
          <span className="absolute inset-0" style={{ ...style, clipPath: 'inset(65% 0 5% 0)', transform: 'translateX(3px)', opacity: 0.65 }} aria-hidden>{text}</span>
        </>
      )}
    </span>
  );
}

// ── Magnetic button ────────────────────────────────────────────────────────────
function MagneticButton({ children, className, style, href, onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.28, y: (e.clientY - rect.top - rect.height / 2) * 0.28 });
  };
  const Tag = href ? 'a' : 'button';
  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHovered(false); }} onMouseEnter={() => setHovered(true)}
      animate={{ x: pos.x, y: pos.y, scale: hovered ? 1.04 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
      <Tag href={href} onClick={onClick} className={className} style={style}>{children}</Tag>
    </motion.div>
  );
}

// ── Live card ──────────────────────────────────────────────────────────────────
function LiveImpactCard({ visible }) {
  const stats = [
    { label: 'Reports Generated', value: 'Real-time' },
    { label: 'Systems Automated', value: '4+' },
    { label: 'Data Scale', value: 'Millions/day' },
    { label: 'Platforms', value: '5+' },
  ];
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setCounts([1, 1, 1, 1]), 400);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 1.4, ease: EASING }}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-30 rounded-2xl p-4 w-48"
      style={{ background: 'rgba(5,10,30,0.82)', backdropFilter: 'blur(18px)', border: '1px solid rgba(6,182,212,0.22)', boxShadow: '0 0 30px rgba(6,182,212,0.1)' }}
    >
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="flex items-center gap-1.5 mb-3">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-widest uppercase">System Impact Snapshot</span>
        </div>
        {stats.map((s, i) => (
          <div key={i} className="mb-2 last:mb-0">
            <div className="text-[9px] text-white/30 font-mono">{s.label}</div>
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.8 + i * 0.15, duration: 0.4 }}
              className="text-xs font-mono font-bold text-white/85"
            >{s.value}</motion.div>
          </div>
        ))}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ['0 0 0px rgba(6,182,212,0)', '0 0 18px rgba(6,182,212,0.18)', '0 0 0px rgba(6,182,212,0)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Orbit rings + nodes ────────────────────────────────────────────────────────
function ImageOrbit({ size }) {
  const nodes = [
    { color: '#06b6d4', r: size * 0.57, angle: 30, s: 7, speed: 18 },
    { color: '#8b5cf6', r: size * 0.57, angle: 150, s: 5, speed: 18 },
    { color: '#10b981', r: size * 0.57, angle: 270, s: 6, speed: 18 },
    { color: '#f97316', r: size * 0.71, angle: 80, s: 4, speed: 28 },
    { color: '#3b82f6', r: size * 0.71, angle: 215, s: 5, speed: 28 },
  ];
  const cx = size * 0.8, cy = size * 0.8;
  return (
    <div className="absolute pointer-events-none" style={{ width: size * 1.6, height: size * 1.6, top: '50%', left: '50%', marginLeft: -cx, marginTop: -cy }}>
      <motion.div className="absolute rounded-full border" style={{ inset: '10%', borderColor: 'rgba(6,182,212,0.22)', borderWidth: 1 }}
        animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute rounded-full" style={{ inset: '2%', border: '1px dashed rgba(139,92,246,0.18)' }}
        animate={{ rotate: -360 }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }} />
      {nodes.map((n, i) => (
        <motion.div key={i} className="absolute" style={{ top: '50%', left: '50%' }}
          animate={{ rotate: 360 }} transition={{ duration: n.speed, repeat: Infinity, ease: 'linear' }}>
          <motion.div style={{
            width: n.s, height: n.s, borderRadius: '50%', background: n.color,
            boxShadow: `0 0 8px ${n.color}, 0 0 18px ${n.color}80`,
            transform: `translate(${Math.cos((n.angle * Math.PI) / 180) * n.r - n.s / 2}px, ${Math.sin((n.angle * Math.PI) / 180) * n.r - n.s / 2}px)`,
          }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
        </motion.div>
      ))}
    </div>
  );
}

// ── Metric cards row ───────────────────────────────────────────────────────────
const metrics = [
  { icon: Users, value: '40M+', title: 'Subscribers', subtitle: 'Massive scale. Real impact.', accent: '#06b6d4', sparkline: '0,28 10,22 20,26 30,14 40,18 50,8 60,12 70,4 80,8' },
  { icon: Package, value: '14%', title: 'Stock Outage Reduction', subtitle: 'Smarter forecasting. Fewer stockouts.', accent: '#f97316', sparkline: '0,28 15,20 30,24 45,12 60,16 75,8 80,10' },
  { icon: TrendingUp, value: '25%', title: 'MAU Growth', subtitle: 'Data-powered product growth.', accent: '#10b981', sparkline: '0,28 12,24 24,18 36,20 48,10 60,14 72,6 80,8' },
  { icon: Star, value: '50%', title: 'Creator Growth', subtitle: 'More creators. Stronger ecosystem.', accent: '#8b5cf6', sparkline: '0,28 10,26 20,20 30,22 40,12 50,16 60,8 70,10 80,6' },
];

function MetricCard({ icon: Icon, value, title, subtitle, accent, sparkline, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: EASING }} whileHover={{ scale: 1.04, y: -4 }}
      className="relative group cursor-default flex-1 min-w-[130px] rounded-2xl p-4 border overflow-hidden"
      style={{ background: `linear-gradient(135deg,rgba(0,0,0,0.6) 0%,${accent}10 100%)`, borderColor: `${accent}28`, backdropFilter: 'blur(16px)', boxShadow: `0 0 0 1px ${accent}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `inset 0 0 24px ${accent}12, 0 0 24px ${accent}18` }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
      <div className="flex items-start gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${accent}18`, border: `1px solid ${accent}28` }}>
          <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
        </div>
      </div>
      <div className="font-heading font-black text-2xl mb-0.5" style={{ color: accent }}>{value}</div>
      <div className="text-xs font-bold text-white/70 mb-0.5">{title}</div>
      <div className="text-[10px] text-white/35 leading-tight">{subtitle}</div>
      {sparkline && (
        <svg className="absolute bottom-0 right-0 w-20 h-8 opacity-35" viewBox="0 0 80 32" fill="none">
          <polyline points={sparkline} stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </motion.div>
  );
}



// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [shutterDone, setShutterDone] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  const rawImageY = useTransform(scrollY, [0, 700], [0, 70]);
  const rawTextY = useTransform(scrollY, [0, 700], [0, -35]);
  const imageOpacity = useTransform(scrollY, [0, 600], [1, 0.5]);
  const imageY = useSpring(rawImageY, { stiffness: 70, damping: 22 });
  const textY = useSpring(rawTextY, { stiffness: 70, damping: 22 });

  useEffect(() => { const t = setTimeout(() => setCardVisible(true), 1200); return () => clearTimeout(t); }, []);

  const gradStyle = {
    background: 'linear-gradient(135deg,#06b6d4 20%,#8b5cf6 60%,#f97316 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  };

  return (
    <>
      <CinematicShutter onDone={() => setShutterDone(true)} />
      <section
        id="home"
        ref={containerRef}
        className="relative h-screen flex flex-col justify-between overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 35% 40%,#020c22 0%,#010208 55%,#06001a 100%)' }}
      >
        <DataUniverse />

        {/* Gradient mesh */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <motion.div className="absolute top-[-15%] left-[25%] w-[700px] h-[700px] rounded-full blur-[160px]"
            style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.06) 0%,transparent 70%)' }}
            animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[130px]"
            style={{ background: 'radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)' }}
            animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.6) 1px,transparent 1px)', backgroundSize: '70px 70px' }} />
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 flex-1 flex items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 pb-4">
          <div className="flex flex-col lg:flex-row items-center w-full gap-8 lg:gap-4">

            {/* TEXT */}
            <motion.div style={{ y: textY }} className="w-full lg:w-[48%] flex flex-col items-start text-left z-20 order-2 lg:order-1">

              {/* Status */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={shutterDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: EASING }} className="flex flex-col gap-0.5 mb-6">
                <div className="flex items-center gap-2">
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
                  <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase">System Online</span>
                </div>
                <span className="text-[11px] font-mono text-white/30 ml-3.5">Data Command Center · Banglalink Digital</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={shutterDone ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: EASING }}
                className="font-heading font-black leading-[1.0] tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
              >
                <span className="block text-white">I build AI systems</span>
                <span className="block text-white">that replace</span>
                <span className="block">
                  <GlitchText text="decisions" className="font-heading font-black" style={gradStyle} />
                  <span className="text-white"> —</span>
                </span>
                <span className="block text-white/50 text-[0.72em]">not just dashboards.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={shutterDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.55, ease: EASING }}
                className="text-sm md:text-base text-white/50 leading-relaxed mb-4 max-w-md"
              >
                Data Science Manager at Banglalink, building AI, BI, and data systems powering decisions across a{' '}
                <span style={{ color: '#06b6d4' }}>40M+ subscriber</span> telecom ecosystem.
              </motion.p>

              {/* Rotating typer */}
              <motion.div initial={{ opacity: 0 }} animate={shutterDone ? { opacity: 1 } : {}}
                transition={{ delay: 0.85, duration: 0.6 }} className="mb-8">
                <RotatingTyper />
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={shutterDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 1.0, ease: EASING }} className="flex flex-row gap-3 mb-8 flex-wrap">
                <MagneticButton href="#contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-bold text-sm tracking-wide relative overflow-hidden group"
                  style={{ background: 'linear-gradient(135deg,#0891b2 0%,#1d4ed8 60%,#7c3aed 100%)', boxShadow: '0 0 24px rgba(6,182,212,0.35),0 0 50px rgba(6,182,212,0.1),inset 0 1px 0 rgba(255,255,255,0.15)', border: '1px solid rgba(6,182,212,0.5)' }}>
                  <Mail className="w-4 h-4" />Hire Me <span className="text-white/60">›</span>
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </MagneticButton>
                <MagneticButton href="#projects"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide relative overflow-hidden group"
                  style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }}>
                  <BarChart2 className="w-4 h-4" />View Projects
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(139,92,246,0.08)', boxShadow: '0 0 20px rgba(139,92,246,0.2)' }} />
                </MagneticButton>
              </motion.div>

              {/* Team row */}
              <motion.div initial={{ opacity: 0 }} animate={shutterDone ? { opacity: 1 } : {}}
                transition={{ delay: 1.4, duration: 0.8 }} className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['#06b6d4', '#8b5cf6', '#10b981', '#f97316'].map((c, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-black/60 flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ background: `linear-gradient(135deg,${c}88,${c}44)`, zIndex: 4 - i }}>
                      {['BI', 'PM', 'EG', '+'][i]}
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-white/35 font-mono">Collaborating with product, BI,<br />engineering &amp; business teams</span>
              </motion.div>
            </motion.div>

            {/* IMAGE */}
            <motion.div className="w-full lg:w-[52%] flex justify-center lg:justify-end relative order-1 lg:order-2"
              style={{ y: imageY, opacity: imageOpacity }}>
              <LiveImpactCard visible={cardVisible} />
              <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="w-[75%] h-[75%] blur-[100px] rounded-full"
                  style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.22) 0%,rgba(139,92,246,0.12) 50%,transparent 70%)' }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.88, filter: 'blur(16px)' }}
                animate={shutterDone ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 1.4, delay: 0.05, ease: EASING }} className="relative">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="relative">
                  <ImageOrbit size={420} />
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ borderRadius: '40% 60% 55% 45% / 48% 44% 56% 52%' }}
                    animate={{ boxShadow: ['0 0 50px rgba(6,182,212,0.25),0 0 100px rgba(139,92,246,0.12)', '0 0 80px rgba(6,182,212,0.5),0 0 160px rgba(139,92,246,0.22)', '0 0 50px rgba(6,182,212,0.25),0 0 100px rgba(139,92,246,0.12)'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
                  <motion.div className="relative overflow-hidden"
                    style={{ borderRadius: '40% 60% 55% 45% / 48% 44% 56% 52%', width: 'clamp(270px,38vw,480px)', height: 'clamp(310px,46vw,560px)', padding: '2px', background: 'linear-gradient(135deg,rgba(6,182,212,0.9),rgba(139,92,246,0.6),rgba(59,130,246,0.8))' }}
                    animate={{ background: ['linear-gradient(135deg,rgba(6,182,212,0.9),rgba(139,92,246,0.6),rgba(59,130,246,0.8))', 'linear-gradient(220deg,rgba(59,130,246,0.8),rgba(6,182,212,0.9),rgba(139,92,246,0.7))', 'linear-gradient(135deg,rgba(6,182,212,0.9),rgba(139,92,246,0.6),rgba(59,130,246,0.8))'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                    <div className="w-full h-full overflow-hidden" style={{ borderRadius: 'inherit', background: '#05091a' }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
                      <motion.img src={PHOTO_URL} alt="Fatehin Siddique Chowdhury"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EASING }}
                        style={{ filter: 'brightness(0.9) contrast(1.1) saturate(1.1)' }} />
                      <motion.div className="absolute inset-0 z-20 pointer-events-none"
                        style={{ background: 'linear-gradient(110deg,transparent 30%,rgba(6,182,212,0.07) 50%,transparent 70%)' }}
                        animate={{ x: ['-130%', '260%'] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 7, ease: 'easeInOut' }} />
                      {[['top-3 left-3', 'border-t border-l', 'border-cyan-400/50'], ['top-3 right-3', 'border-t border-r', 'border-cyan-400/50'], ['bottom-3 left-3', 'border-b border-l', 'border-violet-400/50'], ['bottom-3 right-3', 'border-b border-r', 'border-violet-400/50']].map(([pos, b, bc], i) => (
                        <div key={i} className={`absolute ${pos} z-30`}><div className={`w-5 h-5 ${b} ${bc}`} /></div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* METRIC CARDS */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-8">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 1.8, ease: EASING }}
            className="hidden md:block h-px mb-2" style={{ background: 'linear-gradient(90deg,transparent,rgba(6,182,212,0.15),rgba(139,92,246,0.15),rgba(16,185,129,0.15),transparent)' }} />
          <div className="hidden sm:flex flex-row gap-3">
            {metrics.map((m, i) => <MetricCard key={i} {...m} delay={1.9 + i * 0.12} />)}
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-white/10 relative overflow-hidden rounded-full">
            <motion.div className="absolute top-0 left-0 w-full rounded-full"
              style={{ background: 'linear-gradient(to bottom,#06b6d4,#8b5cf6)' }}
              animate={{ height: ['0%', '100%', '0%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
          <motion.p className="text-[9px] font-mono tracking-[0.25em] uppercase" style={{ color: '#06b6d4' }}
            animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}>
            Explore My Systems
          </motion.p>
          <motion.div className="w-2 h-2 rounded-full border border-cyan-400/60"
            animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ background: 'rgba(6,182,212,0.3)' }} />
        </motion.div>
      </section>
    </>
  );
}