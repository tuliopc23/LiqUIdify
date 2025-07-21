/**
 * Glass Performance Optimization System
 * 60fps animation performance with GPU acceleration and intelligent batching
 * Requirements: 5.3, 5.6 - Animation performance optimization with reduced motion support
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  gpuMemory: number;
  activeAnimations: number;
  droppedFrames: number;
  renderTime: number;
  layoutThrashing: number;
}

export interface AnimationBudget {
  maxAnimations: number;
  maxFrameTime: number;
  targetFPS: number;
  memoryLimit: number;
  gpuMemoryLimit: number;
}

export interface OptimizationConfig {
  enableGPUAcceleration: boolean;
  enableBatching: boolean;
  enableCulling: boolean;
  enableLOD: boolean; // Level of Detail
  enableReducedMotion: boolean;
  performanceBudget: AnimationBudget;
  qualitySettings: 'low' | 'medium' | 'high' | 'ultra';
}

export interface AnimationTask {
  id: string;
  element: HTMLElement;
  callback: (timestamp: number) => void;
  priority: number;
  lastFrame: number;
  frameCount: number;
  isVisible: boolean;
  boundingRect: DOMRect;
}

/**
 * Default Performance Configuration
 */
export const DEFAULT_PERFORMANCE_CONFIG: OptimizationConfig = {
  enableGPUAcceleration: true,
  enableBatching: true,
  enableCulling: true,
  enableLOD: true,
  enableReducedMotion: true,
  performanceBudget: {
    maxAnimations: 50,
    maxFrameTime: 16.67, // 60fps
    targetFPS: 60,
    memoryLimit: 100 * 1024 * 1024, // 100MB
    gpuMemoryLimit: 50 * 1024 * 1024, // 50MB
  },
  qualitySettings: 'high',
};

/**
 * Quality Settings Presets
 */
export const QUALITY_PRESETS: Record<string, Partial<OptimizationConfig>> = {
  low: {
    enableGPUAcceleration: false,
    enableBatching: true,
    enableCulling: true,
    enableLOD: true,
    performanceBudget: {
      maxAnimations: 10,
      maxFrameTime: 33.33, // 30fps
      targetFPS: 30,
      memoryLimit: 25 * 1024 * 1024,
      gpuMemoryLimit: 10 * 1024 * 1024,
    },
  },
  medium: {
    enableGPUAcceleration: true,
    enableBatching: true,
    enableCulling: true,
    enableLOD: true,
    performanceBudget: {
      maxAnimations: 25,
      maxFrameTime: 20, // 50fps
      targetFPS: 50,
      memoryLimit: 50 * 1024 * 1024,
      gpuMemoryLimit: 25 * 1024 * 1024,
    },
  },
  high: {
    enableGPUAcceleration: true,
    enableBatching: true,
    enableCulling: true,
    enableLOD: false,
    performanceBudget: {
      maxAnimations: 50,
      maxFrameTime: 16.67, // 60fps
      targetFPS: 60,
      memoryLimit: 100 * 1024 * 1024,
      gpuMemoryLimit: 50 * 1024 * 1024,
    },
  },
  ultra: {
    enableGPUAcceleration: true,
    enableBatching: false, // Disable batching for maximum quality
    enableCulling: false,
    enableLOD: false,
    performanceBudget: {
      maxAnimations: 100,
      maxFrameTime: 8.33, // 120fps
      targetFPS: 120,
      memoryLimit: 200 * 1024 * 1024,
      gpuMemoryLimit: 100 * 1024 * 1024,
    },
  },
};

/**
 * Performance Monitor
 * Tracks animation performance and provides optimization recommendations
 */
