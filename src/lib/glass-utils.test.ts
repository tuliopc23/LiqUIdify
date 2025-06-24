import { describe, it, expect } from 'vitest';
import { cn, getGlassClass, glassVariants } from './glass-utils';

describe('glass-utils', () => {
  describe('cn function', () => {
    it('merges classes correctly', () => {
      const result = cn('px-4', 'py-2', 'bg-red-500');
      expect(result).toBe('px-4 py-2 bg-red-500');
    });

    it('handles conditional classes', () => {
      const result = cn(
        'base-class',
        true && 'conditional-true',
        false && 'conditional-false'
      );
      expect(result).toBe('base-class conditional-true');
    });

    it('resolves Tailwind conflicts', () => {
      const result = cn('px-4', 'px-6');
      expect(result).toBe('px-6');
    });
  });

  describe('getGlassClass function', () => {
    it('returns default glass class when no variant specified', () => {
      const result = getGlassClass();
      expect(result).toBe(glassVariants.default);
    });

    it('returns correct class for specified variant', () => {
      const result = getGlassClass('elevated');
      expect(result).toBe(glassVariants.elevated);
    });

    it('returns correct class for hover variant', () => {
      const result = getGlassClass('hover');
      expect(result).toBe(glassVariants.hover);
    });
  });

  describe('glassVariants', () => {
    it('contains all expected variants', () => {
      const expectedVariants = [
        'default',
        'hover',
        'elevated',
        'surface',
        'pressed',
      ];
      const actualVariants = Object.keys(glassVariants);

      expectedVariants.forEach(variant => {
        expect(actualVariants).toContain(variant);
      });
    });

    it('all variants return non-empty strings', () => {
      Object.values(glassVariants).forEach(variant => {
        expect(variant).toBeTruthy();
        expect(typeof variant).toBe('string');
      });
    });
  });
});
