import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, useCountUp } from './useScrollReveal';

const EASING = [0.22, 1, 0.36, 1];

const metrics = [
  { value: 40, suffix: 'M+', label: 'Subscriber Ecosystem', sub: 'Data systems built for Banglalink', color: '#06b6d4' },
  { value: 14, suffix: '%', label: 'Stock Runout Reduced', sub: 'Via retail predictive engine', color: '#10b981' },
  { value: 25, suffix: '%', label: 'MAU Growth', sub: 'Cohort analytics & churn modeling', color: '#3b82f6' },
  { value: 50, suffix: '%', label: 'Creator Growth', sub: 'UGC analytics & payout automation', color: '#8b5cf6' },
  { value: 20, suffix: '+', label: 'Hours Saved / Month', sub: 'Through pipeline automation', color: '#f97316' },
  { value: 43, suffix: '%', label: 'Support Ticket Reduction', sub: 'Sentiment model on 10K+ reviews', color: '#ec4899' },
];

function MetricCard({ metric, index, isVisible }) {
  const count = useCountUp(metric.value, 2000, isVisible);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.08 * index, ease: EASING }}
      className="group glass rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 cursor-default overflow-hidden relative"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${metric.color}12, transparent 65%)` }}
      />
      <div
        className="font-heading font-black text-4xl md:text-5xl mb-2 group-hover:scale-105 transition-transform duration-300"
        style={{ color: metric.color }}
      >
        {count}{metric.suffix}
      </div>
      <p className="font-heading font-bold text-sm text-foreground mb-1">{metric.label}</p>
      <p className="text-xs text-muted-foreground">{metric.sub}</p>
    </motion.div>
  );
}

export default function ImpactSection() {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section id="impact" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-hero opacity-50 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Proven Results</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-3">
            Measurable <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Every number here is a production outcome — not an experiment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}