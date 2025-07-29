/**
 * Glass Gesture Recognition System
 * Advanced gesture handling with magnetic hover and liquid flow effects
 * Requirements: 5.2, 5.4 - Gesture recognition with haptic feedback simulation
 */

import { useCallback, useEffect, useRef } from 'react';

export interface GestureEvent {
  type: 'start' | 'move' | 'end' | 'cancel';
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  distance: number;
  direction: { x: number; y: number };
  timestamp: number;
  target: HTMLElement;
}

export interface SwipeGesture {
  direction: 'left' | 'right' | 'up' | 'down';
  velocity: number;
  distance: number;
  duration: number;
}

export interface PinchGesture {
  scale: number;
  center: { x: number; y: number };
  velocity: number;
}

export interface RotateGesture {
  angle: number;
  center: { x: number; y: number };
  velocity: number;
}

export interface HoverState {
  isHovering: boolean;
  position: { x: number; y: number };
  intensity: number;
  magneticForce: { x: number; y: number };
}

export interface GestureConfig {
  enableMouse: boolean;
  enableTouch: boolean;
  enableKeyboard: boolean;
  enableHover: boolean;
  enableMagnetic: boolean;
  enableHaptics: boolean;
  sensitivity: number;
  threshold: {
    swipe: number;
    pinch: number;
    rotate: number;
    magnetic: number;
  };
  magnetic: {
    strength: number;
    range: number;
    decay: number;
  };
  haptics: {
    intensity: 'light' | 'medium' | 'heavy';
    duration: number;
  };
}

export interface GestureCallbacks {
  onGestureStart?: (event: GestureEvent) => void;
  onGestureMove?: (event: GestureEvent) => void;
  onGestureEnd?: (event: GestureEvent) => void;
  onSwipe?: (gesture: SwipeGesture) => void;
  onPinch?: (gesture: PinchGesture) => void;
  onRotate?: (gesture: RotateGesture) => void;
  onHover?: (state: HoverState) => void;
  onMagneticAttraction?: (force: { x: number; y: number }) => void;
}

/**
 * Default Gesture Configuration
 */
export const DEFAULT_GESTURE_CONFIG: GestureConfig = {
  enableMouse: true,
  enableTouch: true,
  enableKeyboard: true,
  enableHover: true,
  enableMagnetic: true,
  enableHaptics: false,
  sensitivity: 1,
  threshold: {
    swipe: 50,
    pinch: 0.1,
    rotate: 15,
    magnetic: 100,
  },
  magnetic: {
    strength: 0.3,
    range: 150,
    decay: 0.6,
  },
  haptics: {
    intensity: 'light',
    duration: 10,
  },
};

/**
 * Gesture Recognition Engine
 * Handles complex multi-touch gestures and interactions
 */
export class GlassGestureRecognizer {
  private element: HTMLElement;
  private config: GestureConfig;
  private callbacks: GestureCallbacks;
  private isTracking = false;
  private startTime = 0;
  private startPosition: { x: number; y: number } = { x: 0, y: 0 };
  private currentPosition: { x: number; y: number } = { x: 0, y: 0 };
  private velocity: { x: number; y: number } = { x: 0, y: 0 };
  private lastPosition: { x: number; y: number } = { x: 0, y: 0 };
  private lastTime = 0;
  private touches: Map<number, Touch> = new Map();
  private hoverState: HoverState = {
    isHovering: false,
    position: { x: 0, y: 0 },
    intensity: 0,
    magneticForce: { x: 0, y: 0 },
  };

