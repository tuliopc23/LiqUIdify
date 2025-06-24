import { jsx as _jsx } from "react/jsx-runtime";
/**
 * useHapticFeedback - Advanced haptic feedback hook
 * Provides vibration patterns, audio feedback, and visual feedback coordination
 */
import { useCallback, useEffect, useRef } from 'react';
// Vibration patterns (in milliseconds)
export const HAPTIC_PATTERNS = {
    light: [10],
    medium: [20],
    heavy: [30],
    success: [10, 50, 10],
    warning: [20, 40, 20, 40, 20],
    error: [50, 100, 50],
    selection: [5],
    impact: [15, 10, 15],
    notification: [25, 50, 25, 50, 25, 50],
};
// Default configuration
const DEFAULT_CONFIG = {
    vibration: true,
    audio: {
        enabled: false,
        volume: 0.5,
        sounds: {},
    },
    visual: {
        enabled: true,
        duration: 200,
        scale: 0.95,
        opacity: 0.8,
        blur: 0,
        color: 'rgba(255, 255, 255, 0.2)',
    },
    intensity: 1,
    customPatterns: {},
};
// Audio context for sound generation
let audioContext = null;
// Initialize audio context
function initAudioContext() {
    if (!audioContext &&
        typeof window !== 'undefined' &&
        'AudioContext' in window) {
        audioContext = new AudioContext();
    }
    return audioContext;
}
// Generate synthetic sound
function generateSound(type, volume) {
    const ctx = initAudioContext();
    if (!ctx)
        return;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    // Configure sound based on type
    switch (type) {
        case 'light':
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = volume * 0.1;
            break;
        case 'medium':
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.value = volume * 0.2;
            break;
        case 'heavy':
            oscillator.frequency.value = 400;
            oscillator.type = 'square';
            gainNode.gain.value = volume * 0.3;
            break;
        case 'success':
            oscillator.frequency.value = 880;
            oscillator.type = 'sine';
            gainNode.gain.value = volume * 0.2;
            // Frequency sweep up
            oscillator.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
            break;
        case 'warning':
            oscillator.frequency.value = 440;
            oscillator.type = 'triangle';
            gainNode.gain.value = volume * 0.25;
            break;
        case 'error':
            oscillator.frequency.value = 220;
            oscillator.type = 'sawtooth';
            gainNode.gain.value = volume * 0.3;
            break;
        case 'selection':
            oscillator.frequency.value = 1000;
            oscillator.type = 'sine';
            gainNode.gain.value = volume * 0.05;
            break;
        case 'impact':
            oscillator.frequency.value = 150;
            oscillator.type = 'square';
            gainNode.gain.value = volume * 0.4;
            break;
        case 'notification':
            oscillator.frequency.value = 660;
            oscillator.type = 'sine';
            gainNode.gain.value = volume * 0.15;
            // Create notification melody
            oscillator.frequency.setValueAtTime(660, ctx.currentTime);
            oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(660, ctx.currentTime + 0.2);
            break;
    }
    // Envelope
    gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
}
// Visual feedback animation
function applyVisualFeedback(element, config) {
    if (!config.enabled)
        return () => { };
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;
    const originalFilter = element.style.filter;
    // Create overlay for color feedback
    const overlay = document.createElement('div');
    overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${config.color};
    pointer-events: none;
    opacity: 0;
    transition: opacity ${config.duration}ms ease-out;
    border-radius: inherit;
  `;
    element.style.position = 'relative';
    element.appendChild(overlay);
    // Apply transformations
    element.style.transition = `transform ${config.duration}ms ease-out, filter ${config.duration}ms ease-out`;
    element.style.transform = `${originalTransform} scale(${config.scale})`;
    if (config.blur && config.blur > 0) {
        element.style.filter = `${originalFilter} blur(${config.blur}px)`;
    }
    // Trigger overlay animation
    requestAnimationFrame(() => {
        overlay.style.opacity = config.opacity?.toString() || '1';
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, config.duration / 2);
    });
    // Restore original state
    const cleanup = setTimeout(() => {
        element.style.transform = originalTransform;
        element.style.filter = originalFilter;
        setTimeout(() => {
            element.style.transition = originalTransition;
            overlay.remove();
        }, config.duration);
    }, 50);
    return () => {
        clearTimeout(cleanup);
        element.style.transform = originalTransform;
        element.style.transition = originalTransition;
        element.style.filter = originalFilter;
        overlay.remove();
    };
}
// Haptic feedback hook
export function useHapticFeedback(config = {}) {
    const configRef = useRef({
        ...DEFAULT_CONFIG,
        ...config,
    });
    const audioCache = useRef(new Map());
    const cleanupRef = useRef(null);
    // Update config
    useEffect(() => {
        configRef.current = { ...DEFAULT_CONFIG, ...config };
    }, [config]);
    // Load audio files
    useEffect(() => {
        if (!configRef.current.audio?.enabled || !configRef.current.audio.sounds)
            return;
        const loadAudio = async (url) => {
            try {
                const ctx = initAudioContext();
                if (!ctx)
                    return null;
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                return await ctx.decodeAudioData(arrayBuffer);
            }
            catch (error) {
                console.error('Failed to load audio:', url, error);
                return null;
            }
        };
        // Load all audio files
        Object.entries(configRef.current.audio.sounds).forEach(async ([_type, url]) => {
            if (url && !audioCache.current.has(url)) {
                const buffer = await loadAudio(url);
                if (buffer) {
                    audioCache.current.set(url, buffer);
                }
            }
        });
    }, []);
    // Trigger vibration
    const vibrate = useCallback((pattern) => {
        if (!configRef.current.vibration || !('vibrate' in navigator))
            return;
        const scaledPattern = pattern.map(duration => Math.round(duration * (configRef.current.intensity || 1)));
        navigator.vibrate(scaledPattern);
    }, []);
    // Play audio feedback
    const playAudio = useCallback((type) => {
        if (!configRef.current.audio?.enabled)
            return;
        const { sounds, volume = 0.5 } = configRef.current.audio;
        const soundUrl = sounds?.[type];
        if (soundUrl && audioCache.current.has(soundUrl)) {
            const ctx = initAudioContext();
            if (!ctx)
                return;
            const buffer = audioCache.current.get(soundUrl);
            const source = ctx.createBufferSource();
            const gainNode = ctx.createGain();
            source.buffer = buffer;
            source.connect(gainNode);
            gainNode.connect(ctx.destination);
            gainNode.gain.value = volume;
            source.start();
        }
        else {
            // Generate synthetic sound if no audio file
            generateSound(type, volume);
        }
    }, []);
    // Apply visual feedback
    const applyVisual = useCallback((element, type) => {
        if (!element || !configRef.current.visual?.enabled)
            return;
        // Clean up previous visual feedback
        if (cleanupRef.current) {
            cleanupRef.current();
        }
        // Customize visual feedback based on type
        const visualConfig = { ...configRef.current.visual };
        switch (type) {
            case 'success':
                visualConfig.color = 'rgba(34, 197, 94, 0.2)';
                visualConfig.scale = 1.05;
                break;
            case 'warning':
                visualConfig.color = 'rgba(251, 191, 36, 0.2)';
                visualConfig.scale = 0.98;
                break;
            case 'error':
                visualConfig.color = 'rgba(239, 68, 68, 0.2)';
                visualConfig.scale = 0.95;
                visualConfig.blur = 2;
                break;
            case 'impact':
                visualConfig.scale = 0.9;
                visualConfig.duration = 150;
                break;
        }
        cleanupRef.current = applyVisualFeedback(element, visualConfig);
    }, []);
    // Main trigger function
    const trigger = useCallback((type, element) => {
        // Get pattern
        const pattern = configRef.current.customPatterns?.[type] || HAPTIC_PATTERNS[type];
        // Trigger all feedback types
        vibrate(pattern);
        playAudio(type);
        if (element) {
            applyVisual(element, type);
        }
    }, [vibrate, playAudio, applyVisual]);
    // Create custom pattern
    const createPattern = useCallback((name, pattern) => {
        if (!configRef.current.customPatterns) {
            configRef.current.customPatterns = {};
        }
        configRef.current.customPatterns[name] = pattern;
    }, []);
    // Cleanup
    useEffect(() => {
        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, []);
    return {
        trigger,
        vibrate,
        playAudio,
        applyVisual,
        createPattern,
        patterns: HAPTIC_PATTERNS,
    };
}
// Haptic feedback provider for global configuration
import { createContext, useContext } from 'react';
const HapticContext = createContext(null);
export function HapticProvider({ children, config = {}, }) {
    const haptic = useHapticFeedback(config);
    return (_jsx(HapticContext.Provider, { value: { config, trigger: haptic.trigger }, children: children }));
}
export function useHaptic() {
    const context = useContext(HapticContext);
    if (!context) {
        throw new Error('useHaptic must be used within HapticProvider');
    }
    return context;
}
// Haptic feedback directive (for easy integration)
export function useHapticFeedbackIntegration(ref, type = 'light', config) {
    const haptic = useHapticFeedback(config);
    useEffect(() => {
        const element = ref.current;
        if (!element)
            return;
        const handleInteraction = () => {
            haptic.trigger(type, element);
        };
        element.addEventListener('click', handleInteraction);
        element.addEventListener('touchstart', handleInteraction, {
            passive: true,
        });
        return () => {
            element.removeEventListener('click', handleInteraction);
            element.removeEventListener('touchstart', handleInteraction);
        };
    }, [ref, type, haptic]);
}
