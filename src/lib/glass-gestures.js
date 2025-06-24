/**
 * Glass Gestures - Advanced gesture recognition system
 * Multi-touch, 3D touch simulation, and custom gesture creation
 */
import { useCallback, useEffect, useRef, useState } from 'react';
// Default configuration
const DEFAULT_CONFIG = {
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
// Gesture recognizer class
export class GestureRecognizer {
    constructor(element, config = {}) {
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "touches", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "tapCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "tapTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "longPressTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "lastTapTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "isPanning", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "isLongPressing", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        // Touch event handlers
        Object.defineProperty(this, "handleTouchStart", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (this.config.preventDefault)
                    e.preventDefault();
                if (this.config.stopPropagation)
                    e.stopPropagation();
                Array.from(e.changedTouches).forEach(touch => {
                    this.touches.set(touch.identifier, {
                        id: touch.identifier,
                        startX: touch.clientX,
                        startY: touch.clientY,
                        currentX: touch.clientX,
                        currentY: touch.clientY,
                        startTime: Date.now(),
                        force: touch.force || 0,
                    });
                });
                this.detectGestureStart();
            }
        });
        Object.defineProperty(this, "handleTouchMove", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (this.config.preventDefault)
                    e.preventDefault();
                if (this.config.stopPropagation)
                    e.stopPropagation();
                Array.from(e.changedTouches).forEach(touch => {
                    const point = this.touches.get(touch.identifier);
                    if (point) {
                        point.currentX = touch.clientX;
                        point.currentY = touch.clientY;
                        point.force = touch.force || 0;
                    }
                });
                this.detectGestureMove();
            }
        });
        Object.defineProperty(this, "handleTouchEnd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (this.config.preventDefault)
                    e.preventDefault();
                if (this.config.stopPropagation)
                    e.stopPropagation();
                Array.from(e.changedTouches).forEach(touch => {
                    const point = this.touches.get(touch.identifier);
                    if (point) {
                        this.detectGestureEnd(point);
                        this.touches.delete(touch.identifier);
                    }
                });
            }
        });
        Object.defineProperty(this, "handleTouchCancel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                Array.from(e.changedTouches).forEach(touch => {
                    this.touches.delete(touch.identifier);
                });
                this.resetGestureState();
            }
        });
        // Mouse event handlers (simplified touch simulation)
        Object.defineProperty(this, "handleMouseDown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (e.button !== 0)
                    return; // Only left click
                this.touches.set(-1, {
                    id: -1,
                    startX: e.clientX,
                    startY: e.clientY,
                    currentX: e.clientX,
                    currentY: e.clientY,
                    startTime: Date.now(),
                });
                this.detectGestureStart();
            }
        });
        Object.defineProperty(this, "handleMouseMove", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                const point = this.touches.get(-1);
                if (point) {
                    point.currentX = e.clientX;
                    point.currentY = e.clientY;
                    this.detectGestureMove();
                }
            }
        });
        Object.defineProperty(this, "handleMouseUp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                const point = this.touches.get(-1);
                if (point) {
                    this.detectGestureEnd(point);
                    this.touches.delete(-1);
                }
            }
        });
        Object.defineProperty(this, "handleMouseLeave", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                this.touches.delete(-1);
                this.resetGestureState();
            }
        });
        // Pointer event handlers
        Object.defineProperty(this, "handlePointerDown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (e.pointerType === 'mouse' && e.button !== 0)
                    return;
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
            }
        });
        Object.defineProperty(this, "handlePointerMove", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                const point = this.touches.get(e.pointerId);
                if (point) {
                    point.currentX = e.clientX;
                    point.currentY = e.clientY;
                    point.force = e.pressure;
                    this.detectGestureMove();
                }
            }
        });
        Object.defineProperty(this, "handlePointerUp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                const point = this.touches.get(e.pointerId);
                if (point) {
                    this.detectGestureEnd(point);
                    this.touches.delete(e.pointerId);
                }
            }
        });
        Object.defineProperty(this, "handlePointerCancel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                this.touches.delete(e.pointerId);
                this.resetGestureState();
            }
        });
        this.element = element;
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.init();
    }
    init() {
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
    // Gesture detection
    detectGestureStart() {
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
                        preventDefault: () => { },
                        stopPropagation: () => { },
                    });
                }
            }, this.config.longPressDelay);
            // Check for edge gesture
            const point = Array.from(this.touches.values())[0];
            this.detectEdgeGesture(point);
        }
        else if (touchCount === 2) {
            // Cancel single touch gestures
            this.cancelLongPress();
        }
        // Detect multi-finger tap
        if (touchCount > 1) {
            this.detectMultiFingerTap(touchCount);
        }
    }
    detectGestureMove() {
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
                    preventDefault: () => { },
                    stopPropagation: () => { },
                });
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
                    preventDefault: () => { },
                    stopPropagation: () => { },
                });
            }
        }
        else if (touchCount === 2) {
            // Detect pinch and rotate
            const points = Array.from(this.touches.values());
            this.detectPinch(points[0], points[1]);
            this.detectRotate(points[0], points[1]);
        }
    }
    detectGestureEnd(point) {
        const deltaX = point.currentX - point.startX;
        const deltaY = point.currentY - point.startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const duration = Date.now() - point.startTime;
        const velocity = distance / duration;
        // Cancel timers
        this.cancelLongPress();
        if (!this.isPanning &&
            !this.isLongPressing &&
            distance < this.config.tapThreshold) {
            // Detect tap or double tap
            const now = Date.now();
            if (now - this.lastTapTime < this.config.doubleTapDelay) {
                this.tapCount++;
            }
            else {
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
                        preventDefault: () => { },
                        stopPropagation: () => { },
                    });
                }
                else if (this.tapCount === 2) {
                    this.emit('doubleTap', {
                        type: 'doubleTap',
                        x: point.currentX,
                        y: point.currentY,
                        timestamp: Date.now(),
                        target: this.element,
                        preventDefault: () => { },
                        stopPropagation: () => { },
                    });
                }
                else {
                    this.emit('multiTap', {
                        type: 'multiTap',
                        x: point.currentX,
                        y: point.currentY,
                        tapCount: this.tapCount,
                        timestamp: Date.now(),
                        target: this.element,
                        preventDefault: () => { },
                        stopPropagation: () => { },
                    });
                }
                this.tapCount = 0;
            }, this.config.doubleTapDelay);
        }
        else if (distance > this.config.swipeThreshold &&
            velocity > this.config.swipeVelocityThreshold) {
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
                preventDefault: () => { },
                stopPropagation: () => { },
            });
        }
        // Reset state
        this.isPanning = false;
        this.isLongPressing = false;
    }
    detectPinch(point1, point2) {
        const startDistance = Math.sqrt(Math.pow(point2.startX - point1.startX, 2) +
            Math.pow(point2.startY - point1.startY, 2));
        const currentDistance = Math.sqrt(Math.pow(point2.currentX - point1.currentX, 2) +
            Math.pow(point2.currentY - point1.currentY, 2));
        const scale = currentDistance / startDistance;
        const centerX = (point1.currentX + point2.currentX) / 2;
        const centerY = (point1.currentY + point2.currentY) / 2;
        const velocity = Math.abs(scale - 1) /
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
                preventDefault: () => { },
                stopPropagation: () => { },
            });
        }
    }
    detectRotate(point1, point2) {
        const startAngle = Math.atan2(point2.startY - point1.startY, point2.startX - point1.startX);
        const currentAngle = Math.atan2(point2.currentY - point1.currentY, point2.currentX - point1.currentX);
        let angle = (currentAngle - startAngle) * (180 / Math.PI);
        // Normalize angle to -180 to 180
        if (angle > 180)
            angle -= 360;
        if (angle < -180)
            angle += 360;
        const centerX = (point1.currentX + point2.currentX) / 2;
        const centerY = (point1.currentY + point2.currentY) / 2;
        const velocity = Math.abs(angle) /
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
                preventDefault: () => { },
                stopPropagation: () => { },
            });
        }
    }
    detectEdgeGesture(point) {
        const rect = this.element.getBoundingClientRect();
        const threshold = this.config.edgeThreshold;
        let edge = null;
        if (point.startX - rect.left < threshold)
            edge = 'left';
        else if (rect.right - point.startX < threshold)
            edge = 'right';
        else if (point.startY - rect.top < threshold)
            edge = 'top';
        else if (rect.bottom - point.startY < threshold)
            edge = 'bottom';
        if (edge) {
            this.emit('edge', {
                type: 'edge',
                edge,
                x: point.startX,
                y: point.startY,
                timestamp: Date.now(),
                target: this.element,
                preventDefault: () => { },
                stopPropagation: () => { },
            });
        }
    }
    detectMultiFingerTap(fingerCount) {
        const eventType = `${fingerCount}FingerTap`;
        if (this.listeners.has(eventType)) {
            this.emit(eventType, {
                type: eventType,
                timestamp: Date.now(),
                target: this.element,
                preventDefault: () => { },
                stopPropagation: () => { },
            });
        }
    }
    getSwipeDirection(deltaX, deltaY) {
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        if (absX > absY) {
            return deltaX > 0 ? 'right' : 'left';
        }
        else {
            return deltaY > 0 ? 'down' : 'up';
        }
    }
    cancelLongPress() {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
    }
    resetGestureState() {
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
    emit(type, event) {
        const listeners = this.listeners.get(type);
        if (listeners) {
            listeners.forEach(listener => listener(event));
        }
    }
    // Public API
    on(type, handler) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, new Set());
        }
        this.listeners.get(type).add(handler);
    }
    off(type, handler) {
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
            this.element.removeEventListener('pointercancel', this.handlePointerCancel);
        }
        // Clear state
        this.touches.clear();
        this.listeners.clear();
        this.resetGestureState();
    }
}
// React hook for gesture recognition
export function useGestures(ref, config) {
    const [gestures, setGestures] = useState([]);
    const recognizerRef = useRef();
    useEffect(() => {
        if (!ref.current)
            return;
        const recognizer = new GestureRecognizer(ref.current, config);
        recognizerRef.current = recognizer;
        // Add listeners for all gesture types
        const gestureTypes = [
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
    const on = useCallback((type, handler) => {
        recognizerRef.current?.on(type, handler);
    }, []);
    const off = useCallback((type, handler) => {
        recognizerRef.current?.off(type, handler);
    }, []);
    return { gestures, on, off };
}
// Gesture chaining for complex interactions
export class GestureChain {
    constructor(sequence, timeout = 2000) {
        Object.defineProperty(this, "sequence", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "currentIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "onComplete", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onFail", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.sequence = sequence;
        this.timeout = timeout;
    }
    addGesture(gesture) {
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
            }
            else {
                // Wait for next gesture
                this.timer = window.setTimeout(() => this.fail(), this.timeout);
            }
        }
        else {
            // Wrong gesture
            this.fail();
            return false;
        }
        return false;
    }
    complete() {
        this.reset();
        this.onComplete?.();
    }
    fail() {
        this.reset();
        this.onFail?.();
    }
    reset() {
        this.currentIndex = 0;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    onCompleteHandler(handler) {
        this.onComplete = handler;
        return this;
    }
    onFailHandler(handler) {
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
