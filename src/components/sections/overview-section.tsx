import { useTranslation } from 'react-i18next';

interface OverviewSectionProps {
  scrollToSection: (index: number) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();

  const sections = [
    { title: t('sections.career.title', 'Career Path'), index: 2 },
    { title: t('sections.education', 'Education'), index: 3 },
    { title: t('sections.skills', 'Soft Skills'), index: 4 },
    { title: t('sections.hobbies', 'Hobbies'), index: 5 }
  ];

  return (
    <section 
      data-section="1"
      className="snap-section h-screen flex items-center justify-center snap-start bg-white relative"
    >
      <div className="max-w-4xl w-full px-6">
        <div className="space-y-8">
          {sections.map((item) => (
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
  );
};
