import React from 'react';
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SuperpowersSection from '../components/portfolio/SuperpowersSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import TechStackSection from '../components/portfolio/TechStackSection';
import ImpactSection from '../components/portfolio/ImpactSection';
import AwardsSection from '../components/portfolio/AwardsSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SuperpowersSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechStackSection />
      <ImpactSection />
      <AwardsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}