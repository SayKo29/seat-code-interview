import { UsersTable } from "./features/users";
import { LanguageSwitcher } from "./components/ui/language-switcher";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("app.title")}</h1>
        <LanguageSwitcher />
      </header>
      <UsersTable />
    </div>
  );
}

export default App;
