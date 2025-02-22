import { useTranslation } from 'react-i18next';

export const EducationSection: React.FC = () => {
  const { t } = useTranslation();

  const educationData = [
    {
      title: t('sections.education.degree1.title', 'Bachelor in Musterfach'),
      period: '2015 - 2018',
      institution: t('sections.education.degree1.institution', 'Musteruniversität'),
      description: t('sections.education.degree1.description', 'Beschreibung des Studiums...'),
      achievements: [
        t('sections.education.degree1.achievement1', 'Schwerpunkt XYZ'),
        t('sections.education.degree1.achievement2', 'Abschlussarbeit ABC'),
        t('sections.education.degree1.achievement3', 'Zusätzliche Projekte'),
      ]
    },
    // Weitere Bildungsabschlüsse hier hinzufügen...
  ];

  return (
    <section 
      data-section="3"
      className="snap-section h-screen flex items-center justify-center snap-start bg-gradient-to-br from-blue-50 to-white relative"
    >
      <div className="max-w-4xl w-full px-6">
        <div className="space-y-6">
          {educationData.map((education, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-blue-800">{education.title}</h3>
              <p className="text-blue-600">{education.period}</p>
              <p className="text-gray-600 mt-2">{education.institution}</p>
              <p className="mt-4">{education.description}</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                {education.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-700">{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
