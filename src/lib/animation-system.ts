/**
 * Advanced Animation System for LiquidiUI
 * 
 * This file provides professional-grade animations with spring physics,
 * micro-interactions, performance optimization, and accessibility support.
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { useReducedMotion } from './accessibility-utils';

// ============================================================================
// SPRING PHYSICS ENGINE
// ============================================================================

export interface SpringConfig {
  tension: number;
  friction: number;
  mass: number;
  velocity: number;
  precision: number;
  restSpeed: number;
  restDelta: number;
}

export const springPresets: Record<string, SpringConfig> = {
  // LiquidiUI signature springs
  glass: {
    tension: 300,
    friction: 30,
    mass: 1,
    velocity: 0,
    precision: 0.01,
    restSpeed: 0.01,
    restDelta: 0.01,
  },
  
  // Micro-interaction springs
  gentle: {
    tension: 120,
    friction: 14,
    mass: 1,
    velocity: 0,
    precision: 0.01,
    restSpeed: 0.01,
    restDelta: 0.01,
  },
  
  bouncy: {
    tension: 400,
    friction: 22,
    mass: 1,
    velocity: 0,
    precision: 0.01,
    restSpeed: 0.01,
    restDelta: 0.01,
  },
  
  // Responsive interactions
  snappy: {
    tension: 500,
    friction: 35,
    mass: 1,
    velocity: 0,
    precision: 0.01,
    restSpeed: 0.01,
    restDelta: 0.01,
  },
  
  // Smooth long animations
  fluid: {
    tension: 180,
    friction: 26,
    mass: 1,
    velocity: 0,
    precision: 0.01,
    restSpeed: 0.01,
    restDelta: 0.01,
  },
  
  // Ultra-responsive for critical interactions
  instant: {
    tension: 800,
    friction: 40,
    mass: 0.8,
    velocity: 0,
    precision: 0.01,
    restSpeed: 0.01,
    restDelta: 0.01,
  },
};

/**
 * Spring physics calculator
 */
class SpringPhysics {
  private config: SpringConfig;
  private currentValue: number = 0;
  private targetValue: number = 0;
  private velocity: number = 0;
  private lastTime: number = 0;
  
  constructor(config: SpringConfig) {
    this.config = { ...config };
    this.velocity = config.velocity;
  }
  
  setTarget(target: number): void {
    this.targetValue = target;
  }
  
  setValue(value: number): void {
    this.currentValue = value;
  }
  
  step(deltaTime: number): { value: number; velocity: number; isAtRest: boolean } {
    if (deltaTime > 64) deltaTime = 64; // Cap delta time
    
    const { tension, friction, mass, restSpeed, restDelta } = this.config;
    
    // Spring force calculation
    const springForce = -tension * (this.currentValue - this.targetValue);
    const dampingForce = -friction * this.velocity;
    const force = springForce + dampingForce;
    
    // Update velocity and position
    const acceleration = force / mass;
    this.velocity += acceleration * (deltaTime / 1000);
    this.currentValue += this.velocity * (deltaTime / 1000);
    
    // Check if spring is at rest
    const isAtRest = 
      Math.abs(this.velocity) < restSpeed &&
      Math.abs(this.currentValue - this.targetValue) < restDelta;
    
    if (isAtRest) {
      this.currentValue = this.targetValue;
      this.velocity = 0;
    }
    
    return {
      value: this.currentValue,
      velocity: this.velocity,
      isAtRest
    };
  }
  
  reset(): void {
    this.currentValue = 0;
    this.velocity = 0;
  }
}

// ============================================================================
// SPRING ANIMATION HOOK
// ============================================================================

export interface UseSpringOptions {
  config?: SpringConfig | keyof typeof springPresets;
  immediate?: boolean;
  onStart?: () => void;
  onUpdate?: (value: number) => void;
  onComplete?: () => void;
}

