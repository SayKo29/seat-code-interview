import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Load translations from the server using xhr
  .use(Backend)
  // Automatically detect the user's language
  .use(LanguageDetector)
  // Pass the i18n object to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: 'es',
    debug: import.meta.env.DEV,
    
    // Common namespaces that will be loaded on all pages
    ns: ['common'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false,
    },
    
    // Translation loading configuration
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Language detection configuration
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 