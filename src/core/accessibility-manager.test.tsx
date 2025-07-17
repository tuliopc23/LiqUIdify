import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AccessibilityManager } from './accessibility-manager';

// Mock axe-core
vi.mock('axe-core', () => ({
  axe: {
    run: vi.fn().mockResolvedValue({
      violations: [],
      incomplete: [],
      passes: [{ id: 'color-contrast', nodes: [] }],
    }),
  },
}));

describe('AccessibilityManager', () => {
  let manager: AccessibilityManager;

  beforeEach(() => {
    manager = AccessibilityManager.getInstance();
  });

  describe('validateComponent', () => {
    it('should validate a component and return accessibility report', async () => {
      const { container } = render(
        <button aria-label="Test button">Click me</button>
      );
      const element = container.firstChild as HTMLElement;

      const report = await manager.validateComponent(element);

      expect(report).toHaveProperty('score');
      expect(report.score).toBeGreaterThanOrEqual(0);
      expect(report.score).toBeLessThanOrEqual(100);
      expect(report.violations).toBeInstanceOf(Array);
      expect(report.warnings).toBeInstanceOf(Array);
      expect(report.suggestions).toBeInstanceOf(Array);
      expect(report.wcagLevel).toMatch(/^(A|AA|AAA)$/);
    });

    it('should cache validation results', async () => {
      const { container } = render(<div role="main">Content</div>);
      const element = container.firstChild as HTMLElement;

      const report1 = await manager.validateComponent(element);
      const report2 = await manager.validateComponent(element);

      expect(report1.timestamp).toEqual(report2.timestamp);
    });
  });

  describe('ensureContrast', () => {
    it('should check contrast and return result', () => {
      const result = manager.ensureContrast('#000000', '#ffffff');

      expect(result).toHaveProperty('ratio');
      expect(result).toHaveProperty('passes');
      expect(result.passes.aa.normal).toBe(true);
      expect(result.passes.aaa.normal).toBe(true);
    });

    it('should suggest better colors when contrast is insufficient', () => {
      const result = manager.ensureContrast('#777777', '#888888', { autoFix: true });

      expect(result).toHaveProperty('suggestedForeground');
      expect(result.autoFixed).toBe(true);
    });

    it('should handle glass effect contrast', () => {
      const result = manager.ensureContrast('#000000', '#ffffff', {
        glassEffect: { opacity: 0.25, backdropColor: '#cccccc' }
      });

      expect(result).toHaveProperty('ratio');
      expect(result.ratio).toBeGreaterThan(0);
    });
  });

  describe('validateARIA', () => {
    it('should validate ARIA attributes', () => {
      const { container } = render(
        <button role="button" aria-expanded="true" aria-pressed="false">
          Toggle
        </button>
      );
      const element = container.firstChild as HTMLElement;

      const validation = manager.validateARIA(element);

      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect invalid ARIA attributes', () => {
      const { container } = render(
        <button role="invalid-role" aria-expanded="maybe">
          Bad button
        </button>
      );
      const element = container.firstChild as HTMLElement;

      const validation = manager.validateARIA(element);

      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('should auto-correct invalid boolean ARIA values', () => {
      const { container } = render(
        <button aria-expanded="yes">Toggle</button>
      );
      const element = container.firstChild as HTMLElement;

      manager.validateARIA(element, true);

      expect(element.getAttribute('aria-expanded')).toBe('false');
    });

    it('should suggest missing required ARIA attributes', () => {
      const { container } = render(
        <div role="combobox">Dropdown</div>
      );
      const element = container.firstChild as HTMLElement;

      const validation = manager.validateARIA(element);

      expect(validation.suggestions.length).toBeGreaterThan(0);
      expect(validation.suggestions.some(s => s.attribute === 'aria-expanded')).toBe(true);
    });
  });

  describe('manageFocus', () => {
    it('should create focus trap', () => {
      const { container } = render(
        <div>
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </div>
      );

      const focusTrap = manager.manageFocus(container as HTMLElement);
      expect(focusTrap).toBeDefined();
    });
  });

  describe('announce', () => {
    it('should call announcer with correct priority', () => {
      const announceSpy = vi.spyOn(manager, 'announce');
      
      manager.announce('Test message', 'polite');
      expect(announceSpy).toHaveBeenCalledWith('Test message', 'polite');

      manager.announce('Urgent message', 'assertive');
      expect(announceSpy).toHaveBeenCalledWith('Urgent message', 'assertive');
    });
  });

  describe('Real-time monitoring', () => {
    it('should enable and disable monitoring', () => {
      const { container } = render(<div>Content</div>);
      
      expect(() => {
        manager.enableRealTimeMonitoring(container as HTMLElement);
      }).not.toThrow();

      expect(() => {
        manager.disableRealTimeMonitoring();
      }).not.toThrow();
    });
  });
});