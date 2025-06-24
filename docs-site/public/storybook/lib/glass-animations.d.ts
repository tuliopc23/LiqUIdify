/**
 * Glass Animations - Advanced animation engine for Glass UI
 * GPU-accelerated animations with physics-based motion
 */
export declare const GLASS_EASINGS: {
    smoothOut: string;
    smoothInOut: string;
    anticipate: string;
    elastic: string;
    bounce: string;
    spring: (tension?: number, friction?: number) => string;
    fluid: string;
    magnetic: string;
    gravity: string;
    glassIn: string;
    glassOut: string;
    glassInOut: string;
    liquidFlow: string;
    crystalShatter: string;
};
export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'flip' | 'morph' | 'ripple' | 'wave' | 'dissolve' | 'shatter' | 'liquid' | 'bounce' | 'elastic' | 'glitch' | 'parallax';
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
export declare class GlassAnimation {
    private element;
    private animation;
    private timeline;
    private rafId;
    constructor(element: HTMLElement);
    animate(keyframes: Keyframe[], options: KeyframeAnimationOptions): Animation;
    morphTo(targetPath: string, duration?: number): Animation;
    liquid(amplitude?: number, frequency?: number, duration?: number): Animation;
    shatter(pieces?: number, duration?: number): void;
    ripple(x: number, y: number, color?: string, duration?: number): void;
    wave(amplitude?: number, duration?: number): Animation;
    parallax(speed?: number, axis?: 'y' | 'x'): () => void;
    glitch(intensity?: number, duration?: number): Animation;
    dissolve(duration?: number): Animation;
    private generateRandomClipPath;
    stop(): void;
}
export declare class GlassChoreographer {
    private animations;
    private timeline;
    constructor();
    add(element: HTMLElement): GlassAnimation;
    stagger(elements: HTMLElement[], keyframes: Keyframe[], options: KeyframeAnimationOptions, staggerDelay?: number): void;
    cascade(elements: HTMLElement[], animationType: AnimationType, duration?: number, staggerDelay?: number): void;
    private getKeyframesForType;
    clear(): void;
}
export declare class GlassGestureAnimator {
    private element;
    private animation;
    private gestureHandlers;
    constructor(element: HTMLElement);
    onSwipe(direction: 'left' | 'right' | 'up' | 'down', animationConfig: AnimationConfig): void;
    onPinch(animationConfig: AnimationConfig): void;
    private playAnimation;
    destroy(): void;
}
export declare function createGlassAnimation(element: HTMLElement): GlassAnimation;
export declare function createChoreographer(): GlassChoreographer;
export declare function createGestureAnimator(element: HTMLElement): GlassGestureAnimator;
//# sourceMappingURL=glass-animations.d.ts.map