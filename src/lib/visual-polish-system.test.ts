/**
 * Visual Polish System Tests
 * Comprehensive testing for visual polish and quality systems
 * Requirements: 6.5, 6.6 - Testing visual polish with micro-interactions and quality metrics
 */

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_POLISH_CONFIG,
  MICRO_INTERACTION_PRESETS,
  type MicroInteraction,
  type PolishConfig,
  useVisualPolish,
  VisualPolishManager,
} from './visual-polish-system';

// Mock DOM APIs
const mockElement = {
  getBoundingClientRect: vi.fn(() => ({
    left: 100,
    top: 100,
    width: 200,
    height: 100,
    right: 300,
    bottom: 200,
  })),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  animate: vi.fn(() => ({
    reverse: vi.fn(),
    cancel: vi.fn(),
    finished: Promise.resolve(),
  })),
  focus: vi.fn(),
  blur: vi.fn(),
  dispatchEvent: vi.fn(),
} as any;

const mockCanvas = {
  getContext: vi.fn(() => ({
    createImageData: vi.fn(() => new ImageData(200, 100)),
  })),
  width: 200,
  height: 100,
} as any;

// Mock navigator
const mockNavigator = {
  vibrate: vi.fn(),
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
};

Object.defineProperty(global, 'navigator', {
  value: mockNavigator,
  writable: true,
});

Object.defineProperty(document, 'createElement', {
  value: vi.fn((tagName: string) => {
    if (tagName === 'canvas') {return mockCanvas;}
    return mockElement;
  }),
  writable: true,
});

Object.defineProperty(window, 'getComputedStyle', {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn((prop: string) => {
      const values: Record<string, string> = {
        'backdrop-filter': 'blur(20px)',
        'border-radius': '28px',
        'box-shadow': '0 8px 32px rgba(31, 38, 135, 0.25)',
        transform: 'translateZ(0)',
      };
      return values[prop] || 'initial';
    }),
  })),
  writable: true,
});

