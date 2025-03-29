import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine class names with clsx and tailwind-merge
 * @param inputs CSS classes to combine
 * @returns Combined and optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalizes a text string by removing accents, diacritics, and converting it to lowercase
 * @param text Text to normalize
 * @returns Normalized text without accents and in lowercase
 */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')           
    .replace(/[\u0300-\u036f]/g, '') 
    .toLowerCase();             
}
