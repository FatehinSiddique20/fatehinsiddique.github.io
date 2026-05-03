import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Linkedin } from 'lucide-react';
import { useScrollReveal } from './useScrollReveal';

const EASING = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    name: 'Shupriya Kumar Nath',
    role: 'Amazon Web Services (AWS)',
    context: 'Media & Telecommunications | Cloud Solution Architecture | Video Streaming | Telecom BSS | CDN',
    relationship: 'Senior colleague at Banglalink',
    date: 'May 25, 2023',
    quote:
      "Fatehin consistently displayed a deep understanding of data management, analysis, and visualization. His ability to transform raw data into meaningful insights has been instrumental in driving strategic decision-making.",
    chips: ['Data Management', 'Reporting Automation', 'Visualization', 'Strategic Insights'],
    linkedin: 'https://www.linkedin.com/in/shupriya/',
    ariaLabel: 'Open Shupriya Kumar Nath recommendation on LinkedIn',
    accent: '#06b6d4',
    logoUrl: 'https://logo.clearbit.com/amazon.com',
    logoAlt: 'Amazon Web Services',
  },
  {
    name: 'Abu Saleh',
    role: 'Strategic Partnership @ Google',
    context: 'Ex-Product Manager, Toffee | HFI Certified Usability Analyst | Product & Partnership Strategy',
    relationship: 'Former direct manager',
    date: 'June 29, 2021',
    quote:
      "Fatehin's knack for analytics and reporting is unparalleled. He has a unique capability of infusing business sense into data analytics, which produces great results.",
    chips: ['Business Sense', 'Product Analytics', 'Customer Insight', 'Growth Mindset'],
    linkedin: 'https://www.linkedin.com/in/saleh92/',
    ariaLabel: 'Open Abu Saleh recommendation on LinkedIn',
    accent: '#8b5cf6',
    logoUrl: 'https://logo.clearbit.com/google.com',
    logoAlt: 'Google',
  },
  {
    name: 'Rifah T Tanmee',
    role: 'Product Manager',
    context: 'Scale: 10M+ users | OTT · Telecom · B2B | CSPO®',
    relationship: 'Product teammate',
    date: 'October 20, 2024',
    quote:
      "Fatehin is very good at identifying root causes for bugs, glitches, or any problem of that sort. He brings proactiveness to problem solving and makes the team stronger.",
    chips: ['Root Cause Analysis', 'Problem Solving', 'Upskilling', 'Team Collaboration'],
    linkedin: 'https://www.linkedin.com/in/rifahtasfia/?skipRedirect=true',
    ariaLabel: 'Open Rifah T Tanmee recommendation on LinkedIn',
    accent: '#06b6d4',
    logoUrl: 'https://logo.clearbit.com/bracit.com.bd',
    logoAlt: 'BRAC IT',
  },
  {
    name: 'Shaikh Shawon Arefin Shimon',
    role: 'CS/HCI PhD Candidate, University of Waterloo',
    context: 'Human-Computer Interaction | Future Interfaces & Wearables | Lecturer, North South University',
    relationship: 'Academic mentor',
    date: 'July 5, 2021',
    quote:
      "Fatehin was at the top 10% of the class and showed a steady habit of on-time delivery and incremental development.",
    chips: ['Top 10%', 'On-time Delivery', 'Computer Science Foundation', 'Incremental Development'],
    linkedin: 'https://www.linkedin.com/in/shawonarefin/',
    ariaLabel: 'Open Shaikh Shawon Arefin Shimon recommendation on LinkedIn',
    accent: '#8b5cf6',
    logoUrl: 'https://logo.clearbit.com/uwaterloo.ca',
    logoAlt: 'University of Waterloo',
  },
];

