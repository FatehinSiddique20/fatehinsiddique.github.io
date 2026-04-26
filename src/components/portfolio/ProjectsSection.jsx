import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { ExternalLink } from 'lucide-react';

const EASING = [0.22, 1, 0.36, 1];

const projects = [
  {
    name: 'Ask RoRo — AI Analytics Chatbot',
    category: 'LLM + BI Automation',
    tagline: 'Replaced days of waiting with seconds of insight.',
    description: 'Internal AI chatbot connecting LLM reasoning with Teradata query pipelines. Stakeholders now get live business reports in seconds instead of waiting in BI queues for days.',
    impact: ['< 1 sec report generation', 'Eliminated BI queue dependency', 'Used by cross-functional teams'],
    system: ['LLM Reasoning Engine', 'Teradata SQL Layer', 'Python Backend', 'Streamlit UI'],
    tech: ['LLM', 'Teradata', 'SQL', 'Python', 'MicroStrategy'],
    accent: '#06b6d4',
    visual: (
      <div className="flex flex-col gap-2 p-3">
        {[
          { from: true, text: 'Show me revenue by region this week' },
          { from: false, text: '📊 Region report ready — ৳4.2B total, North +12%' },
          { from: true, text: 'Which sub tier had highest churn?' },
          { from: false, text: '🔍 Prepaid 30-day bundle — 3.1% churn rate' },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.from ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.25, duration: 0.4 }}
            className={`text-[10px] px-3 py-1.5 rounded-xl max-w-[85%] font-medium ${
              m.from
                ? 'self-start bg-muted/50 text-foreground/70'
                : 'self-end text-white'
            }`}
            style={!m.from ? { background: 'linear-gradient(135deg,#06b6d4,#3b82f6)' } : {}}
          >
            {m.text}
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    name: 'Retail Stock Recommendation Engine',
    category: 'Predictive Modeling · Telecom Ops',
    tagline: '14% reduction in retailer stock runout.',
    description: 'Predicts daily stock coverage each retailer needs so regional teams can proactively fill demand before runout.',
    impact: ['14% stock runout reduction', 'Proactive field operations', 'Reduced lost sales events'],
    system: ['Demand Forecasting Model', 'Retailer Coverage Engine', 'Regional Operations Layer'],
    tech: ['Python', 'SQL', 'Teradata', 'Predictive Modeling'],
    accent: '#f97316',
    visual: (
      <div className="p-3 flex flex-col gap-2">
        {[['North', 87, '#10b981'], ['South', 62, '#f97316'], ['East', 95, '#06b6d4'], ['West', 74, '#8b5cf6']].map(([region, val, color]) => (
          <div key={region} className="flex items-center gap-2">
            <span className="text-[9px] text-muted-foreground w-10">{region}</span>
            <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${val}%` }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASING }}
                className="h-full rounded-full"
                style={{ background: color }}
              />
            </div>
            <span className="text-[9px] font-bold" style={{ color }}>{val}%</span>
          </div>
        ))}
        <p className="text-[9px] text-muted-foreground mt-1">Predicted stock coverage by region</p>
      </div>
    ),
  },
  {
    name: 'Hyper-Personalization Engine',
    category: 'Customer 360 · Trigger Intelligence',
    tagline: 'Every subscriber gets their own intelligence profile.',
    description: 'Builds 360-degree customer profiles from recharge behavior, usage patterns, balance levels, and purchase history. Generates real-time behavioral triggers for personalized campaigns.',
    impact: ['Customer-level precision', 'Trigger-based campaigns', 'Improved conversion rates'],
    system: ['Customer 360 Profiler', 'Behavioral Signal Engine', 'Trigger Logic Layer'],
    tech: ['Python', 'SQL', 'Behavioral Analytics', 'ML Modeling'],
    accent: '#8b5cf6',
    visual: (
      <div className="flex items-center justify-center p-4">
        <div className="relative w-28 h-28">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: `rgba(139,92,246,${0.6 - i * 0.12})`,
                scale: 1 + i * 0.25,
              }}
              animate={{ scale: [1 + i * 0.25, 1 + i * 0.25 + 0.04, 1 + i * 0.25] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'radial-gradient(circle, #8b5cf6, #6d28d9)' }}>
              C360
            </div>
          </div>
          {['Recharge', 'Usage', 'Balance', 'Trigger'].map((label, i) => {
            const angle = (i / 4) * 2 * Math.PI - Math.PI / 2;
            const r = 54;
            const lx = 56 + r * Math.cos(angle);
            const ly = 56 + r * Math.sin(angle);
            return (
              <div key={label} className="absolute text-[8px] font-semibold text-primary/80 whitespace-nowrap" style={{ left: lx, top: ly, transform: 'translate(-50%,-50%)' }}>
                {label}
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
  {
    name: 'UGC Analytics & Creator Payout Automation',
    category: 'Analytics Automation · OTT',
    tagline: '20+ hours saved monthly. 50% more creators activated.',
    description: 'Automated creator earnings calculation, invoice generation, and UGC analytics for Toffee platform. Replaced manual spreadsheet processes with a fully automated pipeline.',
    impact: ['20+ hours/month saved', '+50% creator participation', 'Improved payout accuracy'],
    system: ['Automated Payout Engine', 'UGC Analytics Pipeline', 'Creator Intelligence Layer'],
    tech: ['Python', 'BigQuery', 'SQL', 'Looker'],
    accent: '#10b981',
    visual: (
      <div className="flex flex-col gap-2 p-3">
        {['Collect UGC Metrics', 'Calculate Earnings', 'Generate Invoices', 'Trigger Payout'].map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background: '#10b981' }}>
              {i + 1}
            </div>
            <div className="flex-1 h-6 rounded-lg flex items-center px-2 text-[10px] font-medium text-foreground/70 bg-muted/30">
              {step}
            </div>
            {i < 3 && <span className="text-muted-foreground/40 text-xs">→</span>}
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    name: 'Large-Scale KPI Dashboards',
    category: 'Executive Analytics · Multi-Platform',
    tagline: 'Board-level visibility across 40M+ subscribers.',
    description: 'Enterprise dashboards spanning Looker, Mixpanel, GA4, MSTR, and BigQuery — covering MAU, DAU, revenue, subscription, content performance, and recharge behavior.',
    impact: ['Executive-level visibility', 'Faster decisions', 'Automated performance monitoring'],
    system: ['Multi-source Data Layer', 'Unified KPI Framework', 'Executive Dashboard Layer'],
    tech: ['Looker', 'Mixpanel', 'GA4', 'MSTR', 'BigQuery'],
    accent: '#3b82f6',
    visual: (
      <div className="p-3 grid grid-cols-2 gap-2">
        {[
          { label: 'MAU', val: '+25%', color: '#06b6d4' },
          { label: 'Revenue', val: '↑ 12%', color: '#10b981' },
          { label: 'Churn', val: '↓ 8%', color: '#f97316' },
          { label: 'ARPU', val: '+18%', color: '#8b5cf6' },
        ].map(({ label, val, color }) => (
          <motion.div
            key={label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-lg p-2 text-center"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <p className="text-[9px] text-muted-foreground">{label}</p>
            <p className="text-sm font-bold" style={{ color }}>{val}</p>
          </motion.div>
        ))}
      </div>
    ),
  },
];

export default function ProjectsSection() {
  const [ref, isVisible] = useScrollReveal(0.05);
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Systems Built</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: EASING }}
              className="group relative glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5"
              style={{ borderLeft: `2px solid ${project.accent}40` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 50%, ${project.accent}08 0%, transparent 60%)` }}
              />

              <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row gap-6">
                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${project.accent}18`, color: project.accent }}>
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1">{project.name}</h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: project.accent }}>{project.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-2">Impact</p>
                      <div className="space-y-1">
                        {project.impact.map((imp, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-primary font-medium">
                            <span style={{ color: project.accent }}>✓</span> {imp}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-2">System Design</p>
                      <div className="space-y-1">
                        {project.system.map((s, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, j) => (
                      <span key={j} className="text-xs px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground font-medium border border-border/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual preview */}
                <div
                  className="flex-shrink-0 w-full md:w-52 rounded-xl overflow-hidden border"
                  style={{ background: `${project.accent}08`, borderColor: `${project.accent}25`, minHeight: 140 }}
                >
                  {project.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}