export function useSpring(
  target: number,
  options: UseSpringOptions = {}
): {
  value: number;
  isAnimating: boolean;
  set: (target: number) => void;
  stop: () => void;
  reset: () => void;
} {
  const {
    config = 'glass',
    immediate = false,
    onStart,
    onUpdate,
    onComplete
  } = options;
  
  const prefersReducedMotion = useReducedMotion();
  const springRef = useRef<SpringPhysics | null>(null);
  const animationRef = useRef<number | null>(null);
  const [value, setValue] = useState(target);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Initialize spring
  if (!springRef.current) {
    const springConfig = typeof config === 'string' ? springPresets[config] : config;
    springRef.current = new SpringPhysics(springConfig);
    springRef.current.setValue(target);
    springRef.current.setTarget(target);
  }
  
  const animate = useCallback(() => {
    if (!springRef.current) return;
    
    const now = performance.now();
    const deltaTime = now - (springRef.current as any).lastTime || 16;
    (springRef.current as any).lastTime = now;
    
    const result = springRef.current.step(deltaTime);
    
    setValue(result.value);
    onUpdate?.(result.value);
    
    if (result.isAtRest) {
      setIsAnimating(false);
      onComplete?.();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [onUpdate, onComplete]);
  
  const set = useCallback((newTarget: number) => {
    if (!springRef.current) return;
    
    if (prefersReducedMotion || immediate) {
      springRef.current.setValue(newTarget);
      springRef.current.setTarget(newTarget);
      setValue(newTarget);
      onUpdate?.(newTarget);
      return;
    }
    
    springRef.current.setTarget(newTarget);
    
    if (!isAnimating) {
      setIsAnimating(true);
      onStart?.();
      animate();
    }
  }, [prefersReducedMotion, immediate, isAnimating, animate, onStart, onUpdate]);
  
  const stop = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setIsAnimating(false);
  }, []);
  
  const reset = useCallback(() => {
    stop();
    springRef.current?.reset();
    setValue(0);
  }, [stop]);
  
  // Update target when prop changes
  useEffect(() => {
    set(target);
  }, [target, set]);
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return { value, isAnimating, set, stop, reset };
}

// ============================================================================
// MICRO-INTERACTION ANIMATIONS
// ============================================================================

export interface MicroInteractionConfig {
  scale?: { rest: number; hover: number; active: number };
  opacity?: { rest: number; hover: number; active: number };
  blur?: { rest: number; hover: number; active: number };
  brightness?: { rest: number; hover: number; active: number };
  transform?: {
    translateX?: { rest: number; hover: number; active: number };
    translateY?: { rest: number; hover: number; active: number };
    rotate?: { rest: number; hover: number; active: number };
  };
  spring?: keyof typeof springPresets;
  duration?: number;
}

export const microInteractionPresets: Record<string, MicroInteractionConfig> = {
  // Glass button interactions
  glassButton: {
    scale: { rest: 1, hover: 1.02, active: 0.98 },
    opacity: { rest: 1, hover: 1, active: 0.9 },
    blur: { rest: 0, hover: 0, active: 1 },
    brightness: { rest: 1, hover: 1.05, active: 0.95 },
    spring: 'glass',
  },
  
  // Gentle hover effect
  gentleHover: {
    scale: { rest: 1, hover: 1.01, active: 0.99 },
    opacity: { rest: 0.9, hover: 1, active: 0.8 },
    spring: 'gentle',
  },
  
  // Magnetic attraction
  magnetic: {
    scale: { rest: 1, hover: 1.05, active: 1.02 },
    transform: {
      translateY: { rest: 0, hover: -2, active: 1 }
    },
    spring: 'bouncy',
  },
  
  // Card lift effect
  cardLift: {
    scale: { rest: 1, hover: 1.02, active: 1 },
    transform: {
      translateY: { rest: 0, hover: -4, active: 0 }
    },
    spring: 'fluid',
  },
  
  // Input focus animation
  inputFocus: {
    scale: { rest: 1, hover: 1.01, active: 1.02 },
    brightness: { rest: 1, hover: 1.02, active: 1.05 },
    spring: 'snappy',
  },
  
  // Loading pulse
  pulse: {
    scale: { rest: 1, hover: 1.1, active: 1 },
    opacity: { rest: 0.7, hover: 1, active: 0.8 },
    spring: 'gentle',
  },
};

