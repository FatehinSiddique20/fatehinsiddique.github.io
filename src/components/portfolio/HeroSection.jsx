import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Coffee, FolderOpen, FileDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const trustBadges = [
  '40M+ Subscriber Ecosystem',
  '14% Stock Runout Reduction',
  '25% MAU Growth',
  '50% Creator Participation Growth',
  '20+ Hours/Month Automation Saved',
];

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-hero z-[1]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow z-[1]" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Data Science Manager at Banglalink Digital
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6"
            >
              <span className="text-foreground">Fatehin Siddique</span>
              <br />
              <span className="text-gradient">Chowdhury</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-foreground/80 font-medium mb-4 max-w-2xl mx-auto lg:mx-0"
            >
              Data Science Manager building AI-driven decision systems at telecom scale.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              I design and deploy machine learning models, LLM-powered analytics tools, personalization engines, and scalable data pipelines across a 40M+ subscriber ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
            >
              <a href="#contact" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5">
                <Mail className="w-4 h-4" />
                Hire Me
              </a>
              <a href="#contact" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-foreground/90 font-semibold text-sm hover:bg-muted/60 transition-all duration-300 hover:-translate-y-0.5">
                <Coffee className="w-4 h-4" />
                Let's Get Coffee
              </a>
              <a href="#projects" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-foreground/90 font-semibold text-sm hover:bg-muted/60 transition-all duration-300 hover:-translate-y-0.5">
                <FolderOpen className="w-4 h-4" />
                View Projects
              </a>
              <a href="#" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-foreground/90 font-semibold text-sm hover:bg-muted/60 transition-all duration-300 hover:-translate-y-0.5">
                <FileDown className="w-4 h-4" />
                Download Resume
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {trustBadges.map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted/40 text-xs font-medium text-muted-foreground border border-border/50"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full glass overflow-hidden flex items-center justify-center animate-float">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-muted/50 flex items-center justify-center">
                    <span className="text-2xl font-heading font-bold text-gradient">FC</span>
                  </div>
                  <p className="text-xs">Photo placeholder</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}