import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de manera eficiente, resolviendo conflictos de Tailwind
 * @param inputs Clases CSS a combinar
 * @returns Cadena de clases combinada y optimizada
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
