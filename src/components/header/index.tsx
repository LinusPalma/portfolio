import { useTranslation } from 'react-i18next';

interface HeaderProps {
  scrollPosition: number;
  currentSection: number;
}

export const Header = ({ scrollPosition, currentSection }: HeaderProps) => {
  const { t } = useTranslation();

  // Name-Header Transform Berechnung
  const transformThreshold = window.innerHeight * 0.3;
  const progress = Math.min(1, scrollPosition / transformThreshold);
  
  const nameHeaderStyle = {
    transform: `
      translate(
        ${-50 + progress * 50}%,
        ${-50 + progress * 50}%
      )
      scale(${1 - progress * 0.4})
    `,
    position: 'fixed' as const,
    top: progress === 1 ? '24px' : '50%',
    left: progress === 1 ? '24px' : '50%',
    zIndex: 50,
    transition: 'all 0.3s ease-out'
  };

  // Section-Header Transform Berechnung
  const sectionProgress = Math.max(0, Math.min(1, (scrollPosition - window.innerHeight) / transformThreshold));
  
  const sectionHeaderStyle = {
    position: 'fixed' as const,
    top: '24px',
    left: '50%',
    transform: `
      translate(-50%, ${sectionProgress < 0.5 ? '100vh' : '0'})
      scale(${sectionProgress})
    `,
    opacity: sectionProgress,
    zIndex: 40,
    transition: 'all 0.3s ease-out'
  };

  return (
    <>
      {/* Name Header */}
      <div 
        className="text-center pointer-events-none"
        style={nameHeaderStyle}
      >
        <h1 className="text-4xl font-bold mb-2 text-blue-900">{t('header.name')}</h1>
        <h2 className="text-xl text-blue-600">{t('header.job')}</h2>
      </div>

      {/* Section Header */}
      <div
        className="text-center pointer-events-none"
        style={sectionHeaderStyle}
      >
        <h2 className="text-2xl font-bold text-blue-900">
          {currentSection === 2 ? t('sections.career.title','Career Path') :
           currentSection === 3 ? t('sections.education', 'Education') :
           currentSection === 4 ? t('sections.skills', 'Soft Skills') :
           currentSection === 5 ? t('sections.hobbies', 'Hobbies') : ''}
        </h2>
      </div>
    </>
  );
};
