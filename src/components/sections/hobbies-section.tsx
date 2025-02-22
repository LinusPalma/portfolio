import { useTranslation } from 'react-i18next';

export const HobbiesSection: React.FC = () => {
  const { t } = useTranslation();

  const hobbies = [
    {
      title: t('sections.hobbies.photography', 'Fotografie'),
      icon: '📸',
      description: t('sections.hobbies.photography.description', 'Landschafts- und Streetfotografie')
    },
    {
      title: t('sections.hobbies.travel', 'Reisen'),
      icon: '✈️',
      description: t('sections.hobbies.travel.description', 'Neue Kulturen entdecken')
    },
    {
      title: t('sections.hobbies.sports', 'Sport'),
      icon: '🏃',
      description: t('sections.hobbies.sports.description', 'Fitness und Yoga')
    },
    {
      title: t('sections.hobbies.music', 'Musik'),
      icon: '🎵',
      description: t('sections.hobbies.music.description', 'Gitarre spielen')
    }
  ];

  return (
    <section 
      data-section="5"
      className="snap-section h-screen flex items-center justify-center snap-start bg-gradient-to-br from-blue-50 to-white relative"
    >
      <div className="max-w-4xl w-full px-6">
        <div className="grid grid-cols-2 gap-6">
          {hobbies.map((hobby) => (
            <div 
              key={hobby.title}
              className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{hobby.icon}</span>
                <div>
                  <h3 className="text-blue-800 font-semibold">{hobby.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{hobby.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
