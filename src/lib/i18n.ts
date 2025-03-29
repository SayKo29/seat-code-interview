import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Carga las traducciones desde el servidor usando xhr
  .use(Backend)
  // Detecta automáticamente el idioma del usuario
  .use(LanguageDetector)
  // Pasa el objeto i18n a react-i18next
  .use(initReactI18next)
  // Inicializa i18next
  .init({
    fallbackLng: 'es',
    debug: import.meta.env.DEV,
    
    // Namespaces comunes que se cargarán en todas las páginas
    ns: ['common'],
    defaultNS: 'common',
    
    interpolation: {
      // No queremos que React escape nuestras traducciones
      escapeValue: false,
    },
    
    // Configuración de carga de traducciones
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Detección de idioma
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 