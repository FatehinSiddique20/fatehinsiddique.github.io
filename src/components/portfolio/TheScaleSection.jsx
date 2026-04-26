import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, useCountUp } from './useScrollReveal';

const EASING = [0.22, 1, 0.36, 1];

const scaleItems = [
  {
    value: 40, suffix: 'M+', label: 'Subscribers', sub: 'Banglalink ecosystem powered by AI analytics',
    color: '#06b6d4', glow: 'rgba(6,182,212,0.2)',
  },
  {
    value: 4, suffix: '+', label: 'AI Systems Built', sub: 'Chatbot, stock engine, personalization, fraud detection',
    color: '#8b5cf6', glow: 'rgba(139,92,246,0.2)',
  },
  {
    value: 5, suffix: '+', label: 'BI Platforms', sub: 'Looker, Mixpanel, GA4, MSTR, BigQuery',
    color: '#3b82f6', glow: 'rgba(59,130,246,0.2)',
  },
  {
    value: 3, suffix: '+', label: 'Years at Scale', sub: 'Building systems for 40M+ subscribers daily',
    color: '#f97316', glow: 'rgba(249,115,22,0.2)',
  },
];

const problems = [
  { icon: '⏳', title: 'BI Queues Taking Days', solution: 'Reduced to seconds with AI chatbot', color: '#ef4444' },
  { icon: '📦', title: 'Retailer Stock Runouts', solution: '14% reduction via predictive stock engine', color: '#f97316' },
  { icon: '📣', title: 'Generic Mass Campaigns', solution: 'Replaced with trigger-based hyper-personalization', color: '#8b5cf6' },
  { icon: '📉', title: 'Fragmented BI Reporting', solution: 'Unified across 5+ platforms into single truth', color: '#3b82f6' },
];

function ScaleCard({ item, index, isVisible }) {
  const count = useCountUp(item.value, 1800, isVisible);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.08 * index, ease: EASING }}
      className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-500 group cursor-default"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04)` }}
    >
      <div
        className="font-heading font-black text-4xl md:text-5xl mb-2 group-hover:scale-105 transition-transform duration-300"
        style={{ color: item.color, textShadow: `0 0 30px ${item.glow}` }}
      >
        {count}{item.suffix}
      </div>
      <p className="font-heading font-bold text-base text-foreground mb-1">{item.label}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.sub}</p>
    </motion.div>
  );
}

export default function TheScaleSection() {
  const [ref, isVisible] = useScrollReveal(0.08);

  return (
    <section id="scale" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        {/* The Scale */}
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
          {scaleItems.map((item, i) => (
            <ScaleCard key={i} item={item} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* The Problems I Solve */}
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
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.45 + i * 0.1, ease: EASING }}
              className="glass rounded-2xl p-6 flex items-start gap-4 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
              >
                {p.icon}
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-foreground/60 line-through mb-0.5">{p.title}</p>
                <p className="font-heading font-bold text-base text-foreground">{p.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}