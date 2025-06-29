/**
 * Glass Animations - Advanced animation engine for Glass UI
 * GPU-accelerated animations with physics-based motion
 */

import '../types/web-animations';

// Import types for physics and animation
export interface SpringPhysics {
  mass: number;
  tension: number;
  friction: number;
}

export interface Vector2D {
  x: number;
  y: number;
}

// Animation timing functions
export const GLASS_EASINGS = {
  // Apple-inspired easings
  smoothOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  smoothInOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
  anticipate: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  bounce: 'cubic-bezier(0.87, -0.41, 0.19, 1.44)',

  // Physics-based easings
  spring: (tension = 0.5, friction = 0.3) =>
    `cubic-bezier(${tension}, ${friction}, 0.35, 1)`,
  fluid: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  magnetic: 'cubic-bezier(0.2, 0, 0, 1.2)',
  gravity: 'cubic-bezier(0.4, 0.0, 0.68, 0.06)',

  // Custom glass easings
  glassIn: 'cubic-bezier(0.32, 0, 0.67, 0)',
  glassOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
  glassInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  liquidFlow: 'cubic-bezier(0.36, 0.66, 0.04, 1)',
  crystalShatter: 'cubic-bezier(0.89, 0.03, 0.69, 0.22)',
};

// Animation types
export type AnimationType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'rotate'
  | 'flip'
  | 'morph'
  | 'ripple'
  | 'wave'
  | 'dissolve'
  | 'shatter'
  | 'liquid'
  | 'bounce'
  | 'elastic'
  | 'glitch'
  | 'parallax';

export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  delay?: number;
  easing?: string | ((t: number) => number);
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
  playbackRate?: number;
}

export interface GestureAnimation {
  gesture: 'swipe' | 'pinch' | 'rotate' | 'pan' | 'tap' | 'press';
  animation: AnimationConfig;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'any';
}

