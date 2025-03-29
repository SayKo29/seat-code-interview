/**
 * Normaliza una cadena de texto eliminando acentos, diacríticos y convirtiéndola a minúsculas
 * @param text Texto a normalizar
 * @returns Texto normalizado sin acentos y en minúsculas
 */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')           // Descompone caracteres en sus componentes base y diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Elimina todos los diacríticos (acentos, etc.)
    .toLowerCase();             // Convierte a minúsculas
} 