  constructor(
    element: HTMLElement,
    config: GestureConfig,
    callbacks: GestureCallbacks
  ) {
    this.element = element;
    this.config = { ...DEFAULT_GESTURE_CONFIG, ...config };
    this.callbacks = callbacks;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Mouse events
    if (this.config.enableMouse) {
      this.element.addEventListener('mousedown', this.handleMouseDown);
      this.element.addEventListener('mousemove', this.handleMouseMove);
      this.element.addEventListener('mouseup', this.handleMouseUp);
      this.element.addEventListener('mouseleave', this.handleMouseLeave);

      if (this.config.enableHover) {
        this.element.addEventListener('mouseenter', this.handleMouseEnter);
      }
    }

    // Touch events
    if (this.config.enableTouch) {
      this.element.addEventListener('touchstart', this.handleTouchStart, {
        passive: false,
      });
      this.element.addEventListener('touchmove', this.handleTouchMove, {
        passive: false,
      });
      this.element.addEventListener('touchend', this.handleTouchEnd);
      this.element.addEventListener('touchcancel', this.handleTouchCancel);
    }

    // Keyboard events
    if (this.config.enableKeyboard) {
      this.element.addEventListener('keydown', this.handleKeyDown);
      this.element.addEventListener('keyup', this.handleKeyUp);
    }

    // Prevent context menu on long press
    this.element.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  private handleMouseDown = (e: MouseEvent): void => {
    this.startGesture(e.clientX, e.clientY, e.target as HTMLElement);
    this.triggerHaptic('light');
  };

  private handleMouseMove = (e: MouseEvent): void => {
    if (this.config.enableHover) {
      this.updateHoverState(e.clientX, e.clientY);
    }

    if (this.isTracking) {
      this.updateGesture(e.clientX, e.clientY);
    }
  };

  private handleMouseUp = (e: MouseEvent): void => {
    if (this.isTracking) {
      this.endGesture(e.clientX, e.clientY);
    }
  };

  private handleMouseLeave = (): void => {
    if (this.config.enableHover) {
      this.hoverState.isHovering = false;
      this.hoverState.intensity = 0;
      this.hoverState.magneticForce = { x: 0, y: 0 };
      this.callbacks.onHover?.(this.hoverState);
    }

    if (this.isTracking) {
      this.cancelGesture();
    }
  };

  private handleMouseEnter = (): void => {
    if (this.config.enableHover) {
      this.hoverState.isHovering = true;
      this.callbacks.onHover?.(this.hoverState);
    }
  };

  private handleTouchStart = (e: TouchEvent): void => {
    e.preventDefault();

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      if (touch) {
        this.touches.set(touch.identifier, touch);
        this.startGesture(
          touch.clientX,
          touch.clientY,
          e.target as HTMLElement
        );
        this.triggerHaptic('light');
      }
    } else if (e.touches.length === 2) {
      // Handle multi-touch gestures
      this.handleMultiTouch(e.touches);
    }
  };

  private handleTouchMove = (e: TouchEvent): void => {
    e.preventDefault();

    if (e.touches.length === 1 && this.isTracking) {
      const touch = e.touches[0];
      if (touch) {
        this.updateGesture(touch.clientX, touch.clientY);
      }
    } else if (e.touches.length === 2) {
      this.handleMultiTouchMove(e.touches);
    }
  };

  private handleTouchEnd = (e: TouchEvent): void => {
    if (e.changedTouches.length === 1 && this.isTracking) {
      const touch = e.changedTouches[0];
      if (touch) {
        this.touches.delete(touch.identifier);
        this.endGesture(touch.clientX, touch.clientY);
      }
    }
  };

  private handleTouchCancel = (): void => {
    this.touches.clear();
    this.cancelGesture();
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    // Handle keyboard navigation
    const step = 10;
    let deltaX = 0;
    let deltaY = 0;

    switch (e.key) {
      case 'ArrowLeft': {
        deltaX = -step;
        break;
      }
      case 'ArrowRight': {
        deltaX = step;
        break;
      }
      case 'ArrowUp': {
        deltaY = -step;
        break;
      }
      case 'ArrowDown': {
        deltaY = step;
        break;
      }
      case 'Enter':
      case ' ': {
        this.triggerHaptic('medium');
        break;
      }
      default: {
        break;
      }
    }

    e.preventDefault();

    const newPosition = {
      x: this.currentPosition.x + deltaX,
      y: this.currentPosition.y + deltaY,
    };

    this.updateGesture(newPosition.x, newPosition.y);
  };

