/**
 * Glass Animations - Advanced animation engine for Glass UI
 * GPU-accelerated animations with physics-based motion
 */

import '../types/web-animations';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// Registering plugins
if (typeof window !== 'undefined' && gsap) {
  gsap.registerPlugin(MorphSVGPlugin);
}

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
// Enhanced with GSAP timeline capabilities
export class GlassAnimation {
  private element: HTMLElement;
  private animation: Animation | null = null;
  private gsapTimeline: gsap.core.Timeline;
  private rafId: number | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
    this.gsapTimeline = gsap.timeline();
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

  // Enhanced morphing between shapes using GSAP MorphSVG
  morphTo(targetPath: string, duration = 1000) {
    // Check if element is SVG path
    if (this.element.tagName === 'path' || this.element.tagName === 'PATH') {
      return gsap.to(this.element, {
        duration: duration / 1000,
        morphSVG: targetPath,
        ease: 'power2.inOut',
        force3D: true,
        onComplete: () => {
          this.element.style.willChange = 'auto';
        },
      });
    } else {
      // Fallback to Web Animations API for non-SVG elements
      const currentPath = this.element.getAttribute('d') || '';
      return this.animate([{ d: currentPath }, { d: targetPath }], {
        duration,
        easing: GLASS_EASINGS.liquidFlow,
        fill: 'forwards',
      });
    }
  }

  // Enhanced liquid animation with GSAP
  liquid(amplitude = 20, _frequency = 2, duration = 2000) {
    this.gsapTimeline.clear();
    this.gsapTimeline.to(this.element, {
      y: `+=${amplitude * 2}`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: duration / 1000 / 2,
    });
  }

  // Elastic effect using GSAP
  elasticEffect(amplitude = 1.5, frequency = 2, duration = 1600) {
    gsap.to(this.element, {
      duration: duration / 1000,
      x: amplitude * 100,
      ease: `elastic.out(${frequency}, ${amplitude})`,
    });
  }