function TestimonialCard({ t, index }) {
  const dragStartX = useRef(null);

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };

  const handleClick = (e) => {
    const endX = e.clientX;
    const delta = Math.abs(endX - (dragStartX.current ?? endX));
    if (delta > 8) return; // was a drag, not a click
    window.open(t.linkedin, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(t.linkedin, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="carousel-card flex-shrink-0 glass rounded-2xl p-6 md:p-7 flex flex-col gap-4 cursor-pointer group transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        border: `1px solid ${t.accent}30`,
        boxShadow: `0 0 0 0 ${t.accent}00`,
      }}
      role="article"
      tabIndex={0}
      aria-label={t.ariaLabel}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `1px solid ${t.accent}60`;
        e.currentTarget.style.boxShadow = `0 0 20px ${t.accent}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = `1px solid ${t.accent}30`;
        e.currentTarget.style.boxShadow = `0 0 0 0 ${t.accent}00`;
      }}
    >
      {/* Quote icon */}
      <div className="flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${t.accent}18` }}
        >
          <Quote className="w-4 h-4" style={{ color: t.accent }} />
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">{t.date}</span>
      </div>

      {/* Quote text */}
      <p className="text-sm md:text-base text-foreground/85 leading-relaxed font-medium flex-1">
        "{t.quote}"
      </p>

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5">
        {t.chips.map((chip, i) => (
          <span
            key={i}
            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: `${t.accent}15`, color: t.accent, border: `1px solid ${t.accent}30` }}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border/30" />

      {/* Author */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-heading font-bold text-sm text-foreground truncate">{t.name}</p>
          <p className="text-xs font-semibold mt-0.5" style={{ color: t.accent }}>{t.role}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">{t.context}</p>
          <span
            className="inline-block mt-1.5 px-2 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wide"
            style={{ background: `${t.accent}12`, color: t.accent }}
          >
            {t.relationship}
          </span>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {/* Company logo */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border border-border/30 bg-white/5"
            title={t.logoAlt}
          >
            <img
              src={t.logoUrl}
              alt={t.logoAlt}
              className="w-7 h-7 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          {/* LinkedIn label */}
          <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
            <Linkedin className="w-3 h-3 text-[#0A66C2]" />
            <span className="text-[9px] text-muted-foreground font-medium whitespace-nowrap">LinkedIn</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [sectionRef, isVisible] = useScrollReveal(0.1);
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const rafRef = useRef(null);

  const totalCards = testimonials.length;

  // Determine how many cards are visible based on container width
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (!trackRef.current) return;
      const w = trackRef.current.parentElement?.offsetWidth ?? window.innerWidth;
      if (w >= 1280) setCardsPerPage(2);
      else if (w >= 1024) setCardsPerPage(2);
      else if (w >= 640) setCardsPerPage(1); // tablet shows 1.5 visually via card width
      else setCardsPerPage(1);
    };
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const maxIndex = Math.max(0, totalCards - cardsPerPage);

  const scrollToIndex = useCallback((idx) => {
    if (!trackRef.current) return;
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    const cards = trackRef.current.querySelectorAll('.carousel-card');
    if (!cards[clamped]) return;
    const cardEl = cards[clamped];
    const trackLeft = trackRef.current.getBoundingClientRect().left;
    const cardLeft = cardEl.getBoundingClientRect().left;
    const scrollOffset = trackRef.current.scrollLeft + (cardLeft - trackLeft);
    trackRef.current.scrollTo({ left: scrollOffset, behavior: 'smooth' });
    setCurrentIndex(clamped);
  }, [maxIndex]);

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  // Sync pagination dots with scroll position (throttled)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!trackRef.current) return;
        const cards = trackRef.current.querySelectorAll('.carousel-card');
        const trackLeft = trackRef.current.getBoundingClientRect().left;
        let closest = 0;
        let minDist = Infinity;
        cards.forEach((card, i) => {
          const dist = Math.abs(card.getBoundingClientRect().left - trackLeft);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        setCurrentIndex(Math.min(closest, maxIndex));
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [maxIndex]);

  // Keyboard navigation on the carousel region
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
  };

  const dotCount = maxIndex + 1;

  return (
    <section id="testimonials" className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASING }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Social Proof
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-4">
            What Leaders Say About <span className="text-gradient">My Work</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            LinkedIn recommendations from managers, product leaders, teammates, and mentors who have worked with me across analytics, automation, product problem-solving, and data-driven execution.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASING }}
        >
          {/* Arrow + Track wrapper */}
          <div
            className="relative"
            role="region"
            aria-label="LinkedIn recommendations carousel"
            onKeyDown={handleKeyDown}
          >
            {/* Left arrow */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous recommendation"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 hidden md:flex w-10 h-10 rounded-full glass border border-border/50 items-center justify-center transition-all duration-200 hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right arrow */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next recommendation"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 hidden md:flex w-10 h-10 rounded-full glass border border-border/50 items-center justify-center transition-all duration-200 hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scrollable track */}
            <div
              ref={trackRef}
              className="flex gap-5 overflow-x-auto pb-2"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <style>{`.carousel-track::-webkit-scrollbar { display: none; }`}</style>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={{ scrollSnapAlign: 'start', flex: '0 0 var(--card-w)' }}
                  className="[--card-w:88%] sm:[--card-w:68%] lg:[--card-w:48%] xl:[--card-w:47%]"
                >
                  <TestimonialCard t={t} index={i} />
                </div>
              ))}
              {/* Trailing spacer so last card snaps cleanly */}
              <div className="flex-shrink-0 w-1" aria-hidden="true" />
            </div>
          </div>

          {/* Mobile arrows + pagination dots */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {/* Mobile prev */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous recommendation"
              className="md:hidden flex w-8 h-8 rounded-full glass border border-border/50 items-center justify-center transition-all duration-200 hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Carousel pages">
              {Array.from({ length: dotCount }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Go to recommendation ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === currentIndex ? 20 : 7,
                    height: 7,
                    background: i === currentIndex ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.35)',
                  }}
                />
              ))}
            </div>

            {/* Mobile next */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next recommendation"
              className="md:hidden flex w-8 h-8 rounded-full glass border border-border/50 items-center justify-center transition-all duration-200 hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}