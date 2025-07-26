import { describe, expect, it } from 'bun:test';
import {
  cn,
  getGlassClass,
  microInteraction,
} from '../../libs/components/src/core/utils/classname';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('base-class', 'additional-class');
    expect(result).toBe('base-class additional-class');
  });

  it('handles conditional classes', () => {
    const result = cn('base', {
      active: true,
      disabled: false,
    });
    expect(result).toBe('base active');
  });

  it('filters out falsy values', () => {
    const result = cn('base', null, undefined, false, '', 'valid');
    expect(result).toBe('base valid');
  });

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });
});

describe('getGlassClass', () => {
  it('returns default glass classes', () => {
    const result = getGlassClass('default');
    expect(result).toContain('backdrop-blur-md');
    expect(result).toContain('bg-white/10');
    expect(result).toContain('border-white/20');
  });

  it('returns solid glass classes', () => {
    const result = getGlassClass('solid');
    expect(result).toContain('backdrop-blur-md');
    expect(result).toContain('bg-white/20');
  });

  it('returns subtle glass classes', () => {
    const result = getGlassClass('subtle');
    expect(result).toContain('backdrop-blur-sm');
    expect(result).toContain('bg-white/5');
  });
});

describe('microInteraction', () => {
  it('has interactive classes', () => {
    expect(microInteraction.interactive).toBe(
      'transition-all duration-200 ease-out'
    );
  });

  it('has hover scale classes', () => {
    expect(microInteraction.hoverScale).toBe('hover:scale-105');
  });

  it('has gentle animation classes', () => {
    expect(microInteraction.gentle).toBe(
      'transition-all duration-300 ease-in-out'
    );
  });

  it('has click classes', () => {
    expect(microInteraction.click).toBe('active:scale-95');
  });
});