  private handleKeyUp = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  };

  private startGesture(x: number, y: number, target: HTMLElement): void {
    this.isTracking = true;
    this.startTime = performance.now();
    this.startPosition = { x, y };
    this.currentPosition = { x, y };
    this.lastPosition = { x, y };
    this.lastTime = this.startTime;
    this.velocity = { x: 0, y: 0 };

    const gestureEvent: GestureEvent = {
      type: 'start',
      position: { x, y },
      velocity: { x: 0, y: 0 },
      distance: 0,
      direction: { x: 0, y: 0 },
      timestamp: this.startTime,
      target,
    };

    this.callbacks.onGestureStart?.(gestureEvent);
  }

  private updateGesture(x: number, y: number): void {
    if (!this.isTracking) {
      return;
    }

    const now = performance.now();
    const deltaTime = now - this.lastTime;

    if (deltaTime > 0) {
      const deltaX = x - this.lastPosition.x;
      const deltaY = y - this.lastPosition.y;

      this.velocity = {
        x: (deltaX / deltaTime) * this.config.sensitivity,
        y: (deltaY / deltaTime) * this.config.sensitivity,
      };
    }

    this.currentPosition = { x, y };
    this.lastPosition = { x, y };
    this.lastTime = now;

    const distance = Math.hypot(
      x - this.startPosition.x,
      y - this.startPosition.y
    );

    const direction =
      distance > 0
        ? {
            x: (x - this.startPosition.x) / distance,
            y: (y - this.startPosition.y) / distance,
          }
        : { x: 0, y: 0 };

    const gestureEvent: GestureEvent = {
      type: 'move',
      position: { x, y },
      velocity: this.velocity,
      distance,
      direction,
      timestamp: now,
      target: this.element,
    };

    this.callbacks.onGestureMove?.(gestureEvent);
  }

  private endGesture(x: number, y: number): void {
    if (!this.isTracking) {
      return;
    }

    const now = performance.now();
    const duration = now - this.startTime;
    const distance = Math.hypot(
      x - this.startPosition.x,
      y - this.startPosition.y
    );

    const direction =
      distance > 0
        ? {
            x: (x - this.startPosition.x) / distance,
            y: (y - this.startPosition.y) / distance,
          }
        : { x: 0, y: 0 };

    const gestureEvent: GestureEvent = {
      type: 'end',
      position: { x, y },
      velocity: this.velocity,
      distance,
      direction,
      timestamp: now,
      target: this.element,
    };

    this.callbacks.onGestureEnd?.(gestureEvent);

    // Detect swipe gesture
    if (distance > this.config.threshold.swipe && duration < 500) {
      this.detectSwipe(x, y, duration);
    }

    this.isTracking = false;
    this.triggerHaptic('light');
  }

  private cancelGesture(): void {
    if (!this.isTracking) {
      return;
    }

    const gestureEvent: GestureEvent = {
      type: 'cancel',
      position: this.currentPosition,
      velocity: { x: 0, y: 0 },
      distance: 0,
      direction: { x: 0, y: 0 },
      timestamp: performance.now(),
      target: this.element,
    };

    this.callbacks.onGestureEnd?.(gestureEvent);
    this.isTracking = false;
  }

  private detectSwipe(x: number, y: number, duration: number): void {
    const deltaX = x - this.startPosition.x;
    const deltaY = y - this.startPosition.y;
    const distance = Math.hypot(deltaX, deltaY);
    const velocity = distance / duration;

    let direction: 'left' | 'right' | 'up' | 'down';

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    const swipeGesture: SwipeGesture = {
      direction,
      velocity,
      distance,
      duration,
    };

    this.callbacks.onSwipe?.(swipeGesture);
    this.triggerHaptic('medium');
  }

  private handleMultiTouch(touches: TouchList): void {
    // Handle pinch and rotate gestures
    if (touches.length === 2) {
      const touch1 = touches[0];
      const touch2 = touches[1];

      if (touch1 && touch2) {
        // Store initial touch positions for pinch/rotate detection
        this.touches.set(touch1.identifier, touch1);
        this.touches.set(touch2.identifier, touch2);
      }
    }
  }

  private handleMultiTouchMove(touches: TouchList): void {
    if (touches.length === 2) {
      const touch1 = touches[0];
      const touch2 = touches[1];

      // Calculate pinch scale
      if (touch1 && touch2) {
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        const storedTouch1 = this.touches.get(touch1.identifier);
        const storedTouch2 = this.touches.get(touch2.identifier);

        if (storedTouch1 && storedTouch2) {
          const initialDistance = Math.hypot(
            storedTouch2.clientX - storedTouch1.clientX,
            storedTouch2.clientY - storedTouch1.clientY
          );

          if (initialDistance > 0) {
            const scale = currentDistance / initialDistance;
            const center = {
              x: (touch1.clientX + touch2.clientX) / 2,
              y: (touch1.clientY + touch2.clientY) / 2,
            };

            const pinchGesture: PinchGesture = {
              scale,
              center,
              velocity: Math.abs(scale - 1),
            };

            this.callbacks.onPinch?.(pinchGesture);
          }
        }
      }
    }
  }

  private updateHoverState(x: number, y: number): void {
    if (!this.config.enableHover) {
      return;
    }

    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(x - centerX, y - centerY);

    this.hoverState.position = { x, y };
    this.hoverState.intensity = Math.max(
      0,
      1 - distance / this.config.threshold.magnetic
    );

    // Calculate magnetic force
    if (this.config.enableMagnetic && distance < this.config.magnetic.range) {
      const force = this.calculateMagneticForce(
        x,
        y,
        centerX,
        centerY,
        distance
      );
      this.hoverState.magneticForce = force;
      this.callbacks.onMagneticAttraction?.(force);
    } else {
      this.hoverState.magneticForce = { x: 0, y: 0 };
    }

    this.callbacks.onHover?.(this.hoverState);
  }

  private calculateMagneticForce(
    cursorX: number,
    cursorY: number,
    centerX: number,
    centerY: number,
    distance: number
  ): { x: number; y: number } {
    const { strength, range, decay } = this.config.magnetic;

    if (distance >= range) {
      return { x: 0, y: 0 };
    }

    const normalizedDistance = distance / range;
    const forceMagnitude = strength * (1 - normalizedDistance) ** decay;

    const directionX = (cursorX - centerX) / distance;
    const directionY = (cursorY - centerY) / distance;

    return {
      x: directionX * forceMagnitude * 50,
      y: directionY * forceMagnitude * 50,
    };
  }

  private triggerHaptic(intensity: 'light' | 'medium' | 'heavy'): void {
    if (
      !this.config.enableHaptics ||
      typeof navigator === 'undefined' ||
      !navigator.vibrate
    ) {
      return;
    }

    const patterns = {
      light: 10,
      medium: 20,
      heavy: 50,
    };

    navigator.vibrate(patterns[intensity]);
  }

  updateConfig(config: Partial<GestureConfig>): void {
    this.config = { ...this.config, ...config };
  }

  destroy(): void {
    // Remove all event listeners
    if (this.config.enableMouse) {
      this.element.removeEventListener('mousedown', this.handleMouseDown);
      this.element.removeEventListener('mousemove', this.handleMouseMove);
      this.element.removeEventListener('mouseup', this.handleMouseUp);
      this.element.removeEventListener('mouseleave', this.handleMouseLeave);
      this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    }

    if (this.config.enableTouch) {
      this.element.removeEventListener('touchstart', this.handleTouchStart);
      this.element.removeEventListener('touchmove', this.handleTouchMove);
      this.element.removeEventListener('touchend', this.handleTouchEnd);
      this.element.removeEventListener('touchcancel', this.handleTouchCancel);
    }

    if (this.config.enableKeyboard) {
      this.element.removeEventListener('keydown', this.handleKeyDown);
      this.element.removeEventListener('keyup', this.handleKeyUp);
    }

    this.touches.clear();
  }
}

/**
 * React Hook for Glass Gestures
 * Provides easy access to gesture recognition with haptic feedback
 */
export function useGlassGestures(
  config: Partial<GestureConfig> = {},
  callbacks: GestureCallbacks = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const gestureRecognizerRef = useRef<GlassGestureRecognizer | null>(null);

  const setupGestureRecognizer = useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    // Clean up existing recognizer
    if (gestureRecognizerRef.current) {
      gestureRecognizerRef.current.destroy();
    }

    // Create new recognizer
    gestureRecognizerRef.current = new GlassGestureRecognizer(
      elementRef.current,
      { ...DEFAULT_GESTURE_CONFIG, ...config },
      callbacks
    );
  }, [config, callbacks]);

  useEffect(() => {
    setupGestureRecognizer();

    return () => {
      if (gestureRecognizerRef.current) {
        gestureRecognizerRef.current.destroy();
        gestureRecognizerRef.current = null;
      }
    };
  }, [setupGestureRecognizer]);

  const updateConfig = useCallback((newConfig: Partial<GestureConfig>) => {
    gestureRecognizerRef.current?.updateConfig(newConfig);
  }, []);

  return {
    elementRef,
    gestureRecognizer: gestureRecognizerRef.current,
    updateConfig,
  };
}
