import { lazy, Suspense, useState } from "react";
import { LanguageSwitcher } from "./components/ui/language-switcher";
import { ThemeSwitcher } from "./components/ui/theme-switcher";
import { useTranslation } from "react-i18next";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { User } from "./features/users/types";


// Lazy load components to improve initial load time
const UserForm = lazy(() => import("./features/users/components/UserForm").then(module => ({ 
  default: module.UserForm 
})));

const UsersTable = lazy(() => import("./features/users/components/UsersTable").then(module => ({ 
  default: module.UsersTable 
})));

// Fallback para componentes en carga
const LoadingIndicator = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
);

function App() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(true);

  // Handle form submission with proper typing
  const handleUserSubmit = (userData: User) => {
    // Use the user data (e.g. first name) in success message
    toast.success(t("userForm.toast.success") + `: ${userData.first_name}`);
    setShowForm(false);
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
      
      {showForm && (
        <Suspense fallback={<LoadingIndicator />}>
          <UserForm 
            onSubmit={handleUserSubmit}
            onCancel={handleCancel}
          />
        </Suspense>
      )}
      
      <Suspense fallback={<LoadingIndicator />}>
        <UsersTable />
      </Suspense>

      <Toaster />
    </div>
  );
}

export default App;
