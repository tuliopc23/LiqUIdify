import { default as React, ReactNode } from '../../node_modules/react';
/**
 * useHapticFeedback - Advanced haptic feedback hook
 * Provides vibration patterns, audio feedback, and visual feedback coordination
 */
export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection' | 'impact' | 'notification';
export declare const HAPTIC_PATTERNS: {
    light: number[];
    medium: number[];
    heavy: number[];
    success: number[];
    warning: number[];
    error: number[];
    selection: number[];
    impact: number[];
    notification: number[];
};
export interface AudioFeedbackConfig {
    enabled?: boolean;
    volume?: number;
    sounds?: {
        [_key in HapticType]?: string;
    };
}
export interface VisualFeedbackConfig {
    enabled?: boolean;
    duration?: number;
    scale?: number;
    opacity?: number;
    blur?: number;
    color?: string;
}
export interface HapticFeedbackConfig {
    vibration?: boolean;
    audio?: AudioFeedbackConfig;
    visual?: VisualFeedbackConfig;
    intensity?: number;
    customPatterns?: {
        [key: string]: number[];
    };
}
export declare function useHapticFeedback(config?: HapticFeedbackConfig): {
    trigger: (type: HapticType, element?: HTMLElement | null) => void;
    vibrate: (pattern: number[]) => void;
    playAudio: (type: HapticType) => void;
    applyVisual: (element: HTMLElement | null, type: HapticType) => void;
    createPattern: (name: string, pattern: number[]) => void;
    patterns: {
        light: number[];
        medium: number[];
        heavy: number[];
        success: number[];
        warning: number[];
        error: number[];
        selection: number[];
        impact: number[];
        notification: number[];
    };
};
interface HapticContextValue {
    config: HapticFeedbackConfig;
    trigger: (_type: HapticType, _element?: HTMLElement | null) => void;
}
export declare function HapticProvider({ children, config, }: {
    children: ReactNode;
    config?: HapticFeedbackConfig;
}): import("react/jsx-runtime").JSX.Element;
export declare function useHaptic(): HapticContextValue;
export declare function useHapticFeedbackIntegration<T extends HTMLElement = HTMLElement>(ref: React.RefObject<T>, type?: HapticType, config?: HapticFeedbackConfig): void;
export {};
//# sourceMappingURL=use-haptic-feedback.d.ts.map