// GPU-accelerated animation class
export class GlassAnimation {
  private element: HTMLElement;
  private animation: Animation | null = null;
  private timeline: AnimationTimeline;
  private rafId: number | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
    this.timeline = document.timeline;
  }

  // Animate with Web Animations API
  animate(
    keyframes: globalThis.Keyframe[],
    options: globalThis.KeyframeAnimationOptions
  ): globalThis.Animation {
    // Force GPU acceleration
    this.element.style.willChange = 'transform, opacity, filter';

    this.animation = this.element.animate(keyframes, {
      ...options,
      composite: 'accumulate',
    });

    this.animation.onfinish = () => {
      this.element.style.willChange = 'auto';
    };

    return this.animation;
  }

  // Morph between shapes
  morphTo(targetPath: string, duration = 1000) {
    const currentPath = this.element.getAttribute('d') || '';

    return this.animate([{ d: currentPath }, { d: targetPath }], {
      duration,
      easing: GLASS_EASINGS.liquidFlow,
      fill: 'forwards',
    });
  }

  // Liquid animation
  liquid(amplitude = 20, frequency = 2, duration = 2000) {
    const keyframes: globalThis.Keyframe[] = [];
    const steps = 60;

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const offset = Math.sin(progress * Math.PI * frequency) * amplitude;

      keyframes.push({
        transform: `translateY(${offset}px) scaleX(${1 + Math.abs(offset) / 100})`,
        offset: progress,
      });
    }

    return this.animate(keyframes, {
      duration,
      easing: 'linear',
      iterations: Infinity,
    });
  }

  // Shatter effect
  shatter(pieces = 12, duration = 800) {
    // const bounds = element.getBoundingClientRect();
    const fragments: HTMLElement[] = [];

    // Create fragments
    for (let i = 0; i < pieces; i++) {
      const fragment = this.element.cloneNode(true) as HTMLElement;
      fragment.style.position = 'absolute';
      fragment.style.clipPath = this.generateRandomClipPath();
      this.element.parentElement?.appendChild(fragment);
      fragments.push(fragment);
    }

    // Hide original
    this.element.style.opacity = '0';

    // Animate fragments
    fragments.forEach((fragment, i) => {
      const angle = (i / pieces) * Math.PI * 2;
      const distance = 100 + Math.random() * 200;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const rotation = Math.random() * 720 - 360;

      fragment.animate(
        [
          {
            transform: 'translate(0, 0) rotate(0deg) scale(1)',
            opacity: 1,
          },
          {
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration,
          easing: GLASS_EASINGS.gravity,
          fill: 'forwards',
        }
      ).onfinish = () => fragment.remove();
    });
  }

  // Ripple effect from point
  ripple(
    x: number,
    y: number,
    color = 'rgba(255, 255, 255, 0.3)',
    duration = 600
  ) {
    const ripple = document.createElement('div');
    const bounds = this.element.getBoundingClientRect();
    const size = Math.max(bounds.width, bounds.height) * 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      pointer-events: none;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
    `;

    this.element.appendChild(ripple);

    ripple.animate(
      [
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(1)', opacity: 0 },
      ],
      {
        duration,
        easing: GLASS_EASINGS.smoothOut,
        fill: 'forwards',
      }
    ).onfinish = () => ripple.remove();
  }

  // Wave animation
  wave(amplitude = 10, duration = 1500) {
    return this.animate(
      [
        { transform: 'translateX(0) rotate(0deg)' },
        { transform: `translateX(${amplitude}px) rotate(1deg)` },
        { transform: `translateX(-${amplitude}px) rotate(-1deg)` },
        { transform: 'translateX(0) rotate(0deg)' },
      ],
      {
        duration,
        easing: GLASS_EASINGS.smoothInOut,
        iterations: Infinity,
      }
    );
  }

  // Parallax scroll effect
  parallax(speed = 0.5, axis: 'y' | 'x' = 'y') {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      if (axis === 'y') {
        this.element.style.transform = `translateY(${rate}px)`;
      } else {
        this.element.style.transform = `translateX(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }

  // Glitch effect
  glitch(intensity = 5, duration = 200) {
    const keyframes: globalThis.Keyframe[] = [];
    const steps = 10;

    for (let i = 0; i < steps; i++) {
      const x = (Math.random() - 0.5) * intensity;
      const y = (Math.random() - 0.5) * intensity;
      const hue = Math.random() * 360;

      keyframes.push({
        transform: `translate(${x}px, ${y}px)`,
        filter: `hue-rotate(${hue}deg)`,
        offset: i / steps,
      });
    }

    keyframes.push({
      transform: 'translate(0, 0)',
      filter: 'hue-rotate(0deg)',
      offset: 1,
    });

    return this.animate(keyframes, {
      duration,
      easing: 'steps(10)',
      iterations: 3,
    });
  }

  // Dissolve effect
  dissolve(duration = 1000) {
    return this.animate(
      [
        {
          opacity: 1,
          filter: 'blur(0px) saturate(100%)',
        },
        {
          opacity: 0.5,
          filter: 'blur(10px) saturate(200%)',
        },
        {
          opacity: 0,
          filter: 'blur(20px) saturate(0%)',
        },
      ],
      {
        duration,
        easing: GLASS_EASINGS.smoothOut,
        fill: 'forwards',
      }
    );
  }

  // Helper to generate random clip paths for shatter
  private generateRandomClipPath(): string {
    const points = [];
    const vertices = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const radius = 30 + Math.random() * 20;
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;
      points.push(`${x}% ${y}%`);
    }

    return `polygon(${points.join(', ')})`;
  }

  // Stop all animations
  stop() {
    if (this.animation) {
      this.animation.cancel();
      this.animation = null;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.element.style.willChange = 'auto';
  }
}

// Choreographed animations for multiple elements
export class GlassChoreographer {
  private animations: Map<HTMLElement, GlassAnimation> = new Map();
  private timeline: AnimationTimeline;

  constructor() {
    this.timeline = document.timeline;
  }

  // Add element to choreography
  add(element: HTMLElement): GlassAnimation {
    const animation = new GlassAnimation(element);
    this.animations.set(element, animation);
    return animation;
  }

  // Stagger animations
  stagger(
    elements: HTMLElement[],
    keyframes: globalThis.Keyframe[],
    options: globalThis.KeyframeAnimationOptions,
    staggerDelay = 50
  ) {
    elements.forEach((element, index) => {
      const animation = this.add(element);
      animation.animate(keyframes, {
        ...options,
        delay: (options.delay || 0) + index * staggerDelay,
      });
    });
  }

  // Cascade animation
  cascade(
    elements: HTMLElement[],
    animationType: AnimationType,
    duration = 500,
    staggerDelay = 100
  ) {
    const keyframes = this.getKeyframesForType(animationType);
    this.stagger(elements, keyframes, { duration }, staggerDelay);
  }

  // Get predefined keyframes for animation type
  private getKeyframesForType(type: AnimationType): globalThis.Keyframe[] {
    const keyframeMap: Record<AnimationType, globalThis.Keyframe[]> = {
      fade: [{ opacity: 0 }, { opacity: 1 }],
      slide: [
        { transform: 'translateY(20px)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ],
      scale: [
        { transform: 'scale(0.8)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      rotate: [
        { transform: 'rotate(-180deg)', opacity: 0 },
        { transform: 'rotate(0deg)', opacity: 1 },
      ],
      flip: [
        { transform: 'rotateY(180deg)', opacity: 0 },
        { transform: 'rotateY(0deg)', opacity: 1 },
      ],
      morph: [
        { borderRadius: '0%', transform: 'scale(0.8)' },
        { borderRadius: '50%', transform: 'scale(1.1)' },
        { borderRadius: '25%', transform: 'scale(1)' },
      ],
      ripple: [
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(1)', opacity: 0 },
      ],
      wave: [
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' },
      ],
      dissolve: [
        { opacity: 1, filter: 'blur(0)' },
        { opacity: 0, filter: 'blur(10px)' },
      ],
      shatter: [
        { transform: 'scale(1) rotate(0)', opacity: 1 },
        { transform: 'scale(0) rotate(360deg)', opacity: 0 },
      ],
      liquid: [
        { transform: 'scaleY(1)' },
        { transform: 'scaleY(1.2) scaleX(0.9)' },
        { transform: 'scaleY(0.9) scaleX(1.1)' },
        { transform: 'scaleY(1)' },
      ],
      bounce: [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-20px)' },
        { transform: 'translateY(0)' },
        { transform: 'translateY(-10px)' },
        { transform: 'translateY(0)' },
      ],
      elastic: [
        { transform: 'scaleX(1)' },
        { transform: 'scaleX(1.25)' },
        { transform: 'scaleX(0.75)' },
        { transform: 'scaleX(1.15)' },
        { transform: 'scaleX(1)' },
      ],
      glitch: [
        { transform: 'translate(0)', filter: 'hue-rotate(0)' },
        { transform: 'translate(2px, -2px)', filter: 'hue-rotate(90deg)' },
        { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(180deg)' },
        { transform: 'translate(0)', filter: 'hue-rotate(0)' },
      ],
      parallax: [
        { transform: 'translateZ(0)' },
        { transform: 'translateZ(50px)' },
      ],
    };

    return keyframeMap[type] || keyframeMap.fade;
  }

  // Clear all animations
  clear() {
    this.animations.forEach(animation => animation.stop());
    this.animations.clear();
  }
}

// Gesture-based animation controller
export class GlassGestureAnimator {
  private element: HTMLElement;
  private animation: GlassAnimation;
  private gestureHandlers: Map<string, (e: TouchEvent) => void> = new Map();

  constructor(element: HTMLElement) {
    this.element = element;
    this.animation = new GlassAnimation(element);
  }

  // Enable swipe animations
  onSwipe(
    direction: 'left' | 'right' | 'up' | 'down',
    animationConfig: AnimationConfig
  ) {
    let startX = 0;
    let startY = 0;

    const handleStart = (e: TouchEvent | MouseEvent) => {
      const touch = 'touches' in e ? e.touches[0] : e;
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleEnd = (e: TouchEvent | MouseEvent) => {
      const touch = 'changedTouches' in e ? e.changedTouches[0] : e;
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const threshold = 50;

      let triggered = false;

      switch (direction) {
        case 'left':
          triggered = deltaX < -threshold && Math.abs(deltaY) < threshold;
          break;
        case 'right':
          triggered = deltaX > threshold && Math.abs(deltaY) < threshold;
          break;
        case 'up':
          triggered = deltaY < -threshold && Math.abs(deltaX) < threshold;
          break;
        case 'down':
          triggered = deltaY > threshold && Math.abs(deltaX) < threshold;
          break;
      }

      if (triggered) {
        this.playAnimation(animationConfig);
      }
    };

    this.element.addEventListener('touchstart', handleStart, { passive: true });
    this.element.addEventListener('touchend', handleEnd, { passive: true });
    this.element.addEventListener('mousedown', handleStart);
    this.element.addEventListener('mouseup', handleEnd);

    this.gestureHandlers.set(`swipe-${direction}`, handleEnd);
  }

  // Enable pinch animations
  onPinch(animationConfig: AnimationConfig) {
    let initialDistance = 0;

    const getDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDistance = getDistance(e.touches);
      }
    };

    const handleMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistance > 0) {
        const currentDistance = getDistance(e.touches);
        const scale = currentDistance / initialDistance;

        this.element.style.transform = `scale(${scale})`;

        if (Math.abs(scale - 1) > 0.2) {
          this.playAnimation(animationConfig);
        }
      }
    };

    this.element.addEventListener('touchstart', handleStart, { passive: true });
    this.element.addEventListener('touchmove', handleMove, { passive: true });

    this.gestureHandlers.set('pinch', handleMove as (e: TouchEvent) => void);
  }

  // Play animation based on config
  private playAnimation(config: AnimationConfig) {
    const choreographer = new GlassChoreographer();
    const keyframes = choreographer['getKeyframesForType'](config.type);

    this.animation.animate(keyframes, {
      duration: config.duration || 500,
      easing: (config.easing as string) || GLASS_EASINGS.smoothOut,
      iterations: config.iterations || 1,
      direction: config.direction || 'normal',
      fill: config.fill || 'forwards',
      playbackRate: config.playbackRate || 1,
    });
  }

  // Clean up
  destroy() {
    this.animation.stop();
    this.gestureHandlers.clear();
  }
}

// Export animation utilities
export function createGlassAnimation(element: HTMLElement): GlassAnimation {
  return new GlassAnimation(element);
}

export function createChoreographer(): GlassChoreographer {
  return new GlassChoreographer();
}

export function createGestureAnimator(
  element: HTMLElement
): GlassGestureAnimator {
  return new GlassGestureAnimator(element);
}
