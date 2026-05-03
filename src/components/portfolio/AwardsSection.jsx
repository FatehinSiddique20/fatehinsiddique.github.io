import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { Trophy, Award, Star, X, ZoomIn } from 'lucide-react';

const awards = [
  {
    title: 'Champion',
    event: 'Banglalink Innovation Challenge',
    year: '2025',
    icon: Trophy,
    image: 'https://media.base44.com/images/public/69ecf4e8453eee0057e250fb/55db048bf_banglalinkinnovationchallenge.jpg',
    accent: 'from-amber-400/25 to-orange-500/10',
    borderHover: 'hover:border-amber-400/40',
    iconColor: 'text-amber-400',
  },
  {
    title: 'CEO Excellence Award',
    event: 'Banglalink Digital',
    year: '2023',
    icon: Award,
    image: 'https://media.base44.com/images/public/69ecf4e8453eee0057e250fb/130d86396_award3.jpg',
    accent: 'from-blue-400/25 to-cyan-500/10',
    borderHover: 'hover:border-blue-400/40',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Game Changer Award',
    event: 'Banglalink Digital',
    year: '2023 & 2025',
    icon: Star,
    image: 'https://media.base44.com/images/public/69ecf4e8453eee0057e250fb/6d497d771_award2.jpg',
    accent: 'from-violet-400/25 to-purple-500/10',
    borderHover: 'hover:border-violet-400/40',
    iconColor: 'text-violet-400',
  },
  {
    title: 'CCO Award',
    event: 'Banglalink Digital',
    year: '2022',
    icon: Award,
    image: 'https://media.base44.com/images/public/69ecf4e8453eee0057e250fb/174cef871_firstblaward.jpg',
    accent: 'from-emerald-400/25 to-teal-500/10',
    borderHover: 'hover:border-emerald-400/40',
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Game Changer Award',
    event: 'Banglalink Digital',
    year: '2025',
    icon: Star,
    image: 'https://media.base44.com/images/public/69ecf4e8453eee0057e250fb/bc0da7088_award7.jpeg',
    accent: 'from-rose-400/25 to-pink-500/10',
    borderHover: 'hover:border-rose-400/40',
    iconColor: 'text-rose-400',
  },
  {
    title: 'First Runners-Up',
    event: 'Hour of Code Hackathon, NSU ACM',
    year: '',
    icon: Trophy,
    image: null,
    accent: 'from-orange-400/25 to-amber-500/10',
    borderHover: 'hover:border-orange-400/40',
    iconColor: 'text-orange-400',
  },
];

export default function AwardsSection() {
  const [ref, isVisible] = useScrollReveal(0.08);
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="awards" className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4 block">Recognition</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
            Awards & <span className="text-gradient-orange">Honors</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`group glass rounded-2xl overflow-hidden border border-border/40 ${award.borderHover} hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-default`}
            >
              {award.image && (
                <div className="relative h-44 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${award.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    style={{ filter: 'brightness(0.85) saturate(0.9)' }}
                  />
                  <button
                    onClick={() => setLightbox(award)}
                    className="absolute top-3 right-3 z-20 p-2 rounded-lg glass opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/10"
                  >
                    <ZoomIn className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10" />
                </div>
              )}

              <div className={`p-6 relative overflow-hidden ${!award.image ? 'pt-8' : ''}`}>
                {!award.image && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${award.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                )}
                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-2">
                    <award.icon className={`w-5 h-5 ${award.iconColor} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`} />
                    <div>
                      <h3 className="font-heading font-bold text-base text-foreground leading-tight">{award.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{award.event}</p>
                      {award.year && (
                        <p className={`text-xs font-semibold ${award.iconColor} mt-1`}>{award.year}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.9)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 p-2 text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full rounded-2xl"
                style={{ objectFit: 'contain', maxHeight: '80vh' }}
              />
              <p className="text-center text-sm text-muted-foreground mt-4">{lightbox.title} · {lightbox.event} {lightbox.year}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}