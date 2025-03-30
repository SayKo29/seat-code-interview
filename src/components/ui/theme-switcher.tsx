import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/utils/utils";

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [isDark, setIsDark] = useState(true);

  // Initialize the theme based on user preferences or localStorage
  useEffect(() => {
    // Check if there is a saved theme
    const savedTheme = localStorage.getItem("theme");
    
    // Si no hay tema guardado, usar oscuro por defecto
    // Si hay tema guardado, respetar la preferencia del usuario
    const initialDark = savedTheme 
      ? savedTheme === "dark" 
      : true; // Por defecto oscuro para nuevos usuarios
    
    setIsDark(initialDark);
    
    // Apply the initial theme to the HTML
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Function to change the theme
  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    // Save preference in localStorage
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    
    // Add or remove the "dark" class to the HTML
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "h-9 w-9 rounded-md border flex items-center justify-center transition-all duration-200",
        "bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800",
        "hover:scale-105 hover:shadow-md",
        isDark 
          ? "hover:border-yellow-500 hover:text-yellow-500" 
          : "hover:border-blue-500 hover:text-blue-500",
        "focus:outline-none focus:ring-1 focus:ring-blue-500",
        className
      )}
      aria-label={isDark ? "Change to light mode" : "Change to dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-500" />
      ) : (
        <Moon className="h-4 w-4 text-gray-500" />
      )}
    </button>
  );
} 