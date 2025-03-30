import { useTranslation } from "react-i18next";
import { cn } from "@/utils/utils";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng");
    const validLanguage = savedLanguage === "es" || savedLanguage === "en" ? savedLanguage : "es";
    
    if (validLanguage !== i18n.language) i18n.changeLanguage(validLanguage);
    
    localStorage.setItem("i18nextLng", validLanguage);
    setSelectedLanguage(validLanguage);
    
    const handleLanguageChanged = (lang: string) => {
      setSelectedLanguage(lang);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    setSelectedLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  // Show text based on language and screen size
  const getDisplayText = (language: string) => {
    if (language === 'es') {
      return { short: 'ES', full: 'Español' };
    } else {
      return { short: 'ENG', full: 'English' };
    }
  };

  const displayText = getDisplayText(selectedLanguage);

  return (
    <div className={cn("flex items-center relative group transition-all duration-200 hover:scale-105", className)}>
      <Globe className="h-4 w-4 absolute left-3 z-10 text-gray-500 group-hover:text-blue-500" />
      <div className="language-switcher">
        <select 
          value={selectedLanguage} 
          onChange={changeLanguage}
          className="h-9 pl-9 pr-8 py-2 opacity-0 absolute inset-0 appearance-none cursor-pointer
                  text-black dark:text-white bg-white dark:bg-gray-900"
          style={{ colorScheme: 'light' }}
          aria-label="Seleccionar idioma"
        >
          <option value="es" className="bg-white dark:bg-gray-800 text-black dark:text-white">Español</option>
          <option value="en" className="bg-white dark:bg-gray-800 text-black dark:text-white">English</option>
        </select>
      </div>

      {/* Contenedor visible que imita el select */}
      <div className="h-9 pl-9 pr-8 py-2 bg-white dark:bg-gray-900 border rounded-md shadow-sm text-sm
        w-auto transition-all duration-200 hover:shadow-md
        hover:bg-gray-100 dark:hover:bg-gray-800 group-hover:border-blue-500 flex items-center">
        <span className="block sm:hidden">{displayText.short}</span>
        <span className="hidden sm:block">{displayText.full}</span>
      </div>

      <div className="absolute right-3 pointer-events-none group-hover:text-blue-500">
        <svg 
          className="h-4 w-4 text-gray-500 group-hover:text-blue-500 transition-colors duration-200" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </div>
  );
}

export default LanguageSwitcher;