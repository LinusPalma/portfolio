import { useState, useEffect, useRef } from 'react';

const PortfolioPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll-Position tracken
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const position = containerRef.current.scrollTop;
      setScrollPosition(position);
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer für Sektionen
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionIndex = Number(entry.target.getAttribute('data-section'));
          if (!isNaN(sectionIndex)) {
            setCurrentSection(sectionIndex);
          }
        }
      });
    }, options);

    document.querySelectorAll('.snap-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    document.querySelector(`[data-section="${index}"]`)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Name-Header Transform Berechnung
  const transformThreshold = window.innerHeight * 0.3;
  const progress = Math.min(1, scrollPosition / transformThreshold);
  
  const nameHeaderStyle = {
    transform: `
      translate(
        ${-50 + progress * 50}%,
        ${-50 + progress * 50}%
      )
      scale(${1 - progress * 0.4})
    `,
    position: 'fixed' as const,
    top: progress === 1 ? '24px' : '50%',
    left: progress === 1 ? '24px' : '50%',
    zIndex: 50,
    transition: 'all 0.3s ease-out'
  };

  // Section-Header Transform Berechnung
  const sectionProgress = Math.max(0, Math.min(1, (scrollPosition - window.innerHeight) / transformThreshold));
  
  const sectionHeaderStyle = {
    position: 'fixed' as const,
    top: '24px',
    left: '50%',
    transform: `
      translate(-50%, ${sectionProgress < 0.5 ? '100vh' : '0'})
      scale(${sectionProgress})
    `,
    opacity: sectionProgress,
    zIndex: 40,
    transition: 'all 0.3s ease-out'
  };

  // Wheel Event Handler für smooth continuous scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      const currentScroll = container.scrollTop;
      const sections = document.querySelectorAll('.snap-section');
      const sectionHeight = window.innerHeight;
      
      // Berechne aktuelle und nächste Section
      const currentSectionIndex = Math.round(currentScroll / sectionHeight);
      const nextSectionIndex = delta > 0 
        ? Math.min(currentSectionIndex + 1, sections.length - 1)
        : Math.max(currentSectionIndex - 1, 0);
      
      // Smooth scroll zur nächsten Section
      container.scrollTo({
        top: nextSectionIndex * sectionHeight,
        behavior: 'smooth'
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Touch Events für mobile Geräte
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEnd = e.changedTouches[0].screenY;
      const delta = touchStart - touchEnd;
      
      const sections = document.querySelectorAll('.snap-section');
      const sectionHeight = window.innerHeight;
      const currentSectionIndex = Math.round(container.scrollTop / sectionHeight);
      
      // Mindestens 50px swipe erforderlich
      if (Math.abs(delta) > 50) {
        const nextSectionIndex = delta > 0
          ? Math.min(currentSectionIndex + 1, sections.length - 1)
          : Math.max(currentSectionIndex - 1, 0);

        container.scrollTo({
          top: nextSectionIndex * sectionHeight,
          behavior: 'smooth'
        });
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto scroll-smooth"
      style={{
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory'
      }}
    >
      {/* Name Header - bleibt oben links */}
      <div 
        className="text-center pointer-events-none"
        style={nameHeaderStyle}
      >
        <h1 className="text-4xl font-bold mb-2 text-blue-900">Maria Muster</h1>
        <h2 className="text-xl text-blue-600">Musterberuf</h2>
      </div>

      {/* Section Header - wandert nach oben */}
      <div
        className="text-center pointer-events-none"
        style={sectionHeaderStyle}
      >
        <h2 className="text-2xl font-bold text-blue-900">
          {currentSection === 2 ? 'Berufliche Laufbahn' :
           currentSection === 3 ? 'Bildungsabschlüsse' :
           currentSection === 4 ? 'Soft Skills' :
           currentSection === 5 ? 'Hobbys' : ''}
        </h2>
      </div>

      {/* Landing Section */}
      <section 
        data-section="0"
        className="snap-section h-screen flex items-center justify-center snap-start bg-gradient-to-br from-blue-50 to-white relative"
      >
        <div className="invisible">
          <h1 className="text-6xl font-bold mb-4">Maria Muster</h1>
          <h2 className="text-2xl text-gray-600">Musterberuf</h2>
        </div>
      </section>

      {/* Inhaltsübersicht */}
      <section 
        data-section="1"
        className="snap-section h-screen flex items-center justify-center snap-start bg-white relative"
      >
        <div className="max-w-4xl w-full px-6">
          <div className="space-y-8">
            {[
              { title: 'Berufliche Laufbahn', index: 2 },
              { title: 'Bildungsabschlüsse', index: 3 },
              { title: 'Soft Skills', index: 4 },
              { title: 'Hobbys', index: 5 }
            ].map((item) => (
              <div 
                key={item.title}
                onClick={() => scrollToSection(item.index)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-2xl text-blue-800 group-hover:text-blue-600 flex items-center">
                  <span className="mr-4 opacity-50">{item.index - 1}</span>
                  {item.title}
                  <span className="ml-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                    →
                  </span>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berufliche Laufbahn */}
      <section 
        data-section="2"
        className="snap-section h-screen flex items-center justify-center snap-start bg-white relative"
      >
        <div className="max-w-4xl w-full px-6">
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-blue-800">Musterberuf</h3>
              <p className="text-blue-600">2020 - Heute</p>
              <p className="mt-4">Beschreibung deiner Tätigkeit...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bildungsabschlüsse */}
      <section 
        data-section="3"
        className="snap-section h-screen flex items-center justify-center snap-start bg-gradient-to-br from-blue-50 to-white relative"
      >
        <div className="max-w-4xl w-full px-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-blue-800">Bachelor in Musterfach</h3>
              <p className="text-blue-600">2015 - 2018</p>
            </div>
          </div>
        </div>
      </section>

      {/* Soft Skills */}
      <section 
        data-section="4"
        className="snap-section h-screen flex items-center justify-center snap-start bg-white relative"
      >
        <div className="max-w-4xl w-full px-6">
          <div className="grid grid-cols-2 gap-6">
            {['Teamführung', 'Projektmanagement', 'Kommunikation', 'Problemlösung'].map((skill) => (
              <div 
                key={skill}
                className="bg-blue-50 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 text-blue-800 font-semibold"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbys */}
      <section 
        data-section="5"
        className="snap-section h-screen flex items-center justify-center snap-start bg-gradient-to-br from-blue-50 to-white relative"
      >
        <div className="max-w-4xl w-full px-6">
          <h2 className="text-3xl font-bold mb-8 text-blue-900">Hobbys</h2>
          <div className="grid grid-cols-2 gap-6">
            {['Fotografie', 'Reisen', 'Sport', 'Musik'].map((hobby) => (
              <div 
                key={hobby}
                className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 text-blue-800 font-semibold"
              >
                {hobby}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 space-y-4">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-blue-500 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;