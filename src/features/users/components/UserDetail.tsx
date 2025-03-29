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

export function UserDetail({ user, isOpen, onOpenChange }: UserDetailProps) {
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
      <DialogContent className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-none shadow-[0_0_40px_rgba(100,100,255,0.1)] sm:max-w-[500px]">
        <DialogHeader className="flex flex-col items-center text-center pb-2">
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-1">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={`${user.first_name} ${user.last_name}`} 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {user.first_name} {user.last_name}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {userDetails.position}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.email", { ns: "users" })}</div>
                <div className="font-medium">{user.email}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
              <Phone className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.phone", { ns: "users" })}</div>
                <div className="font-medium">{userDetails.phone}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.location", { ns: "users" })}</div>
                <div className="font-medium">{userDetails.location}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.joinDate", { ns: "users" })}</div>
                <div className="font-medium">{userDetails.joinDate}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t("userDetail.labels.description", { ns: "users" })}</div>
              <div className="font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.</div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {t("buttons.close", { ns: "common" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 