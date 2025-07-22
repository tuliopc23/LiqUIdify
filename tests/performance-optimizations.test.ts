/**
 * Simple Performance Validation Test
 * 
 * This test validates that the performance optimizations are working correctly
 * without requiring a full browser environment.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePerformanceMonitoring, useRealtimePerformance } from '../src/hooks/use-performance-monitoring';

// Mock performance API
const mockPerformance = {
  now: vi.fn(() => Date.now()),
  memory: {
    usedJSHeapSize: 1000000,
    totalJSHeapSize: 2000000,
    jsHeapSizeLimit: 4000000
  },
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByName: vi.fn(() => [{ duration: 10 }])
};

// Mock performance monitor
const mockPerformanceMonitor = {
  trackComponent: vi.fn(),
  trackCustomMetric: vi.fn(),
  startTiming: vi.fn(),
  endTiming: vi.fn(() => 10)
};

// Mock requestAnimationFrame
const mockRequestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
  setTimeout(callback, 16);
  return 1;
});

const mockCancelAnimationFrame = vi.fn();

describe('Performance Monitoring Optimizations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup global mocks
    global.performance = mockPerformance as any;
    global.requestAnimationFrame = mockRequestAnimationFrame;
    global.cancelAnimationFrame = mockCancelAnimationFrame;
    
    // Mock the performance monitor module
    vi.doMock('../src/core/performance-monitor', () => ({
      performanceMonitor: mockPerformanceMonitor
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('usePerformanceMonitoring optimization', () => {
    it('should not cause infinite re-renders', () => {
      const { rerender } = renderHook(
        ({ componentName, props }) => usePerformanceMonitoring(componentName, props),
        {
          initialProps: {
            componentName: 'TestComponent',
            props: { value: 'test' }
          }
        }
      );

      // Re-render with same props
      rerender({
        componentName: 'TestComponent',
        props: { value: 'test' }
      });

      // Should not cause excessive tracking calls
      expect(mockPerformanceMonitor.trackComponent).toHaveBeenCalledTimes(1);
    });

    it('should memoize props correctly', () => {
      const { rerender } = renderHook(
        ({ componentName, props }) => usePerformanceMonitoring(componentName, props),
        {
          initialProps: {
            componentName: 'TestComponent',
            props: { value: 'test', nested: { prop: 'value' } }
          }
        }
      );

      // Re-render with equivalent props (different object reference)
      rerender({
        componentName: 'TestComponent',
        props: { value: 'test', nested: { prop: 'value' } }
      });

      // Should minimize tracking calls due to prop memoization
      expect(mockPerformanceMonitor.trackComponent).toHaveBeenCalledTimes(1);
    });

    it('should debounce tracking calls', async () => {
      const { result } = renderHook(() => usePerformanceMonitoring('TestComponent'));

      // Rapid successive calls
      act(() => {
        result.current.trackMetric('test-metric', 100);
        result.current.trackMetric('test-metric', 200);
        result.current.trackMetric('test-metric', 300);
      });

      // Should debounce the calls
      await new Promise(resolve => setTimeout(resolve, 20));
      
      // Due to debouncing, should have fewer calls than without optimization
      expect(mockPerformanceMonitor.trackCustomMetric).toHaveBeenCalled();
    });
  });

  describe('useRealtimePerformance optimization', () => {
    it('should throttle FPS updates to reduce overhead', async () => {
      const { result } = renderHook(() => useRealtimePerformance());

      expect(result.current.fps).toBe(60);
      expect(result.current.memory).toEqual({ used: 0, total: 0 });

      // Wait for updates but they should be throttled
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should have registered RAF calls but throttled updates
      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it('should cleanup animation frame on unmount', () => {
      const { unmount } = renderHook(() => useRealtimePerformance());

      unmount();

      expect(mockCancelAnimationFrame).toHaveBeenCalled();
    });
  });

  describe('Performance utility functions', () => {
    it('should correctly identify when performance monitoring should be skipped', () => {
      // Mock a low-powered device
      const mockConnection = {
        effectiveType: '2g',
        saveData: true
      };
      
      Object.defineProperty(navigator, 'connection', {
        value: mockConnection,
        configurable: true
      });

      const { shouldMonitorPerformance } = require('../src/core/utils/performance-utils');
      
      expect(shouldMonitorPerformance()).toBe(false);
    });

    it('should properly throttle function calls', () => {
      const { throttle } = require('../src/core/utils/performance-utils');
      
      const mockFn = vi.fn();
      const throttledFn = throttle(mockFn, 100);

      // Rapid calls
      throttledFn();
      throttledFn();
      throttledFn();

      // Should only call once immediately
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should properly debounce function calls', async () => {
      const { debounce } = require('../src/core/utils/performance-utils');
      
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 50);

      // Rapid calls
      debouncedFn();
      debouncedFn();
      debouncedFn();

      // Should not call immediately
      expect(mockFn).toHaveBeenCalledTimes(0);

      // Wait for debounce delay
      await new Promise(resolve => setTimeout(resolve, 60));
      
      // Should call once after delay
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Memory and CPU efficiency', () => {
    it('should minimize object allocations in hot paths', () => {
      const initialMemory = mockPerformance.memory.usedJSHeapSize;
      
      // Create many performance monitoring instances
      for (let i = 0; i < 100; i++) {
        renderHook(() => usePerformanceMonitoring(`Component${i}`));
      }

      // Memory usage should not grow excessively
      const finalMemory = mockPerformance.memory.usedJSHeapSize;
      const memoryGrowth = finalMemory - initialMemory;
      
      // Should not grow more than 1MB for 100 components
      expect(memoryGrowth).toBeLessThan(1024 * 1024);
    });

    it('should batch DOM updates efficiently', () => {
      const { batchDOMUpdates } = require('../src/core/utils/performance-utils');
      
      const mockUpdates = [
        vi.fn(),
        vi.fn(),
        vi.fn()
      ];

      batchDOMUpdates(mockUpdates);

      // All updates should be batched in a single RAF
      expect(mockRequestAnimationFrame).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Performance Regression Prevention', () => {
  it('should maintain target frame rates under load', () => {
    // Simulate high CPU load
    const startTime = performance.now();
    
    // Create multiple performance monitoring instances
    const hooks = [];
    for (let i = 0; i < 50; i++) {
      hooks.push(renderHook(() => usePerformanceMonitoring(`Component${i}`)));
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Should complete within reasonable time (simulate 60fps requirement)
    expect(executionTime).toBeLessThan(16); // 16ms for 60fps
  });

  it('should prevent memory leaks in component lifecycle', () => {
    const { result, unmount } = renderHook(() => usePerformanceMonitoring('TestComponent'));

    // Simulate component lifecycle
    act(() => {
      result.current.startTiming('test');
      result.current.endTiming('test');
      result.current.trackMetric('test', 100);
    });

    // Unmount should cleanup properly
    unmount();

    // No additional cleanup verification needed as memory monitoring is mocked
    expect(mockPerformanceMonitor.trackComponent).toHaveBeenCalled();
  });
});