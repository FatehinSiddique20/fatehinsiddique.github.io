import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { ChevronDown, ChevronUp } from 'lucide-react';

const EASING = [0.22, 1, 0.36, 1];

const projects = [
  {
    name: 'Ask RoRo — AI Analytics Chatbot',
    category: 'LLM + BI Automation',
    accent: '#06b6d4',
    problem: 'Stakeholders waited days in BI queues for basic business reports.',
    built: 'Internal AI chatbot connecting LLM reasoning with Teradata SQL pipelines — delivering live reports on demand.',
    impact: ['< 2 min report generation', 'Eliminated BI queue dependency', 'Used cross-functionally'],
    tech: ['LLM', 'Teradata', 'SQL', 'Python', 'MicroStrategy'],
    caseStudy: 'Connected LLM reasoning to live Teradata query pipelines via a Streamlit UI. Stakeholders type natural language questions and receive structured business reports instantly, replacing a multi-day request-to-delivery cycle.',
    visual: (
      <div className="flex flex-col gap-2 p-3">
        {[
          { from: true, text: 'Show me revenue by region this week' },
          { from: false, text: '📊 Region report ready — ৳4.2B total, North +12%' },
          { from: true, text: 'Which sub tier had highest churn?' },
          { from: false, text: '🔍 Prepaid 30-day — 3.1% churn rate' },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.from ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.25, duration: 0.4 }}
            className={`text-[10px] px-3 py-1.5 rounded-xl max-w-[85%] font-medium ${
              m.from ? 'self-start bg-muted/50 text-foreground/70' : 'self-end text-white'
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
    name: 'Toffee Tech Transition',
    category: 'Event-Based Data Transformation + Analytics Infrastructure',
    accent: '#f59e0b',
    problem: 'Toffee depended on vendor-managed systems with limited data visibility and no internal analytics ownership.',
    built: 'End-to-end event-based data collection framework — event taxonomy, tracking logic, pipeline structure, and reporting requirements — enabling internal analytics ownership.',
    impact: ['Full data ownership & governance', 'Scalable event-based analytics', 'Reduced vendor dependency', 'Foundation for personalization & churn analysis'],
    tech: ['Event Tracking', 'BigQuery', 'GA4/Firebase', 'SQL', 'Looker', 'Mixpanel', 'Data Pipelines', 'Analytics Engineering'],
    caseStudy: 'Designed the event taxonomy, defined parameters and tracking logic across product, content, subscription and payment events. Coordinated requirements across tech, product, and analytics teams. Enabled event data to flow into dashboards, cohort analysis, and behavioral reporting systems.',
    visual: (
      <div className="p-3 flex flex-col gap-2">
        {['Vendor System', 'Event Taxonomy', 'Data Pipeline', 'Analytics Warehouse', 'Dashboards'].map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
              style={{ background: `hsl(${35 + i * 12}, 90%, 55%)` }}
            >
              {i + 1}
            </div>
            <div className="flex-1 h-6 rounded-lg flex items-center px-2 text-[9px] font-medium text-foreground/70 bg-muted/30">
              {step}
            </div>
            {i < 4 && (
              <motion.div
                className="text-[8px] text-amber-400/60"
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              >
                ▶
              </motion.div>
            )}
          </motion.div>
        ))}
        <div className="flex flex-wrap gap-1 mt-1">
          {['app_launch', 'video_start', 'payment_success', 'subscription'].map(e => (
            <span key={e} className="text-[8px] px-1.5 py-0.5 rounded-full font-mono" style={{ background: '#f59e0b18', color: '#f59e0b', border: '1px solid #f59e0b30' }}>
              {e}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'Retail Stock Recommendation Engine',
    category: 'Predictive Modeling · Telecom Ops',
    accent: '#f97316',
    problem: 'Regional teams had no advance warning of retailer stock shortfalls, causing lost sales.',
    built: 'Demand forecasting model predicting daily stock coverage per retailer, enabling proactive field operations.',
    impact: ['14% stock runout reduction', 'Proactive field operations', 'Reduced lost sales events'],
    tech: ['Python', 'SQL', 'Teradata', 'Predictive Modeling'],
    caseStudy: 'Built a regression-based model trained on historical recharge patterns and regional demand signals. Outputs a daily coverage score per retailer that regional managers act on before runout occurs.',
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
    accent: '#8b5cf6',
    problem: 'Mass campaigns with generic messaging led to poor conversion and high churn.',
    built: '360-degree customer profiles from recharge, usage, balance, and purchase history — powering real-time behavioral trigger campaigns.',
    impact: ['Customer-level precision', 'Trigger-based campaigns', 'Improved conversion rates'],
    tech: ['Python', 'SQL', 'Behavioral Analytics', 'ML Modeling'],
    caseStudy: 'Aggregated multi-dimensional behavioral signals into subscriber-level profiles. Designed trigger rules — e.g. balance drop + no recharge in 48h → personalized offer push — that fired via campaign systems in real time.',
    visual: (
      <div className="flex items-center justify-center p-4">
        <div className="relative w-28 h-28">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: `rgba(139,92,246,${0.6 - i * 0.12})`, scale: 1 + i * 0.25 }}
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
            return (
              <div key={label} className="absolute text-[8px] font-semibold text-primary/80 whitespace-nowrap" style={{ left: 56 + r * Math.cos(angle), top: 56 + r * Math.sin(angle), transform: 'translate(-50%,-50%)' }}>
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
    accent: '#10b981',
    problem: 'Creator earnings were calculated manually via spreadsheets — slow, error-prone, and unscalable.',
    built: 'Fully automated pipeline for earnings calculation, invoice generation, and UGC analytics for the Toffee platform.',
    impact: ['20+ hours/month saved', '+50% creator participation', 'Improved payout accuracy'],
    tech: ['Python', 'BigQuery', 'SQL', 'Looker'],
    caseStudy: 'Replaced manual spreadsheet processes with a Python + BigQuery pipeline. Earnings calculated automatically from view/engagement metrics, invoices generated programmatically, and payouts triggered without human intervention.',
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
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    name: 'Large-Scale KPI Dashboards',
    category: 'Executive Analytics · Multi-Platform',
    accent: '#3b82f6',
    problem: 'Executives had fragmented visibility across 5+ platforms with no single source of truth.',
    built: 'Unified enterprise dashboards covering MAU, DAU, revenue, churn, content performance, and recharge behavior.',
    impact: ['Executive-level visibility', 'Faster strategic decisions', 'Automated performance monitoring'],
    tech: ['Looker', 'Mixpanel', 'GA4', 'MSTR', 'BigQuery'],
    caseStudy: 'Connected Looker, Mixpanel, GA4, MSTR, and BigQuery into a unified KPI framework. Built scheduled reports and alert systems so leadership sees anomalies before they become problems.',
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

function ProjectCard({ project, index, isVisible }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.06 * index, ease: EASING }}
      className="group relative glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
      style={{ borderLeft: `2px solid ${project.accent}40` }}
    >

      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row gap-6">
        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: `${project.accent}18`, color: project.accent }}>
              {project.category}
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-4">{project.name}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
            <div>
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-1">Problem</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-1">What I Built</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{project.built}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-1">Impact</p>
              <div className="space-y-0.5">
                {project.impact.map((imp, j) => (
                  <div key={j} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: project.accent }}>
                    <span>✓</span> {imp}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t, j) => (
              <span key={j} className="text-xs px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground font-medium border border-border/40">
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold transition-colors"
            style={{ color: project.accent }}
          >
            {expanded ? <><ChevronUp className="w-3 h-3" /> Hide Case Study</> : <><ChevronDown className="w-3 h-3" /> View Case Study</>}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border/30">
                  {project.caseStudy}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visual */}
        <div
          className="flex-shrink-0 w-full md:w-48 rounded-xl overflow-hidden border"
          style={{ background: `${project.accent}08`, borderColor: `${project.accent}25`, minHeight: 140 }}
        >
          {project.visual}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [ref, isVisible] = useScrollReveal(0.05);

  return (
    <section id="projects" className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Systems Built</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}