import { useTranslation } from "react-i18next";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={cn("flex space-x-2", className)}>
      <Button
        variant={i18n.language === "es" ? "default" : "outline"}
        size="sm"
        onClick={() => changeLanguage("es")}
      >
        ES
      </Button>
      <Button
        variant={i18n.language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
} 