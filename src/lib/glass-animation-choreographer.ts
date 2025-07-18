/**
 * Glass Animation Choreographer
 * Sophisticated animation coordination system with Apple-quality motion
 * Requirements: 5.1, 5.5 - Animation choreography with intelligent timing and easing curves
 */

import { useRef, useCallback, useEffect } from 'react';

export interface AnimationSequence {
  id: string;
  element: HTMLElement;
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
  delay: number;
  priority: number;
}

export interface ChoreographyPattern {
  name: string;
  stagger: number;
  overlap: number;
  direction: 'forward' | 'reverse' | 'alternate';
  easing: string;
  duration: number;
}

export interface MotionPreset {
  name: string;
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
  description: string;
}

/**
 * Apple-Inspired Motion Presets
 * Based on iOS and macOS animation patterns
 */
export const MOTION_PRESETS: Record<string, MotionPreset> = {
  // Entrance animations
  fadeInUp: {
    name: 'Fade In Up',
    keyframes: [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    options: {
      duration: 600,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'both',
    },
    description: 'Gentle upward fade entrance',
  },
  fadeInDown: {
    name: 'Fade In Down',
    keyframes: [
      { opacity: 0, transform: 'translateY(-20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    options: {
      duration: 600,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'both',
    },
    description: 'Gentle downward fade entrance',
  },
  scaleIn: {
    name: 'Scale In',
    keyframes: [
      { opacity: 0, transform: 'scale(0.8)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    options: {
      duration: 400,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'both',
    },
    description: 'Bouncy scale entrance',
  },
  slideInLeft: {
    name: 'Slide In Left',
    keyframes: [
      { opacity: 0, transform: 'translateX(-30px)' },
      { opacity: 1, transform: 'translateX(0)' },
    ],
    options: {
      duration: 500,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'both',
    },
    description: 'Smooth left slide entrance',
  },
  slideInRight: {
    name: 'Slide In Right',
    keyframes: [
      { opacity: 0, transform: 'translateX(30px)' },
      { opacity: 1, transform: 'translateX(0)' },
    ],
    options: {
      duration: 500,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'both',
    },
    description: 'Smooth right slide entrance',
  },

  // Hover animations
  liftUp: {
    name: 'Lift Up',
    keyframes: [
      { transform: 'translateY(0) scale(1)' },
      { transform: 'translateY(-4px) scale(1.02)' },
    ],
    options: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'both',
    },
    description: 'Subtle lift on hover',
  },
  glow: {
    name: 'Glow',
    keyframes: [
      { boxShadow: '0 0 0 rgba(255, 255, 255, 0)' },
      { boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' },
    ],
    options: {
      duration: 400,
      easing: 'ease-in-out',
      fill: 'both',
    },
    description: 'Gentle glow effect',
  },
  magneticPull: {
    name: 'Magnetic Pull',
    keyframes: [
      { transform: 'translate(0, 0)' },
      { transform: 'translate(var(--magnetic-x, 0), var(--magnetic-y, 0))' },
    ],
    options: {
      duration: 800,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'both',
    },
    description: 'Magnetic attraction effect',
  },

  // Press animations
  pressDown: {
    name: 'Press Down',
    keyframes: [{ transform: 'scale(1)' }, { transform: 'scale(0.95)' }],
    options: {
      duration: 150,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'both',
    },
    description: 'Quick press feedback',
  },
  ripple: {
    name: 'Ripple',
    keyframes: [
      { transform: 'scale(0)', opacity: 1 },
      { transform: 'scale(1)', opacity: 0 },
    ],
    options: {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'both',
    },
    description: 'Material-style ripple effect',
  },

  // Loading animations
  pulse: {
    name: 'Pulse',
    keyframes: [
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0.7, transform: 'scale(1.05)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    options: {
      duration: 2000,
      easing: 'ease-in-out',
      iterationCount: Infinity,
    },
    description: 'Breathing pulse animation',
  },
  shimmer: {
    name: 'Shimmer',
    keyframes: [
      { backgroundPosition: '-200% 0' },
      { backgroundPosition: '200% 0' },
    ],
    options: {
      duration: 2000,
      easing: 'ease-in-out',
      iterationCount: Infinity,
    },
    description: 'Shimmer loading effect',
  },

  // Exit animations
  fadeOut: {
    name: 'Fade Out',
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: {
      duration: 300,
      easing: 'ease-out',
      fill: 'both',
    },
    description: 'Simple fade out',
  },
  scaleOut: {
    name: 'Scale Out',
    keyframes: [
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(0.8)' },
    ],
    options: {
      duration: 250,
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      fill: 'both',
    },
    description: 'Scale down exit',
  },
};

/**
 * Choreography Patterns
 * Different ways to coordinate multiple animations
 */
export const CHOREOGRAPHY_PATTERNS: Record<string, ChoreographyPattern> = {
  wave: {
    name: 'Wave',
    stagger: 0.1,
    overlap: 0.3,
    direction: 'forward',
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    duration: 0.8,
  },
  cascade: {
    name: 'Cascade',
    stagger: 0.05,
    overlap: 0.7,
    direction: 'forward',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    duration: 0.6,
  },
  rippleOut: {
    name: 'Ripple Out',
    stagger: 0.08,
    overlap: 0.5,
    direction: 'alternate',
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    duration: 1.0,
  },
  sequential: {
    name: 'Sequential',
    stagger: 0.2,
    overlap: 0,
    direction: 'forward',
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    duration: 0.5,
  },
  parallel: {
    name: 'Parallel',
    stagger: 0,
    overlap: 1,
    direction: 'forward',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    duration: 0.4,
  },
};

/**
 * Animation Choreographer Class
 * Manages complex animation sequences with precise timing
 */
export class GlassAnimationChoreographer {
  private sequences: Map<string, AnimationSequence> = new Map();
  private activeAnimations: Map<string, Animation> = new Map();
  private isPlaying: boolean = false;

  /**
   * Add animation sequence to choreography
   */
  addSequence(sequence: AnimationSequence): void {
    this.sequences.set(sequence.id, sequence);
  }

  /**
   * Remove animation sequence
   */
  removeSequence(id: string): void {
    this.sequences.delete(id);
    this.activeAnimations.get(id)?.cancel();
    this.activeAnimations.delete(id);
  }

  /**
   * Play choreographed animations with pattern
   */
  play(pattern: ChoreographyPattern = CHOREOGRAPHY_PATTERNS.cascade): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    const sortedSequences = Array.from(this.sequences.values()).sort(
      (a, b) => a.priority - b.priority
    );

    sortedSequences.forEach((sequence, index) => {
      const delay = this.calculateDelay(index, pattern);
      const duration = pattern.duration * 1000;

      const animation = sequence.element.animate(sequence.keyframes, {
        ...sequence.options,
        duration,
        delay,
        easing: pattern.easing,
      });

      this.activeAnimations.set(sequence.id, animation);

      // Handle animation completion
      animation.addEventListener('finish', () => {
        this.activeAnimations.delete(sequence.id);
        if (this.activeAnimations.size === 0) {
          this.isPlaying = false;
        }
      });
    });
  }

  /**
   * Pause all animations
   */
  pause(): void {
    this.activeAnimations.forEach(animation => {
      animation.pause();
    });
  }

  /**
   * Resume all animations
   */
  resume(): void {
    this.activeAnimations.forEach(animation => {
      animation.play();
    });
  }

  /**
   * Cancel all animations
   */
  cancel(): void {
    this.activeAnimations.forEach(animation => {
      animation.cancel();
    });
    this.activeAnimations.clear();
    this.isPlaying = false;
  }

  /**
   * Reverse all animations
   */
  reverse(): void {
    this.activeAnimations.forEach(animation => {
      animation.reverse();
    });
  }

  /**
   * Calculate delay for staggered animations
   */
  private calculateDelay(index: number, pattern: ChoreographyPattern): number {
    const baseDelay = index * pattern.stagger * 1000;

    switch (pattern.direction) {
      case 'reverse': {
        const totalSequences = this.sequences.size;
        return (totalSequences - index - 1) * pattern.stagger * 1000;
      }
      case 'alternate': {
        return index % 2 === 0 ? baseDelay : baseDelay + pattern.overlap * 1000;
      }
      default: {
        return baseDelay;
      }
    }
  }

  /**
   * Get animation status
   */
  getStatus(): {
    isPlaying: boolean;
    activeCount: number;
    totalSequences: number;
  } {
    return {
      isPlaying: this.isPlaying,
      activeCount: this.activeAnimations.size,
      totalSequences: this.sequences.size,
    };
  }
}

/**
 * Performance-Optimized Animation Manager
 * Ensures 60fps performance with intelligent batching
 */
export class PerformanceAnimationManager {
  private animationFrame: number | null = null;
  private animations: Set<() => void> = new Set();
  private isRunning: boolean = false;

  /**
   * Add animation to the batch
   */
  addAnimation(callback: () => void): void {
    this.animations.add(callback);
    if (!this.isRunning) {
      this.start();
    }
  }

  /**
   * Remove animation from the batch
   */
  removeAnimation(callback: () => void): void {
    this.animations.delete(callback);
    if (this.animations.size === 0) {
      this.stop();
    }
  }

  /**
   * Start the animation loop
   */
  private start(): void {
    this.isRunning = true;
    this.tick();
  }

  /**
   * Stop the animation loop
   */
  private stop(): void {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  /**
   * Animation tick
   */
  private tick = (): void => {
    if (!this.isRunning) return;

    // Execute all animations in a single frame
    this.animations.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.warn('Animation callback error:', error);
        this.animations.delete(callback);
      }
    });

    if (this.animations.size > 0) {
      this.animationFrame = requestAnimationFrame(this.tick);
    } else {
      this.stop();
    }
  };

  /**
   * Get performance metrics
   */
  getMetrics(): {
    activeAnimations: number;
    isRunning: boolean;
    frameRate: number;
  } {
    return {
      activeAnimations: this.animations.size,
      isRunning: this.isRunning,
      frameRate: this.isRunning ? 60 : 0, // Assuming 60fps when running
    };
  }
}

