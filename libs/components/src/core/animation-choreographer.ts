/**
 * Animation Choreography System
 *
 * Sophisticated animation orchestration with physics-based interactions:
 * - Coordinated multi-element animations
 * - Physics-based spring animations
 * - Magnetic hover effects
 * - Reduced motion support
 * - Performance optimization
 */

import type { RefObject } from 'react';
import { useEffect } from 'react';
import { performanceMonitor } from './performance-monitor';

// Import Web Animation API types or define them if not available
interface Keyframe {
  [property: string]: string | number | null;
}

interface KeyframeAnimationOptions {
  delay?: number;
  direction?: PlaybackDirection;
  duration?: number;
  easing?: string;
  endDelay?: number;
  fill?: FillMode;
  iterationStart?: number;
  iterations?: number;
  composite?: CompositeOperation;
}

type PlaybackDirection =
  | 'normal'
  | 'reverse'
  | 'alternate'
  | 'alternate-reverse';
type FillMode = 'none' | 'forwards' | 'backwards' | 'both' | 'auto';
type CompositeOperation = 'replace' | 'add' | 'accumulate';

// Types
export interface AnimationSequenceOptions {
  duration?: number;
  stagger?: number;
  easing?: string;
  delay?: number;
  direction?: 'forward' | 'reverse' | 'alternate';
  iterations?: number;
  reducedMotion?: boolean;
}

export interface AnimationStep {
  target: string | HTMLElement | HTMLElement[];
  keyframes: Array<Keyframe>;
  duration?: number;
  options?: KeyframeAnimationOptions;
  onStart?: () => void;
  onFinish?: () => void;
}

export interface SpringOptions {
  mass?: number;
  stiffness?: number;
  damping?: number;
  velocity?: number;
  restSpeed?: number;
  restDistance?: number;
}

export interface MagneticOptions {
  strength?: number;
  radius?: number;
  friction?: number;
  ease?: number;
  maxRotation?: number;
  perspective?: number;
  respectReducedMotion?: boolean;
}

/**
 * Animation Sequence
 * Manages a sequence of coordinated animations
 */
export class AnimationSequence {
  private steps: Array<AnimationStep> = [];
  private animations: Array<Animation> = [];
  private isPlaying: boolean = false;
  private options: AnimationSequenceOptions;
  private prefersReducedMotion: boolean;