  // Add magnetic hover effect with GSAP
  magneticHover(_strength = 50, duration = 0.5) {
    this.element.addEventListener('mouseenter', () => {
      gsap.to(this.element, {
        duration: duration / 1.5,
        scale: 1.1,
        ease: 'power3.out',
      });
    });

    this.element.addEventListener('mouseleave', () => {
      gsap.to(this.element, {
        duration: duration,
        scale: 1,
        ease: 'power3.in',
      });
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

  // Batch processing for multiple animations
  batchAnimate(animations: Array<{ target: string; vars: gsap.TweenVars }>) {
    // Use GSAP's batch method for optimal performance
    gsap.set(this.element, { force3D: true }); // Force GPU acceleration

    const tl = gsap.timeline();
    animations.forEach(({ target, vars }) => {
      tl.to(target, vars, 0); // Add all animations to start simultaneously
    });

    return tl;
  }

  // Physics-based spring animation
  springTo(
    target: { x?: number; y?: number; scale?: number },
    config: SpringPhysics = { mass: 1, tension: 280, friction: 60 }
  ) {
    return gsap.to(this.element, {
      x: target.x,
      y: target.y,
      scale: target.scale,
      duration: Math.sqrt(config.mass / config.tension) * 2,
      ease: `power2.out`,
      force3D: true,
    });
  }

  // Advanced magnetic field effect
  magneticField(radius = 100, strength = 0.3) {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = this.element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const force = (radius - distance) / radius;
        const moveX = deltaX * force * strength;
        const moveY = deltaY * force * strength;

        gsap.to(this.element, {
          x: moveX,
          y: moveY,
          duration: 0.2,
          ease: 'power2.out',
        });
      } else {
        gsap.to(this.element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
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
    // Kill all GSAP animations on this element
    gsap.killTweensOf(this.element);
    this.gsapTimeline.kill();
    this.element.style.willChange = 'auto';
  }
}

// Choreographed animations for multiple elements
// Enhanced with GSAP timeline for better performance
export class GlassChoreographer {
  private animations: Map<HTMLElement, GlassAnimation> = new Map();
  private masterTimeline: gsap.core.Timeline;

  constructor() {
    this.masterTimeline = gsap.timeline();
  }

  // Add element to choreography
  add(element: HTMLElement): GlassAnimation {
    const animation = new GlassAnimation(element);
    this.animations.set(element, animation);
    return animation;
  }

  // Enhanced stagger animations with GSAP
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

  // Batch animate multiple elements with GSAP for optimal performance
  batchAnimate(elements: HTMLElement[], vars: gsap.TweenVars, stagger = 0.1) {
    // Use GSAP's batch method for GPU acceleration
    gsap.set(elements, { force3D: true });

    return gsap.to(elements, {
      ...vars,
      stagger: stagger,
      ease: vars.ease || 'power2.out',
    });
  }

  // Physics-based cascade with spring effects
  springCascade(
    elements: HTMLElement[],
    target: { x?: number; y?: number; scale?: number },
    staggerDelay = 0.1
  ) {
    this.masterTimeline.clear();

    elements.forEach((element, index) => {
      this.masterTimeline.to(
        element,
        {
          x: target.x,
          y: target.y,
          scale: target.scale,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
          force3D: true,
        },
        index * staggerDelay
      );
    });

    return this.masterTimeline;
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
    this.masterTimeline.kill();
    this.masterTimeline = gsap.timeline();
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
      if (touch) {
        startX = touch.clientX;
        startY = touch.clientY;
      }
    };

    const handleEnd = (e: TouchEvent | MouseEvent) => {
      const touch = 'changedTouches' in e ? e.changedTouches[0] : e;
      if (!touch) return;

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
      if (touches.length < 2) return 0;
      const touch0 = touches[0];
      const touch1 = touches[1];
      if (!touch0 || !touch1) return 0;
      const dx = touch0.clientX - touch1.clientX;
      const dy = touch0.clientY - touch1.clientY;
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

// GPU acceleration utilities
export const GlassUtils = {
  // Force GPU acceleration on multiple elements
  enableGPUAcceleration(elements: HTMLElement[]) {
    gsap.set(elements, {
      force3D: true,
      willChange: 'transform',
    });
  },

  // Enhanced reduced motion support with graceful animation scaling
  enableReducedMotion(elements: HTMLElement[]) {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      elements.forEach(element => {
        gsap.to(element, {
          clearProps: 'all', // Remove animations
          opacity: 1, // Ensure visibility
        });
      });
    }
  },

  // Frame rate tracking for animations
  trackFrameRate() {
    const start = Date.now();
    let frame = 0;

    function checkFrameRate() {
      frame++;
      const now = Date.now();
      const duration = now - start;
      const actualFPS = (frame / duration) * 1000;
      console.log(`Current FPS: ${actualFPS}`);

      if (duration < 1000) {
        requestAnimationFrame(checkFrameRate);
      }
    }

    requestAnimationFrame(checkFrameRate);
  },

  // Batch animate with optimal performance
  batchAnimate(elements: HTMLElement[], animations: gsap.TweenVars[]) {
    const tl = gsap.timeline();

    elements.forEach((element, index) => {
      const animation = animations[index] || animations[0];
      tl.to(
        element,
        {
          ...animation,
          force3D: true,
        },
        0
      );
    });

    return tl;
  },

  // Physics-based spring animation for multiple elements
  springAnimation(
    elements: HTMLElement[],
    target: gsap.TweenVars,
    stagger = 0.1
  ) {
    return gsap.to(elements, {
      ...target,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
      stagger: stagger,
      force3D: true,
    });
  },

  // Magnetic effect for multiple elements
  createMagneticField(elements: HTMLElement[], radius = 100, strength = 0.3) {
    const cleanupFunctions: (() => void)[] = [];

    elements.forEach(element => {
      const animation = new GlassAnimation(element);
      const cleanup = animation.magneticField(radius, strength);
      cleanupFunctions.push(cleanup);
    });

    return () => cleanupFunctions.forEach(cleanup => cleanup());
  },
};
