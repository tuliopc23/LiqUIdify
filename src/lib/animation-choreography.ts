/**
 * Animation Choreography Engine - Advanced staggered animations with Apple-quality motion
 *
 * This module provides sophisticated animation choreography capabilities with:
 * - Intelligent timing and easing curves
 * - Sequence and parallel animation coordination
 * - Apple-inspired motion patterns and presets
 */

// import { gsap } from 'gsap';
import type { AnimationType } from './glass-animations';
import { GLASS_EASINGS } from './glass-animations';

/**
 * Animation sequence configuration
 */
export interface AnimationSequence {
  id: string;
  animations: ChoreographyStep[];
  duration?: number;
  delay?: number;
  repeat?: number;
  yoyo?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: (progress: number) => void;
}

/**
 * Individual step in choreography
 */
export interface ChoreographyStep {
  elements: HTMLElement[];
  type: AnimationType;
  duration: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  from?: Record<string, any>;
  to?: Record<string, any>;
  parallel?: boolean;
}

/**
 * Apple-inspired motion presets
 */
export const APPLE_MOTION_PRESETS = {
  // Subtle entrance animations
  fadeInUp: {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1,
  },

  slideInLeft: {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0 },
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.08,
  },

  // Elastic scaling
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    duration: 0.8,
    ease: 'elastic.out(1, 0.3)',
    stagger: 0.05,
  },

  // Liquid flow effect
  liquidFlow: {
    from: { opacity: 0, scaleY: 0.3, transformOrigin: 'center bottom' },
    to: { opacity: 1, scaleY: 1 },
    duration: 1.2,
    ease: 'power2.out',
    stagger: 0.15,
  },

  // Magnetic reveal
  magneticReveal: {
    from: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    to: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12,
  },

  // Glass morphism appearance
  glassMorph: {
    from: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      scale: 0.95,
      background: 'rgba(255, 255, 255, 0)',
    },
    to: {
      opacity: 1,
      backdropFilter: 'blur(20px)',
      scale: 1,
      background: 'rgba(255, 255, 255, 0.1)',
    },
    duration: 1,
    ease: 'power2.out',
    stagger: 0.08,
  },

  // Floating animation
  float: {
    from: { y: 0 },
    to: { y: -10 },
    duration: 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    stagger: 0.3,
  },

  // Pulse effect
  pulse: {
    from: { scale: 1, opacity: 0.8 },
    to: { scale: 1.05, opacity: 1 },
    duration: 1.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    stagger: 0.2,
  },
} as const;

/**
 * Timing functions for intelligent choreography
 */
export const ChoreographyTiming = {
  /**
   * Calculate optimal stagger delay based on element count
   */
  calculateStagger(elementCount: number, _baseDuration: number): number {
    // Apple's design guidelines suggest shorter delays for more elements
    const baseStagger = 0.1;
    const factor = Math.min(1, 8 / elementCount);
    return baseStagger * factor;
  },

  /**
   * Create dynamic easing based on animation context
   */
  createContextualEasing(
    context: 'entrance' | 'exit' | 'hover' | 'focus'
  ): string {
    const easingMap = {
      entrance: GLASS_EASINGS.smoothOut,
      exit: 'power2.in', // smoothIn easing for exit animations
      hover: GLASS_EASINGS.magnetic,
      focus: GLASS_EASINGS.elastic,
    };

    return easingMap[context] || GLASS_EASINGS.smoothOut;
  },

  /**
   * Calculate optimal duration based on distance and element size
   */
  calculateOptimalDuration(
    distance: number,
    elementSize: number,
    baseSpeed: number = 1000
  ): number {
    // Larger elements and longer distances need more time
    const sizeFactor = Math.log(elementSize / 100 + 1);
    const distanceFactor = Math.sqrt(distance / 100);

    return Math.max(
      0.3,
      Math.min(2, (distanceFactor * sizeFactor) / baseSpeed)
    );
  },
};

/**
 * Advanced Animation Choreographer
 */
