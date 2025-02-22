import { useEffect, useCallback, RefObject, useState } from 'react';

interface UseScrollPositionProps {
  containerRef: RefObject<HTMLDivElement | null>;
  currentSection: number;
  setScrollPosition: (position: number) => void;
  scrollToSection: (index: number) => void;
}

export const useScrollPosition = ({
  containerRef,
  currentSection,
  setScrollPosition,
  scrollToSection,
}: UseScrollPositionProps) => {
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  // Track scroll position
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
  }, [containerRef, setScrollPosition]);

  // Handle wheel events for vertical and horizontal scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTime < 50) return; // Debounce schnelle Scroll-Events
      setLastScrollTime(now);

      const currentSectionElement = document.querySelector(`[data-section="${currentSection}"]`);
      const isCareerSection = currentSectionElement?.getAttribute('data-section') === '2';
      
      if (isCareerSection) {
        const horizontalContainer = currentSectionElement.querySelector('.overflow-x-auto') as HTMLElement;
        if (horizontalContainer) {
          const maxScroll = horizontalContainer.scrollWidth - horizontalContainer.clientWidth;
          const currentScroll = horizontalContainer.scrollLeft;
          
          // Bestimme die dominante Scroll-Richtung
          const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
          const scrollDelta = isHorizontalScroll ? e.deltaX : e.deltaY;

          // Wenn wir bereits horizontal scrollen, behalten wir diese Richtung bei
          if (isHorizontalScrolling || isHorizontalScroll) {
            setIsHorizontalScrolling(true);
            
            const newScrollPosition = currentScroll + scrollDelta;

            // Prüfe ob wir am Ende oder Anfang des horizontalen Scrolls sind
            if (scrollDelta > 0 && currentScroll >= maxScroll - 1) {
              setIsHorizontalScrolling(false);
              scrollToSection(3);
            } else if (scrollDelta < 0 && currentScroll <= 0) {
              setIsHorizontalScrolling(false);
              scrollToSection(1);
            } else {
              horizontalContainer.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
              });
            }
            return;
          }
        }
      } else {
        // Reset horizontal scrolling state when leaving career section
        setIsHorizontalScrolling(false);
      }

      // Vertikales Scrollen für andere Sektionen
      const sectionHeight = window.innerHeight;
      const currentSectionIndex = Math.round(container.scrollTop / sectionHeight);
      const nextSectionIndex = e.deltaY > 0 
        ? Math.min(currentSectionIndex + 1, 5)
        : Math.max(currentSectionIndex - 1, 0);

      container.scrollTo({
        top: nextSectionIndex * sectionHeight,
        behavior: 'smooth'
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [currentSection, scrollToSection, containerRef, lastScrollTime, isHorizontalScrolling]);

  const scrollToCareerSlide = useCallback((slideIndex: number) => {
    const careerSection = document.querySelector('[data-section="2"]');
    const horizontalContainer = careerSection?.querySelector('.overflow-x-auto') as HTMLElement;
    if (horizontalContainer) {
      const slideWidth = window.innerWidth;
      horizontalContainer.scrollTo({
        left: slideWidth * slideIndex,
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    scrollToCareerSlide
  };
};