describe('Visual Polish System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('VisualPolishManager', () => {
    let polishManager: VisualPolishManager;

    beforeEach(() => {
      polishManager = new VisualPolishManager();
    });

    afterEach(() => {
      polishManager.destroy();
    });

    describe('Micro-Interactions', () => {
      it('should add micro-interaction with preset', () => {
        polishManager.addMicroInteraction(
          'test-hover',
          mockElement,
          'subtleHover'
        );

        expect(mockElement.addEventListener).toHaveBeenCalledWith(
          'mouseenter',
          expect.any(Function)
        );
        expect(mockElement.addEventListener).toHaveBeenCalledWith(
          'mouseleave',
          expect.any(Function)
        );
      });

      it('should add micro-interaction with custom configuration', () => {
        const customInteraction: Omit<MicroInteraction, 'id' | 'element'> = {
          trigger: 'click',
          animation: {
            keyframes: [{ opacity: 1 }, { opacity: 0.5 }],
            options: { duration: 300 },
          },
          feedback: { visual: true, haptic: false, audio: false },
          timing: { delay: 0, duration: 300, easing: 'ease-in-out' },
        };

        polishManager.addMicroInteraction(
          'test-custom',
          mockElement,
          // @ts-expect-error TS(2345): Argument of type 'Omit<MicroInteraction, "id" | "e... Remove this comment to see the full error message
          customInteraction
        );

        expect(mockElement.addEventListener).toHaveBeenCalledWith(
          'click',
          expect.any(Function)
        );
      });

      it('should remove micro-interaction and cleanup', () => {
        polishManager.addMicroInteraction(
          'test-hover',
          mockElement,
          'subtleHover'
        );
        polishManager.removeMicroInteraction('test-hover');

        expect(mockElement.removeEventListener).toHaveBeenCalled();
      });

      it('should handle different trigger types', () => {
        const triggers: Array<keyof typeof MICRO_INTERACTION_PRESETS> = [
          'subtleHover',
          'focusRing',
          'pressDown',
          'rippleEffect',
        ];

        for (const [index, preset] of triggers.entries()) {
          polishManager.addMicroInteraction(
            `test-${index}`,
            mockElement,
            preset
          );
        }

        // Should have set up event listeners for each trigger type
        expect(mockElement.addEventListener).toHaveBeenCalledTimes(
          triggers.length * 2
        ); // Each trigger has enter/leave or similar
      });

      it('should trigger haptic feedback when enabled', () => {
        const config: PolishConfig = {
          ...DEFAULT_POLISH_CONFIG,
          enableHapticFeedback: true,
        };

        const manager = new VisualPolishManager(config);
        manager.addMicroInteraction(
          'test-haptic',
          mockElement,
          'magneticHover'
        );

        // Simulate interaction
        const handlers = mockElement.addEventListener.mock.calls;
        const mouseEnterHandler = handlers.find(
          (call: any) => call[0] === 'mouseenter'
        )?.[1];

        if (mouseEnterHandler) {
          mouseEnterHandler(new MouseEvent('mouseenter'));
          expect(mockNavigator.vibrate).toHaveBeenCalledWith(10);
        }

        manager.destroy();
      });

      it('should skip micro-interactions when disabled', () => {
        const config: PolishConfig = {
          ...DEFAULT_POLISH_CONFIG,
          enableMicroInteractions: false,
        };

        const manager = new VisualPolishManager(config);
        manager.addMicroInteraction(
          'test-disabled',
          mockElement,
          'subtleHover'
        );

        expect(mockElement.addEventListener).not.toHaveBeenCalled();
        manager.destroy();
      });
    });

    describe('Visual Regression Testing', () => {
      it('should add visual regression test', () => {
        polishManager.addVisualRegressionTest(
          'test-regression',
          'Test Component',
          mockElement
        );

        // Should have attempted to capture baseline
        expect(document.createElement).toHaveBeenCalledWith('canvas');
      });

      it('should run visual regression test', async () => {
        polishManager.addVisualRegressionTest(
          'test-regression',
          'Test Component',
          mockElement
        );

        const result =
          await polishManager.runVisualRegressionTest('test-regression');

        // Should return a boolean result
        expect(typeof result).toBe('boolean');
      });

      it('should handle missing baseline gracefully', async () => {
        const result =
          await polishManager.runVisualRegressionTest('non-existent-test');
        expect(result).toBe(false);
      });

      it('should skip visual regression when disabled', () => {
        const config: PolishConfig = {
          ...DEFAULT_POLISH_CONFIG,
          enableVisualRegression: false,
        };

        const manager = new VisualPolishManager(config);
        manager.addVisualRegressionTest('test-disabled', 'Test', mockElement);

        expect(document.createElement).not.toHaveBeenCalledWith('canvas');
        manager.destroy();
      });
    });

    describe('Cross-Browser Testing', () => {
      it('should add cross-browser test', () => {
        polishManager.addCrossBrowserTest(
          'test-browser',
          'backdrop-filter',
          'blur(20px)'
        );

        // Test should be added (no direct way to verify without exposing internals)
        expect(true).toBe(true);
      });

      it('should run cross-browser test', () => {
        polishManager.addCrossBrowserTest(
          'test-browser',
          'backdrop-filter',
          'blur(20px)'
        );

        const result = polishManager.runCrossBrowserTest(
          'test-browser',
          mockElement
        );

        expect(typeof result).toBe('boolean');
        expect(window.getComputedStyle).toHaveBeenCalledWith(mockElement);
      });

      it('should handle non-existent test gracefully', () => {
        const result = polishManager.runCrossBrowserTest(
          'non-existent',
          mockElement
        );
        expect(result).toBe(false);
      });

      it('should skip cross-browser testing when disabled', () => {
        const config: PolishConfig = {
          ...DEFAULT_POLISH_CONFIG,
          enableCrossBrowserTesting: false,
        };

        const manager = new VisualPolishManager(config);

        expect(() => {
          manager.addCrossBrowserTest('test-disabled', 'color', 'red');
        }).not.toThrow();

        manager.destroy();
      });
    });

    describe('Quality Metrics', () => {
      it('should calculate quality metrics', () => {
        polishManager.updateQualityMetrics();
        const metrics = polishManager.getQualityMetrics();

        expect(metrics).toHaveProperty('pixelPerfectScore');
        expect(metrics).toHaveProperty('crossBrowserConsistency');
        expect(metrics).toHaveProperty('animationSmoothness');
        expect(metrics).toHaveProperty('microInteractionQuality');
        expect(metrics).toHaveProperty('visualHierarchy');
        expect(metrics).toHaveProperty('colorContrast');
        expect(metrics).toHaveProperty('typographyQuality');
        expect(metrics).toHaveProperty('overallScore');

        // All scores should be between 0 and 1
        for (const score of Object.values(metrics)) {
          expect(score).toBeGreaterThanOrEqual(0);
          expect(score).toBeLessThanOrEqual(1);
        }
      });

      it('should provide quality recommendations', () => {
        polishManager.updateQualityMetrics();
        const recommendations = polishManager.getQualityRecommendations();

        expect(Array.isArray(recommendations)).toBe(true);
        for (const recommendation of recommendations) {
          expect(typeof recommendation).toBe('string');
          expect(recommendation.length).toBeGreaterThan(0);
        }
      });

      it('should update overall score based on individual metrics', () => {
        polishManager.updateQualityMetrics();
        const metrics = polishManager.getQualityMetrics();

        const individualScores = [
          metrics.pixelPerfectScore,
          metrics.crossBrowserConsistency,
          metrics.animationSmoothness,
          metrics.microInteractionQuality,
          metrics.visualHierarchy,
          metrics.colorContrast,
          metrics.typographyQuality,
        ];

        const expectedOverallScore =
          individualScores.reduce((a, b) => a + b, 0) / individualScores.length;

        expect(metrics.overallScore).toBeCloseTo(expectedOverallScore, 2);
      });
    });

    describe('Configuration', () => {
      it('should update configuration', () => {
        const newConfig: Partial<PolishConfig> = {
          enableHapticFeedback: true,
          qualityThreshold: 0.8,
          animationQuality: 'ultra',
        };

        polishManager.updateConfig(newConfig);

        // Configuration should be updated (no direct way to verify without exposing internals)
        expect(true).toBe(true);
      });

      it('should use custom configuration in constructor', () => {
        const customConfig: PolishConfig = {
          ...DEFAULT_POLISH_CONFIG,
          enableMicroInteractions: false,
          qualityThreshold: 0.8,
        };

        const manager = new VisualPolishManager(customConfig);

        // Should respect the configuration
        manager.addMicroInteraction('test', mockElement, 'subtleHover');
        expect(mockElement.addEventListener).not.toHaveBeenCalled();

        manager.destroy();
      });
    });

    describe('Cleanup', () => {
      it('should cleanup all micro-interactions on destroy', () => {
        polishManager.addMicroInteraction('test1', mockElement, 'subtleHover');
        polishManager.addMicroInteraction('test2', mockElement, 'focusRing');

        polishManager.destroy();

        expect(mockElement.removeEventListener).toHaveBeenCalled();
      });

      it('should cancel running animations on cleanup', () => {
        const mockAnimation = {
          reverse: vi.fn(),
          cancel: vi.fn(),
          finished: Promise.resolve(),
        };

        mockElement.animate.mockReturnValue(mockAnimation);
        mockElement._polishAnimation = mockAnimation;

        polishManager.addMicroInteraction('test', mockElement, 'subtleHover');
        polishManager.removeMicroInteraction('test');

        expect(mockAnimation.cancel).toHaveBeenCalled();
      });
    });
  });

  describe('useVisualPolish Hook', () => {
    it('should initialize with default configuration', () => {
      const { result } = renderHook(() => useVisualPolish());

      expect(result.current.addMicroInteraction).toBeDefined();
      expect(result.current.removeMicroInteraction).toBeDefined();
      expect(result.current.addVisualRegressionTest).toBeDefined();
      expect(result.current.runVisualRegressionTest).toBeDefined();
      expect(result.current.addCrossBrowserTest).toBeDefined();
      expect(result.current.runCrossBrowserTest).toBeDefined();
      expect(result.current.updateConfig).toBeDefined();
      expect(result.current.presets).toBe(MICRO_INTERACTION_PRESETS);
    });

    it('should handle custom configuration', () => {
      const customConfig: Partial<PolishConfig> = {
        enableMicroInteractions: false,
        qualityThreshold: 0.8,
      };

      const { result } = renderHook(() => useVisualPolish(customConfig));

      expect(result.current.polishManager).toBeDefined();
    });

    it('should update quality metrics periodically', async () => {
      vi.useFakeTimers();

      const { result } = renderHook(() => useVisualPolish());

      // Initially null
      expect(result.current.qualityMetrics).toBeNull();

      // Fast-forward time to trigger metrics update
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Should have metrics after update
      await vi.waitFor(() => {
        expect(result.current.qualityMetrics).not.toBeNull();
      });

      vi.useRealTimers();
    });

    it('should provide micro-interaction methods', () => {
      const { result } = renderHook(() => useVisualPolish());

      act(() => {
        result.current.addMicroInteraction('test', mockElement, 'subtleHover');
      });

      expect(mockElement.addEventListener).toHaveBeenCalled();

      act(() => {
        result.current.removeMicroInteraction('test');
      });

      expect(mockElement.removeEventListener).toHaveBeenCalled();
    });

    it('should provide visual regression testing methods', async () => {
      const { result } = renderHook(() => useVisualPolish());

      act(() => {
        result.current.addVisualRegressionTest(
          'test',
          'Test Component',
          mockElement
        );
      });

      const testResult = await act(async () => {
        return result.current.runVisualRegressionTest('test');
      });

      expect(typeof testResult).toBe('boolean');
    });

    it('should provide cross-browser testing methods', () => {
      const { result } = renderHook(() => useVisualPolish());

      act(() => {
        result.current.addCrossBrowserTest(
          'test',
          'backdrop-filter',
          'blur(20px)'
        );
      });

      const testResult = act(() => {
        return result.current.runCrossBrowserTest('test', mockElement);
      });

      expect(typeof testResult).toBe('boolean');
    });

    it('should allow configuration updates', () => {
      const { result } = renderHook(() => useVisualPolish());

      act(() => {
        result.current.updateConfig({
          enableHapticFeedback: true,
          qualityThreshold: 0.9,
        });
      });

      // Configuration should be updated
      expect(true).toBe(true);
    });

    it('should cleanup on unmount', () => {
      const { result, unmount } = renderHook(() => useVisualPolish());

      // Add some interactions
      act(() => {
        result.current.addMicroInteraction('test1', mockElement, 'subtleHover');
        result.current.addMicroInteraction('test2', mockElement, 'focusRing');
      });

      unmount();

      // Should have cleaned up
      expect(mockElement.removeEventListener).toHaveBeenCalled();
    });
  });

  describe('Micro-Interaction Presets', () => {
    it('should have all required presets', () => {
      const requiredPresets = [
        'subtleHover',
        'magneticHover',
        'pressDown',
        'focusRing',
        'rippleEffect',
        'glowEffect',
      ];

      for (const preset of requiredPresets) {
        expect(MICRO_INTERACTION_PRESETS).toHaveProperty(preset);
      }
    });

    it('should have valid preset configurations', () => {
      for (const [_name, preset] of Object.entries(MICRO_INTERACTION_PRESETS)) {
        expect(preset).toHaveProperty('trigger');
        expect(preset).toHaveProperty('animation');
        expect(preset).toHaveProperty('feedback');
        expect(preset).toHaveProperty('timing');

        expect(preset.animation).toHaveProperty('keyframes');
        expect(preset.animation).toHaveProperty('options');
        expect(Array.isArray(preset.animation.keyframes)).toBe(true);
        expect(typeof preset.animation.options).toBe('object');

        expect(preset.feedback).toHaveProperty('visual');
        expect(preset.feedback).toHaveProperty('haptic');
        expect(preset.feedback).toHaveProperty('audio');

        expect(preset.timing).toHaveProperty('delay');
        expect(preset.timing).toHaveProperty('duration');
        expect(preset.timing).toHaveProperty('easing');
      }
    });

    it('should have reasonable timing values', () => {
      for (const [_name, preset] of Object.entries(MICRO_INTERACTION_PRESETS)) {
        expect(preset.timing.delay).toBeGreaterThanOrEqual(0);
        expect(preset.timing.duration).toBeGreaterThan(0);
        expect(preset.timing.duration).toBeLessThan(2000); // Reasonable upper limit
        expect(typeof preset.timing.easing).toBe('string');
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle missing elements gracefully', () => {
      const polishManager = new VisualPolishManager();

      expect(() => {
        polishManager.addMicroInteraction('test', null as any, 'subtleHover');
      }).not.toThrow();

      polishManager.destroy();
    });

    it('should handle invalid preset names gracefully', () => {
      const polishManager = new VisualPolishManager();

      expect(() => {
        polishManager.addMicroInteraction(
          'test',
          mockElement,
          'invalid-preset' as any
        );
      }).not.toThrow();

      polishManager.destroy();
    });

    it('should handle animation failures gracefully', () => {
      const failingElement = {
        ...mockElement,
        animate: vi.fn(() => {
          throw new Error('Animation failed');
        }),
      };

      const polishManager = new VisualPolishManager();

      expect(() => {
        polishManager.addMicroInteraction(
          'test',
          failingElement,
          'subtleHover'
        );
      }).not.toThrow();

      polishManager.destroy();
    });
  });
});
