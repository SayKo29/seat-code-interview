import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive"
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel,
  cancelLabel,
  variant = "default",
}: ConfirmDialogProps) {
  const { t } = useTranslation()
  
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[380px] landscape:max-w-[90vw] landscape:max-h-[90svh]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="landscape:justify-end landscape:space-x-2 sm:justify-center sm:space-x-4 mt-4 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full landscape:w-auto sm:w-auto transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {cancelLabel || t("buttons.cancel")}
          </Button>
          <Button
            variant={variant}
            onClick={handleConfirm}
            className={`w-full landscape:w-auto sm:w-auto transition-all duration-200 hover:scale-105 hover:shadow-md ${
              variant === "destructive" 
              ? "hover:bg-red-600" 
              : "hover:bg-blue-600"
            }`}
          >
            {confirmLabel || t("buttons.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 