import { describe, it, expect } from 'vitest';
import { cn, normalizeText } from './utils';

describe('normalizeText function', () => {
  it('converts text to lowercase', () => {
    expect(normalizeText('TEST')).toBe('test');
  });

  it('removes accents from characters', () => {
    expect(normalizeText('áéíóúüñ')).toBe('aeiouun');
  });

  it('handles mixed text with accents', () => {
    expect(normalizeText('ÁéÍóÚ')).toBe('aeiou');
  });

  it('returns empty string for empty input', () => {
    expect(normalizeText('')).toBe('');
  });

  it('handles special characters', () => {
    expect(normalizeText('Señor@Apellido')).toBe('senor@apellido');
  });
});

describe('cn function', () => {
  it('combines multiple CSS classes', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('combines classes with conditionals', () => {
    const isActive = true;
    const result = cn('btn', { 'btn-active': isActive, 'btn-disabled': !isActive });
    expect(result).toBe('btn btn-active');
  });

  it('removes falsy values', () => {
    const result = cn('btn', null, undefined, false, 'btn-primary');
    expect(result).toBe('btn btn-primary');
  });

  it('handles Tailwind classes conflicts correctly', () => {
    // Tailwind merge eliminates duplicate classes while keeping the last one
    const result = cn('p-4', 'p-6');
    expect(result).toBe('p-6');
  });

  it('handles arrays of classes correctly', () => {
    const result = cn(['btn', 'btn-lg'], 'btn-primary');
    expect(result).toBe('btn btn-lg btn-primary');
  });
}); 