export class GlassPerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    gpuMemory: 0,
    activeAnimations: 0,
    droppedFrames: 0,
    renderTime: 0,
    layoutThrashing: 0,
  };

  private frameHistory: number[] = [];
  private lastFrameTime: number = 0;
  private frameCount: number = 0;
  private isMonitoring: boolean = false;
  private animationFrame: number | null = undefined;

  start(): void {
    if (this.isMonitoring) {
      return undefined;
    }

    this.isMonitoring = true;
    this.frameCount = 0;
    this.frameHistory = [];
    this.monitor();
  }

  stop(): void {
    this.isMonitoring = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }
  }

  private monitor = (): void => {
    if (!this.isMonitoring) {
      return undefined;
    }

    const now = performance.now();
    const frameTime = now - this.lastFrameTime;

    if (0 < this.lastFrameTime) {
      this.frameHistory.push(frameTime);

      // Keep only last 60 frames for FPS calculation
      if (60 < this.frameHistory.length) {
        this.frameHistory.shift();
      }

      // Calculate FPS
      const avgFrameTime =
        this.frameHistory.reduce((a, b) => a + b, 0) / this.frameHistory.length;
      this.metrics.fps = 1000 / avgFrameTime;
      this.metrics.frameTime = avgFrameTime;

      // Count dropped frames (frames that took longer than 16.67ms)
      if (16.67 < frameTime) {
        this.metrics.droppedFrames++;
      }
    }

    this.lastFrameTime = now;
    this.frameCount++;

    // Update memory usage if available
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize;
    }

    this.animationFrame = requestAnimationFrame(this.monitor);
  };

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  updateActiveAnimations(count: number): void {
    this.metrics.activeAnimations = count;
  }

  updateRenderTime(time: number): void {
    this.metrics.renderTime = time;
  }

  updateLayoutThrashing(count: number): void {
    this.metrics.layoutThrashing = count;
  }

  getRecommendations(): string[] {
    const recommendations: string[] = [];
    const { fps, activeAnimations, droppedFrames, memoryUsage } = this.metrics;

    if (30 > fps) {
      recommendations.push(
        'Consider reducing animation complexity or enabling reduced motion'
      );
    }

    if (50 < activeAnimations) {
      recommendations.push(
        'Too many active animations - consider animation culling'
      );
    }

    if (10 < droppedFrames) {
      recommendations.push(
        'High frame drop rate - enable GPU acceleration or reduce quality'
      );
    }

    if (memoryUsage > 100 * 1024 * 1024) {
      recommendations.push(
        'High memory usage - consider animation cleanup and garbage collection'
      );
    }

    return recommendations;
  }
}

/**
 * Animation Scheduler
 * Intelligent animation batching and prioritization system
 */
export class GlassAnimationScheduler {
  private tasks: Map<string, AnimationTask> = new Map();
  private config: OptimizationConfig;
  private monitor: GlassPerformanceMonitor;
  private animationFrame: number | null = undefined;
  private isRunning: boolean = false;
  private intersectionObserver: IntersectionObserver | null = undefined;
  private reducedMotion: boolean = false;

  constructor(config: OptimizationConfig = DEFAULT_PERFORMANCE_CONFIG) {
    this.config = config;
    this.monitor = new GlassPerformanceMonitor();
    this.setupIntersectionObserver();
    this.checkReducedMotion();
  }

