import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { Brain, TrendingUp, Database, Users, BarChart3, Zap } from 'lucide-react';

const superpowers = [
  {
    icon: Brain,
    title: 'AI Decision Systems',
    description: 'Building LLM-powered analytics assistants and intelligent reporting systems that reduce decision latency.',
    color: 'from-blue-500/20 to-blue-600/5',
    glow: 'group-hover:shadow-blue-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Modeling',
    description: 'Forecasting behavior, demand, stock coverage, customer needs, and churn signals.',
    color: 'from-cyan-500/20 to-cyan-600/5',
    glow: 'group-hover:shadow-cyan-500/10',
  },
  {
    icon: Database,
    title: 'Telecom-scale Data Engineering',
    description: 'Working with Teradata, BigQuery, Apache Airflow, GA4, Mixpanel, Looker, and MSTR across large-scale datasets.',
    color: 'from-violet-500/20 to-violet-600/5',
    glow: 'group-hover:shadow-violet-500/10',
  },
  {
    icon: Users,
    title: 'Personalization & Customer Intelligence',
    description: 'Creating 360-degree customer profiles and trigger-based engagement frameworks.',
    color: 'from-orange-500/20 to-orange-600/5',
    glow: 'group-hover:shadow-orange-500/10',
  },
  {
    icon: BarChart3,
    title: 'Executive Analytics',
    description: 'Turning raw data into board-level KPIs, dashboards, and strategic insights.',
    color: 'from-emerald-500/20 to-emerald-600/5',
    glow: 'group-hover:shadow-emerald-500/10',
  },
  {
    icon: Zap,
    title: 'Automation & Operational Efficiency',
    description: 'Replacing manual processes with scalable Python, SQL, and pipeline-based automation.',
    color: 'from-rose-500/20 to-rose-600/5',
    glow: 'group-hover:shadow-rose-500/10',
  },
];

const EASING = [0.22, 1, 0.36, 1];

function SuperCard({ sp, index, isVisible }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });

  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8, gx: x * 100, gy: y * 100 });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, gx: 50, gy: 50 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.09 * index, ease: EASING }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' : 'transform 0.1s ease',
      }}
      className={`group relative glass rounded-2xl p-7 hover:shadow-2xl ${sp.glow} transition-shadow duration-500 cursor-default overflow-hidden`}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${sp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      {/* Spotlight */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(99,102,241,0.08) 0%, transparent 65%)` }}
      />
      <div className="relative z-10">
        <motion.div
          className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center mb-5"
          whileHover={{ scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <sp.icon className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="font-heading font-bold text-lg mb-3 text-foreground">{sp.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{sp.description}</p>
      </div>
    </motion.div>
  );
}

export default function SuperpowersSection() {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section id="superpowers" className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Expertise</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
            My <span className="text-gradient">Superpowers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {superpowers.map((sp, i) => (
            <SuperCard key={i} sp={sp} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}