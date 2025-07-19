/**
 * Glass Physics Lite - Lightweight physics without GSAP dependency
 * CSS-based animations with Web Animations API fallback
 */

import { useRef, useState, useCallback, useEffect } from 'react';

// Re-export Vector2D for compatibility
export { Vector2D } from './glass-physics';

// Physics configuration
export interface PhysicsConfig {
  mass?: number;
  tension?: number;
  friction?: number;
  precision?: number;
}

// Spring animation using CSS transitions
export function useSpringAnimation(config: PhysicsConfig = {}) {
  const { mass = 1, tension = 170, friction = 26 } = config;
  const [isAnimating, setIsAnimating] = useState(false);

  const getSpringDuration = useCallback(() => {
    // Approximate spring duration based on physics
    return Math.sqrt(mass / tension) * 1000;
  }, [mass, tension]);

  const getSpringEasing = useCallback(() => {
    // CSS cubic-bezier approximation of spring physics
    const damping = friction / (2 * Math.sqrt(mass * tension));
    if (damping < 1) {
      // Underdamped spring
      return `cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    } else {
      // Critically damped or overdamped
      return `cubic-bezier(0.25, 0.1, 0.25, 1)`;
    }
  }, [mass, tension, friction]);

  const animate = useCallback(
    (
      element: HTMLElement,
      properties: Record<string, string>,
      options?: KeyframeAnimationOptions
    ) => {
      if (!element) return;

      setIsAnimating(true);

      // Use Web Animations API if available
      if ('animate' in element) {
        const animation = element.animate([properties], {
          duration: getSpringDuration(),
          easing: getSpringEasing(),
          fill: 'forwards',
          ...options,
        });

        animation.onfinish = () => setIsAnimating(false);
        return animation;
      } else {
        // Fallback to CSS transitions
        const duration = getSpringDuration();
        const easing = getSpringEasing();

        const htmlElement = element as HTMLElement;
        htmlElement.style.transition = `all ${duration}ms ${easing}`;
        Object.assign(htmlElement.style, properties);

        setTimeout(() => {
          htmlElement.style.transition = '';
          setIsAnimating(false);
        }, duration);
        
        return undefined;
      }
    },
    [getSpringDuration, getSpringEasing]
  );

  return { animate, isAnimating };
}

// Magnetic effect using CSS transforms
export function useMagneticEffect(
  strength: number = 0.15,
  radius: number = 150
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current || !isActive) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const force = (1 - distance / radius) * strength;
        const translateX = deltaX * force;
        const translateY = deltaY * force;

        elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
      } else {
        elementRef.current.style.transform = '';
      }
    },
    [isActive, strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.transform = '';
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
    return undefined;
  }, [isActive, handleMouseMove, handleMouseLeave]);

  return {
    ref: elementRef,
    setActive: setIsActive,
  };
}

// Parallax effect using CSS transforms
export function useParallaxEffect(speed: number = 0.5) {
  const elementRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.transform = `translateY(${offset}px)`;
    }
  }, [offset]);

  return elementRef;
}

// Ripple effect using CSS animations
export function useRippleEffect() {
  const containerRef = useRef<HTMLElement>(null);

  const createRipple = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'glass-ripple';

    container.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, []);

  return {
    ref: containerRef,
    createRipple,
  };
}

// Elastic scroll using CSS scroll-behavior
export function useElasticScroll() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const scrollTo = useCallback(
    (target: number | HTMLElement, options?: ScrollToOptions) => {
      if (typeof target === 'number') {
        window.scrollTo({
          top: target,
          behavior: 'smooth',
          ...options,
        });
      } else {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          ...options,
        });
      }
    },
    []
  );

  return { scrollTo };
}

// Performance-optimized animation frame
export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  deps: React.DependencyList = []
) {
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, deps);
}

// CSS-based liquid effect
export class CSSLiquidEffect {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
    this.element.classList.add('glass-liquid-effect');
  }

  wave(amplitude: number = 10, frequency: number = 2) {
    this.element.style.setProperty('--wave-amplitude', `${amplitude}px`);
    this.element.style.setProperty('--wave-frequency', `${frequency}`);
    this.element.classList.add('glass-liquid-wave');
  }

  ripple(x: number, y: number, size: number = 100) {
    const ripple = document.createElement('div');
    ripple.className = 'glass-liquid-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = ripple.style.height = `${size}px`;

    this.element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 1000);
  }

  morph(duration: number = 1000) {
    this.element.style.setProperty('--morph-duration', `${duration}ms`);
    this.element.classList.add('glass-liquid-morph');
  }

  destroy() {
    this.element.classList.remove(
      'glass-liquid-effect',
      'glass-liquid-wave',
      'glass-liquid-morph'
    );
    this.element.style.removeProperty('--wave-amplitude');
    this.element.style.removeProperty('--wave-frequency');
    this.element.style.removeProperty('--morph-duration');
  }
}
