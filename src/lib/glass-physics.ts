/**
 * Glass Physics - Advanced interaction utilities for Liquid Glass components
 * Implements magnetic hover, repulsion, and fluid morphing effects
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// Physics constants
export const PHYSICS_CONSTANTS = {
  MAGNETIC_STRENGTH: 0.3,
  REPULSION_DISTANCE: 100,
  SPRING_TENSION: 0.8,
  SPRING_FRICTION: 0.6,
  HOVER_SCALE: 1.02,
  ACTIVE_SCALE: 0.98,
  MAGNETIC_RADIUS: 120,
  FLUID_TENSION: 0.4
};

// Vector2D utility class
export class Vector2D {
  constructor(public x: number = 0, public y: number = 0) {}

  static distance(a: Vector2D, b: Vector2D): number {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  static normalize(vector: Vector2D): Vector2D {
    const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return magnitude > 0 ? new Vector2D(vector.x / magnitude, vector.y / magnitude) : new Vector2D(0, 0);
  }

  static multiply(vector: Vector2D, scalar: number): Vector2D {
    return new Vector2D(vector.x * scalar, vector.y * scalar);
  }

  static add(a: Vector2D, b: Vector2D): Vector2D {
    return new Vector2D(a.x + b.x, a.y + b.y);
  }
}

// Spring physics for smooth animations
export class SpringPhysics {
  private velocity: Vector2D = new Vector2D(0, 0);
  private position: Vector2D = new Vector2D(0, 0);
  private target: Vector2D = new Vector2D(0, 0);

  constructor(
    private tension: number = PHYSICS_CONSTANTS.SPRING_TENSION,
    private friction: number = PHYSICS_CONSTANTS.SPRING_FRICTION
  ) {}

  setTarget(x: number, y: number) {
    this.target = new Vector2D(x, y);
  }

  update(): Vector2D {
    const force = Vector2D.multiply(
      new Vector2D(this.target.x - this.position.x, this.target.y - this.position.y),
      this.tension
    );

    this.velocity = Vector2D.add(this.velocity, force);
    this.velocity = Vector2D.multiply(this.velocity, this.friction);
    this.position = Vector2D.add(this.position, this.velocity);

    return this.position;
  }

  getCurrentPosition(): Vector2D {
    return this.position;
  }

  isAtRest(): boolean {
    const velocityThreshold = 0.01;
    const positionThreshold = 0.1;
    
    return (
      Math.abs(this.velocity.x) < velocityThreshold &&
      Math.abs(this.velocity.y) < velocityThreshold &&
      Vector2D.distance(this.position, this.target) < positionThreshold
    );
  }
}

// Magnetic hover effect hook
export const useMagneticHover = (
  strength: number = PHYSICS_CONSTANTS.MAGNETIC_STRENGTH,
  radius: number = PHYSICS_CONSTANTS.MAGNETIC_RADIUS
) => {
  const elementRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px) scale(1)');
  const springRef = useRef(new SpringPhysics());
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    const position = springRef.current.update();
    setTransform(`translate3d(${position.x}px, ${position.y}px, 0px) scale(${1 + Math.abs(position.x + position.y) * 0.0001})`);

    if (!springRef.current.isAtRest()) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );

    if (distance < radius) {
      const force = Math.max(0, 1 - distance / radius);
      const deltaX = (mouseX - centerX) * strength * force;
      const deltaY = (mouseY - centerY) * strength * force;
      
      springRef.current.setTarget(deltaX, deltaY);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [strength, radius, animate]);

  const handleMouseLeave = useCallback(() => {
    springRef.current.setTarget(0, 0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { elementRef, transform };
};

// Repulsion effect between elements
export const useRepulsionEffect = (
  elements: HTMLElement[],
  repulsionStrength: number = 50
) => {
  const [positions, setPositions] = useState<Vector2D[]>([]);

  useEffect(() => {
    if (elements.length === 0) return;

    const updatePositions = () => {
      const newPositions = elements.map((element, index) => {
        if (!element) return new Vector2D(0, 0);

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        let totalForceX = 0;
        let totalForceY = 0;

        elements.forEach((otherElement, otherIndex) => {
          if (index === otherIndex || !otherElement) return;

          const otherRect = otherElement.getBoundingClientRect();
          const otherCenterX = otherRect.left + otherRect.width / 2;
          const otherCenterY = otherRect.top + otherRect.height / 2;

          const distance = Math.sqrt(
            Math.pow(centerX - otherCenterX, 2) + Math.pow(centerY - otherCenterY, 2)
          );

          if (distance < PHYSICS_CONSTANTS.REPULSION_DISTANCE && distance > 0) {
            const force = repulsionStrength / (distance * distance);
            const directionX = (centerX - otherCenterX) / distance;
            const directionY = (centerY - otherCenterY) / distance;

            totalForceX += directionX * force;
            totalForceY += directionY * force;
          }
        });

        return new Vector2D(totalForceX, totalForceY);
      });

      setPositions(newPositions);
    };

    const interval = setInterval(updatePositions, 16); // ~60fps
    return () => clearInterval(interval);
  }, [elements, repulsionStrength]);

  return positions;
};

// Fluid morphing transition utility
export const createFluidMorph = (
  fromElement: HTMLElement,
  toElement: HTMLElement,
  duration: number = 500
) => {
  const fromRect = fromElement.getBoundingClientRect();
  const toRect = toElement.getBoundingClientRect();

  const deltaX = toRect.left - fromRect.left;
  const deltaY = toRect.top - fromRect.top;
  const deltaWidth = toRect.width - fromRect.width;
  const deltaHeight = toRect.height - fromRect.height;

  return {
    initial: {
      x: 0,
      y: 0,
      width: fromRect.width,
      height: fromRect.height,
      borderRadius: getComputedStyle(fromElement).borderRadius
    },
    animate: {
      x: deltaX,
      y: deltaY,
      width: toRect.width,
      height: toRect.height,
      borderRadius: getComputedStyle(toElement).borderRadius
    },
    transition: {
      duration: duration / 1000,
      ease: [PHYSICS_CONSTANTS.FLUID_TENSION, 0, 1 - PHYSICS_CONSTANTS.FLUID_TENSION, 1]
    }
  };
};

// Glass ripple effect
export const createGlassRipple = (
  element: HTMLElement,
  x: number,
  y: number,
  color: string = 'rgba(255, 255, 255, 0.3)'
) => {
  const ripple = document.createElement('div');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, ${color} 0%, transparent 70%);
    transform: scale(0);
    animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    left: ${x - size / 2}px;
    top: ${y - size / 2}px;
    width: ${size}px;
    height: ${size}px;
    z-index: 1000;
  `;

  // Add ripple keyframes if not already present
  if (!document.querySelector('#ripple-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ripple-keyframes';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
};

// Performance-optimized transform utility
export const optimizedTransform = (
  element: HTMLElement,
  x: number,
  y: number,
  scale: number = 1,
  rotate: number = 0
) => {
  element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
  element.style.willChange = 'transform';
};

// Cleanup utility for performance
export const cleanupTransform = (element: HTMLElement) => {
  element.style.willChange = 'auto';
};
