import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { Signal, Play } from 'lucide-react';

const EASING = [0.22, 1, 0.36, 1];

const industries = [
  {
    icon: Signal,
    title: 'Telco Intelligence',
    subtitle: 'Banglalink Digital · 40M+ Subscribers',
    authority: 'Operating at national telecom scale — real-time decision systems, not experiments.',
    description:
      'Built AI, BI, and predictive systems across Banglalink\'s 40M+ subscriber ecosystem, including retailer stock recommendation, customer 360 profiling, hyper-personalisation triggers, recharge behavior analytics, and enterprise KPI reporting.',
    tags: ['Predictive Modeling', 'Customer 360', 'KPI Reporting', 'Hyper-Personalisation', 'Stock Recommendation'],
    gradient: 'from-cyan-500/15 to-blue-600/5',
    border: 'hover:border-cyan-500/30',
    glow: 'hover:shadow-cyan-500/10',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    accent: '#06b6d4',
    animType: 'signal',
  },
  {
    icon: Play,
    title: 'OTT & Digital Growth',
    subtitle: 'Toffee · Banglalink Digital',
    authority: 'Driving user growth, engagement, and monetization through data systems.',
    description:
      'Built analytics systems for Toffee OTT covering MAU/DAU, content engagement, revenue KPIs, UGC analytics, creator payout automation, fraud detection, event tracking, and personalized growth campaigns.',
    tags: ['MAU/DAU Analytics', 'Fraud Detection', 'UGC Analytics', 'Creator Payout', 'Growth Campaigns'],
    gradient: 'from-violet-500/15 to-purple-600/5',
    border: 'hover:border-violet-500/30',
    glow: 'hover:shadow-violet-500/10',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    accent: '#8b5cf6',
    animType: 'tiles',
  },
];

// Signal waves animation for Telco
function SignalWaves({ accent }) {
  return (
    <div className="absolute bottom-4 right-4 pointer-events-none">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ borderColor: accent + '30', width: 20 + i * 18, height: 20 + i * 18, bottom: 0, right: 0, transform: 'translate(50%,50%)' }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// Floating content tiles animation for OTT
function FloatingTiles({ accent }) {
  const tiles = ['🎬', '📊', '🎵', '🎭'];
  return (
    <div className="absolute bottom-4 right-4 pointer-events-none w-20 h-20">
      {tiles.map((t, i) => {
        const angle = (i / tiles.length) * Math.PI * 2;
        return (
          <motion.div
            key={i}
            className="absolute w-7 h-7 rounded-lg flex items-center justify-center text-sm"
            style={{ background: accent + '18', border: `1px solid ${accent}25`, top: '50%', left: '50%', marginTop: -14, marginLeft: -14 }}
            animate={{
              x: Math.cos(angle) * 28, y: Math.sin(angle) * 28,
              rotate: [0, 10, -10, 0], scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            {t}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function IndustriesSection() {
  const [ref, isVisible] = useScrollReveal(0.15);

  return (
    <section id="industries" className="relative py-14 md:py-20">
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
              transition={{ duration: 0.7, delay: 0.15 * i, ease: EASING }}
              whileHover={{ scale: 1.015, y: -3 }}
              className={`group relative glass rounded-2xl p-8 border border-border/40 ${ind.border} hover:shadow-2xl ${ind.glow} transition-all duration-500 cursor-default overflow-hidden`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${ind.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Background animation */}
              {ind.animType === 'signal' ? <SignalWaves accent={ind.accent} /> : <FloatingTiles accent={ind.accent} />}

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl ${ind.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <ind.icon className={`w-6 h-6 ${ind.iconColor}`} />
                </div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-1">{ind.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 font-medium">{ind.subtitle}</p>

                {/* Authority line */}
                <p className="text-sm font-semibold mb-3" style={{ color: ind.accent }}>{ind.authority}</p>

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