type InteractionState = 'rest' | 'hover' | 'active';

export function useMicroInteraction(
  preset: keyof typeof microInteractionPresets | MicroInteractionConfig,
  dependencies: any[] = []
): {
  style: React.CSSProperties;
  bind: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
  state: InteractionState;
} {
  const config = typeof preset === 'string' ? microInteractionPresets[preset] : preset;
  const [state, setState] = useState<InteractionState>('rest');
  const prefersReducedMotion = useReducedMotion();
  
  // Spring animations for each property
  const scaleSpring = useSpring(config.scale?.[state] || 1, {
    config: config.spring || 'glass',
    immediate: prefersReducedMotion
  });
  
  const opacitySpring = useSpring(config.opacity?.[state] || 1, {
    config: config.spring || 'glass',
    immediate: prefersReducedMotion
  });
  
  const blurSpring = useSpring(config.blur?.[state] || 0, {
    config: config.spring || 'glass',
    immediate: prefersReducedMotion
  });
  
  const brightnessSpring = useSpring(config.brightness?.[state] || 1, {
    config: config.spring || 'glass',
    immediate: prefersReducedMotion
  });
  
  const translateXSpring = useSpring(config.transform?.translateX?.[state] || 0, {
    config: config.spring || 'glass',
    immediate: prefersReducedMotion
  });
  
  const translateYSpring = useSpring(config.transform?.translateY?.[state] || 0, {
    config: config.spring || 'glass',
    immediate: prefersReducedMotion
  });
  
  const rotateSpring = useSpring(config.transform?.rotate?.[state] || 0, {
    config: config.spring || 'glass',
    immediate: prefersReducedMotion
  });
  
  // Event handlers
  const bind = {
    onMouseEnter: () => setState('hover'),
    onMouseLeave: () => setState('rest'),
    onMouseDown: () => setState('active'),
    onMouseUp: () => setState('hover'),
    onFocus: () => setState('hover'),
    onBlur: () => setState('rest'),
  };
  
  // Compose final style
  const style: React.CSSProperties = {
    transform: `
      scale(${scaleSpring.value})
      translateX(${translateXSpring.value}px)
      translateY(${translateYSpring.value}px)
      rotate(${rotateSpring.value}deg)
    `.replace(/\s+/g, ' ').trim(),
    opacity: opacitySpring.value,
    filter: `blur(${blurSpring.value}px) brightness(${brightnessSpring.value})`,
    transition: prefersReducedMotion ? 'none' : undefined,
    willChange: 'transform, opacity, filter',
  };
  
  return { style, bind, state };
}

// ============================================================================
// STAGGERED ANIMATIONS
// ============================================================================

export function useStaggeredAnimation(
  items: any[],
  config: {
    stagger?: number;
    spring?: keyof typeof springPresets;
    immediate?: boolean;
  } = {}
): {
  springs: ReturnType<typeof useSpring>[];
  trigger: () => void;
  reset: () => void;
} {
  const { stagger = 50, spring = 'glass', immediate = false } = config;
  const prefersReducedMotion = useReducedMotion();
  
  // Create spring for each item
  const springs = items.map((_, index) => 
    useSpring(0, {
      config: spring,
      immediate: immediate || prefersReducedMotion
    })
  );
  
  const trigger = useCallback(() => {
    if (prefersReducedMotion) {
      springs.forEach(spring => spring.set(1));
      return;
    }
    
    springs.forEach((spring, index) => {
      setTimeout(() => {
        spring.set(1);
      }, index * stagger);
    });
  }, [springs, stagger, prefersReducedMotion]);
  
  const reset = useCallback(() => {
    springs.forEach(spring => spring.set(0));
  }, [springs]);
  
  return { springs, trigger, reset };
}

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================