  constructor(options: AnimationSequenceOptions = {}) {
    this.options = {
      duration: 500,
      stagger: 50,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      delay: 0,
      direction: 'forward',
      iterations: 1,
      reducedMotion: false,
      ...options,
    };

    // Check for reduced motion preference
    this.prefersReducedMotion =
      this.options.reducedMotion ||
      ('undefined' !== typeof window &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  }

  /**
   * Add an animation step to the sequence
   */
  add(step: AnimationStep): this {
    this.steps.push(step);
    return this;
  }

  /**
   * Add multiple animation steps
   */
  addAll(steps: Array<AnimationStep>): this {
    this.steps.push(...steps);
    return this;
  }

  /**
   * Play the animation sequence
   */
  async play(): Promise<void> {
    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;
    performanceMonitor.startTiming('animation-sequence');

    // Create animations
    this.animations = [];
    let delay = this.options.delay || 0;

    for (let index = 0; index < this.steps.length; index++) {
      const step = this.steps[index];
      if (!step) {
        continue;
      }
      const targets = this.getTargetElements(step.target);

      for (const [index_, target] of targets.entries()) {
        if (!target) {
          continue;
        }
        const staggerDelay = index_ * (this.options.stagger || 0);

        // Apply reduced motion if needed
        const keyframes = this.prefersReducedMotion
          ? this.simplifyKeyframes(step.keyframes)
          : step.keyframes;

        // Create animation
        const directionMapping: Record<string, PlaybackDirection> = {
          forward: 'normal',
          reverse: 'reverse',
          alternate: 'alternate',
        };

        const direction =
          this.options.direction && directionMapping[this.options.direction]
            ? directionMapping[this.options.direction]
            : 'normal';

        const animation = target.animate(keyframes, {
          duration: this.options.duration,
          easing: this.options.easing,
          delay: delay + staggerDelay,
          direction,
          iterations: this.options.iterations,
          ...step.options,
        });

        // Add event listeners
        if (step.onStart) {
          animation.addEventListener('start', step.onStart);
        }

        if (step.onFinish) {
          animation.addEventListener('finish', step.onFinish);
        }

        this.animations.push(animation);
      }

      // Update delay for next step
      delay += step.duration || this.options.duration || 0;
      delay +=
        (this.options.duration || 0) +
        (this.options.stagger || 0) * targets.length;
    }

    // Wait for all animations to complete
    await Promise.all(this.animations.map((animation) => animation.finished));

    this.isPlaying = false;
    performanceMonitor.endTiming('animation-sequence');
  }

  /**
   * Stop all animations in the sequence
   */
  stop(): void {
    for (const animation of this.animations) {
      animation.cancel();
    }
    this.animations = [];
    this.isPlaying = false;
  }

  /**
   * Pause all animations in the sequence
   */
  pause(): void {
    for (const animation of this.animations) {
      animation.pause();
    }
  }

  /**
   * Resume all animations in the sequence
   */
  resume(): void {
    for (const animation of this.animations) {
      animation.play();
    }
  }

  /**
   * Update sequence options
   */
  updateOptions(options: Partial<AnimationSequenceOptions>): this {
    this.options = {
      ...this.options,
      ...options,
    };

    // Update reduced motion preference
    this.prefersReducedMotion =
      this.options.reducedMotion ||
      ('undefined' !== typeof window &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

    return this;
  }

  /**
   * Get target elements from selector or element reference
   */
  private getTargetElements(
    target: string | HTMLElement | HTMLElement[]
  ): Array<HTMLElement> {
    if ('string' === typeof target) {
      return [...document.querySelectorAll(target)] as HTMLElement[];
    }
    if (Array.isArray(target)) {
      return target;
    }
    return [target];
  }

  /**
   * Simplify keyframes for reduced motion
   */
  private simplifyKeyframes(keyframes: Array<Keyframe>): Array<Keyframe> {
    // For reduced motion, we only keep the first and last keyframe
    // and remove transform properties that cause motion
    if (2 >= keyframes.length) {
      return keyframes;
    }

    const first = { ...keyframes[0] };
    const last = { ...keyframes.at(-1) };

    // Remove transform properties that cause motion
    const motionProps = ['translate', 'rotate', 'scale', 'skew'];

    for (const frame of [first, last]) {
      if (frame.transform) {
        let transform = frame.transform as string;
        for (const property of motionProps) {
          transform = transform.replaceAll(
            new RegExp(`${property}\\([^)]+\\)`, 'g'),
            ''
          );
        }
        frame.transform = transform;
      }
    }

    return [first, last];
  }
}

/**
 * Spring Physics Animation
 * Creates realistic spring-based animations
 */
export class SpringAnimation {
  private target: HTMLElement;
  private property: string;
  private currentValue: number;
  private targetValue: number;
  private velocity: number;
  private options: SpringOptions;
  private animationFrame: number | null = null;
  private onUpdateCallback: ((value: number) => void) | null = null;
  private onCompleteCallback: (() => void) | null = null;

  constructor(
    target: HTMLElement,
    property: string,
    initialValue: number,
    targetValue: number,
    options: SpringOptions = {}
  ) {
    this.target = target;
    this.property = property;
    this.currentValue = initialValue;
    this.targetValue = targetValue;
    this.velocity = options.velocity || 0;
    this.options = {
      mass: 1,
      stiffness: 100,
      damping: 10,
      velocity: 0,
      restSpeed: 0.01,
      restDistance: 0.01,
      ...options,
    };
  }

  /**
   * Start the spring animation
   */
  start(): this {
    this.stop();
    this.animationFrame = requestAnimationFrame(this.update);
    return this;
  }

  /**
   * Stop the spring animation
   */
  stop(): this {
    if (null !== this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    return this;
  }

  /**
   * Set a new target value
   */
  setTarget(value: number): this {
    this.targetValue = value;
    if (null === this.animationFrame) {
      this.start();
    }
    return this;
  }

  /**
   * Set callback for animation updates
   */
  onUpdate(callback: (value: number) => void): this {
    this.onUpdateCallback = callback;
    return this;
  }

  /**
   * Set callback for animation completion
   */
  onComplete(callback: () => void): this {
    this.onCompleteCallback = callback;
    return this;
  }

  /**
   * Update the animation frame
   */
  private update = (): void => {
    // Calculate spring force
    const distance = this.targetValue - this.currentValue;
    const springForce = distance * this.options.stiffness!;

    // Calculate damping force
    const dampingForce = this.velocity * this.options.damping!;

    // Calculate acceleration
    const acceleration = (springForce - dampingForce) / this.options.mass!;

    // Update velocity and position
    this.velocity += acceleration * 0.001; // Scale by time factor
    this.currentValue += this.velocity;

    // Apply to target element
    this.applyValueToProperty(this.currentValue);

    // Call update callback
    this.onUpdateCallback?.(this.currentValue);

    // Check if animation is complete
    const isComplete =
      Math.abs(this.velocity) < this.options.restSpeed! &&
      Math.abs(distance) < this.options.restDistance!;

    if (isComplete) {
      // Snap to exact target value
      this.currentValue = this.targetValue;
      this.applyValueToProperty(this.currentValue);
      this.stop();
      this.onCompleteCallback?.();
    } else {
      // Continue animation
      this.animationFrame = requestAnimationFrame(this.update);
    }
  };

  /**
   * Apply the current value to the target property
   */
  private applyValueToProperty(value: number): void {
    // Handle different property types
    switch (this.property) {
      case 'x':
      case 'y': {
        const transform = this.target.style.transform || '';
        const regex = new RegExp(
          `translate${this.property.toUpperCase()}\\([^)]+\\)`,
          'g'
        );
        const newTransform = transform.replace(regex, '');
        this.target.style.transform = `${newTransform} translate${this.property.toUpperCase()}(${value}px)`;

        break;
      }
      case 'rotate': {
        const transform = this.target.style.transform || '';
        const regex = /rotate\([^)]+\)/g;
        const newTransform = transform.replaceAll(regex, '');
        this.target.style.transform = `${newTransform} rotate(${value}deg)`;

        break;
      }
      case 'scale': {
        const transform = this.target.style.transform || '';
        const regex = /scale\([^)]+\)/g;
        const newTransform = transform.replaceAll(regex, '');
        this.target.style.transform = `${newTransform} scale(${value})`;

        break;
      }
      case 'opacity': {
        this.target.style.opacity = value.toString();

        break;
      }
      default: {
        // For other properties, assume pixels
        (this.target.style as unknown)[this.property] = `${value}px`;
      }
    }
  }
}

/**
 * Magnetic Effect Hook
 * Creates a magnetic hover effect for elements
 */
export function useMagneticEffect(
  ref: RefObject<HTMLElement>,
  options: MagneticOptions = {}
): void {
  const {
    strength = 40,
    radius = 200,
    friction = 0.2,
    ease = 0.15,
    maxRotation = 10,
    perspective = 1000,
    respectReducedMotion = true,
  } = options;

  const prefersReducedMotion =
    respectReducedMotion &&
    'undefined' !== typeof window &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) {
      return;
    }

