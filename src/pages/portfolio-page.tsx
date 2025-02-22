import { useState, useRef, useCallback, RefObject } from 'react';
import { useTouch, useSectionObserver, useScrollPosition } from '@/hooks';
import { CareerSection, EducationSection, HobbiesSection, LandingSection, OverviewSection, SkillsSection } from '@/components/sections';
import { Header } from '@components/header';
import { NavigationDots } from '@components/navigation/navigation-dots';

const PortfolioPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((index: number) => {
    document.querySelector(`[data-section="${index}"]`)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const { scrollToCareerSlide } = useScrollPosition({
    containerRef,
    currentSection,
    setScrollPosition,
    scrollToSection,
  });

  useSectionObserver({
    containerRef: containerRef as RefObject<HTMLElement>,
    onSectionChange: setCurrentSection,
  });

  useTouch({
    containerRef,
    enableSectionSnap: true
  });

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto scroll-smooth"
      style={{
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory'
      }}
    >
      <Header 
        scrollPosition={scrollPosition}
        currentSection={currentSection}
      />

      <LandingSection />
      <OverviewSection scrollToSection={scrollToSection} />
      <CareerSection scrollToCareerSlide={scrollToCareerSlide} />
      <EducationSection />
      <SkillsSection />
      <HobbiesSection />

      <NavigationDots
        currentSection={currentSection}
        totalSections={6}
        onDotClick={scrollToSection}
      />
    </div>
  );
};

export default PortfolioPage;
