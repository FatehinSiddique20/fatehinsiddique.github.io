import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

// ─── Particles ───────────────────────────────────────────────────────────────
const PARTICLE_COLORS = [
  'rgba(6,182,212,0.6)',
  'rgba(6,182,212,0.4)',
  'rgba(96,165,250,0.5)',
  'rgba(59,130,246,0.45)',
  'rgba(139,92,246,0.45)',
  'rgba(167,139,250,0.4)',
  'rgba(255,255,255,0.35)',
];

function useParticles(count) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3.5 + 1.2,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 4,
      dx: (Math.random() - 0.5) * 28,
      dy: (Math.random() - 0.5) * 28,
    }));
  }, [count]);
}

function Particles({ count, reducedMotion }) {
  const particles = useParticles(count);
  if (reducedMotion) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: 'inherit' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            willChange: 'transform, opacity',
          }}
          animate={{
            x: [0, p.dx, 0],
            y: [0, p.dy, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Orbit Rings ─────────────────────────────────────────────────────────────
function OrbitRings({ reducedMotion, hovered }) {
  const duration = hovered ? 10 : 16;
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 2 }}>
      <motion.svg
        viewBox="0 0 500 500"
        className="absolute w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Ring 1 — cyan, wide ellipse, clockwise */}
        <motion.ellipse
          cx="250" cy="250" rx="220" ry="96"
          fill="none"
          stroke="rgba(6,182,212,0.55)"
          strokeWidth="1.2"
          strokeDasharray="18 10"
          style={{ transform: 'rotateX(72deg)', transformOrigin: '250px 250px', transformStyle: 'preserve-3d' }}
          animate={reducedMotion ? {} : { rotate: [0, 360] }}
          transition={{ duration: duration, repeat: Infinity, ease: 'linear' }}
        />
        {/* Ring 2 — violet, counter-clockwise */}
        <motion.ellipse
          cx="250" cy="250" rx="196" ry="76"
          fill="none"
          stroke="rgba(139,92,246,0.42)"
          strokeWidth="1"
          strokeDasharray="28 14"
          style={{ transform: 'rotateX(68deg) rotateZ(30deg)', transformOrigin: '250px 250px', transformStyle: 'preserve-3d' }}
          animate={reducedMotion ? {} : { rotate: [0, -360] }}
          transition={{ duration: duration * 1.25, repeat: Infinity, ease: 'linear' }}
        />
        {/* Ring 3 — blue, medium */}
        <motion.ellipse
          cx="250" cy="250" rx="240" ry="60"
          fill="none"
          stroke="rgba(59,130,246,0.35)"
          strokeWidth="0.9"
          strokeDasharray="12 20"
          style={{ transform: 'rotateX(76deg) rotateZ(-18deg)', transformOrigin: '250px 250px', transformStyle: 'preserve-3d' }}
          animate={reducedMotion ? {} : { rotate: [0, 360] }}
          transition={{ duration: duration * 0.85, repeat: Infinity, ease: 'linear' }}
        />
        {/* Ring 4 — white glow, thin */}
        <motion.ellipse
          cx="250" cy="250" rx="168" ry="50"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.7"
          strokeDasharray="6 18"
          style={{ transform: 'rotateX(70deg) rotateZ(55deg)', transformOrigin: '250px 250px', transformStyle: 'preserve-3d' }}
          animate={reducedMotion ? {} : { rotate: [0, -360] }}
          transition={{ duration: duration * 1.6, repeat: Infinity, ease: 'linear' }}
        />
      </motion.svg>
    </div>
  );
}

