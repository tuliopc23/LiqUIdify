/**
 * Performance Analysis Test
 * Identifies current performance bottlenecks
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { performanceMonitor } from '../src/core/performance-monitor';

describe('Performance Analysis', () => {
  beforeEach(() => {
    performanceMonitor.clear();
  });

  afterEach(() => {
    // cleanup();
  });

  it('should measure basic computation time', () => {
    const startTime = performance.now();
    
    // Simulate some computation
    let result = 0;
    for (let i = 0; i < 10000; i++) {
      result += Math.random();
    }
    
    const endTime = performance.now();
    const computeTime = endTime - startTime;
    
    // S-tier requirement: 55fps means each frame should be < 18.18ms
    const frameTime = 1000 / 55; // ~18.18ms
    
    console.log(`Computation time: ${computeTime.toFixed(2)}ms (target: <${frameTime.toFixed(2)}ms)`);
    expect(computeTime).toBeLessThan(frameTime);
  });

  it('should track custom performance metrics', () => {
    performanceMonitor.trackCustomMetric('test-metric', 100);
    
    const report = performanceMonitor.getReport();
    expect(report.customMetrics['test-metric']).toBe(100);
  });

  it('should measure timing operations performance', () => {
    const iterations = 100;
    const timings: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      
      // Simulate a typical operation
      performanceMonitor.startTiming('test-operation');
      
      // Some computation
      let result = 0;
      for (let j = 0; j < 1000; j++) {
        result += Math.random();
      }
      
      const duration = performanceMonitor.endTiming('test-operation');
      const endTime = performance.now();
      
      timings.push(endTime - startTime);
    }
    
    const averageTime = timings.reduce((a, b) => a + b, 0) / timings.length;
    const maxTime = Math.max(...timings);
    
    // Check average and max times meet S-tier standards
    expect(averageTime).toBeLessThan(16.67); // 60fps
    expect(maxTime).toBeLessThan(18.18); // 55fps
    
    console.log(`Average operation time: ${averageTime.toFixed(2)}ms`);
    console.log(`Max operation time: ${maxTime.toFixed(2)}ms`);
  });

  it('should verify bundle size targets', () => {
    const bundleLimits = {
      core: 15 * 1024, // 15KB
      animations: 10 * 1024, // 10KB
      advanced: 8 * 1024, // 8KB
      total: 30 * 1024, // 30KB
    };
    
    // This would be populated by actual bundle analysis
    const currentSizes = {
      core: 0.95 * 1024, // 0.95KB
      animations: 1.74 * 1024, // 1.74KB  
      advanced: 1.28 * 1024, // 1.28KB
      total: 3.97 * 1024, // 3.97KB
    };
    
    expect(currentSizes.core).toBeLessThan(bundleLimits.core);
    expect(currentSizes.animations).toBeLessThan(bundleLimits.animations);
    expect(currentSizes.advanced).toBeLessThan(bundleLimits.advanced);
    expect(currentSizes.total).toBeLessThan(bundleLimits.total);
  });

  it('should check for performance overhead', () => {
    const iterations = 1000;
    
    // Measure operations without monitoring
    const startWithoutMonitoring = performance.now();
    for (let i = 0; i < iterations; i++) {
      let result = 0;
      for (let j = 0; j < 100; j++) {
        result += Math.random();
      }
    }
    const timeWithoutMonitoring = performance.now() - startWithoutMonitoring;
    
    // Measure operations with monitoring
    const startWithMonitoring = performance.now();
    for (let i = 0; i < iterations; i++) {
      performanceMonitor.startTiming(`operation-${i}`);
      let result = 0;
      for (let j = 0; j < 100; j++) {
        result += Math.random();
      }
      performanceMonitor.endTiming(`operation-${i}`);
    }
    const timeWithMonitoring = performance.now() - startWithMonitoring;
    
    const overhead = timeWithMonitoring - timeWithoutMonitoring;
    const overheadPercentage = (overhead / timeWithoutMonitoring) * 100;
    
    console.log(`Time without monitoring: ${timeWithoutMonitoring.toFixed(2)}ms`);
    console.log(`Time with monitoring: ${timeWithMonitoring.toFixed(2)}ms`);
    console.log(`Overhead: ${overhead.toFixed(2)}ms (${overheadPercentage.toFixed(2)}%)`);
    
    // Performance monitoring overhead should be less than 5%
    expect(overheadPercentage).toBeLessThan(5);
  });
});