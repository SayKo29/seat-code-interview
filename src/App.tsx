import { UsersTable, UserForm } from "./features/users";
import { LanguageSwitcher } from "./components/ui/language-switcher";
import { ThemeSwitcher } from "./components/ui/theme-switcher";
import { useTranslation } from "react-i18next";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6">
      <header 
        className="sticky top-0 z-50 py-4 backdrop-blur-md border-b dark:border-blue-900 border-gray-200 mb-6 w-full">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold">{t("app.title")}</h1>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      
      <div className="pt-4">
        {/* Formulario de creación de usuarios */}
        <UserForm />
        
        {/* Tabla de usuarios */}
        <UsersTable />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
