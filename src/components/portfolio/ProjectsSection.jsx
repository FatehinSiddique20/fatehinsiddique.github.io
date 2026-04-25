import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    name: 'Ask RoRo / AI Analytics Chatbot',
    category: 'LLM + BI Automation',
    description: 'An internal AI-powered analytics chatbot that allows business users to ask natural language questions and generate business reports in seconds. Previously, stakeholders had to wait in BI queues for days. The system connects LLM reasoning with structured query pipelines and enterprise data sources.',
    impact: ['Report generation in seconds', 'Reduced BI request dependency', 'Improved decision turnaround time'],
    tech: ['LLM', 'Teradata', 'SQL', 'Python', 'Streamlit/Flask', 'MicroStrategy'],
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Retail Stock Recommendation Engine',
    category: 'Predictive Modeling + Telecom Ops',
    description: 'A predictive system that estimates the daily stock coverage each retailer needs so regional teams can proactively fill demand.',
    impact: ['Reduced stock runout by 14%', 'Improved field-level inventory planning', 'Enabled proactive regional operations'],
    tech: ['Python', 'SQL', 'Teradata', 'Predictive Modeling'],
    accent: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Hyper-Personalization Engine',
    category: 'Customer 360 + Trigger Intelligence',
    description: 'A customer intelligence framework that builds 360-degree customer profiles and generates behavioral triggers based on recharge behavior, usage patterns, balance levels, expiry behavior, and purchase tendencies.',
    impact: ['Better targeting precision', 'Trigger-based engagement campaigns', 'Customer-level personalization'],
    tech: ['Python', 'SQL', 'Behavioral Analytics', 'ML Modeling'],
    accent: 'from-orange-500 to-amber-500',
  },
  {
    name: 'UGC Analytics & Creator Payout Automation',
    category: 'Analytics Automation',
    description: 'A Python and SQL-based automation system to calculate content creator earnings, generate invoices, and support creator analytics.',
    impact: ['Saved 20+ hours/month', 'Increased creator participation by 50%', 'Improved payout accuracy'],
    tech: ['Python', 'BigQuery', 'SQL', 'Looker'],
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Large-scale KPI Dashboards',
    category: 'Executive Analytics',
    description: 'Built enterprise dashboards across Looker, Mixpanel, GA4, MSTR, Teradata, and BigQuery for MAU, DAU, revenue, subscription, content, and recharge behavior.',
    impact: ['Executive-level visibility', 'Faster decision-making', 'Automated performance monitoring'],
    tech: ['Looker', 'Mixpanel', 'GA4', 'MSTR', 'BigQuery'],
    accent: 'from-rose-500 to-pink-500',
  },
];

export default function ProjectsSection() {
  const [ref, isVisible] = useScrollReveal(0.05);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Portfolio</span>
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
              transition={{ duration: 0.6, delay: 0.1 * i }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group relative glass rounded-2xl p-7 md:p-9 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-default"
            >
              {/* Gradient border on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} style={{ padding: '1px' }}>
                <div className="w-full h-full rounded-2xl bg-card" />
              </div>
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${project.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-700 blur-3xl`} />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-muted/60 text-xs font-medium text-primary mb-4">{project.category}</span>
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3">{project.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

                    <div className="mb-5">
                      <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Impact</p>
                      <div className="flex flex-wrap gap-2">
                        {project.impact.map((imp, j) => (
                          <span key={j} className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium">
                            {imp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, j) => (
                        <span key={j} className="text-xs px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground font-medium border border-border/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-start">
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-all group/btn">
                      <span>View Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}