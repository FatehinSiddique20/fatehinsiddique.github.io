import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, RadialBarChart, RadialBar, Cell, PieChart, Pie,
} from 'recharts';

const EASING = [0.22, 1, 0.36, 1];

const turnaroundData = [
  { label: 'BI Queue (Before)', hours: 48, fill: '#374151' },
  { label: 'AI Chatbot (After)', hours: 0.01, fill: '#06b6d4' },
];

const mauData = [
  { month: 'Jan', mau: 62 }, { month: 'Feb', mau: 68 }, { month: 'Mar', mau: 71 },
  { month: 'Apr', mau: 75 }, { month: 'May', mau: 79 }, { month: 'Jun', mau: 84 },
  { month: 'Jul', mau: 87 }, { month: 'Aug', mau: 90 }, { month: 'Sep', mau: 95 },
  { month: 'Oct', mau: 98 }, { month: 'Nov', mau: 103 }, { month: 'Dec', mau: 109 },
];

const stockData = [{ name: 'Reduction', value: 14, fill: '#10b981' }, { name: 'Remaining', value: 86, fill: '#1f2937' }];
const creatorData = [{ name: 'Growth', value: 50, fill: '#8b5cf6' }, { name: 'Base', value: 50, fill: '#1f2937' }];

const pipelineSteps = [
  { label: 'Data Sources', color: '#3b82f6', icon: '🗃️', sub: 'Teradata · BigQuery · APIs' },
  { label: 'Pipelines', color: '#06b6d4', icon: '⚙️', sub: 'Airflow · Python ETL' },
  { label: 'ML Models', color: '#8b5cf6', icon: '🧠', sub: 'Prediction · Segmentation' },
  { label: 'Insights', color: '#10b981', icon: '📊', sub: 'Looker · MSTR · Mixpanel' },
  { label: 'Business Action', color: '#f97316', icon: '🚀', sub: 'Decisions at Scale' },
];

function CustomBarTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs text-foreground border border-border/60">
      <p className="font-semibold">{v < 1 ? '< 2 mins' : `${v} hours`}</p>
    </div>
  );
}

function CustomAreaTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs text-foreground border border-border/60">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-semibold text-cyan-400">Index: {payload[0].value}</p>
    </div>
  );
}

function RadialCard({ data, label, value, color, suffix, delay, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: EASING }}
      className="glass rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="relative w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="65%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
            <RadialBar dataKey="value" cornerRadius={6} background={{ fill: '#1f2937' }}>
              {data.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
            </RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="font-heading font-bold text-2xl" style={{ color }}>{value}{suffix}</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-foreground mt-3">{label}</p>
    </motion.div>
  );
}

export default function WhyHireMeSection() {
  const [ref, isVisible] = useScrollReveal(0.07);

  return (
    <section id="why-hire" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/2 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Proof of Impact</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-4">
            Why Teams <span className="text-gradient">Hire Me</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Not just models and dashboards — measurable business outcomes that compound at scale.
          </p>
        </motion.div>

        {/* BI Turnaround */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASING }}
          className="glass rounded-2xl p-6 md:p-8 mb-6"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">AI Chatbot Impact</p>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1">
            From <span className="text-red-400">Days in BI Queue</span> → <span className="text-cyan-400">Seconds</span>
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Ask RoRo AI chatbot replaced manual BI request dependency entirely.</p>
          <div className="h-48 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={turnaroundData} barCategoryGap="40%">
                <XAxis dataKey="label" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {turnaroundData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2">
            {turnaroundData.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: d.fill }} />
                {d.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Radial metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <RadialCard
            data={stockData} label="Stock Runout Reduction" value={14} suffix="%" color="#10b981"
            delay={0.2} isVisible={isVisible}
          />
          <RadialCard
            data={creatorData} label="Creator Participation Growth" value={50} suffix="%" color="#8b5cf6"
            delay={0.3} isVisible={isVisible}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: EASING }}
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-500"
          >
            <span className="font-heading font-bold text-4xl text-gradient mb-1">20+</span>
            <p className="text-sm font-semibold text-foreground">Hours Saved</p>
            <p className="text-xs text-muted-foreground">per month via automation</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: EASING }}
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-500"
          >
            <span className="font-heading font-bold text-4xl text-gradient mb-1">40M+</span>
            <p className="text-sm font-semibold text-foreground">Subscribers</p>
            <p className="text-xs text-muted-foreground">in data ecosystem</p>
          </motion.div>
        </div>

        {/* MAU Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EASING }}
          className="glass rounded-2xl p-6 md:p-8 mb-6"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">OTT Growth Impact</p>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1">
            <span className="text-cyan-400">+25% MAU Growth</span> via Cohort Analytics
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Churn-risk modeling and retention triggers drove sustained monthly active user growth on Toffee.</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mauData}>
                <defs>
                  <linearGradient id="mauGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip content={<CustomAreaTooltip />} cursor={{ stroke: 'rgba(6,182,212,0.3)', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="mau" stroke="#06b6d4" strokeWidth={2.5} fill="url(#mauGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Data-to-Decision Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: EASING }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">System Design</p>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6">
            Data-to-Decision <span className="text-gradient">Pipeline</span>
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {pipelineSteps.map((step, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: EASING }}
                  className="flex flex-col items-center text-center flex-1 min-w-0"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-2 border"
                    style={{ background: `${step.color}18`, borderColor: `${step.color}40` }}
                  >
                    {step.icon}
                  </div>
                  <p className="text-xs font-bold text-foreground">{step.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{step.sub}</p>
                </motion.div>
                {i < pipelineSteps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isVisible ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    className="hidden md:block flex-shrink-0 text-muted-foreground/40 text-xl font-light"
                  >
                    →
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}