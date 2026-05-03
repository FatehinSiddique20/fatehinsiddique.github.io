import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    title: 'Data Science Manager, Business Intelligence',
    company: 'Banglalink Digital',
    date: 'Dec 2025 – Present',
    bullets: [
      'Built an AI-powered internal analytics chatbot using LLMs and Teradata-backed query systems, enabling stakeholders to generate reports and insights in seconds instead of waiting in BI queues.',
      'Designed scalable data pipelines using Apache Airflow across Teradata and BigQuery for reporting, analytics, and machine learning workflows.',
      'Developed a retail stock recommendation engine using predictive modeling to estimate daily retailer coverage requirements, reducing stock runout by 14%.',
      'Architected a hyper-personalization system using 360-degree customer profiling, behavioral analytics, recharge patterns, and trigger-based engagement logic.',
      'Owned enterprise analytics data layers supporting datasets derived from Banglalink\'s 40M+ subscriber ecosystem.',
      'Optimized large-scale SQL queries in Teradata and BigQuery for high-frequency dashboards and business-critical reporting.',
    ],
    current: true,
  },
  {
    title: 'Performance and Data Analytics Specialist, Toffee',
    company: 'Banglalink Digital',
    date: 'Sep 2022 – Dec 2025',
    bullets: [
      'Built and scaled dashboards using BigQuery, Looker, Mixpanel, and GA4 to monitor user engagement, revenue KPIs, and content performance.',
      'Automated content creator payout systems using Python and SQL, reducing manual effort by 20+ hours per month.',
      'Led UGC analytics initiatives that increased creator participation by 50%.',
      'Built fraud detection logic using SQL and behavioral analysis to identify fake views, repeat abuse, and suspicious engagement.',
      'Defined analytics event tracking frameworks and acted as data product owner from ingestion to reporting.',
      'Developed cohort-based segmentation and churn-risk analysis contributing to a 25% MAU increase.',
    ],
  },
  {
    title: 'Junior Machine Learning Engineer',
    company: 'TechTrioz',
    date: 'Sep 2021 – Nov 2021',
    bullets: [
      'Developed personalized recommendation models improving DAU by 12%.',
      'Built object detection models using OpenCV and TensorFlow.',
      'Designed PostgreSQL-based data pipelines for ML workflows.',
    ],
  },
  {
    title: 'Digital Services Intern',
    company: 'Banglalink Digital',
    date: 'Feb 2021 – Apr 2021',
    bullets: [
      'Analyzed 10,000+ customer reviews and built sentiment models that helped reduce support tickets by 43%.',
      'Developed automated feedback categorization scripts in Python.',
    ],
  },
];

export default function ExperienceSection() {
  const [ref, isVisible] = useScrollReveal(0.05);

  return (
    <section id="experience" className="relative py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Career</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
            Professional <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i }}
                className={`relative mb-12 md:mb-16 pl-12 md:pl-0 ${
                  isLeft ? 'md:pr-[calc(50%+2rem)] md:text-right' : 'md:pl-[calc(50%+2rem)]'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-1/2 top-2 w-3 h-3 rounded-full bg-primary md:-translate-x-1.5 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                  )}
                </div>

                <div className="glass rounded-2xl p-6 md:p-7 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                  <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                    <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-medium text-primary">{exp.date}</span>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">CURRENT</span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-1">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{exp.company}</p>
                  <ul className={`space-y-2 ${isLeft ? 'md:text-right' : ''}`}>
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="text-sm text-foreground/70 leading-relaxed">
                        <span className="text-primary mr-1">›</span> {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}