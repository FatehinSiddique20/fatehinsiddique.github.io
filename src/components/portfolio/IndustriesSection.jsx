import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { Signal, Play } from 'lucide-react';

const industries = [
  {
    icon: Signal,
    title: 'Telco Intelligence',
    subtitle: 'Banglalink Digital · 40M+ Subscribers',
    description:
      'Built AI, BI, and predictive systems across Banglalink\'s 40M+ subscriber ecosystem, including retailer stock recommendation, customer 360 profiling, hyper-personalisation triggers, recharge behavior analytics, and enterprise KPI reporting.',
    tags: ['Predictive Modeling', 'Customer 360', 'KPI Reporting', 'Hyper-Personalisation', 'Stock Recommendation'],
    gradient: 'from-cyan-500/15 to-blue-600/5',
    border: 'hover:border-cyan-500/30',
    glow: 'hover:shadow-cyan-500/10',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
  },
  {
    icon: Play,
    title: 'OTT & Digital Growth',
    subtitle: 'Toffee · Banglalink Digital',
    description:
      'Built analytics systems for Toffee OTT covering MAU/DAU, content engagement, revenue KPIs, UGC analytics, creator payout automation, fraud detection, event tracking, and personalized growth campaigns.',
    tags: ['MAU/DAU Analytics', 'Fraud Detection', 'UGC Analytics', 'Creator Payout', 'Growth Campaigns'],
    gradient: 'from-violet-500/15 to-purple-600/5',
    border: 'hover:border-violet-500/30',
    glow: 'hover:shadow-violet-500/10',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
  },
];

export default function IndustriesSection() {
  const [ref, isVisible] = useScrollReveal(0.15);

  return (
    <section id="industries" className="relative py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Domain Expertise</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight">
            Industries I've <span className="text-gradient">Built For</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className={`group relative glass rounded-2xl p-8 border border-border/40 ${ind.border} hover:shadow-2xl ${ind.glow} transition-all duration-500 hover:-translate-y-1 cursor-default overflow-hidden`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${ind.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl ${ind.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <ind.icon className={`w-6 h-6 ${ind.iconColor}`} />
                </div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-1">{ind.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 font-medium">{ind.subtitle}</p>
                <p className="text-sm text-foreground/70 leading-relaxed mb-5">{ind.description}</p>

                <div className="flex flex-wrap gap-2">
                  {ind.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 rounded-lg bg-muted/40 text-xs font-medium text-muted-foreground border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}