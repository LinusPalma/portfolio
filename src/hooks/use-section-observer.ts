import { useEffect, RefObject } from 'react';

interface UseSectionObserverProps {
  containerRef: RefObject<HTMLElement>;
  onSectionChange: (sectionIndex: number) => void;
}

export const useSectionObserver = ({
  containerRef,
  onSectionChange,
}: UseSectionObserverProps) => {
  useEffect(() => {
    if (!containerRef.current) return;
    
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
            onSectionChange(sectionIndex);
          }
        }
      });
    }, options);

    document.querySelectorAll('.snap-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [containerRef, onSectionChange]);
};