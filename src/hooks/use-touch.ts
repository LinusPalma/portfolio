import { useEffect } from 'react';

interface UseTouchProps {
  containerRef: React.RefObject<HTMLElement | null>;
  onSwipe?: (direction: 'up' | 'down') => void;
  minSwipeDistance?: number;
  enableSectionSnap?: boolean;
  sectionHeight?: number;
}

export const useTouch = ({ 
  containerRef, 
  onSwipe, 
  minSwipeDistance = 1500,
  enableSectionSnap = false,
  sectionHeight = window.innerHeight
}: UseTouchProps) => {
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
      
      if (Math.abs(delta) > minSwipeDistance) {
        const direction = delta > 0 ? 'up' : 'down';
        
        if (onSwipe) {
          onSwipe(direction);
        }

        if (enableSectionSnap) {
          const currentSectionIndex = Math.round(container.scrollTop / sectionHeight);
          const nextSectionIndex = direction === 'up'
            ? Math.min(currentSectionIndex + 1, document.querySelectorAll('.snap-section').length - 1)
            : Math.max(currentSectionIndex - 1, 0);

          container.scrollTo({
            top: nextSectionIndex * sectionHeight,
            behavior: 'smooth'
          });
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, onSwipe, minSwipeDistance, enableSectionSnap, sectionHeight]);
};
