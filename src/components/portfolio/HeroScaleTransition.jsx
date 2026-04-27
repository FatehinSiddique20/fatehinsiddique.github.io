import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from './HeroSection';
import TheScaleSection from './TheScaleSection';

/**
 * Scroll container is 200vh.
 * Scale sits sticky at top (bottom layer).
 * Hero sits on top as an absolute overlay, slides upward as you scroll.
 */
export default function HeroScaleTransition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 0 → scroll starts, 1 → container top hits viewport top (scrolled 100vh)
  const heroY = useTransform(scrollYProgress, [0, 1], ['0vh', '-100vh']);

  return (
    <div ref={containerRef} style={{ height: '200vh', position: 'relative' }}>

      {/* BOTTOM LAYER: Scale — sticky, always visible underneath */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <TheScaleSection />
      </div>

      {/* TOP LAYER: Hero — absolute, starts at top, slides up on scroll */}
      <motion.div
        style={{
          y: heroY,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
        }}
      >
        <HeroSection />
      </motion.div>
    </div>
  );
}