import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Forzar español como idioma predeterminado en toda la aplicación
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
    
    // Configuración específica del detector de idioma para dar prioridad al localStorage
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    
    // Translation loading configuration
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      // Add cache invalidation query parameter based on build time to ensure fresh translations after deploys
      queryStringParams: { v: import.meta.env.PROD ? import.meta.env.VITE_BUILD_TIME || Date.now() : Date.now() }
    },
    
    // Configuración explícita de idioma por defecto
    lng: localStorage.getItem('i18nextLng') === 'en' ? 'en' : 'es',
    
    // Lazy load translations to improve initial load performance
    partialBundledLanguages: true,
    load: 'languageOnly', // Only load language without region code (e.g. 'en' instead of 'en-US')
    
    // Enable React Suspense mode for translations
    react: {
      useSuspense: true,
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span', 'a']
    }
  });

export default i18n; 