import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from './HeroSection';
import TheScaleSection from './TheScaleSection';

/**
 * Curtain / shutter reveal:
 *
 * The outer div is 200vh tall. Inside it:
 *  - Scale sits sticky at top (layer 1, z-10)
 *  - Hero sits sticky at top (layer 2, z-20), pulled up to overlap Scale
 *    via a negative margin
 *
 * As the user scrolls, useScroll tracks [0 → 1] across the 200vh container.
 * heroY goes from 0% → -100%, lifting Hero off screen and revealing Scale.
 * After 200vh is consumed, the rest of the page scrolls normally.
 */
export default function HeroScaleTransition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const scaleY = useTransform(scrollYProgress, [0, 1], ['3%', '0%']);

  return (
    <div ref={containerRef} style={{ height: '200vh', position: 'relative' }}>

      {/* ── Scale — bottom sticky layer ──────────────────────────────── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 10 }}>
        <motion.div style={{ y: scaleY }} className="w-full h-full">
          <TheScaleSection />
        </motion.div>
      </div>

      {/* ── Hero — top sticky layer, overlaps Scale, then slides away ── */}
      {/*
        margin-top: -100vh pulls the Hero div back up over Scale.
        position:sticky + top:0 means it stays pinned while we're
        in the 200vh window. translateY drives it off screen.
      */}
      <motion.div
        style={{
          y: heroY,
          marginTop: '-100vh',
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          zIndex: 20,
          willChange: 'transform',
        }}
      >
        <HeroSection />
      </motion.div>
    </div>
  );
}