/**
 * React Hook for Animation Choreography
 * Provides easy access to choreographed animations
 */
export function useAnimationChoreographer(
  options: {
    pattern?: ChoreographyPattern;
    enablePerformanceMode?: boolean;
    enableReducedMotion?: boolean;
  } = {}
) {
  const {
    pattern = CHOREOGRAPHY_PATTERNS.cascade,
    enablePerformanceMode = true,
    enableReducedMotion = true,
  } = options;

  const choreographerRef = useRef<GlassAnimationChoreographer | null>(null);
  const performanceManagerRef = useRef<PerformanceAnimationManager | null>(
    null
  );
  const reducedMotion = useRef<boolean>(false);

  // Initialize choreographer
  useEffect(() => {
    choreographerRef.current = new GlassAnimationChoreographer();

    if (enablePerformanceMode) {
      performanceManagerRef.current = new PerformanceAnimationManager();
    }

    // Check for reduced motion preference
    if (enableReducedMotion && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      reducedMotion.current = mediaQuery.matches;

      const handleChange = (e: MediaQueryListEvent) => {
        reducedMotion.current = e.matches;
      };

      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    return () => {
      choreographerRef.current?.cancel();
      choreographerRef.current = null;
      performanceManagerRef.current = null;
    };
  }, [enablePerformanceMode, enableReducedMotion]);

  // Animation methods
  const addSequence = useCallback(
    (
      id: string,
      element: HTMLElement,
      preset: keyof typeof MOTION_PRESETS | MotionPreset,
      priority: number = 0
    ) => {
      if (!choreographerRef.current) return;

      const motionPreset =
        typeof preset === 'string' ? MOTION_PRESETS[preset] : preset;

      // Skip animations if reduced motion is preferred
      if (reducedMotion.current) {
        return;
      }

      const sequence: AnimationSequence = {
        id,
        element,
        keyframes: motionPreset.keyframes,
        options: motionPreset.options,
        delay: 0,
        priority,
      };

      choreographerRef.current.addSequence(sequence);
    },
    []
  );

  const removeSequence = useCallback((id: string) => {
    choreographerRef.current?.removeSequence(id);
  }, []);

  const play = useCallback(
    (customPattern?: ChoreographyPattern) => {
      if (reducedMotion.current) return;
      choreographerRef.current?.play(customPattern || pattern);
    },
    [pattern]
  );

  const pause = useCallback(() => {
    choreographerRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    choreographerRef.current?.resume();
  }, []);

  const cancel = useCallback(() => {
    choreographerRef.current?.cancel();
  }, []);

  const reverse = useCallback(() => {
    choreographerRef.current?.reverse();
  }, []);

  // Performance animation methods
  const addPerformanceAnimation = useCallback(
    (callback: () => void) => {
      if (enablePerformanceMode && performanceManagerRef.current) {
        performanceManagerRef.current.addAnimation(callback);
      }
    },
    [enablePerformanceMode]
  );

  const removePerformanceAnimation = useCallback(
    (callback: () => void) => {
      if (enablePerformanceMode && performanceManagerRef.current) {
        performanceManagerRef.current.removeAnimation(callback);
      }
    },
    [enablePerformanceMode]
  );

  // Status and metrics
  const getStatus = useCallback(() => {
    return (
      choreographerRef.current?.getStatus() || {
        isPlaying: false,
        activeCount: 0,
        totalSequences: 0,
      }
    );
  }, []);

  const getPerformanceMetrics = useCallback(() => {
    return (
      performanceManagerRef.current?.getMetrics() || {
        activeAnimations: 0,
        isRunning: false,
        frameRate: 0,
      }
    );
  }, []);

  return {
    addSequence,
    removeSequence,
    play,
    pause,
    resume,
    cancel,
    reverse,
    addPerformanceAnimation,
    removePerformanceAnimation,
    getStatus,
    getPerformanceMetrics,
    presets: MOTION_PRESETS,
    patterns: CHOREOGRAPHY_PATTERNS,
    isReducedMotion: reducedMotion.current,
  };
}