  private setupIntersectionObserver(): void {
    if (
      !this.config.enableCulling ||
      'undefined' === typeof IntersectionObserver
    ) {
      return undefined;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const taskId = (entry.target as HTMLElement).dataset.animationId;
          if (taskId) {
            const task = this.tasks.get(taskId);
            if (task) {
              task.isVisible = entry.isIntersecting;
              task.boundingRect = entry.boundingClientRect;
            }
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );
  }

  private checkReducedMotion(): void {
    if (!this.config.enableReducedMotion || 'undefined' === typeof window) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion = mediaQuery.matches;

    mediaQuery.addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
    });
  }

  addTask(task: AnimationTask): void {
    // Skip animations if reduced motion is preferred
    if (this.reducedMotion) {
      return undefined;
    }

    // Check performance budget
    if (this.tasks.size >= this.config.performanceBudget.maxAnimations) {
      console.warn('Animation budget exceeded, skipping animation');
      return undefined;
    }

    this.tasks.set(task.id, task);

    // Set up intersection observer for culling
    if (this.intersectionObserver && this.config.enableCulling) {
      task.element.dataset.animationId = task.id;
      this.intersectionObserver.observe(task.element);
    }

    // Enable GPU acceleration
    if (this.config.enableGPUAcceleration) {
      this.enableGPUAcceleration(task.element);
    }

    if (!this.isRunning) {
      this.start();
    }
  }

  removeTask(id: string): void {
    const task = this.tasks.get(id);
    if (task) {
      if (this.intersectionObserver && this.config.enableCulling) {
        this.intersectionObserver.unobserve(task.element);
        delete task.element.dataset.animationId;
      }
      this.tasks.delete(id);
    }

    if (0 === this.tasks.size) {
      this.stop();
    }
  }

  private enableGPUAcceleration(element: HTMLElement): void {
    element.style.willChange = 'transform, opacity';
    element.style.transform = element.style.transform || 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';
  }

  private start(): void {
    if (this.isRunning) {
      return undefined;
    }

    this.isRunning = true;
    this.monitor.start();
    this.tick();
  }

  private stop(): void {
    this.isRunning = false;
    this.monitor.stop();

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }
  }

  private tick = (timestamp: number = performance.now()): void => {
    if (!this.isRunning) {
      return undefined;
    }

    const frameStartTime = performance.now();
    const { maxFrameTime } = this.config.performanceBudget;

    // Sort tasks by priority and visibility
    const sortedTasks = [...this.tasks.values()]
      .filter((task) => !this.config.enableCulling || task.isVisible)
      .sort((a, b) => b.priority - a.priority);

    let executedTasks = 0;

    // Execute tasks within frame budget
    for (const task of sortedTasks) {
      try {
        // Apply Level of Detail if enabled
        if (this.config.enableLOD) {
          this.applyLevelOfDetail(task);
        }

        task.callback(timestamp);
        task.lastFrame = timestamp;
        task.frameCount++;
        executedTasks++;

        // Check frame budget
        if (performance.now() - frameStartTime > maxFrameTime * 0.8) {
          break; // Stop executing tasks to maintain frame rate
        }
      } catch (error) {
        console.warn(`Animation task ${task.id} failed:`, error);
        this.removeTask(task.id);
      }
    }

    // Update performance metrics
    this.monitor.updateActiveAnimations(this.tasks.size);
    this.monitor.updateRenderTime(performance.now() - frameStartTime);

    this.animationFrame = requestAnimationFrame(this.tick);
  };

  private applyLevelOfDetail(task: AnimationTask): void {
    const { boundingRect } = task;
    const viewportArea = window.innerWidth * window.innerHeight;
    const elementArea = boundingRect.width * boundingRect.height;
    const visibilityRatio = elementArea / viewportArea;

    // Reduce animation quality for small or distant elements
    if (0.01 > visibilityRatio) {
      // Very small elements - skip every other frame
      if (0 === task.frameCount % 2) {
        return undefined;
      }
    } else if (0.05 > visibilityRatio) {
      // Small elements - reduce frame rate
      if (0 === task.frameCount % 1.5) {
        return undefined;
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return this.monitor.getMetrics();
  }

  getRecommendations(): string[] {
    return this.monitor.getRecommendations();
  }

  updateConfig(config: Partial<OptimizationConfig>): void {
    this.config = { ...this.config, ...config };
  }

  destroy(): void {
    this.stop();

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }

    this.tasks.clear();
  }
}

/**
 * GPU Acceleration Helper
 * Optimizes elements for GPU rendering
 */
