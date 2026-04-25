import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';

const categories = [
  {
    title: 'Languages',
    items: ['Python', 'SQL'],
  },
  {
    title: 'Data Warehouses',
    items: ['Teradata', 'BigQuery', 'PostgreSQL'],
  },
  {
    title: 'Orchestration',
    items: ['Apache Airflow'],
  },
  {
    title: 'Analytics & BI',
    items: ['Looker', 'Mixpanel', 'GA4', 'MicroStrategy', 'Firebase'],
  },
  {
    title: 'Machine Learning',
    items: ['Scikit-learn', 'TensorFlow', 'OpenCV', 'Pandas', 'NumPy'],
  },
  {
    title: 'AI',
    items: ['LLM Integration', 'NLP', 'AI Chatbot', 'Natural Language Querying'],
  },
  {
    title: 'Business Domains',
    items: ['Telecom Analytics', 'OTT Analytics', 'Customer Intelligence', 'Retailer Analytics', 'Personalization', 'Revenue Analytics'],
  },
];

export default function TechStackSection() {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section id="techstack" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Toolkit</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
            Tech <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-heading font-bold text-sm text-primary mb-4 uppercase tracking-wider">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <motion.span
                    key={j}
                    className="px-3 py-1.5 rounded-lg bg-muted/50 text-sm font-medium text-foreground/80 border border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground transition-all duration-300 cursor-default animate-float"
                    style={{ animationDelay: `${j * 0.3}s`, animationDuration: `${4 + j * 0.5}s` }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}