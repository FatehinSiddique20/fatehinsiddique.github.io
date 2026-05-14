import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, BarChart2, FileDown, Users, TrendingUp, Package, Star } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import InteractivePortraitHero from './InteractivePortraitHero';

const PHOTO_URL = 'https://media.base44.com/images/public/69ecf4e8453eee0057e250fb/9c72b3a69_fatehindp.jpg';
const RESUME_URL = 'https://media.base44.com/files/public/69ecf4e8453eee0057e250fb/e392c0f28_Fatehin_Resume_2026.pdf';

function handleResumeDownload() {
  base44.analytics.track({ eventName: 'resume_download_click', properties: { source: 'hero' } });
  const a = document.createElement('a');
  a.href = RESUME_URL;
  a.download = 'Fatehin_Resume_2026.pdf';
  a.target = '_blank';
  a.click();
}

// Simple typing effect — no delete/retype to keep it lightweight
const SUBTITLE = 'Building AI-driven decision systems at telecom scale.';

function TypingSubtitle() {
  const [shown, setShown] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(SUBTITLE.slice(0, i));
      if (i >= SUBTITLE.length) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="font-mono text-sm text-white/50 min-h-[1.4rem]">
      {shown}<span className="inline-block w-0.5 h-[1em] bg-cyan-400 ml-0.5 align-middle opacity-75" />
    </p>
  );
}

const metrics = [
  { icon: Users, value: '40M+', title: 'Subscribers', accent: '#06b6d4' },
  { icon: Package, value: '14%', title: 'Stock Outage Reduction', accent: '#f97316' },
  { icon: TrendingUp, value: '25%', title: 'MAU Growth', accent: '#10b981' },
  { icon: Star, value: '50%', title: 'Creator Growth', accent: '#8b5cf6' },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 35% 40%,#020c22 0%,#010208 55%,#06001a 100%)' }}
    >
      {/* Static background gradient — no animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.06) 0%,transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* TEXT */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase">Available for opportunities</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading font-black leading-[1.05] tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
            >
              <span className="block text-white">I build AI systems</span>
              <span className="block text-white">that replace</span>
              <span className="block" style={{
                background: 'linear-gradient(135deg,#06b6d4 20%,#8b5cf6 60%,#f97316 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>decisions —</span>
              <span className="block text-white/50 text-[0.72em]">not just dashboards.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-sm md:text-base text-white/50 leading-relaxed mb-4 max-w-md"
            >
              Data Science Manager at Banglalink, building AI, BI, and data systems powering decisions across a{' '}
              <span style={{ color: '#06b6d4' }}>40M+ subscriber</span> telecom ecosystem.
            </motion.p>

            {/* Typing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-8"
            >
              <TypingSubtitle />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-row gap-3 flex-wrap"
            >
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm tracking-wide transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#0891b2,#1d4ed8,#7c3aed)', border: '1px solid rgba(6,182,212,0.4)' }}
              >
                <Mail className="w-4 h-4" /> Hire Me
              </a>
              <a href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-opacity hover:opacity-90"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }}
              >
                <BarChart2 className="w-4 h-4" /> View Projects
              </a>
              <button onClick={handleResumeDownload}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-opacity hover:opacity-90"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.6)' }}
              >
                <FileDown className="w-4 h-4" /> Resume
              </button>
            </motion.div>
          </div>

          {/* PHOTO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <InteractivePortraitHero imageSrc={PHOTO_URL} />
          </motion.div>
        </div>

        {/* Metric cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 border"
              style={{ background: `linear-gradient(135deg,rgba(0,0,0,0.5),${m.accent}10)`, borderColor: `${m.accent}28` }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${m.accent}18`, border: `1px solid ${m.accent}28` }}>
                <m.icon className="w-3.5 h-3.5" style={{ color: m.accent }} />
              </div>
              <div className="font-heading font-black text-2xl mb-0.5" style={{ color: m.accent }}>{m.value}</div>
              <div className="text-xs font-bold text-white/60">{m.title}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-40">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-cyan-400 rounded-full" />
        <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-cyan-400">Scroll</p>
      </div>
    </section>
  );
}