export class ScrollHelper {
  static readonly DEBOUNCE_TIME = 50;
  static readonly SECTION_HEIGHT = window.innerHeight;
  static readonly SLIDE_WIDTH = window.innerWidth;

  static isScrollDebounced(lastScrollTime: number): boolean {
    return Date.now() - lastScrollTime < this.DEBOUNCE_TIME;
  }

  static calculateNextSectionIndex(currentIndex: number, deltaY: number, maxSections: number): number {
    return deltaY > 0
      ? Math.min(currentIndex + 1, maxSections)
      : Math.max(currentIndex - 1, 0);
  }

  static isHorizontalScrollEnd(container: HTMLElement, deltaX: number): boolean {
    const maxScroll = container.scrollWidth - container.clientWidth;
    return deltaX > 0 && container.scrollLeft >= maxScroll - 1;
  }

  static isHorizontalScrollStart(container: HTMLElement, deltaX: number): boolean {
    return deltaX < 0 && container.scrollLeft <= 0;
  }

  static getDominantScrollDirection(deltaX: number, deltaY: number): 'horizontal' | 'vertical' {
    return Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
  }

  static getCareerSectionElements() {
    const careerSection = document.querySelector('[data-section="2"]');
    return {
      section: careerSection,
      horizontalContainer: careerSection?.querySelector('.overflow-x-auto') as HTMLElement
    };
  }
}
