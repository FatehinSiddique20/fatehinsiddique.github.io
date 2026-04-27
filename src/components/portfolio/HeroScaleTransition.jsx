import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from './HeroSection';
import TheScaleSection from './TheScaleSection';

/**
 * Wraps Hero + Scale in a scroll-driven cinematic transition:
 * - Hero compresses vertically (scaleY) and fades out as you scroll
 * - Scale section slides up from below and sticks briefly (sticky feel)
 */
export default function HeroScaleTransition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Hero: scale down and fade out as user scrolls through transition zone
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.88]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.35], ['0%', '-8%']);

  // Scale section: slide up into view
  const scaleY = useTransform(scrollYProgress, [0.1, 0.45], ['60px', '0px']);
  const scaleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero — pinned with compression effect */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative origin-top"
      >
        <HeroSection />
      </motion.div>

      {/* Scale section — slides up with a cinematic entrance */}
      <motion.div
        style={{ y: scaleY, opacity: scaleOpacity }}
        className="relative z-10"
      >
        <TheScaleSection />
      </motion.div>
    </div>
  );
}