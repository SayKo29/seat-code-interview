import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Function to merge class names + add conditional classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