    // State variables
    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;
    let elementX = 0;
    let elementY = 0;
    let elementRotateX = 0;
    let elementRotateY = 0;
    let animationFrame: number | null;

    // Get element dimensions and position
    const updateElementPosition = () => {
      const rect = element.getBoundingClientRect();
      elementX = rect.left + rect.width / 2;
      elementY = rect.top + rect.height / 2;
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isHovering) {
        const dx = mouseX - elementX;
        const dy = mouseY - elementY;
        const distance = Math.hypot(dx, dy);

        // Start hovering if mouse is within radius
        if (distance < radius) {
          isHovering = true;
          element.style.transition = 'none';
          if (!animationFrame) {
            animationFrame = requestAnimationFrame(update);
          }
        }
      }
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      isHovering = false;
    };

    // Update animation
    const update = () => {
      if (isHovering) {
        // Calculate distance from mouse to element center
        const dx = mouseX - elementX;
        const dy = mouseY - elementY;
        const distance = Math.hypot(dx, dy);

        // If mouse is outside radius, stop hovering
        if (distance > radius) {
          isHovering = false;
          element.style.transition = 'transform 0.5s ease-out';
        } else {
          // Calculate magnetic effect
          const power = Math.min(distance / radius, 1);
          const targetX = dx * strength * power * 0.01;
          const targetY = dy * strength * power * 0.01;

          // Calculate rotation
          const targetRotateX = (-dy * maxRotation) / radius;
          const targetRotateY = (dx * maxRotation) / radius;

          // Apply easing
          elementX += (targetX - elementX) * ease;
          elementY += (targetY - elementY) * ease;
          elementRotateX += (targetRotateX - elementRotateX) * ease;
          elementRotateY += (targetRotateY - elementRotateY) * ease;

          // Apply transform
          element.style.transform = `
            perspective(${perspective}px)
            translate3d(${elementX}px, ${elementY}px, 0)
            rotateX(${elementRotateX}deg)
            rotateY(${elementRotateY}deg)
          `;
        }
      } else {
        // Return to original position
        elementX += (0 - elementX) * friction;
        elementY += (0 - elementY) * friction;
        elementRotateX += (0 - elementRotateX) * friction;
        elementRotateY += (0 - elementRotateY) * friction;

        // Apply transform
        element.style.transform = `perspective(${perspective}px) rotateX(${elementRotateX}deg) rotateY(${elementRotateY}deg)`;

        // Stop animation if close to original position
        if (
          0.1 > Math.abs(elementX) &&
          0.1 > Math.abs(elementY) &&
          0.1 > Math.abs(elementRotateX) &&
          0.1 > Math.abs(elementRotateY)
        ) {
          element.style.transform = '';
          element.style.transition = '';
          cancelAnimationFrame(animationFrame!);
          animationFrame = null;
          return;
        }
      }

      // Continue animation
      animationFrame = requestAnimationFrame(update);
    };

    // Initialize
    updateElementPosition();
    if ('undefined' !== typeof window) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', updateElementPosition);
      window.addEventListener('scroll', updateElementPosition);
    }
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      if ('undefined' !== typeof window) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', updateElementPosition);
        window.removeEventListener('scroll', updateElementPosition);
      }
      element.removeEventListener('mouseleave', handleMouseLeave);

      if (null !== animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [
    ref,
    strength,
    radius,
    friction,
    ease,
    maxRotation,
    perspective,
    prefersReducedMotion,
  ]);
}

