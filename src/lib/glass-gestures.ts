/**
 * Glass Gestures - Advanced gesture recognition system
 * Multi-touch, 3D touch simulation, and custom gesture creation
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// Gesture types
export type GestureType =
  | 'tap'
  | 'doubleTap'
  | 'longPress'
  | 'swipe'
  | 'pan'
  | 'pinch'
  | 'rotate'
  | 'force'
  | 'edge'
  | 'multiTap'
  | 'twoFingerTap'
  | 'threeFingerTap'
  | 'fourFingerTap'
  | 'shake'
  | 'tilt';

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';
export type EdgeLocation = 'top' | 'bottom' | 'left' | 'right';

// Gesture event interfaces
export interface GestureEvent {
  type: GestureType;
  timestamp: number;
  target: HTMLElement;
  preventDefault: () => void;
  stopPropagation: () => void;
}

export interface TapEvent extends GestureEvent {
  type: 'tap' | 'doubleTap' | 'multiTap';
  x: number;
  y: number;
  tapCount?: number;
}

export interface LongPressEvent extends GestureEvent {
  type: 'longPress';
  x: number;
  y: number;
  duration: number;
}

export interface SwipeEvent extends GestureEvent {
  type: 'swipe';
  direction: SwipeDirection;
  distance: number;
  velocity: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface PanEvent extends GestureEvent {
  type: 'pan';
  deltaX: number;
  deltaY: number;
  x: number;
  y: number;
  velocity: number;
  direction: SwipeDirection;
}

export interface PinchEvent extends GestureEvent {
  type: 'pinch';
  scale: number;
  centerX: number;
  centerY: number;
  velocity: number;
}

export interface RotateEvent extends GestureEvent {
  type: 'rotate';
  angle: number;
  centerX: number;
  centerY: number;
  velocity: number;
}

export interface ForceEvent extends GestureEvent {
  type: 'force';
  force: number;
  x: number;
  y: number;
}

export interface EdgeEvent extends GestureEvent {
  type: 'edge';
  edge: EdgeLocation;
  x: number;
  y: number;
}

// Gesture configuration
export interface GestureConfig {
  tapThreshold?: number;
  doubleTapDelay?: number;
  longPressDelay?: number;
  swipeThreshold?: number;
  swipeVelocityThreshold?: number;
  panThreshold?: number;
  pinchThreshold?: number;
  rotateThreshold?: number;
  forceThreshold?: number;
  edgeThreshold?: number;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

// Default configuration
const DEFAULT_CONFIG: Required<GestureConfig> = {
  tapThreshold: 10,
  doubleTapDelay: 300,
  longPressDelay: 500,
  swipeThreshold: 50,
  swipeVelocityThreshold: 0.3,
  panThreshold: 10,
  pinchThreshold: 0.1,
  rotateThreshold: 0.1,
  forceThreshold: 0.5,
  edgeThreshold: 20,
  preventDefault: false,
  stopPropagation: false,
};

// Touch point tracking
interface TouchPoint {
  id: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startTime: number;
  force?: number;
}

// Gesture recognizer class
export class GestureRecognizer {
  private element: HTMLElement;
  private config: Required<GestureConfig>;
  private touches: Map<number, TouchPoint> = new Map();
  private listeners: Map<GestureType, Set<(event: any) => void>> = new Map();
  private tapCount = 0;
  private tapTimer: number | null = null;
  private longPressTimer: number | null = null;
  private lastTapTime = 0;
  private isPanning = false;
  private isLongPressing = false;

  constructor(element: HTMLElement, config: GestureConfig = {}) {
    this.element = element;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.init();
  }

  private init() {
    // Touch events
    this.element.addEventListener('touchstart', this.handleTouchStart, {
      passive: false,
    });
    this.element.addEventListener('touchmove', this.handleTouchMove, {
      passive: false,
    });
    this.element.addEventListener('touchend', this.handleTouchEnd, {
      passive: false,
    });
    this.element.addEventListener('touchcancel', this.handleTouchCancel, {
      passive: false,
    });

    // Mouse events (for desktop)
    this.element.addEventListener('mousedown', this.handleMouseDown, {
      passive: false,
    });
    this.element.addEventListener('mousemove', this.handleMouseMove, {
      passive: false,
    });
    this.element.addEventListener('mouseup', this.handleMouseUp, {
      passive: false,
    });
    this.element.addEventListener('mouseleave', this.handleMouseLeave, {
      passive: false,
    });

    // Pointer events (for better cross-platform support)
    if ('PointerEvent' in window) {
      this.element.addEventListener('pointerdown', this.handlePointerDown, {
        passive: false,
      });
      this.element.addEventListener('pointermove', this.handlePointerMove, {
        passive: false,
      });
      this.element.addEventListener('pointerup', this.handlePointerUp, {
        passive: false,
      });
      this.element.addEventListener('pointercancel', this.handlePointerCancel, {
        passive: false,
      });
    }
  }

  // Touch event handlers
  private handleTouchStart = (e: TouchEvent) => {
    if (this.config.preventDefault) e.preventDefault();
    if (this.config.stopPropagation) e.stopPropagation();

    Array.from(e.changedTouches).forEach(touch => {
      this.touches.set(touch.identifier, {
        id: touch.identifier,
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        startTime: Date.now(),
        force: (touch as any).force || 0,
      });
    });

    this.detectGestureStart();
  };

  private handleTouchMove = (e: TouchEvent) => {
    if (this.config.preventDefault) e.preventDefault();
    if (this.config.stopPropagation) e.stopPropagation();

    Array.from(e.changedTouches).forEach(touch => {
      const point = this.touches.get(touch.identifier);
      if (point) {
        point.currentX = touch.clientX;
        point.currentY = touch.clientY;
        point.force = (touch as any).force || 0;
      }
    });

    this.detectGestureMove();
  };

  private handleTouchEnd = (e: TouchEvent) => {
    if (this.config.preventDefault) e.preventDefault();
    if (this.config.stopPropagation) e.stopPropagation();

    Array.from(e.changedTouches).forEach(touch => {
      const point = this.touches.get(touch.identifier);
      if (point) {
        this.detectGestureEnd(point);
        this.touches.delete(touch.identifier);
      }
    });
  };

  private handleTouchCancel = (e: TouchEvent) => {
    Array.from(e.changedTouches).forEach(touch => {
      this.touches.delete(touch.identifier);
    });
    this.resetGestureState();
  };

  // Mouse event handlers (simplified touch simulation)
  private handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return; // Only left click

    this.touches.set(-1, {
      id: -1,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      startTime: Date.now(),
    });

    this.detectGestureStart();
  };

  private handleMouseMove = (e: MouseEvent) => {
    const point = this.touches.get(-1);
    if (point) {
      point.currentX = e.clientX;
      point.currentY = e.clientY;
      this.detectGestureMove();
    }
  };

  private handleMouseUp = (_e: MouseEvent) => {
    const point = this.touches.get(-1);
    if (point) {
      this.detectGestureEnd(point);
      this.touches.delete(-1);
    }
  };

  private handleMouseLeave = (_e: MouseEvent) => {
    this.touches.delete(-1);
    this.resetGestureState();
  };

  // Pointer event handlers
  private handlePointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    this.touches.set(e.pointerId, {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      startTime: Date.now(),
      force: e.pressure,
    });

    this.detectGestureStart();
  };

  private handlePointerMove = (e: PointerEvent) => {
    const point = this.touches.get(e.pointerId);
    if (point) {
      point.currentX = e.clientX;
      point.currentY = e.clientY;
      point.force = e.pressure;
      this.detectGestureMove();
    }
  };

  private handlePointerUp = (e: PointerEvent) => {
    const point = this.touches.get(e.pointerId);
    if (point) {
      this.detectGestureEnd(point);
      this.touches.delete(e.pointerId);
    }
  };

  private handlePointerCancel = (e: PointerEvent) => {
    this.touches.delete(e.pointerId);
    this.resetGestureState();
  };

  // Gesture detection
  private detectGestureStart() {
    const touchCount = this.touches.size;

    if (touchCount === 1) {
      // Start long press timer
      this.longPressTimer = window.setTimeout(() => {
        const point = Array.from(this.touches.values())[0];
        if (point && !this.isPanning) {
          this.isLongPressing = true;
          this.emit('longPress', {
            type: 'longPress',
            x: point.currentX,
            y: point.currentY,
            duration: Date.now() - point.startTime,
            timestamp: Date.now(),
            target: this.element,
            preventDefault: () => {},
            stopPropagation: () => {},
          } as LongPressEvent);
        }
      }, this.config.longPressDelay);

      // Check for edge gesture
      const point = Array.from(this.touches.values())[0];
      this.detectEdgeGesture(point);
    } else if (touchCount === 2) {
      // Cancel single touch gestures
      this.cancelLongPress();
    }

    // Detect multi-finger tap
    if (touchCount > 1) {
      this.detectMultiFingerTap(touchCount);
    }
  }

  private detectGestureMove() {
    const touchCount = this.touches.size;

    if (touchCount === 1) {
      const point = Array.from(this.touches.values())[0];
      const deltaX = point.currentX - point.startX;
      const deltaY = point.currentY - point.startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Cancel long press if moved too much
      if (distance > this.config.tapThreshold) {
        this.cancelLongPress();
      }

      // Detect pan
      if (distance > this.config.panThreshold && !this.isLongPressing) {
        this.isPanning = true;
        const velocity = distance / (Date.now() - point.startTime);
        const direction = this.getSwipeDirection(deltaX, deltaY);

        this.emit('pan', {
          type: 'pan',
          deltaX,
          deltaY,
          x: point.currentX,
          y: point.currentY,
          velocity,
          direction,
          timestamp: Date.now(),
          target: this.element,
          preventDefault: () => {},
          stopPropagation: () => {},
        } as PanEvent);
      }

      // Detect force touch
      if (point.force && point.force > this.config.forceThreshold) {
        this.emit('force', {
          type: 'force',
          force: point.force,
          x: point.currentX,
          y: point.currentY,
          timestamp: Date.now(),
          target: this.element,
          preventDefault: () => {},
          stopPropagation: () => {},
        } as ForceEvent);
      }
    } else if (touchCount === 2) {
      // Detect pinch and rotate
      const points = Array.from(this.touches.values());
      this.detectPinch(points[0], points[1]);
      this.detectRotate(points[0], points[1]);
    }
  }

  private detectGestureEnd(point: TouchPoint) {
    const deltaX = point.currentX - point.startX;
    const deltaY = point.currentY - point.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = Date.now() - point.startTime;
    const velocity = distance / duration;

    // Cancel timers
    this.cancelLongPress();

    if (
      !this.isPanning &&
      !this.isLongPressing &&
      distance < this.config.tapThreshold
    ) {
      // Detect tap or double tap
      const now = Date.now();

      if (now - this.lastTapTime < this.config.doubleTapDelay) {
        this.tapCount++;
      } else {
        this.tapCount = 1;
      }

      this.lastTapTime = now;

      // Clear previous tap timer
      if (this.tapTimer) {
        clearTimeout(this.tapTimer);
      }

      // Set new tap timer
      this.tapTimer = window.setTimeout(() => {
        if (this.tapCount === 1) {
          this.emit('tap', {
            type: 'tap',
            x: point.currentX,
            y: point.currentY,
            timestamp: Date.now(),
            target: this.element,
            preventDefault: () => {},
            stopPropagation: () => {},
          } as TapEvent);
        } else if (this.tapCount === 2) {
          this.emit('doubleTap', {
            type: 'doubleTap',
            x: point.currentX,
            y: point.currentY,
            timestamp: Date.now(),
            target: this.element,
            preventDefault: () => {},
            stopPropagation: () => {},
          } as TapEvent);
        } else {
          this.emit('multiTap', {
            type: 'multiTap',
            x: point.currentX,
            y: point.currentY,
            tapCount: this.tapCount,
            timestamp: Date.now(),
            target: this.element,
            preventDefault: () => {},
            stopPropagation: () => {},
          } as TapEvent);
        }

        this.tapCount = 0;
      }, this.config.doubleTapDelay);
    } else if (
      distance > this.config.swipeThreshold &&
      velocity > this.config.swipeVelocityThreshold
    ) {
      // Detect swipe
      const direction = this.getSwipeDirection(deltaX, deltaY);

      this.emit('swipe', {
        type: 'swipe',
        direction,
        distance,
        velocity,
        startX: point.startX,
        startY: point.startY,
        endX: point.currentX,
        endY: point.currentY,
        timestamp: Date.now(),
        target: this.element,
        preventDefault: () => {},
        stopPropagation: () => {},
      } as SwipeEvent);
    }

    // Reset state
    this.isPanning = false;
    this.isLongPressing = false;
  }

  private detectPinch(point1: TouchPoint, point2: TouchPoint) {
    const startDistance = Math.sqrt(
      Math.pow(point2.startX - point1.startX, 2) +
        Math.pow(point2.startY - point1.startY, 2)
    );

    const currentDistance = Math.sqrt(
      Math.pow(point2.currentX - point1.currentX, 2) +
        Math.pow(point2.currentY - point1.currentY, 2)
    );

    const scale = currentDistance / startDistance;
    const centerX = (point1.currentX + point2.currentX) / 2;
    const centerY = (point1.currentY + point2.currentY) / 2;
    const velocity =
      Math.abs(scale - 1) /
      (Date.now() - Math.max(point1.startTime, point2.startTime));

    if (Math.abs(scale - 1) > this.config.pinchThreshold) {
      this.emit('pinch', {
        type: 'pinch',
        scale,
        centerX,
        centerY,
        velocity,
        timestamp: Date.now(),
        target: this.element,
        preventDefault: () => {},
        stopPropagation: () => {},
      } as PinchEvent);
    }
  }

  private detectRotate(point1: TouchPoint, point2: TouchPoint) {
    const startAngle = Math.atan2(
      point2.startY - point1.startY,
      point2.startX - point1.startX
    );

    const currentAngle = Math.atan2(
      point2.currentY - point1.currentY,
      point2.currentX - point1.currentX
    );

    let angle = (currentAngle - startAngle) * (180 / Math.PI);

    // Normalize angle to -180 to 180
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;

    const centerX = (point1.currentX + point2.currentX) / 2;
    const centerY = (point1.currentY + point2.currentY) / 2;
    const velocity =
      Math.abs(angle) /
      (Date.now() - Math.max(point1.startTime, point2.startTime));

    if (Math.abs(angle) > this.config.rotateThreshold) {
      this.emit('rotate', {
        type: 'rotate',
        angle,
        centerX,
        centerY,
        velocity,
        timestamp: Date.now(),
        target: this.element,
        preventDefault: () => {},
        stopPropagation: () => {},
      } as RotateEvent);
    }
  }

  private detectEdgeGesture(point: TouchPoint) {
    const rect = this.element.getBoundingClientRect();
    const threshold = this.config.edgeThreshold;

    let edge: EdgeLocation | null = null;

    if (point.startX - rect.left < threshold) edge = 'left';
    else if (rect.right - point.startX < threshold) edge = 'right';
    else if (point.startY - rect.top < threshold) edge = 'top';
    else if (rect.bottom - point.startY < threshold) edge = 'bottom';

    if (edge) {
      this.emit('edge', {
        type: 'edge',
        edge,
        x: point.startX,
        y: point.startY,
        timestamp: Date.now(),
        target: this.element,
        preventDefault: () => {},
        stopPropagation: () => {},
      } as EdgeEvent);
    }
  }

  private detectMultiFingerTap(fingerCount: number) {
    const eventType = `${fingerCount}FingerTap` as GestureType;

    if (this.listeners.has(eventType)) {
      this.emit(eventType, {
        type: eventType,
        timestamp: Date.now(),
        target: this.element,
        preventDefault: () => {},
        stopPropagation: () => {},
      } as GestureEvent);
    }
  }

  private getSwipeDirection(deltaX: number, deltaY: number): SwipeDirection {
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > absY) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }

  private cancelLongPress() {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  private resetGestureState() {
    this.cancelLongPress();
    this.isPanning = false;
    this.isLongPressing = false;
    this.tapCount = 0;

    if (this.tapTimer) {
      clearTimeout(this.tapTimer);
      this.tapTimer = null;
    }
  }

  // Event emitter
  private emit(type: GestureType, event: any) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.forEach(listener => listener(event));
    }
  }

  // Public API
  on(type: GestureType, handler: (event: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(handler);
  }

  off(type: GestureType, handler: (event: any) => void) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.delete(handler);
    }
  }

  destroy() {
    // Remove event listeners
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
    this.element.removeEventListener('touchcancel', this.handleTouchCancel);

    this.element.removeEventListener('mousedown', this.handleMouseDown);
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    this.element.removeEventListener('mouseup', this.handleMouseUp);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);

    if ('PointerEvent' in window) {
      this.element.removeEventListener('pointerdown', this.handlePointerDown);
      this.element.removeEventListener('pointermove', this.handlePointerMove);
      this.element.removeEventListener('pointerup', this.handlePointerUp);
      this.element.removeEventListener(
        'pointercancel',
        this.handlePointerCancel
      );
    }

    // Clear state
    this.touches.clear();
    this.listeners.clear();
    this.resetGestureState();
  }
}

// React hook for gesture recognition
export function useGestures(
  ref: React.RefObject<HTMLElement>,
  config?: GestureConfig
) {
  const [gestures, setGestures] = useState<GestureEvent[]>([]);
  const recognizerRef = useRef<GestureRecognizer | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const recognizer = new GestureRecognizer(ref.current, config);
    recognizerRef.current = recognizer;

    // Add listeners for all gesture types
    const gestureTypes: GestureType[] = [
      'tap',
      'doubleTap',
      'longPress',
      'swipe',
      'pan',
      'pinch',
      'rotate',
      'force',
      'edge',
      'multiTap',
      'twoFingerTap',
      'threeFingerTap',
      'fourFingerTap',
    ];

    gestureTypes.forEach(type => {
      recognizer.on(type, event => {
        setGestures(prev => [...prev.slice(-9), event]);
      });
    });

    return () => {
      recognizer.destroy();
    };
  }, [ref, config]);

  const on = useCallback((type: GestureType, handler: (event: any) => void) => {
    recognizerRef.current?.on(type, handler);
  }, []);

  const off = useCallback(
    (type: GestureType, handler: (event: any) => void) => {
      recognizerRef.current?.off(type, handler);
    },
    []
  );

  return { gestures, on, off };
}

// Gesture chaining for complex interactions
export class GestureChain {
  private sequence: GestureType[] = [];
  private currentIndex = 0;
  private timeout: number;
  private timer: number | null = null;
  private onComplete?: () => void;
  private onFail?: () => void;

  constructor(sequence: GestureType[], timeout = 2000) {
    this.sequence = sequence;
    this.timeout = timeout;
  }

  addGesture(gesture: GestureType): boolean {
    if (this.currentIndex >= this.sequence.length) {
      this.fail();
      return false;
    }

    if (gesture === this.sequence[this.currentIndex]) {
      this.currentIndex++;

      // Reset timer
      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (this.currentIndex === this.sequence.length) {
        // Sequence complete
        this.complete();
        return true;
      } else {
        // Wait for next gesture
        this.timer = window.setTimeout(() => this.fail(), this.timeout);
      }
    } else {
      // Wrong gesture
      this.fail();
      return false;
    }

    return false;
  }

  private complete() {
    this.reset();
    this.onComplete?.();
  }

  private fail() {
    this.reset();
    this.onFail?.();
  }

  private reset() {
    this.currentIndex = 0;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onCompleteHandler(handler: () => void) {
    this.onComplete = handler;
    return this;
  }

  onFailHandler(handler: () => void) {
    this.onFail = handler;
    return this;
  }
}

// Preset gesture patterns
export const GESTURE_PATTERNS = {
  // Common patterns
  refresh: ['swipe:down', 'swipe:down'],
  undo: ['swipe:left', 'tap'],
  redo: ['swipe:right', 'tap'],
  delete: ['longPress', 'swipe:left'],

  // Navigation patterns
  back: ['edge:left', 'swipe:right'],
  forward: ['edge:right', 'swipe:left'],
  home: ['doubleTap', 'doubleTap'],

  // Advanced patterns
  secretMenu: ['tap', 'tap', 'longPress', 'tap'],
  developerMode: ['tap', 'tap', 'tap', 'tap', 'tap', 'tap', 'tap'],

  // Multi-finger patterns
  screenshot: ['threeFingerTap'],
  appSwitcher: ['fourFingerTap'],

  // Force touch patterns
  preview: ['force'],
  quickAction: ['force', 'swipe:up'],
};
