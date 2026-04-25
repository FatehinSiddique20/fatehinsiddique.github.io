import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { MapPin, Building2, Briefcase } from 'lucide-react';

const EASING = [0.22, 1, 0.36, 1];

export default function AboutSection() {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">About</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-6">
            Building <span className="text-gradient">intelligent systems</span>,
            <br className="hidden md:block" /> not just dashboards
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: EASING }}
          className="glass rounded-2xl p-8 md:p-12 mb-8 hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-500"
        >
          <p className="text-base md:text-lg leading-relaxed text-foreground/80 font-body">
            I am a Data Science Manager in the Business Intelligence team at Banglalink, focused on building AI-powered analytics systems, predictive engines, and scalable data products. My work connects business intelligence, machine learning, data engineering, and product analytics to solve high-impact business problems across telecom and digital platforms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASING }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Building2, label: 'Banglalink Digital', sub: 'Business Intelligence' },
            { icon: Briefcase, label: 'Data Science Manager', sub: 'AI & Analytics' },
            { icon: MapPin, label: 'Dhaka, Bangladesh', sub: 'Open to global roles' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: EASING }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl glass cursor-default"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}