/**
 * Animation Choreographer
 * Manages and coordinates multiple animation sequences
 */
export class AnimationChoreographer {
  private sequences: Map<string, AnimationSequence> = new Map();
  private prefersReducedMotion: boolean;

  constructor() {
    this.prefersReducedMotion =
      'undefined' !== typeof window &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Listen for changes to reduced motion preference
    if ('undefined' !== typeof window && window.matchMedia) {
      window
        .matchMedia('(prefers-reduced-motion: reduce)')
        .addEventListener('change', this.handleReducedMotionChange);
    }
  }

  /**
   * Create a new animation sequence
   */
  createSequence(
    id: string,
    options: AnimationSequenceOptions = {}
  ): AnimationSequence {
    const sequence = new AnimationSequence({
      ...options,
      reducedMotion: this.prefersReducedMotion,
    });
    this.sequences.set(id, sequence);
    return sequence;
  }

  /**
   * Get an existing animation sequence
   */
  getSequence(id: string): AnimationSequence | undefined {
    return this.sequences.get(id);
  }

  /**
   * Play an animation sequence
   */
  async play(id: string): Promise<void> {
    const sequence = this.sequences.get(id);
    if (!sequence) {
      throw new Error(`Animation sequence "${id}" not found`);
    }
    return sequence.play();
  }

  /**
   * Stop an animation sequence
   */
  stop(id: string): void {
    const sequence = this.sequences.get(id);
    if (sequence) {
      sequence.stop();
    }
  }

  /**
   * Stop all animation sequences
   */
  stopAll(): void {
    for (const sequence of this.sequences) {
      sequence.stop();
    }
  }

  /**
   * Create a spring animation
   */
  createSpring(
    target: HTMLElement,
    property: string,
    initialValue: number,
    targetValue: number,
    options: SpringOptions = {}
  ): SpringAnimation {
    return new SpringAnimation(
      target,
      property,
      initialValue,
      targetValue,
      options
    );
  }

  /**
   * Handle changes to reduced motion preference
   */
  private handleReducedMotionChange = (event: MediaQueryListEvent): void => {
    this.prefersReducedMotion = event.matches;

    // Update all sequences
    for (const sequence of this.sequences) {
      sequence.updateOptions({ reducedMotion: this.prefersReducedMotion });
    }
  };

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stopAll();
    this.sequences.clear();

    if ('undefined' !== typeof window && window.matchMedia) {
      window
        .matchMedia('(prefers-reduced-motion: reduce)')
        .removeEventListener('change', this.handleReducedMotionChange);
    }
  }
}

// Create singleton instance
export const animationChoreographer = new AnimationChoreographer();

// Export all classes and hooks
export const animations = {
  AnimationSequence,
  SpringAnimation,
  AnimationChoreographer,
  useMagneticEffect,
  choreographer: animationChoreographer,
};
