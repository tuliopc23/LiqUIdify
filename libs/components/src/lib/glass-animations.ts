/**
 * Glass Animations - Advanced animation engine for Glass UI
 * GPU-accelerated animations with physics-based motion
 */

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
  smoothOut: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smoothInOut: "cubic-bezier(0.45, 0, 0.55, 1)",
  anticipate: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  bounce: "cubic-bezier(0.87, -0.41, 0.19, 1.44)",

  // Physics-based easings
  spring: (tension = 0.5, friction = 0.3) =>
    `cubic-bezier(${tension}, ${friction}, 0.35, 1)`,
  fluid: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  magnetic: "cubic-bezier(0.2, 0, 0, 1.2)",
  gravity: "cubic-bezier(0.4, 0.0, 0.68, 0.06)",

  // Custom glass easings
  glassIn: "cubic-bezier(0.32, 0, 0.67, 0)",
  glassOut: "cubic-bezier(0.33, 1, 0.68, 1)",
  glassInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  liquidFlow: "cubic-bezier(0.36, 0.66, 0.04, 1)",
  crystalShatter: "cubic-bezier(0.89, 0.03, 0.69, 0.22)",
};

// Animation types
export type AnimationType =
  | "fade"
  | "slide"
  | "scale"
  | "rotate"
  | "flip"
  | "morph"
  | "ripple"
  | "wave"
  | "dissolve"
  | "shatter"
  | "liquid"
  | "bounce"
  | "elastic"
  | "glitch"
  | "parallax";

export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  delay?: number;
  easing?: string | ((t: number) => number);
  iterations?: number;
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  fill?: "none" | "forwards" | "backwards" | "both";
  playbackRate?: number;
}

export interface GestureAnimation {
  gesture: "swipe" | "pinch" | "rotate" | "pan" | "tap" | "press";
  animation: AnimationConfig;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "any";
}

// Export basic animation utilities
export function createGlassAnimation() {
  return {
    animate: (
      _keyframes: Array<Keyframe>,
      _options: KeyframeAnimationOptions,
    ) => {
      // Basic animation utility
      return null;
    },
  };
}

// Simple animation class for basic functionality
export class GlassAnimation {
  private element: HTMLElement;
  private animation: Animation | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  animate(
    keyframes: Array<Keyframe>,
    options: KeyframeAnimationOptions,
  ): Animation | null {
    if (!this.element) return null;

    this.element.style.willChange = "transform, opacity, filter";
    this.animation = this.element.animate(keyframes, options);

    this.animation.onfinish = () => {
      this.element.style.willChange = "auto";
    };

    return this.animation;
  }

  stop() {
    if (this.animation) {
      this.animation.cancel();
      this.animation = null;
    }
    this.element.style.willChange = "auto";
  }
}
