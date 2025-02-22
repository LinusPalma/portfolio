interface NavigationDotsProps {
  currentSection: number;
  totalSections: number;
  onDotClick: (index: number) => void;
}

export const NavigationDots = ({ 
  currentSection, 
  totalSections, 
  onDotClick 
}: NavigationDotsProps) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
      {Array.from({ length: totalSections }, (_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentSection === index 
              ? 'bg-blue-500 scale-125' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Scroll to section ${index + 1}`}
        />
      ))}
    </div>
  );
};