// ─── Energy Nodes ─────────────────────────────────────────────────────────────
function EnergyNode({ position, color, glowColor, reducedMotion }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        ...position,
        width: 10,
        height: 10,
        background: color,
        boxShadow: `0 0 14px 4px ${glowColor}`,
        zIndex: 20,
        willChange: 'transform, opacity',
      }}
      animate={reducedMotion ? {} : {
        scale: [1, 1.6, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function InteractivePortraitHero({ imageSrc }) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mouse tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 18, mass: 0.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  const rotateX = useTransform(springY, [-1, 1], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-1, 1], ['-10deg', '10deg']);
  const translateX = useTransform(springX, [-1, 1], ['-14px', '14px']);
  const translateY = useTransform(springY, [-1, 1], ['-10px', '10px']);

  const handleMouseMove = (e) => {
    if (reducedMotion || isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) / (rect.width / 2));
    rawY.set((e.clientY - cy) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  // Breathing animation
  const breathingAnimation = reducedMotion ? {} : {
    y: [0, -8, 0, 8, 0],
    scale: [1, 1.018, 1.025, 1.018, 1],
    rotateZ: [0, 0.6, 0, -0.6, 0],
  };

  const breathingTransition = {
    duration: 6.5,
    repeat: Infinity,
    ease: 'easeInOut',
  };

  // Sizes
  const portraitW = isMobile ? 255 : 395;
  const portraitH = isMobile ? 295 : 475;
  const containerH = isMobile ? 410 : 560;
  const particleCount = isMobile ? 18 : 60;

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none"
      style={{
        width: portraitW + 120,
        height: containerH,
        perspective: '1200px',
        cursor: 'default',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      {/* Particle field */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Particles count={particleCount} reducedMotion={reducedMotion} />
      </div>

      {/* Background radial glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: portraitW * 1.6,
          height: portraitH * 1.5,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(6,182,212,0.26), rgba(139,92,246,0.14), transparent 68%)',
          filter: `blur(${isMobile ? 30 : 50}px)`,
          zIndex: 1,
        }}
      />

      {/* Secondary blue glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: portraitW * 1.2,
          height: portraitH * 1.1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(59,130,246,0.18), transparent 65%)',
          filter: 'blur(36px)',
          zIndex: 1,
        }}
      />

      {/* Orbit rings */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: portraitW * 1.5,
          height: portraitW * 1.5,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
        }}
      >
        <OrbitRings reducedMotion={reducedMotion} hovered={hovered} />
      </div>

      {/* Energy nodes */}
      <EnergyNode
        position={{ top: '12%', right: '14%' }}
        color="rgba(6,182,212,0.9)"
        glowColor="rgba(6,182,212,0.6)"
        reducedMotion={reducedMotion}
      />
      <EnergyNode
        position={{ bottom: '14%', left: '12%' }}
        color="rgba(139,92,246,0.9)"
        glowColor="rgba(139,92,246,0.6)"
        reducedMotion={reducedMotion}
      />

      {/* 3D portrait wrapper */}
      <motion.div
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          translateX: reducedMotion ? 0 : translateX,
          translateY: reducedMotion ? 0 : translateY,
          transformStyle: 'preserve-3d',
          zIndex: 10,
          willChange: 'transform',
        }}
      >
        {/* Blurred glow duplicate behind */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: portraitW,
            height: portraitH,
            borderRadius: '40% 60% 55% 45% / 48% 44% 56% 52%',
            background: 'linear-gradient(135deg, rgba(6,182,212,0.35), rgba(59,130,246,0.25), rgba(139,92,246,0.30))',
            filter: `blur(${isMobile ? 22 : 32}px)`,
            transform: 'translateZ(-40px) scale(1.08)',
            zIndex: -1,
          }}
        />

        {/* Translucent glow shell */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: portraitW,
            height: portraitH,
            borderRadius: '40% 60% 55% 45% / 48% 44% 56% 52%',
            background: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(139,92,246,0.14))',
            filter: 'blur(18px)',
            transform: 'translateZ(-20px) scale(1.04)',
            zIndex: -1,
          }}
        />

        {/* Breathing portrait */}
        <motion.div
          animate={breathingAnimation}
          transition={breathingTransition}
          whileHover={reducedMotion ? {} : { scale: 1.035 }}
          style={{ willChange: 'transform' }}
        >
          {/* Page-load reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, rotateY: -18, filter: 'blur(18px)' }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Gradient border wrapper */}
            <div
              style={{
                width: portraitW,
                height: portraitH,
                borderRadius: '40% 60% 55% 45% / 48% 44% 56% 52%',
                background: 'linear-gradient(135deg, rgba(6,182,212,0.9), rgba(59,130,246,0.45), rgba(139,92,246,0.75))',
                padding: '2.5px',
                boxShadow: hovered
                  ? '0 0 60px rgba(6,182,212,0.35), 0 0 120px rgba(139,92,246,0.18), 0 40px 80px rgba(0,0,0,0.7)'
                  : '0 0 40px rgba(6,182,212,0.22), 0 0 80px rgba(139,92,246,0.12), 0 30px 60px rgba(0,0,0,0.65)',
                transition: 'box-shadow 0.5s ease',
              }}
            >
              {/* Inner image container */}
              <div
                className="relative overflow-hidden w-full h-full"
                style={{
                  borderRadius: 'inherit',
                  background: '#05091a',
                }}
              >
                {/* The photo */}
                <img
                  src={imageSrc}
                  alt="Fatehin Siddique Chowdhury"
                  className="w-full h-full object-cover object-top"
                  style={{
                    filter: 'brightness(0.92) contrast(1.06) saturate(1.08)',
                    willChange: 'transform',
                  }}
                  width={portraitW}
                  height={portraitH}
                  draggable={false}
                />

                {/* Overlay: bottom cinematic fade */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 55%)', zIndex: 2 }}
                />

                {/* Overlay: edge vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 25%, transparent 42%, rgba(0,0,0,0.42) 100%)', zIndex: 3 }}
                />

                {/* Overlay: top-left glass reflection */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.24), transparent 35%)',
                    opacity: 0.28,
                    mixBlendMode: 'screen',
                    zIndex: 4,
                  }}
                />

                {/* Overlay: cool cyan rim light */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 78% 18%, rgba(6,182,212,0.24), transparent 30%)',
                    zIndex: 5,
                  }}
                />

                {/* Overlay: cursor-following highlight (static center fallback) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 30%, rgba(6,182,212,0.42), rgba(139,92,246,0.22), transparent 52%)',
                    opacity: hovered ? 0.55 : 0.25,
                    transition: 'opacity 0.4s ease',
                    zIndex: 6,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}