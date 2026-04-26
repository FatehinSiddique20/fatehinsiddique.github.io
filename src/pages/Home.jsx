import React from 'react';
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import TheScaleSection from '../components/portfolio/TheScaleSection';
import IndustriesSection from '../components/portfolio/IndustriesSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import WhyHireMeSection from '../components/portfolio/WhyHireMeSection';
import ImpactSection from '../components/portfolio/ImpactSection';
import SkillGalaxy from '../components/portfolio/SkillGalaxy';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import TeamPlayerSection from '../components/portfolio/TeamPlayerSection';
import SuperpowersSection from '../components/portfolio/SuperpowersSection';
import AwardsSection from '../components/portfolio/AwardsSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';
import FloatingResumeCTA from '../components/portfolio/FloatingResumeCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground overflow-x-hidden">
      <Navbar />
      {/* 1. Hero — cinematic opening */}
      <HeroSection />
      {/* 2. The Scale — operating context */}
      <TheScaleSection />
      {/* 3. Industries — where the work happens */}
      <IndustriesSection />
      {/* 4. The Systems I Built — visual project cards */}
      <ProjectsSection />
      {/* 5. Why Hire Me — animated proof charts */}
      <WhyHireMeSection />
      {/* 6. The Impact — animated counters */}
      <ImpactSection />
      {/* 7. Skill Galaxy — interactive 3D orbs */}
      <SkillGalaxy />
      {/* 8. Experience timeline */}
      <ExperienceSection />
      {/* 9. Team Player — collaboration network */}
      <TeamPlayerSection />
      {/* 10. Superpowers — core capabilities */}
      <SuperpowersSection />
      {/* 11. Awards */}
      <AwardsSection />
      {/* 12. Contact */}
      <ContactSection />
      <Footer />
      <FloatingResumeCTA />
    </div>
  );
}