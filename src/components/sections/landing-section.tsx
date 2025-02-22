import { useTranslation } from 'react-i18next';

export const LandingSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section 
      data-section="0"
      className="snap-section h-screen flex items-center justify-center snap-start bg-gradient-to-br from-blue-50 to-white relative"
    >
      <div className="invisible">
        <h1 className="text-6xl font-bold mb-4">{t('header.name')}</h1>
        <h2 className="text-2xl text-gray-600">{t('header.job')}</h2>
      </div>
    </section>
  );
};
