// This component is no longer needed — Hero and Scale are normal stacked sections.
// Kept as a passthrough to avoid breaking any potential imports.
import React from 'react';
import HeroSection from './HeroSection';
import TheScaleSection from './TheScaleSection';

export default function HeroScaleTransition() {
  return (
    <>
      <HeroSection />
      <TheScaleSection />
    </>
  );
}