export class AdvancedChoreographer {
  private timeline: gsap.core.Timeline;
  private sequences: Map<string, AnimationSequence> = new Map();
  private activeAnimations: Set<string> = new Set();

  constructor() {
    this.timeline = gsap.timeline();
  }

  /**
   * Create a choreographed sequence
   */
  createSequence(config: AnimationSequence): void {
    this.sequences.set(config.id, config);
  }

  /**
   * Execute a choreographed sequence
   */
  async executeSequence(sequenceId: string): Promise<void> {
    const sequence = this.sequences.get(sequenceId);
    if (!sequence) {
      throw new Error(`Sequence ${sequenceId} not found`);
    }

    this.activeAnimations.add(sequenceId);

    // Clear previous timeline
    this.timeline.clear();

    // Configure sequence-level settings
    if (sequence.delay) {
      this.timeline.delay(sequence.delay);
    }

    if (sequence.repeat) {
      this.timeline.repeat(sequence.repeat);
    }

    if (sequence.yoyo) {
      this.timeline.yoyo(true);
    }

    // Add sequence steps
    let currentTime = 0;

    for (const step of sequence.animations) {
      if (step.parallel) {
        // Parallel animations start at the same time
        this.addStepToTimeline(step, currentTime);
      } else {
        // Sequential animations
        this.addStepToTimeline(step, currentTime);
        currentTime += step.duration + (step.delay || 0);
      }
    }

    // Add callbacks
    if (sequence.onStart) {
      this.timeline.call(sequence.onStart, [], 0);
    }

    if (sequence.onUpdate) {
      this.timeline.eventCallback('onUpdate', () => {
        sequence.onUpdate?.(this.timeline.progress());
      });
    }

    if (sequence.onComplete) {
      this.timeline.call(() => {
        sequence.onComplete?.();
        this.activeAnimations.delete(sequenceId);
      });
    }

    // Start the sequence
    this.timeline.play();

    // Return promise that resolves when sequence completes
    return new Promise((resolve) => {
      this.timeline.eventCallback('onComplete', resolve);
    });
  }

  /**
   * Add a step to the timeline
   */
  private addStepToTimeline(step: ChoreographyStep, startTime: number): void {
    const { elements, duration, ease, stagger, from, to } = step;

    // Calculate intelligent stagger if not provided
    const staggerDelay =
      stagger || ChoreographyTiming.calculateStagger(elements.length, duration);

    // Apply animations with stagger
    for (const [index, element] of elements.entries()) {
      const elementStartTime = startTime + index * staggerDelay;

      // Set initial state
      if (from) {
        this.timeline.set(element, from, elementStartTime);
      }

      // Animate to target state
      if (to) {
        this.timeline.to(
          element,
          {
            ...to,
            duration,
            ease: ease || GLASS_EASINGS.smoothOut,
            force3D: true,
          },
          elementStartTime
        );
      }
    }
  }

  /**
   * Execute preset animation
   */
  executePreset(
    presetName: keyof typeof APPLE_MOTION_PRESETS,
    elements: HTMLElement[],
    options: Partial<ChoreographyStep> = {}
  ): gsap.core.Timeline {
    const preset = APPLE_MOTION_PRESETS[presetName];
    const timeline = gsap.timeline();

    const staggerDelay = options.stagger || preset.stagger || 0.1;

    // Apply preset with stagger
    timeline.fromTo(elements, preset.from, {
      ...preset.to,
      duration: options.duration || preset.duration,
      ease: options.ease || preset.ease,
      stagger: staggerDelay,
      force3D: true,
      ...options.to,
    });

    return timeline;
  }

  /**
   * Create staggered entrance animation
   */
  createStaggeredEntrance(
    elements: HTMLElement[],
    type: 'fadeIn' | 'slideIn' | 'scaleIn' | 'liquidFlow' = 'fadeIn'
  ): gsap.core.Timeline {
    const presetMap = {
      fadeIn: 'fadeInUp',
      slideIn: 'slideInLeft',
      scaleIn: 'scaleIn',
      liquidFlow: 'liquidFlow',
    } as const;

    return this.executePreset(presetMap[type], elements);
  }

