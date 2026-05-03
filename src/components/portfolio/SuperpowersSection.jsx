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
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.07 * index, ease: EASING }}
      className={`group relative glass rounded-2xl p-7 hover:shadow-xl transition-all duration-300 cursor-default hover:-translate-y-0.5`}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${sp.color} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center mb-5">
          <sp.icon className="w-6 h-6 text-primary" />
        </div>
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