/**
 * Component Performance Tests
 * 
 * Tests for S-tier performance requirements:
 * - Render time: <18ms (55fps equivalent)
 * - Memory efficiency: No leaks >1MB
 * - Animation performance: 55+ fps
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { performance } from 'perf_hooks';
import React from 'react';

// Import components to test
import { GlassButton } from '../../src/components/glass-button-refactored/index';
import { GlassCard } from '../../src/components/glass-card-refactored/index';
import { GlassInput } from '../../src/components/glass-input/index';

// Performance thresholds for S-tier compliance
const PERFORMANCE_THRESHOLDS = {
  renderTime: 18, // ms (for 55fps)
  rerenderTime: 8, // ms for fast re-renders
  memoryLeakLimit: 1024 * 1024, // 1MB
  minimumFps: 55,
} as const;

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  iterations: number;
  averageRenderTime: number;
  p95RenderTime: number;
  p99RenderTime: number;
  memoryUsage: {
    initial: number;
    final: number;
    peak: number;
    leaked: number;
  };
}

class ComponentPerformanceTester {
  private renderTimes: number[] = [];
  private memorySnapshots: number[] = [];

  measureRenderTime<T>(
    component: React.ComponentType<T>,
    props: T,
    iterations: number = 100
  ): PerformanceMetrics {
    const renderTimes: number[] = [];
    const initialMemory = this.getMemoryUsage();
    let peakMemory = initialMemory;

    // Warm up
    for (let i = 0; i < 5; i++) {
      const { unmount } = render(React.createElement(component, props));
      unmount();
    }

    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }

    // Measure render performance
    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      
      const { unmount } = render(React.createElement(component, props));
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      renderTimes.push(renderTime);

      // Sample memory usage
      if (i % 10 === 0) {
        const currentMemory = this.getMemoryUsage();
        if (currentMemory > peakMemory) {
          peakMemory = currentMemory;
        }
        this.memorySnapshots.push(currentMemory);
      }

      unmount();
      cleanup();

      // Small delay to prevent overwhelming
      if (i % 50 === 0 && global.gc) {
        global.gc();
      }
    }

    const finalMemory = this.getMemoryUsage();
    const sortedTimes = renderTimes.sort((a, b) => a - b);

    return {
      renderTime: renderTimes[renderTimes.length - 1],
      componentName: component.displayName || component.name || 'Unknown',
      iterations,
      averageRenderTime: renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length,
      p95RenderTime: sortedTimes[Math.floor(sortedTimes.length * 0.95)],
      p99RenderTime: sortedTimes[Math.floor(sortedTimes.length * 0.99)],
      memoryUsage: {
        initial: initialMemory,
        final: finalMemory,
        peak: peakMemory,
        leaked: Math.max(0, finalMemory - initialMemory),
      },
    };
  }

  measureReRenderTime<T>(
    component: React.ComponentType<T>,
    initialProps: T,
    updatedProps: T,
    iterations: number = 50
  ): number[] {
    const reRenderTimes: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const { rerender, unmount } = render(React.createElement(component, initialProps));
      
      const startTime = performance.now();
      rerender(React.createElement(component, updatedProps));
      const endTime = performance.now();
      
      reRenderTimes.push(endTime - startTime);
      unmount();
    }

    return reRenderTimes;
  }

  private getMemoryUsage(): number {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in window.performance) {
      return (window.performance as any).memory.usedJSHeapSize;
    }
    
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage().heapUsed;
    }
    
    return 0;
  }
}

describe('Component Performance Tests', () => {
  let tester: ComponentPerformanceTester;

  beforeEach(() => {
    tester = new ComponentPerformanceTester();
    
    // Force garbage collection before each test
    if (global.gc) {
      global.gc();
    }
  });

  afterEach(() => {
    cleanup();
    
    // Force garbage collection after each test
    if (global.gc) {
      global.gc();
    }
  });

  describe('GlassButton Performance', () => {
    it('should render within S-tier performance thresholds', () => {
      const metrics = tester.measureRenderTime(
        GlassButton,
        { children: 'Test Button', variant: 'primary' },
        100
      );

      // Check render time (S-tier: <18ms for 55fps)
      expect(metrics.p95RenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.renderTime);
      expect(metrics.averageRenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.renderTime / 2);

      // Check memory efficiency
      expect(metrics.memoryUsage.leaked).toBeLessThan(PERFORMANCE_THRESHOLDS.memoryLeakLimit);

      console.log(`GlassButton Performance:
        - Average render time: ${metrics.averageRenderTime.toFixed(2)}ms
        - P95 render time: ${metrics.p95RenderTime.toFixed(2)}ms
        - Memory leaked: ${(metrics.memoryUsage.leaked / 1024).toFixed(2)}KB
        - Status: ${metrics.p95RenderTime < PERFORMANCE_THRESHOLDS.renderTime ? '✅ PASS' : '❌ FAIL'}`);
    });

    it('should re-render efficiently', () => {
      const reRenderTimes = tester.measureReRenderTime(
        GlassButton,
        { children: 'Initial', variant: 'primary' },
        { children: 'Updated', variant: 'secondary' },
        50
      );

      const averageReRenderTime = reRenderTimes.reduce((a, b) => a + b, 0) / reRenderTimes.length;
      const p95ReRenderTime = reRenderTimes.sort((a, b) => a - b)[Math.floor(reRenderTimes.length * 0.95)];

      expect(p95ReRenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.rerenderTime);
      expect(averageReRenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.rerenderTime / 2);

      console.log(`GlassButton Re-render Performance:
        - Average re-render time: ${averageReRenderTime.toFixed(2)}ms
        - P95 re-render time: ${p95ReRenderTime.toFixed(2)}ms`);
    });
  });

  describe('GlassCard Performance', () => {
    it('should render within S-tier performance thresholds', () => {
      const metrics = tester.measureRenderTime(
        GlassCard,
        { 
          children: 'Test Card Content',
          className: 'test-card'
        },
        100
      );

      expect(metrics.p95RenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.renderTime);
      expect(metrics.averageRenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.renderTime / 2);
      expect(metrics.memoryUsage.leaked).toBeLessThan(PERFORMANCE_THRESHOLDS.memoryLeakLimit);

      console.log(`GlassCard Performance:
        - Average render time: ${metrics.averageRenderTime.toFixed(2)}ms
        - P95 render time: ${metrics.p95RenderTime.toFixed(2)}ms
        - Memory leaked: ${(metrics.memoryUsage.leaked / 1024).toFixed(2)}KB
        - Status: ${metrics.p95RenderTime < PERFORMANCE_THRESHOLDS.renderTime ? '✅ PASS' : '❌ FAIL'}`);
    });
  });

  describe('GlassInput Performance', () => {
    it('should render within S-tier performance thresholds', () => {
      const metrics = tester.measureRenderTime(
        GlassInput,
        { 
          placeholder: 'Test input',
          type: 'text'
        },
        100
      );

      expect(metrics.p95RenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.renderTime);
      expect(metrics.averageRenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.renderTime / 2);
      expect(metrics.memoryUsage.leaked).toBeLessThan(PERFORMANCE_THRESHOLDS.memoryLeakLimit);

      console.log(`GlassInput Performance:
        - Average render time: ${metrics.averageRenderTime.toFixed(2)}ms
        - P95 render time: ${metrics.p95RenderTime.toFixed(2)}ms
        - Memory leaked: ${(metrics.memoryUsage.leaked / 1024).toFixed(2)}KB
        - Status: ${metrics.p95RenderTime < PERFORMANCE_THRESHOLDS.renderTime ? '✅ PASS' : '❌ FAIL'}`);
    });
  });

  describe('Component Stress Test', () => {
    it('should handle multiple components without performance degradation', () => {
      const components = [
        { component: GlassButton, props: { children: 'Button' } },
        { component: GlassCard, props: { children: 'Card Content' } },
        { component: GlassInput, props: { placeholder: 'Input' } },
      ];

      const results = components.map(({ component, props }) => 
        tester.measureRenderTime(component as any, props, 50)
      );

      results.forEach((metrics) => {
        expect(metrics.p95RenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.renderTime);
        expect(metrics.memoryUsage.leaked).toBeLessThan(PERFORMANCE_THRESHOLDS.memoryLeakLimit);
      });

      const totalMemoryLeaked = results.reduce((sum, metrics) => 
        sum + metrics.memoryUsage.leaked, 0
      );

      expect(totalMemoryLeaked).toBeLessThan(PERFORMANCE_THRESHOLDS.memoryLeakLimit * 3);

      console.log('Multi-component stress test results:');
      results.forEach((metrics) => {
        console.log(`  ${metrics.componentName}: ${metrics.p95RenderTime.toFixed(2)}ms (P95)`);
      });
      console.log(`  Total memory leaked: ${(totalMemoryLeaked / 1024).toFixed(2)}KB`);
    });
  });

  describe('Performance Score Calculation', () => {
    it('should calculate overall performance score', () => {
      const components = [
        { component: GlassButton, props: { children: 'Button' } },
        { component: GlassCard, props: { children: 'Card' } },
        { component: GlassInput, props: { placeholder: 'Input' } },
      ];

      const results = components.map(({ component, props }) => 
        tester.measureRenderTime(component as any, props, 50)
      );

      // Calculate performance score (0-100)
      const renderScore = results.reduce((sum, metrics) => {
        const renderPenalty = Math.max(0, (metrics.p95RenderTime - PERFORMANCE_THRESHOLDS.renderTime) / PERFORMANCE_THRESHOLDS.renderTime * 50);
        return sum + Math.max(0, 100 - renderPenalty);
      }, 0) / results.length;

      const memoryScore = results.reduce((sum, metrics) => {
        const memoryPenalty = Math.max(0, (metrics.memoryUsage.leaked - PERFORMANCE_THRESHOLDS.memoryLeakLimit / 10) / PERFORMANCE_THRESHOLDS.memoryLeakLimit * 50);
        return sum + Math.max(0, 100 - memoryPenalty);
      }, 0) / results.length;

      const overallScore = (renderScore + memoryScore) / 2;

      // S-tier requirement: >85 performance score
      expect(overallScore).toBeGreaterThan(85);

      console.log(`Performance Score Breakdown:
        - Render Performance: ${renderScore.toFixed(1)}/100
        - Memory Efficiency: ${memoryScore.toFixed(1)}/100
        - Overall Score: ${overallScore.toFixed(1)}/100
        - Status: ${overallScore > 85 ? '✅ S-tier' : '❌ Below S-tier'}`);
    });
  });
});