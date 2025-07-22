/**
 * Simple performance test to verify render times meet S-tier requirements
 */

interface PerformanceTestResult {
  renderTime: number;
  fps: number;
  memoryUsage: number;
  passed: boolean;
}

class SimplePerformanceTest {
  private frameCount = 0;
  private lastTime = 0;
  private frameStart = 0;

  /**
   * Test render performance - target: 55fps (18.18ms per frame)
   */
  testRenderPerformance(): Promise<PerformanceTestResult> {
    return new Promise((resolve) => {
      const TARGET_FPS = 55;
      const MAX_FRAME_TIME = 1000 / TARGET_FPS; // ~18.18ms
      
      this.frameCount = 0;
      this.lastTime = performance.now();
      
      const measure = () => {
        const now = performance.now();
        const frameTime = now - this.frameStart;
        this.frameStart = now;
        
        this.frameCount++;
        
        // Test for 1 second
        if (now - this.lastTime >= 1000) {
          const fps = this.frameCount;
          const averageFrameTime = 1000 / fps;
          
          const memoryUsage = this.getMemoryUsage();
          
          const result: PerformanceTestResult = {
            renderTime: averageFrameTime,
            fps,
            memoryUsage,
            passed: fps >= TARGET_FPS && averageFrameTime <= MAX_FRAME_TIME
          };
          
          resolve(result);
          return;
        }
        
        requestAnimationFrame(measure);
      };
      
      this.frameStart = performance.now();
      requestAnimationFrame(measure);
    });
  }

  /**
   * Get memory usage in MB
   */
  private getMemoryUsage(): number {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      return Math.round(memInfo.usedJSHeapSize / 1_048_576);
    }
    return 0;
  }

  /**
   * Test component render time
   */
  async testComponentRender(componentFn: () => void): Promise<number> {
    const start = performance.now();
    
    // Simulate component render
    componentFn();
    
    // Wait for any async operations
    await new Promise(resolve => setTimeout(resolve, 0));
    
    const end = performance.now();
    return end - start;
  }
}

export { SimplePerformanceTest, type PerformanceTestResult };