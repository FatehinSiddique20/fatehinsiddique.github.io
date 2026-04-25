import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, useCountUp } from './useScrollReveal';

const metrics = [
  { value: 40, suffix: 'M+', label: 'Subscriber Ecosystem' },
  { value: 14, suffix: '%', label: 'Stock Runout Reduction' },
  { value: 25, suffix: '%', label: 'MAU Growth' },
  { value: 50, suffix: '%', label: 'Creator Participation Growth' },
  { value: 20, suffix: '+', label: 'Hours Saved Monthly' },
  { value: 10000, suffix: '+', label: 'Reviews Analyzed' },
];

const qualitative = [
  'Millions of Records Processed Daily',
  'Multiple BI Systems Integrated',
];

function CounterCard({ metric, index, isVisible }) {
  const count = useCountUp(metric.value, metric.value > 1000 ? 3000 : 2000, isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.08 * index }}
      className="glass rounded-2xl p-6 md:p-8 text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 group"
    >
      <div className="font-heading font-bold text-4xl md:text-5xl text-gradient mb-2 group-hover:scale-105 transition-transform duration-300">
        {metric.value > 1000 ? count.toLocaleString() : count}{metric.suffix}
      </div>
      <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
    </motion.div>
  );
}

export default function ImpactSection() {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section id="impact" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Results</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
            Measurable <span className="text-gradient">Impact</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {metrics.map((metric, i) => (
            <CounterCard key={i} metric={metric} index={i} isVisible={isVisible} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {qualitative.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="px-5 py-3 rounded-xl glass text-sm font-medium text-muted-foreground"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}