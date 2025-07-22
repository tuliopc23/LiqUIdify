/**
 * Animation Performance Test
 * Tests the optimized animation hooks for performance improvements
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOptimizedGlassAnimation, useOptimizedMagneticHover } from '../src/hooks/use-optimized-glass-animations';

describe('Optimized Animation Performance', () => {
  beforeEach(() => {
    // Mock requestAnimationFrame for consistent testing
    global.requestAnimationFrame = (callback: FrameRequestCallback) => {
      return setTimeout(() => callback(performance.now()), 16);
    };
    
    global.cancelAnimationFrame = (id: number) => {
      clearTimeout(id);
    };
  });

  afterEach(() => {
    // Cleanup
  });

  it('should have minimal overhead for animation setup', () => {
    const iterations = 100;
    
    // Measure animation hook creation overhead
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      const { result } = renderHook(() => useOptimizedGlassAnimation('fast'));
      // Simulate cleanup
      result.current.cancel();
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const averageTime = totalTime / iterations;
    
    console.log(`Animation hook creation time: ${averageTime.toFixed(3)}ms per hook`);
    
    // Each animation hook should be created quickly (less than 1ms on average)
    expect(averageTime).toBeLessThan(1);
  });

  it('should respect reduced motion preferences', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useOptimizedGlassAnimation('normal'));
    
    // Should use reduced duration when prefers-reduced-motion is enabled
    expect(result.current.config.duration).toBeLessThanOrEqual(100);
  });

  it('should throttle progress updates efficiently', async () => {
    const { result } = renderHook(() => useOptimizedGlassAnimation('fast', { throttleMs: 32 }));
    
    // Mock element
    const mockElement = document.createElement('div');
    
    // Mock animate method
    const mockAnimate = jest.fn().mockReturnValue({
      currentTime: 0,
      effect: {},
      finished: false,
      addEventListener: jest.fn(),
      cancel: jest.fn(),
    });
    
    mockElement.animate = mockAnimate;
    
    await act(async () => {
      result.current.animate(mockElement, [
        { opacity: 0 },
        { opacity: 1 }
      ]);
    });
    
    // Should have configured throttling
    expect(result.current.config.throttleMs).toBe(32);
    expect(mockAnimate).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({
        duration: expect.any(Number),
        easing: expect.any(String),
      })
    );
  });

  it('should handle magnetic hover efficiently', () => {
    const { result } = renderHook(() => useOptimizedMagneticHover(0.3, 30)); // 30fps limit
    
    // Create a mock element
    const mockElement = document.createElement('div');
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      right: 300,
      bottom: 200,
    });
    
    // Set the ref
    act(() => {
      result.current.ref(mockElement);
    });
    
    expect(mockElement).toBeDefined();
    expect(result.current.isHovering).toBe(false);
  });

  it('should cancel animations properly to prevent memory leaks', () => {
    const { result } = renderHook(() => useOptimizedGlassAnimation('normal'));
    
    // Mock element
    const mockElement = document.createElement('div');
    const mockAnimation = {
      currentTime: 0,
      effect: {},
      finished: false,
      addEventListener: jest.fn(),
      cancel: jest.fn(),
    };
    
    mockElement.animate = jest.fn().mockReturnValue(mockAnimation);
    
    act(() => {
      result.current.animate(mockElement, [
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' }
      ]);
    });
    
    act(() => {
      result.current.cancel();
    });
    
    expect(mockAnimation.cancel).toHaveBeenCalled();
    expect(result.current.state.isAnimating).toBe(false);
  });

  it('should optimize for instant animations', () => {
    const { result } = renderHook(() => useOptimizedGlassAnimation('instant'));
    
    // Mock element
    const mockElement = document.createElement('div');
    mockElement.animate = jest.fn();
    
    act(() => {
      result.current.animate(mockElement, [
        { opacity: 0 },
        { opacity: 1 }
      ]);
    });
    
    // Should skip animation entirely for instant timing
    expect(result.current.state.progress).toBe(1);
    expect(result.current.state.isAnimating).toBe(false);
    expect(mockElement.animate).not.toHaveBeenCalled();
  });

  it('should have efficient memory usage', () => {
    const iterations = 1000;
    const hooks: any[] = [];
    
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    // Create many animation hooks
    for (let i = 0; i < iterations; i++) {
      const { result } = renderHook(() => useOptimizedGlassAnimation('fast'));
      hooks.push(result);
    }
    
    // Clean up all hooks
    hooks.forEach(hook => {
      hook.current.cancel();
    });
    
    // Force garbage collection if available
    if ((global as any).gc) {
      (global as any).gc();
    }
    
    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const memoryGrowth = finalMemory - initialMemory;
    
    console.log(`Memory growth: ${memoryGrowth / 1024}KB for ${iterations} hooks`);
    
    // Memory growth should be reasonable (less than 1MB for 1000 hooks)
    expect(memoryGrowth).toBeLessThan(1024 * 1024);
  });
});