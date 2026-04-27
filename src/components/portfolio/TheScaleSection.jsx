import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, useCountUp } from './useScrollReveal';

const EASING = [0.22, 1, 0.36, 1];

const scaleItems = [
  {
    value: 40, suffix: 'M+', label: '40M+ Subscriber Ecosystem',
    sub: 'AI & BI systems influencing real-time telecom decisions at national scale.',
    color: '#06b6d4', glow: 'rgba(6,182,212,0.25)',
  },
  {
    value: 4, suffix: '+', label: '4 Production AI Systems',
    sub: 'Chatbot, stock engine, personalization, fraud detection.',
    color: '#8b5cf6', glow: 'rgba(139,92,246,0.25)',
  },
  {
    value: 5, suffix: '+', label: '5+ Data Platforms Unified',
    sub: 'Looker, Mixpanel, GA4, MSTR, BigQuery, Teradata.',
    color: '#3b82f6', glow: 'rgba(59,130,246,0.25)',
  },
  {
    value: null, suffix: null, label: 'Real-Time Decision Systems',
    sub: 'Replacing manual reporting with automated intelligence.',
    color: '#f97316', glow: 'rgba(249,115,22,0.25)', staticValue: '⚡',
  },
];

const problems = [
  { icon: '⏳', title: 'Slow Decision-Making Due to BI Bottlenecks', solution: 'Reduced from days to seconds', color: '#ef4444' },
  { icon: '📦', title: 'Revenue Loss from Retail Stock Shortages', solution: 'Reduced by 14% via predictive engine', color: '#f97316' },
  { icon: '📣', title: 'Low-Impact Mass Campaigns', solution: 'Replaced with hyper-personalization at subscriber level', color: '#8b5cf6' },
  { icon: '📉', title: 'Disconnected Data Across Systems', solution: 'Unified into a single source of truth', color: '#3b82f6' },
];

function ScaleCard({ item, index, isVisible }) {
  const count = useCountUp(item.value ?? 0, 1800, isVisible);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.08 * index, ease: EASING }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-400 group cursor-default relative overflow-hidden"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04)` }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `inset 0 0 30px ${item.glow}, 0 0 30px ${item.glow}` }}
      />
      <div
        className="font-heading font-black text-4xl md:text-5xl mb-2 group-hover:scale-105 transition-transform duration-300"
        style={{ color: item.color, textShadow: `0 0 30px ${item.glow}` }}
      >
        {item.staticValue ?? (count + item.suffix)}
      </div>
      <p className="font-heading font-bold text-base text-foreground mb-1">{item.label}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.sub}</p>
    </motion.div>
  );
}

function ProblemCard({ p, i, isVisible }) {
  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.45 + i * 0.1, ease: EASING }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-400 group relative overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `inset 0 0 20px ${p.color}12`, background: `radial-gradient(circle at 0% 50%, ${p.color}06, transparent 60%)` }} />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
      >
        {p.icon}
      </div>
      <div>
        {/* Strike-through old state */}
        <motion.p
          initial={{ opacity: 0.6 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="font-heading font-bold text-sm text-foreground/40 line-through mb-1 decoration-red-400/60"
        >
          {p.title}
        </motion.p>
        {/* Reveal new state */}
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
          className="font-heading font-bold text-base text-foreground"
          style={{ color: p.color }}
        >
          → {p.solution}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function TheScaleSection() {
  const [ref, isVisible] = useScrollReveal(0.08);
  return (
    <section id="scale" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Operating Scale</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-3">
            Intelligence at <span className="text-gradient">Telecom Scale</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Not a sandbox project. Production AI and BI systems serving tens of millions of subscribers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {scaleItems.map((item, i) => <ScaleCard key={i} item={item} index={i} isVisible={isVisible} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EASING }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Value Delivered</span>
          <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-tight">
            The Problems I <span className="text-gradient">Solve</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((p, i) => <ProblemCard key={i} p={p} i={i} isVisible={isVisible} />)}
        </div>
      </div>
    </section>
  );
}