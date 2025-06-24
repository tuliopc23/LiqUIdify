/**
 * Glass Gestures - Advanced gesture recognition system
 * Multi-touch, 3D touch simulation, and custom gesture creation
 */
export type GestureType = 'tap' | 'doubleTap' | 'longPress' | 'swipe' | 'pan' | 'pinch' | 'rotate' | 'force' | 'edge' | 'multiTap' | 'twoFingerTap' | 'threeFingerTap' | 'fourFingerTap' | 'shake' | 'tilt';
export type SwipeDirection = 'up' | 'down' | 'left' | 'right';
export type EdgeLocation = 'top' | 'bottom' | 'left' | 'right';
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
export declare class GestureRecognizer {
    private element;
    private config;
    private touches;
    private listeners;
    private tapCount;
    private tapTimer;
    private longPressTimer;
    private lastTapTime;
    private isPanning;
    private isLongPressing;
    constructor(element: HTMLElement, config?: GestureConfig);
    private init;
    private handleTouchStart;
    private handleTouchMove;
    private handleTouchEnd;
    private handleTouchCancel;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private handleMouseLeave;
    private handlePointerDown;
    private handlePointerMove;
    private handlePointerUp;
    private handlePointerCancel;
    private detectGestureStart;
    private detectGestureMove;
    private detectGestureEnd;
    private detectPinch;
    private detectRotate;
    private detectEdgeGesture;
    private detectMultiFingerTap;
    private getSwipeDirection;
    private cancelLongPress;
    private resetGestureState;
    private emit;
    on(type: GestureType, handler: (event: any) => void): void;
    off(type: GestureType, handler: (event: any) => void): void;
    destroy(): void;
}
export declare function useGestures(ref: React.RefObject<HTMLElement>, config?: GestureConfig): {
    gestures: GestureEvent[];
    on: (type: GestureType, handler: (event: any) => void) => void;
    off: (type: GestureType, handler: (event: any) => void) => void;
};
export declare class GestureChain {
    private sequence;
    private currentIndex;
    private timeout;
    private timer;
    private onComplete?;
    private onFail?;
    constructor(sequence: GestureType[], timeout?: number);
    addGesture(gesture: GestureType): boolean;
    private complete;
    private fail;
    private reset;
    onCompleteHandler(handler: () => void): this;
    onFailHandler(handler: () => void): this;
}
export declare const GESTURE_PATTERNS: {
    refresh: string[];
    undo: string[];
    redo: string[];
    delete: string[];
    back: string[];
    forward: string[];
    home: string[];
    secretMenu: string[];
    developerMode: string[];
    screenshot: string[];
    appSwitcher: string[];
    preview: string[];
    quickAction: string[];
};
//# sourceMappingURL=glass-gestures.d.ts.map