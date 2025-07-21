/**
 * Advanced Glass Physics Engine
 * Physics-based animation system with realistic spring dynamics and magnetic effects
 * Requirements: 5.1, 5.2, 5.4 - Advanced animation choreography with Apple-quality motion
 */

import { useCallback, useEffect, useRef } from 'react';

export interface SpringConfig {
  tension: number;
  friction: number;
  mass: number;
  velocity: number;
  precision: number;
}

export interface MagneticConfig {
  strength: number;
  range: number;
  decay: number;
  threshold: number;
}

export interface PhysicsState {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  target: { x: number; y: number };
  isAnimating: boolean;
}

export interface AnimationChoreography {
  stagger: number;
  sequence: number;
  parallel: number;
  easing: string;
  duration: number;
}

export interface GestureConfig {
  enableTouch: boolean;
  enableMouse: boolean;
  enableKeyboard: boolean;
  sensitivity: number;
  threshold: number;
}

/**
 * Spring Physics Presets
 * Based on Apple's Human Interface Guidelines motion principles
 */
export const SPRING_PRESETS: Record<string, SpringConfig> = {
  // Gentle spring for subtle interactions
  gentle: {
    tension: 120,
    friction: 14,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  // Default spring for most interactions
  default: {
    tension: 170,
    friction: 26,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  // Wobbly spring for playful interactions
  wobbly: {
    tension: 180,
    friction: 12,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  // Stiff spring for quick, responsive interactions
  stiff: {
    tension: 210,
    friction: 20,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  // Slow spring for dramatic, smooth interactions
  slow: {
    tension: 280,
    friction: 60,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  // Apple-like spring for authentic iOS feel
  apple: {
    tension: 300,
    friction: 35,
    mass: 1.2,
    velocity: 0,
    precision: 0.005,
  },
};

/**
 * Magnetic Field Presets
 * Different magnetic interaction patterns
 */
export const MAGNETIC_PRESETS: Record<string, MagneticConfig> = {
  subtle: {
    strength: 0.1,
    range: 50,
    decay: 0.8,
    threshold: 5,
  },
  medium: {
    strength: 0.3,
    range: 100,
    decay: 0.6,
    threshold: 10,
  },
  strong: {
    strength: 0.5,
    range: 150,
    decay: 0.4,
    threshold: 15,
  },
  extreme: {
    strength: 0.8,
    range: 200,
    decay: 0.2,
    threshold: 20,
  },
};

/**
 * Animation Choreography Presets
 * Apple-inspired animation timing and coordination
 */
export const CHOREOGRAPHY_PRESETS: Record<string, AnimationChoreography> = {
  sequential: {
    stagger: 0.1,
    sequence: 0.2,
    parallel: 0,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    duration: 0.6,
  },
  staggered: {
    stagger: 0.05,
    sequence: 0,
    parallel: 0.1,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    duration: 0.8,
  },
  parallel: {
    stagger: 0,
    sequence: 0,
    parallel: 0,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    duration: 0.5,
  },
  cascade: {
    stagger: 0.08,
    sequence: 0.15,
    parallel: 0.05,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    duration: 1,
  },
};

/**
 * Spring Physics Calculator
 * Calculates spring animation values using realistic physics
 */
export class SpringPhysics {
  private config: SpringConfig;
  private state: PhysicsState;
  private animationFrame: number | null = undefined;
  private onUpdate?: (state: PhysicsState) => void;
  private onComplete?: () => void;

  constructor(config?: SpringConfig) {
    this.config = config || SPRING_PRESETS.default!;
    this.state = {
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      isAnimating: false,
    };
  }

  setTarget(x: number, y: number): void {
    this.state.target = { x, y };
    if (!this.state.isAnimating) {
      this.start();
    }
  }

  setPosition(x: number, y: number): void {
    this.state.position = { x, y };
  }

  setVelocity(x: number, y: number): void {
    this.state.velocity = { x, y };
  }

  setConfig(config: Partial<SpringConfig>): void {
    this.config = { ...this.config, ...config };
  }

  setOnUpdate(callback: (state: PhysicsState) => void): void {
    this.onUpdate = callback;
  }

  setOnComplete(callback: () => void): void {
    this.onComplete = callback;
  }

  private start(): void {
    this.state.isAnimating = true;
    this.animate();
  }

  private animate = (): void => {
    const { tension, friction, mass, precision } = this.config;
    const { position, velocity, target } = this.state;

    // Calculate spring forces
    const springForceX = -tension * (position.x - target.x);
    const springForceY = -tension * (position.y - target.y);

    // Calculate damping forces
    const dampingForceX = -friction * velocity.x;
    const dampingForceY = -friction * velocity.y;

    // Calculate acceleration (F = ma, so a = F/m)
    const accelerationX = (springForceX + dampingForceX) / mass;
    const accelerationY = (springForceY + dampingForceY) / mass;

    // Update velocity (v = v0 + at, assuming dt = 1/60 for 60fps)
    const dt = 1 / 60;
    velocity.x += accelerationX * dt;
    velocity.y += accelerationY * dt;

    // Update position (x = x0 + vt)
    position.x += velocity.x * dt;
    position.y += velocity.y * dt;

    // Update acceleration for state
    this.state.acceleration = { x: accelerationX, y: accelerationY };

    // Check if animation should continue
    const distanceToTarget = Math.sqrt(
      Math.pow(position.x - target.x, 2) + Math.pow(position.y - target.y, 2)
    );
    const velocityMagnitude = Math.sqrt(
      velocity.x * velocity.x + velocity.y * velocity.y
    );

    const shouldContinue =
      distanceToTarget > precision || velocityMagnitude > precision;

    // Call update callback
    if (this.onUpdate) {
      this.onUpdate({ ...this.state });
    }

    if (shouldContinue) {
      this.animationFrame = requestAnimationFrame(this.animate);
    } else {
      this.stop();
    }
  };

  private stop(): void {
    this.state.isAnimating = false;
    this.state.velocity = { x: 0, y: 0 };
    this.state.acceleration = { x: 0, y: 0 };

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }

    if (this.onComplete) {
      this.onComplete();
    }
  }

  destroy(): void {
    this.stop();
    this.onUpdate = undefined;
    this.onComplete = undefined;
  }
}

/**
 * Magnetic Field Calculator
 * Calculates magnetic attraction forces between elements
 */
export class MagneticField {
  private config: MagneticConfig;
  private elements: Map<
    string,
    { element: HTMLElement; position: { x: number; y: number } }
  > = new Map();

  constructor(config?: MagneticConfig) {
    this.config = config || MAGNETIC_PRESETS.medium!;
  }

  addElement(id: string, element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    this.elements.set(id, {
      element,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    });
  }

  removeElement(id: string): void {
    this.elements.delete(id);
  }

  calculateForce(
    cursorX: number,
    cursorY: number,
    targetId: string
  ): { x: number; y: number } {
    const target = this.elements.get(targetId);
    if (!target) {
      return { x: 0, y: 0 };
    }

    const { strength, range, decay, threshold } = this.config;
    const { position } = target;

    // Calculate distance
    const deltaX = cursorX - position.x;
    const deltaY = cursorY - position.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Return zero force if outside range or below threshold
    if (distance > range || distance < threshold) {
      return { x: 0, y: 0 };
    }

    // Calculate normalized direction
    const directionX = deltaX / distance;
    const directionY = deltaY / distance;

    // Calculate force magnitude with decay
    const normalizedDistance = distance / range;
    const forceMagnitude = strength * Math.pow(1 - normalizedDistance, decay);

    return {
      x: directionX * forceMagnitude * 100, // Scale for pixel movement
      y: directionY * forceMagnitude * 100,
    };
  }

  updateElementPosition(id: string): void {
    const target = this.elements.get(id);
    if (!target) {
      return undefined;
    }

    const rect = target.element.getBoundingClientRect();
    target.position = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  setConfig(config: Partial<MagneticConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

/**
 * Animation Choreographer
 * Coordinates multiple animations with staggering and sequencing
 */
export class AnimationChoreographer {
  private animations: Map<
    string,
    {
      element: HTMLElement;
      animation: Animation;
      delay: number;
      duration: number;
    }
  > = new Map();
  private config: AnimationChoreography;

  constructor(config?: AnimationChoreography) {
    this.config = config || CHOREOGRAPHY_PRESETS.staggered!;
  }

  addAnimation(
    id: string,
    element: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions = {}
  ): void {
    const animationCount = this.animations.size;
    const delay = this.calculateDelay(animationCount);
    const duration = options.duration || this.config.duration * 1000;

    const animation = element.animate(keyframes, {
      ...options,
      duration,
      delay,
      easing: options.easing || this.config.easing,
      fill: 'both',
    });

    this.animations.set(id, {
      element,
      animation,
      delay,
      duration: duration as number,
    });
  }

  private calculateDelay(index: number): number {
    const { stagger, sequence, parallel } = this.config;

    if (0 < parallel) {
      // Parallel with slight offset
      return index * parallel * 1000;
    } else if (0 < sequence) {
      // Sequential with gap
      return index * sequence * 1000;
    } else {
      // Staggered
      return index * stagger * 1000;
    }
  }

  play(): void {
    this.animations.forEach(({ animation }) => {
      animation.play();
    });
  }

  pause(): void {
    this.animations.forEach(({ animation }) => {
      animation.pause();
    });
  }

  reverse(): void {
    this.animations.forEach(({ animation }) => {
      animation.reverse();
    });
  }

  cancel(): void {
    this.animations.forEach(({ animation }) => {
      animation.cancel();
    });
    this.animations.clear();
  }

  setConfig(config: Partial<AnimationChoreography>): void {
    this.config = { ...this.config, ...config };
  }
}

/**
 * Gesture Recognition System
 * Handles touch, mouse, and keyboard gestures
 */
export class GestureRecognizer {
  private element: HTMLElement;
  private config: GestureConfig;
  private isTracking = false;
  private currentPosition = { x: 0, y: 0 };
  private velocity = { x: 0, y: 0 };
  private lastTime = 0;
  private callbacks: {
    onStart?: (position: { x: number; y: number }) => void;
    onMove?: (
      position: { x: number; y: number },
      velocity: { x: number; y: number }
    ) => void;
    onEnd?: (
      position: { x: number; y: number },
      velocity: { x: number; y: number }
    ) => void;
  } = {};

  constructor(element: HTMLElement, config: GestureConfig) {
    this.element = element;
    this.config = config;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (this.config.enableMouse) {
      this.element.addEventListener('mousedown', this.handleStart);
      document.addEventListener('mousemove', this.handleMove);
      document.addEventListener('mouseup', this.handleEnd);
    }

    if (this.config.enableTouch) {
      this.element.addEventListener('touchstart', this.handleTouchStart);
      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchend', this.handleTouchEnd);
    }

    if (this.config.enableKeyboard) {
      this.element.addEventListener('keydown', this.handleKeyDown);
    }
  }

  private handleStart = (e: MouseEvent): void => {
    this.isTracking = true;
    this.currentPosition = { x: e.clientX, y: e.clientY };
    this.lastTime = performance.now();

    if (this.callbacks.onStart) {
      this.callbacks.onStart(this.currentPosition);
    }
  };

  private handleMove = (e: MouseEvent): void => {
    if (!this.isTracking) {
      return undefined;
    }

    const now = performance.now();
    const deltaTime = now - this.lastTime;

    if (0 < deltaTime) {
      const deltaX = e.clientX - this.currentPosition.x;
      const deltaY = e.clientY - this.currentPosition.y;

      this.velocity = {
        x: (deltaX / deltaTime) * this.config.sensitivity,
        y: (deltaY / deltaTime) * this.config.sensitivity,
      };
    }

    this.currentPosition = { x: e.clientX, y: e.clientY };
    this.lastTime = now;

    if (this.callbacks.onMove) {
      this.callbacks.onMove(this.currentPosition, this.velocity);
    }
  };

  private handleEnd = (e: MouseEvent): void => {
    if (!this.isTracking) {
      return undefined;
    }

    this.isTracking = false;
    this.currentPosition = { x: e.clientX, y: e.clientY };

    if (this.callbacks.onEnd) {
      this.callbacks.onEnd(this.currentPosition, this.velocity);
    }
  };

  private handleTouchStart = (e: TouchEvent): void => {
    if (1 === e.touches.length) {
      const touch = e.touches[0];
      if (touch) {
        this.handleStart({
          clientX: touch.clientX,
          clientY: touch.clientY,
        } as MouseEvent);
      }
    }
  };

  private handleTouchMove = (e: TouchEvent): void => {
    if (1 === e.touches.length) {
      const touch = e.touches[0];
      if (touch) {
        this.handleMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
        } as MouseEvent);
      }
    }
  };

  private handleTouchEnd = (e: TouchEvent): void => {
    if (1 === e.changedTouches.length) {
      const touch = e.changedTouches[0];
      if (touch) {
        this.handleEnd({
          clientX: touch.clientX,
          clientY: touch.clientY,
        } as MouseEvent);
      }
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    const step = 10;
    let deltaX = 0;
    let deltaY = 0;

    switch (e.key) {
      case 'ArrowLeft':
        deltaX = -step;
        break;
      case 'ArrowRight':
        deltaX = step;
        break;
      case 'ArrowUp':
        deltaY = -step;
        break;
      case 'ArrowDown':
        deltaY = step;
        break;
      default:
        return undefined;
    }

    e.preventDefault();

    const newPosition = {
      x: this.currentPosition.x + deltaX,
      y: this.currentPosition.y + deltaY,
    };

    this.currentPosition = newPosition;
    this.velocity = { x: deltaX, y: deltaY };

    if (this.callbacks.onMove) {
      this.callbacks.onMove(this.currentPosition, this.velocity);
    }
  };

  setOnStart(callback: (position: { x: number; y: number }) => void): void {
    this.callbacks.onStart = callback;
  }

  setOnMove(
    callback: (
      position: { x: number; y: number },
      velocity: { x: number; y: number }
    ) => void
  ): void {
    this.callbacks.onMove = callback;
  }

  setOnEnd(
    callback: (
      position: { x: number; y: number },
      velocity: { x: number; y: number }
    ) => void
  ): void {
    this.callbacks.onEnd = callback;
  }

  destroy(): void {
    if (this.config.enableMouse) {
      this.element.removeEventListener('mousedown', this.handleStart);
      document.removeEventListener('mousemove', this.handleMove);
      document.removeEventListener('mouseup', this.handleEnd);
    }

    if (this.config.enableTouch) {
      this.element.removeEventListener('touchstart', this.handleTouchStart);
      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchend', this.handleTouchEnd);
    }

    if (this.config.enableKeyboard) {
      this.element.removeEventListener('keydown', this.handleKeyDown);
    }

    this.callbacks = {};
  }
}

/**
 * React Hook for Advanced Physics System
 * Combines spring physics, magnetic fields, and gesture recognition
 */
export function useAdvancedPhysics(
  options: {
    springConfig?: SpringConfig;
    magneticConfig?: MagneticConfig;
    choreographyConfig?: AnimationChoreography;
    gestureConfig?: GestureConfig;
    enableSpring?: boolean;
    enableMagnetic?: boolean;
    enableGestures?: boolean;
    enableHaptics?: boolean;
  } = {}
) {
  const {
    springConfig = SPRING_PRESETS.default,
    magneticConfig = MAGNETIC_PRESETS.medium,
    choreographyConfig = CHOREOGRAPHY_PRESETS.staggered,
    gestureConfig = {
      enableTouch: true,
      enableMouse: true,
      enableKeyboard: true,
      sensitivity: 1,
      threshold: 5,
    },
    enableSpring = true,
    enableMagnetic = true,
    enableGestures = true,
    enableHaptics = false,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const springRef = useRef<SpringPhysics | null>(null);
  const magneticRef = useRef<MagneticField | null>(null);
  const choreographerRef = useRef<AnimationChoreographer | null>(null);
  const gestureRef = useRef<GestureRecognizer | null>(null);

  // Initialize physics systems
  useEffect(() => {
    if (enableSpring) {
      springRef.current = new SpringPhysics(springConfig);
    }
    if (enableMagnetic) {
      magneticRef.current = new MagneticField(magneticConfig);
    }
    choreographerRef.current = new AnimationChoreographer(choreographyConfig);

    return () => {
      springRef.current?.destroy();
      magneticRef.current = undefined;
      choreographerRef.current?.cancel();
      gestureRef.current?.destroy();
    };
  }, [
    springConfig,
    magneticConfig,
    choreographyConfig,
    enableSpring,
    enableMagnetic,
  ]);

  // Setup gesture recognition
  useEffect(() => {
    if (!elementRef.current || !enableGestures) {
      return undefined;
    }

    gestureRef.current = new GestureRecognizer(
      elementRef.current,
      gestureConfig
    );

    return () => {
      gestureRef.current?.destroy();
    };
  }, [enableGestures, gestureConfig]);

  // Haptic feedback
  const triggerHaptic = useCallback(
    (intensity: 'light' | 'medium' | 'heavy' = 'light') => {
      if (
        !enableHaptics ||
        'undefined' === typeof navigator ||
        !(navigator as any).vibrate
      ) {
        return undefined;
      }

      const patterns = {
        light: 10,
        medium: 20,
        heavy: 50,
      };

      (navigator as any).vibrate(patterns[intensity]);
    },
    [enableHaptics]
  );

  // Animation methods
  const animateToPosition = useCallback((x: number, y: number) => {
    if (!springRef.current || !elementRef.current) {
      return undefined;
    }

    const spring = springRef.current;
    spring.setTarget(x, y);
    spring.setOnUpdate((state: PhysicsState) => {
      if (elementRef.current) {
        elementRef.current.style.transform = `translate3d(${state.position.x}px, ${state.position.y}px, 0)`;
      }
    });
  }, []);

  const addMagneticElement = useCallback((id: string, element: HTMLElement) => {
    magneticRef.current?.addElement(id, element);
  }, []);

  const removeMagneticElement = useCallback((id: string) => {
    magneticRef.current?.removeElement(id);
  }, []);

  const choreographAnimation = useCallback(
    (
      animations: {
        id: string;
        element: HTMLElement;
        keyframes: Keyframe[];
        options?: KeyframeAnimationOptions;
      }[]
    ) => {
      if (!choreographerRef.current) {
        return undefined;
      }

      animations.forEach(({ id, element, keyframes, options }) => {
        choreographerRef.current?.addAnimation(id, element, keyframes, options);
      });

      choreographerRef.current.play();
    },
    []
  );

  return {
    elementRef,
    spring: springRef.current,
    magnetic: magneticRef.current,
    choreographer: choreographerRef.current,
    gesture: gestureRef.current,
    animateToPosition,
    addMagneticElement,
    removeMagneticElement,
    choreographAnimation,
    triggerHaptic,
    springConfig,
    magneticConfig,
    choreographyConfig,
    gestureConfig,
  };
}