export class GPUAccelerationHelper {
  static enableForElement(
    element: HTMLElement,
    options: {
      force3D?: boolean;
      enableWillChange?: boolean;
      optimizeTransforms?: boolean;
    } = {}
  ): void {
    const {
      force3D = true,
      enableWillChange = true,
      optimizeTransforms = true,
    } = options;

    if (force3D) {
      element.style.transform = element.style.transform || 'translateZ(0)';
      element.style.backfaceVisibility = 'hidden';
      element.style.perspective = '1000px';
    }

    if (enableWillChange) {
      element.style.willChange = 'transform, opacity';
    }

    if (optimizeTransforms) {
      element.style.transformStyle = 'preserve-3d';
    }

    // Additional optimizations
    element.style.imageRendering = 'optimizeSpeed';
    element.style.imageRendering = 'crisp-edges';
  }

  static disableForElement(element: HTMLElement): void {
    element.style.willChange = 'auto';
    element.style.transform =
      element.style.transform?.replace('translateZ(0)', '') || '';
    element.style.backfaceVisibility = '';
    element.style.perspective = '';
    element.style.transformStyle = '';
    element.style.imageRendering = '';
  }

  static isGPUAccelerated(element: HTMLElement): boolean {
    const computedStyle = window.getComputedStyle(element);
    return (
      'auto' !== computedStyle.willChange ||
      computedStyle.transform.includes('translateZ') ||
      'hidden' === computedStyle.backfaceVisibility
    );
  }
}

/**
 * React Hook for Glass Performance Optimization
 * Provides performance monitoring and optimization tools
 */
export function useGlassPerformance(config: Partial<OptimizationConfig> = {}) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(undefined);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const schedulerRef = useRef<GlassAnimationScheduler | null>(null);
  const configRef = useRef<OptimizationConfig>({
    ...DEFAULT_PERFORMANCE_CONFIG,
    ...config,
  });

  // Initialize scheduler
  useEffect(() => {
    schedulerRef.current = new GlassAnimationScheduler(configRef.current);

    return () => {
      schedulerRef.current?.destroy();
      schedulerRef.current = undefined;
    };
  }, []);

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (schedulerRef.current) {
        const currentMetrics = schedulerRef.current.getMetrics();
        const currentRecommendations =
          schedulerRef.current.getRecommendations();

        setMetrics(currentMetrics);
        setRecommendations(currentRecommendations);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addAnimation = useCallback(
    (
      id: string,
      element: HTMLElement,
      callback: (timestamp: number) => void,
      priority: number = 0
    ) => {
      if (!schedulerRef.current) {
        return undefined;
      }

      const task: AnimationTask = {
        id,
        element,
        callback,
        priority,
        lastFrame: 0,
        frameCount: 0,
        isVisible: true,
        boundingRect: element.getBoundingClientRect(),
      };

      schedulerRef.current.addTask(task);
    },
    []
  );

  const removeAnimation = useCallback((id: string) => {
    schedulerRef.current?.removeTask(id);
  }, []);

  const enableGPUAcceleration = useCallback((element: HTMLElement) => {
    GPUAccelerationHelper.enableForElement(element);
  }, []);

  const disableGPUAcceleration = useCallback((element: HTMLElement) => {
    GPUAccelerationHelper.disableForElement(element);
  }, []);

  const updateConfig = useCallback((newConfig: Partial<OptimizationConfig>) => {
    configRef.current = { ...configRef.current, ...newConfig };
    schedulerRef.current?.updateConfig(configRef.current);
  }, []);

  const setQuality = useCallback(
    (quality: keyof typeof QUALITY_PRESETS) => {
      const qualityConfig = QUALITY_PRESETS[quality];
      if (qualityConfig) {
        updateConfig(qualityConfig);
      }
    },
    [updateConfig]
  );

  return {
    metrics,
    recommendations,
    addAnimation,
    removeAnimation,
    enableGPUAcceleration,
    disableGPUAcceleration,
    updateConfig,
    setQuality,
    scheduler: schedulerRef.current,
  };
}
