import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { Trophy, Award, Star } from 'lucide-react';

const awards = [
  { title: 'Champion', event: 'Banglalink Innovation Challenge', year: '2025', icon: Trophy },
  { title: 'CEO Excellence Award', event: 'Banglalink Digital', year: '2023', icon: Award },
  { title: 'Game Changer Award', event: 'Banglalink Digital', year: '2023 & 2025', icon: Star },
  { title: 'CCO Award', event: 'Banglalink Digital', year: '2022', icon: Award },
  { title: 'First Runners-Up', event: 'Hour of Code Hackathon, NSU ACM', year: '', icon: Trophy },
];

const gradients = [
  'from-amber-400/20 to-orange-500/5',
  'from-blue-400/20 to-cyan-500/5',
  'from-violet-400/20 to-purple-500/5',
  'from-emerald-400/20 to-teal-500/5',
  'from-rose-400/20 to-pink-500/5',
];

export default function AwardsSection() {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section id="awards" className="relative py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Recognition</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
            Awards & <span className="text-gradient-orange">Honors</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              animate={isVisible ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`group glass rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-default relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-muted/60 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <award.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground mb-1">{award.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{award.event}</p>
                {award.year && <p className="text-xs text-primary font-medium">{award.year}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}