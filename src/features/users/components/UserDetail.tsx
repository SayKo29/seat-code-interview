import React from "react";
import { useTranslation } from "react-i18next";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, User, Calendar, Phone, MapPin, Briefcase } from "lucide-react";

interface UserDetailProps {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
  } | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function UserDetailComponent({ user, isOpen, onOpenChange }: UserDetailProps) {
  const { t } = useTranslation(["users", "common"]);

  if (!user) return null;

  // Emulate user details to have a better view
  const userDetails = {
    phone: "+34 123 456 789",
    location: "Madrid, España",
    position: "Desarrollador",
    joinDate: "01/01/2023",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg landscape:max-w-[90vw]">
        <DialogHeader className="flex landscape:flex-row landscape:items-start landscape:text-left flex-col items-center text-center pb-2">
          <div className="w-16 h-16 landscape:w-12 landscape:h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 landscape:mb-0 landscape:mr-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-1">
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
          <div>
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {user.first_name} {user.last_name}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              {userDetails.position}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 my-2 landscape:my-1 max-h-[60vh] landscape:max-h-[40vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/70">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.email", { ns: "users" })}</div>
                <div className="font-medium break-all">{user.email}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/70">
              <Phone className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.phone", { ns: "users" })}</div>
                <div className="font-medium">{userDetails.phone}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/70">
              <MapPin className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.location", { ns: "users" })}</div>
                <div className="font-medium">{userDetails.location}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/70">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.joinDate", { ns: "users" })}</div>
                <div className="font-medium">{userDetails.joinDate}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/70">
            <Briefcase className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.description", { ns: "users" })}</div>
              <div className="font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed eget turpis euismod, efficitur justo eget, faucibus nunc.</div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-2 landscape:mt-1">
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full landscape:w-auto sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white 
            transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            {t("buttons.close", { ns: "common" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Memoize UserDetail component to prevent unnecessary re-renders
export const UserDetail = React.memo(UserDetailComponent); 