import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';

const SKILLS = [
  { name: 'Python', tooltip: 'Core language for ML, automation & pipelines', color: '#3b82f6', size: 'lg' },
  { name: 'SQL', tooltip: 'High-frequency querying across Teradata & BigQuery', color: '#06b6d4', size: 'lg' },
  { name: 'Machine Learning', tooltip: 'Predictive modeling, classification, regression', color: '#8b5cf6', size: 'lg' },
  { name: 'LLMs', tooltip: 'AI chatbot & natural language analytics systems', color: '#06b6d4', size: 'lg' },
  { name: 'Teradata', tooltip: 'Enterprise-scale data warehouse at 40M+ subscriber level', color: '#f97316', size: 'md' },
  { name: 'BigQuery', tooltip: 'Google cloud analytics for OTT & telecom reporting', color: '#4285F4', size: 'md' },
  { name: 'Apache Airflow', tooltip: 'Pipeline orchestration across data systems', color: '#017CEE', size: 'md' },
  { name: 'Predictive Modeling', tooltip: 'Demand forecasting, churn prediction, stock runout', color: '#10b981', size: 'md' },
  { name: 'Customer 360', tooltip: 'Full-profile behavioral intelligence per subscriber', color: '#f59e0b', size: 'md' },
  { name: 'Looker', tooltip: 'Executive KPI dashboards and BI reporting', color: '#4285F4', size: 'sm' },
  { name: 'Mixpanel', tooltip: 'OTT product analytics and user behavior tracking', color: '#7856ff', size: 'sm' },
  { name: 'GA4', tooltip: 'Digital analytics and conversion tracking', color: '#f97316', size: 'sm' },
  { name: 'MSTR', tooltip: 'MicroStrategy enterprise reporting', color: '#e11d48', size: 'sm' },
  { name: 'Personalization', tooltip: 'Trigger-based engagement & hyper-targeted campaigns', color: '#ec4899', size: 'sm' },
  { name: 'KPI Design', tooltip: 'Board-level metrics and business impact measurement', color: '#06b6d4', size: 'sm' },
  { name: 'Data Pipelines', tooltip: 'End-to-end ETL across Teradata, BigQuery, Python', color: '#3b82f6', size: 'sm' },
];

const sizeMap = { lg: 56, md: 46, sm: 38 };

function SkillOrb({ skill, index, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const size = sizeMap[skill.size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="relative cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center justify-center rounded-full font-heading font-bold text-white transition-transform duration-200"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 35%, ${skill.color}cc, ${skill.color}55)`,
          border: `1.5px solid ${skill.color}55`,
          boxShadow: hovered ? `0 0 18px ${skill.color}66` : `0 0 6px ${skill.color}33`,
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          fontSize: size > 50 ? 10 : 9,
          textAlign: 'center',
          lineHeight: 1.2,
          padding: '4px',
        }}
      >
        {skill.name}
      </div>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute z-30 w-44 pointer-events-none"
          style={{ bottom: '110%', left: '50%', transform: 'translateX(-50%)', marginBottom: 4 }}
        >
          <div className="glass rounded-xl px-3 py-2 text-center border border-border/60 shadow-lg">
            <p className="text-xs font-semibold text-foreground mb-0.5">{skill.name}</p>
            <p className="text-[10px] text-muted-foreground leading-snug">{skill.tooltip}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function SkillGalaxy() {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section id="skills" className="relative py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Tech Stack</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-3">
            The <span className="text-gradient">Technology Universe</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Hover over any orb to explore the tools powering decisions at telecom scale.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          {SKILLS.map((skill, i) => (
            <SkillOrb key={skill.name} skill={skill} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}