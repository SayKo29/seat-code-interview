import { lazy, Suspense, useState } from "react";
import { LanguageSwitcher } from "./components/ui/language-switcher";
import { ThemeSwitcher } from "./components/ui/theme-switcher";
import { useTranslation } from "react-i18next";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";
import { FormSkeleton, TableSkeleton } from "./components/ui/skeletons";

// Lazy load components to improve initial load time
const UserForm = lazy(() => import("./features/users/components/UserForm").then(module => ({ 
  default: module.UserForm 
})));

const UsersTable = lazy(() => import("./features/users/components/UsersTable").then(module => ({ 
  default: module.UsersTable 
})));

function App() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-6">
      <header 
        className="sticky top-0 z-50 py-4 backdrop-blur-md border-b dark:border-blue-900 border-gray-200 mb-6 w-full">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold">{t("app.title")}</h1>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="mb-4 max-w-[1200px] mx-auto">
        <Button
          onClick={toggleForm}
          className="flex items-center gap-2 transition-all hover:scale-105"
          variant={showForm ? "outline" : "default"}
        >
          {showForm ? (
            <>
              <MinusCircle className="h-4 w-4" />
              {t("buttons.hideForm", { defaultValue: "Hide Form" })}
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              {t("buttons.showForm", { defaultValue: "New User" })}
            </>
          )}
        </Button>
      </div>
      
      {showForm && (
        <Suspense fallback={<FormSkeleton />}>
          <UserForm onCancel={handleCancel} />
        </Suspense>
      )}
      
      <Suspense fallback={<TableSkeleton />}>
        <UsersTable />
      </Suspense>

      <Toaster />
    </div>
  );
}

export default App;
