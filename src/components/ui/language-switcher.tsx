import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Comprobar al cargar
    checkScreenSize();
    
    // Actualizar cuando cambia el tamaño de pantalla
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const getLanguageName = (code: string) => {
    if (isMobile) {
      return code === 'es' ? 'ES' : 'ENG';
    } else {
      return code === 'es' ? 'Español' : 'English';
    }
  };

  return (
    <div className={cn("flex items-center relative group transition-all duration-200 hover:scale-105", className)}>
      <Globe className="h-4 w-4 absolute left-3 z-10 text-gray-500 group-hover:text-blue-500" />
      <select 
        value={i18n.language} 
        onChange={changeLanguage}
        className="h-9 pl-9 pr-8 py-2 appearance-none bg-white dark:bg-gray-900 border rounded-md shadow-sm text-sm
        focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500
        transition-all duration-200 hover:shadow-md w-auto inline-flex
        hover:bg-gray-100 dark:hover:bg-gray-800 group-hover:border-blue-500"
      >
        <option value="es">{getLanguageName('es')}</option>
        <option value="en">{getLanguageName('en')}</option>
      </select>
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