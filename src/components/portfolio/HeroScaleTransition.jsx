import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './HeroSection';
import TheScaleSection from './TheScaleSection';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScaleTransition() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const tween = gsap.to(hero, {
      yPercent: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Scale section sits beneath the hero */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 1 }}>
        <TheScaleSection />
      </div>

      {/* Hero pinned on top, slides up via GSAP */}
      <div ref={heroRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 2 }}>
        <HeroSection />
      </div>
    </div>
  );
}