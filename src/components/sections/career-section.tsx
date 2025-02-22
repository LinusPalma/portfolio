import { useTranslation } from 'react-i18next';

interface CareerSectionProps {
  scrollToCareerSlide: (index: number) => void;
}

export const CareerSection: React.FC<CareerSectionProps> = ({ scrollToCareerSlide }) => {
  const { t } = useTranslation();

  return (
    <section 
      data-section="2"
      className="snap-section h-screen snap-start bg-white relative overflow-hidden"
    >
      <div 
        className="w-full h-full overflow-x-auto scroll-smooth no-scrollbar"
        style={{ 
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex h-full">
          {/* Career Overview Slide */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center snap-start">
            <div className="max-w-4xl w-full px-6">
              <div className="grid grid-cols-2 gap-6">
                <div 
                  onClick={() => scrollToCareerSlide(1)}
                  className="bg-blue-50 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-blue-800">Senior Developer</h3>
                  <p className="text-blue-600">2020 - Heute</p>
                  <p className="mt-4">Aktuelle Position...</p>
                  <div className="mt-4 text-blue-600">
                    Mehr Details →
                  </div>
                </div>
                <div 
                  onClick={() => scrollToCareerSlide(2)}
                  className="bg-blue-50 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-blue-800">{t('sections.career.job1.title','Developer')}</h3>
                  <p className="text-blue-600">2018 - 2020</p>
                  <p className="mt-4">Vorherige Position...</p>
                  <div className="mt-4 text-blue-600">
                    Mehr Details →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Slides */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center snap-start">
            <div className="max-w-4xl w-full px-6">
              <div className="bg-blue-50 rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4">Senior Developer</h3>
                <p className="text-blue-600 mb-6">2020 - Heute</p>
                <div className="space-y-4">
                  <p>Ausführliche Beschreibung der aktuellen Position...</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Verantwortlich für XYZ</li>
                    <li>Leitung von ABC Projekten</li>
                    <li>Implementation von DEF</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center snap-start">
            <div className="max-w-4xl w-full px-6">
              <div className="bg-blue-50 rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4">Developer</h3>
                <p className="text-blue-600 mb-6">2018 - 2020</p>
                <div className="space-y-4">
                  <p>Ausführliche Beschreibung der vorherigen Position...</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Entwicklung von XYZ</li>
                    <li>Mitarbeit an ABC</li>
                    <li>Verantwortlich für DEF</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
