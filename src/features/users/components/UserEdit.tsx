import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, User, Phone, MapPin, Briefcase, Save } from "lucide-react";
import { useUsers } from "../hooks";
import { toast } from "sonner";

interface UserEditProps {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
  } | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated?: () => void;
}

export function UserEdit({ user, isOpen, onOpenChange, onUserUpdated }: UserEditProps) {
  const { t } = useTranslation(["users", "common"]);
  const { updateMutation } = useUsers();
  
  // Initial state of the form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    position: "",
  });
  
  // State for validation errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Load user data when it changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: "+34 123 456 789", // Example data
        location: "Madrid, España",
        position: "Desarrollador",
      });
    }
  }, [user]);
  
  if (!user) return null;
  
  // Handle changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error of the field that is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = t("userEdit.validation.requiredFirstName", { ns: "users" });
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = t("userEdit.validation.requiredLastName", { ns: "users" });
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t("userEdit.validation.requiredEmail", { ns: "users" });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("userEdit.validation.invalidEmail", { ns: "users" });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    updateMutation.mutate(
      { 
        id: user.id, 
        user: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email
        }
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          if (onUserUpdated) onUserUpdated();
        },
        onError: () => {
          toast.error(t("users.toast.edit.error", { ns: "common" }));
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg landscape:max-w-[90vw]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="flex flex-col items-center text-center pb-2">
            <div className="w-16 h-16 landscape:w-12 landscape:h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-1">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={`${user.first_name} ${user.last_name}`} 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 landscape:w-6 landscape:h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" />
                </div>
              )}
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("userEdit.title", { ns: "users" })}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4 landscape:my-2 max-h-[60vh] landscape:max-h-[40vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 landscape:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <label htmlFor="first_name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("table.columns.firstName")}
                  </label>
                </div>
                <Input 
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`bg-gray-50 dark:bg-gray-800/70 ${errors.first_name ? 'border-red-500' : ''}`}
                />
                {errors.first_name && (
                  <p className="text-xs text-red-500">{errors.first_name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <label htmlFor="last_name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("table.columns.lastName")}
                  </label>
                </div>
                <Input 
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`bg-gray-50 dark:bg-gray-800/70 ${errors.last_name ? 'border-red-500' : ''}`}
                />
                {errors.last_name && (
                  <p className="text-xs text-red-500">{errors.last_name}</p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("userDetail.labels.email", { ns: "users" })}
                  </label>
                </div>
                <Input 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-gray-50 dark:bg-gray-800/70 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("userDetail.labels.phone", { ns: "users" })}
                  </label>
                </div>
                <Input 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-gray-800/70"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("userDetail.labels.location", { ns: "users" })}
                  </label>
                </div>
                <Input 
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-gray-800/70"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  <label htmlFor="position" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("userDetail.labels.position", { ns: "users" })}
                  </label>
                </div>
                <Input 
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-gray-800/70"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-4 landscape:mt-2 flex flex-col-reverse landscape:flex-row sm:flex-row gap-2 mx-2">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full landscape:w-auto sm:w-auto transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t("buttons.cancel", { ns: "common" })}
            </Button>
            <Button 
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full landscape:w-auto sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {updateMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  {t("buttons.saving", { ns: "common" })}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {t("buttons.save", { ns: "common" })}
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 