import React from 'react';
import useLenis from '../hooks/useLenis';
import Navbar from '../components/portfolio/Navbar';
import HeroScaleTransition from '../components/portfolio/HeroScaleTransition';
import IndustriesSection from '../components/portfolio/IndustriesSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import WhyHireMeSection from '../components/portfolio/WhyHireMeSection';
import SkillGalaxy from '../components/portfolio/SkillGalaxy';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import TeamPlayerSection from '../components/portfolio/TeamPlayerSection';
import SuperpowersSection from '../components/portfolio/SuperpowersSection';
import AwardsSection from '../components/portfolio/AwardsSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';
import FloatingResumeCTA from '../components/portfolio/FloatingResumeCTA';

export default function Home() {
  useLenis();
  return (
    <div className="min-h-screen bg-background font-body text-foreground overflow-x-hidden">
      <Navbar />
      {/* 1+2. Hero → Scale cinematic transition */}
      <HeroScaleTransition />
      {/* 3. Industries — where the work happens */}
      <IndustriesSection />
      {/* 4. The Systems I Built — visual project cards */}
      <ProjectsSection />
      {/* 5. Why Hire Me — animated proof charts */}
      <WhyHireMeSection />
      {/* 6. Skill Galaxy — interactive 3D orbs */}
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