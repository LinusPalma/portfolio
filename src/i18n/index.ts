import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import de from './de.json';
import en from './en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        translation: de,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false,
    },
  });
  i18n.changeLanguage('de');
export default i18n;