/**
 * Optimized animation frame scheduler
 */
class AnimationScheduler {
  private callbacks: Array<{
    id: string;
    callback: (deltaTime: number) => boolean; // return false to remove
    priority: number;
  }> = [];
  
  private isRunning = false;
  private lastTime = 0;
  
  add(id: string, callback: (deltaTime: number) => boolean, priority = 0): void {
    this.callbacks.push({ id, callback, priority });
    this.callbacks.sort((a, b) => b.priority - a.priority);
    
    if (!this.isRunning) {
      this.start();
    }
  }
  
  remove(id: string): void {
    this.callbacks = this.callbacks.filter(cb => cb.id !== id);
    
    if (this.callbacks.length === 0) {
      this.stop();
    }
  }
  
  private tick = (currentTime: number) => {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Run callbacks and remove completed ones
    this.callbacks = this.callbacks.filter(({ callback }) => callback(deltaTime));
    
    if (this.callbacks.length > 0) {
      requestAnimationFrame(this.tick);
    } else {
      this.isRunning = false;
    }
  };
  
  private start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTime = performance.now();
      requestAnimationFrame(this.tick);
    }
  }
  
  private stop(): void {
    this.isRunning = false;
  }
}

export const animationScheduler = new AnimationScheduler();

/**
 * Performance-optimized animation hook
 */
export function useOptimizedAnimation(
  callback: (deltaTime: number) => boolean,
  dependencies: any[] = [],
  priority = 0
): {
  start: () => void;
  stop: () => void;
  isRunning: boolean;
} {
  const [isRunning, setIsRunning] = useState(false);
  const idRef = useRef<string>();
  
  const start = useCallback(() => {
    if (!isRunning) {
      idRef.current = `anim-${Date.now()}-${Math.random()}`;
      setIsRunning(true);
      
      animationScheduler.add(idRef.current, (deltaTime) => {
        const shouldContinue = callback(deltaTime);
        if (!shouldContinue) {
          setIsRunning(false);
        }
        return shouldContinue;
      }, priority);
    }
  }, [callback, isRunning, priority]);
  
  const stop = useCallback(() => {
    if (idRef.current) {
      animationScheduler.remove(idRef.current);
      setIsRunning(false);
    }
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (idRef.current) {
        animationScheduler.remove(idRef.current);
      }
    };
  }, []);
  
  return { start, stop, isRunning };
}

// ============================================================================
// GLASS UI SPECIFIC ANIMATIONS
// ============================================================================

/**
 * Glass morphing animation
 */
export function useGlassMorph(isActive: boolean): React.CSSProperties {
  const blurSpring = useSpring(isActive ? 24 : 16, { config: 'glass' });
  const opacitySpring = useSpring(isActive ? 0.15 : 0.12, { config: 'glass' });
  const brightnessSpring = useSpring(isActive ? 1.1 : 1, { config: 'glass' });
  
  return {
    backdropFilter: `blur(${blurSpring.value}px) brightness(${brightnessSpring.value})`,
    backgroundColor: `rgba(255, 255, 255, ${opacitySpring.value})`,
    transition: 'none',
  };
}

/**
 * Floating animation for glass elements
 */
export function useFloatingAnimation(enabled: boolean = true): React.CSSProperties {
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;
    
    let startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const newOffset = Math.sin(elapsed * 0.001) * 2; // Gentle floating
      setOffset(newOffset);
      
      if (enabled) {
        requestAnimationFrame(animate);
      }
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [enabled, prefersReducedMotion]);
  
  return {
    transform: `translateY(${prefersReducedMotion ? 0 : offset}px)`,
    transition: prefersReducedMotion ? 'none' : undefined,
  };
}

// Export animation utilities
export {
  SpringPhysics,
  AnimationScheduler,
};

// Default export for convenience
export default {
  useSpring,
  useMicroInteraction,
  useStaggeredAnimation,
  useOptimizedAnimation,
  useGlassMorph,
  useFloatingAnimation,
  springPresets,
  microInteractionPresets,
};