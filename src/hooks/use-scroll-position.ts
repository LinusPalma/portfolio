import { useEffect, useCallback, RefObject, useState } from 'react';
import { ScrollHelper } from '@/utils/scroll-helpers';

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
      
      if (ScrollHelper.isScrollDebounced(lastScrollTime)) return;
      setLastScrollTime(Date.now());

      const { section: careerSection, horizontalContainer } = ScrollHelper.getCareerSectionElements();
      const isCareerSection = careerSection?.getAttribute('data-section') === '2';
      
      if (isCareerSection && horizontalContainer) {
        const scrollDirection = ScrollHelper.getDominantScrollDirection(e.deltaX, e.deltaY);
        const scrollDelta = scrollDirection === 'horizontal' ? e.deltaX : e.deltaY;

        if (isHorizontalScrolling || scrollDirection === 'horizontal') {
          setIsHorizontalScrolling(true);

          if (ScrollHelper.isHorizontalScrollEnd(horizontalContainer, scrollDelta)) {
            setIsHorizontalScrolling(false);
            scrollToSection(3);
          } else if (ScrollHelper.isHorizontalScrollStart(horizontalContainer, scrollDelta)) {
            setIsHorizontalScrolling(false);
            scrollToSection(1);
          } else {
            horizontalContainer.scrollTo({
              left: horizontalContainer.scrollLeft + scrollDelta,
              behavior: 'smooth'
            });
          }
          return;
        }
      } else {
        setIsHorizontalScrolling(false);
      }

      const currentSectionIndex = Math.round(container.scrollTop / ScrollHelper.SECTION_HEIGHT);
      const nextSectionIndex = ScrollHelper.calculateNextSectionIndex(currentSectionIndex, e.deltaY, 5);

      container.scrollTo({
        top: nextSectionIndex * ScrollHelper.SECTION_HEIGHT,
        behavior: 'smooth'
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [currentSection, scrollToSection, containerRef, lastScrollTime, isHorizontalScrolling]);

  const scrollToCareerSlide = useCallback((slideIndex: number) => {
    const { horizontalContainer } = ScrollHelper.getCareerSectionElements();
    if (horizontalContainer) {
      horizontalContainer.scrollTo({
        left: ScrollHelper.SLIDE_WIDTH * slideIndex,
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    scrollToCareerSlide
  };
};
