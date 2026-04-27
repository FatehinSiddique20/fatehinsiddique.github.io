import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from './HeroSection';
import TheScaleSection from './TheScaleSection';

/**
 * Layer 1 (top): Hero — slides UP and away on scroll
 * Layer 2 (bottom): Scale — stays fixed underneath, revealed as Hero leaves
 */
export default function HeroScaleTransition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Hero slides up and out
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

  return (
    // Container is 200vh so there's scroll room for the transition
    <div ref={containerRef} style={{ height: '200vh' }}>
      {/* Scale section — fixed at top, always underneath */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <TheScaleSection />
      </div>

      {/* Hero — absolutely positioned on top, slides up on scroll */}
      <motion.div
        style={{ y: heroY }}
        className="fixed top-0 left-0 w-full z-20 will-change-transform"
      >
        <HeroSection />
      </motion.div>
    </div>
  );
}