  /**
   * Create coordinated hover effects
   */
  createHoverChoreography(
    elements: HTMLElement[],
    options: {
      strength?: number;
      duration?: number;
      stagger?: number;
    } = {}
  ): void {
    const { strength = 0.05, duration = 0.3, stagger = 0.02 } = options;

    for (const [index, element] of elements.entries()) {
      const delay = index * stagger;

      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1 + strength,
          y: -5,
          duration,
          ease: 'power2.out',
          delay,
          force3D: true,
        });

        // Animate surrounding elements with reduced effect
        for (const [otherIndex, otherElement] of elements.entries()) {
          if (otherElement !== element) {
            const distance = Math.abs(otherIndex - index);
            const neighborStrength = strength / (distance + 1);

            gsap.to(otherElement, {
              scale: 1 + neighborStrength,
              duration: duration * 1.2,
              ease: 'power2.out',
              delay: delay + distance * 0.01,
              force3D: true,
            });
          }
        }
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: duration * 1.2,
          ease: 'power2.out',
          force3D: true,
        });

        // Reset surrounding elements
        for (const otherElement of elements) {
          if (otherElement !== element) {
            gsap.to(otherElement, {
              scale: 1,
              duration: duration * 1.5,
              ease: 'power2.out',
              force3D: true,
            });
          }
        }
      });
    }
  }

  /**
   * Create scroll-triggered choreography
   */
  createScrollChoreography(
    elements: HTMLElement[],
    options: {
      threshold?: number;
      once?: boolean;
      preset?: keyof typeof APPLE_MOTION_PRESETS;
    } = {}
  ): void {
    const { threshold = 0.1, once = true, preset = 'fadeInUp' } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const elementIndex = elements.indexOf(element);

            if (-1 !== elementIndex) {
              this.executePreset(preset, [element]);

              if (once) {
                observer.unobserve(element);
              }
            }
          }
        }
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    for (const element of elements) {
      observer.observe(element);
    }
  }

  /**
   * Stop all animations
   */
  stopAll(): void {
    this.timeline.kill();
    this.activeAnimations.clear();
    gsap.killTweensOf('*');
  }

  /**
   * Pause all animations
   */
  pauseAll(): void {
    this.timeline.pause();
  }

  /**
   * Resume all animations
   */
  resumeAll(): void {
    this.timeline.resume();
  }

  /**
   * Get active animations
   */
  getActiveAnimations(): string[] {
    return [...this.activeAnimations];
  }

  /**
   * Check if sequence is running
   */
  isSequenceActive(sequenceId: string): boolean {
    return this.activeAnimations.has(sequenceId);
  }
}

/**
 * Create a global choreographer instance
 */
export const globalChoreographer = new AdvancedChoreographer();

/**
 * Utility functions for easy access
 */
export const ChoreographyUtils = {
  /**
   * Quick staggered animation
   */
  stagger: (
    elements: HTMLElement[],
    preset: keyof typeof APPLE_MOTION_PRESETS,
    options?: Partial<ChoreographyStep>
  ) => {
    return globalChoreographer.executePreset(preset, elements, options);
  },

  /**
   * Create entrance animation
   */
  entrance: (
    elements: HTMLElement[],
    type: 'fadeIn' | 'slideIn' | 'scaleIn' | 'liquidFlow' = 'fadeIn'
  ) => {
    return globalChoreographer.createStaggeredEntrance(elements, type);
  },

  /**
   * Setup hover choreography
   */
  hover: (
    elements: HTMLElement[],
    options?: { strength?: number; duration?: number; stagger?: number }
  ) => {
    return globalChoreographer.createHoverChoreography(elements, options);
  },

  /**
   * Setup scroll choreography
   */
  scroll: (
    elements: HTMLElement[],
    options?: {
      threshold?: number;
      once?: boolean;
      preset?: keyof typeof APPLE_MOTION_PRESETS;
    }
  ) => {
    return globalChoreographer.createScrollChoreography(elements, options);
  },
};

export default AdvancedChoreographer;
