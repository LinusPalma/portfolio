import { useTranslation } from 'react-i18next';

export const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  const skills = [
    {
      title: t('sections.skills.leadership', 'Teamführung'),
      icon: '👥'
    },
    {
      title: t('sections.skills.projectManagement', 'Projektmanagement'),
      icon: '📊'
    },
    {
      title: t('sections.skills.communication', 'Kommunikation'),
      icon: '💭'
    },
    {
      title: t('sections.skills.problemSolving', 'Problemlösung'),
      icon: '🔍'
    }
  ];

  return (
    <section 
      data-section="4"
      className="snap-section h-screen flex items-center justify-center snap-start bg-white relative"
    >
      <div className="max-w-4xl w-full px-6">
        <div className="grid grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div 
              key={skill.title}
              className="bg-blue-50 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="text-blue-800 font-semibold">{skill.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
