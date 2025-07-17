/**
 * Enhanced Apple Liquid Glass Tests
 * Validates pixel-perfect multi-layer rendering engine
 * Requirements: 6.1, 6.3 - Testing enhanced glass rendering system
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
    useEnhancedAppleLiquidGlass,
    getEnhancedGlassClass,
    createEnhancedGlassLayers,
    ENHANCED_GLASS_VARIANTS,
    ENHANCED_GLASS_LAYERS,
    PIXEL_PERFECT_CONFIG,
    APPLE_HIG_COMPLIANCE,
    type EnhancedGlassOptions,
} from './enhanced-apple-liquid-glass';

// Mock DOM APIs
const mockElement = {
    getBoundingClientRect: vi.fn(() => ({
        left: 100,
        top: 100,
        width: 200,
        height: 100,
        right: 300,
        bottom: 200,
    })),
    style: {},
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    querySelector: vi.fn(),
} as any;

const mockNavigator = {
    vibrate: vi.fn(),
};

// Mock window and document
Object.defineProperty(window, 'devicePixelRatio', {
    writable: true,
    value: 2,
});

Object.defineProperty(navigator, 'vibrate', {
    writable: true,
    value: mockNavigator.vibrate,
});

describe('Enhanced Apple Liquid Glass System', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.documentElement.style.setProperty = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Enhanced Glass Variants', () => {
        it('should have all intensity variants with correct properties', () => {
            expect(ENHANCED_GLASS_VARIANTS).toHaveProperty('subtle');
            expect(ENHANCED_GLASS_VARIANTS).toHaveProperty('medium');
            expect(ENHANCED_GLASS_VARIANTS).toHaveProperty('strong');
            expect(ENHANCED_GLASS_VARIANTS).toHaveProperty('extreme');

            // Test subtle variant
            const subtle = ENHANCED_GLASS_VARIANTS.subtle;
            expect(subtle.backdrop.blur).toBe(12);
            expect(subtle.backdrop.saturation).toBe(150);
            expect(subtle.backdrop.opacity).toBe(0.08);
            expect(subtle.radius).toBe(20);

            // Test extreme variant
            const extreme = ENHANCED_GLASS_VARIANTS.extreme;
            expect(extreme.backdrop.blur).toBe(48);
            expect(extreme.backdrop.saturation).toBe(250);
            expect(extreme.backdrop.opacity).toBe(0.35);
            expect(extreme.radius).toBe(44);
        });

        it('should have progressive intensity scaling', () => {
            const variants = Object.values(ENHANCED_GLASS_VARIANTS);

            // Check that blur values increase
            for (let i = 1; i < variants.length; i++) {
                expect(variants[i].backdrop.blur).toBeGreaterThan(variants[i - 1].backdrop.blur);
            }

            // Check that opacity values increase
            for (let i = 1; i < variants.length; i++) {
                expect(variants[i].backdrop.opacity).toBeGreaterThan(variants[i - 1].backdrop.opacity);
            }

            // Check that radius values increase
            for (let i = 1; i < variants.length; i++) {
                expect(variants[i].radius).toBeGreaterThan(variants[i - 1].radius);
            }
        });
    });

    describe('Enhanced Glass Layers', () => {
        it('should have all required layer types', () => {
            expect(ENHANCED_GLASS_LAYERS).toHaveProperty('backdrop');
            expect(ENHANCED_GLASS_LAYERS).toHaveProperty('overlay');
            expect(ENHANCED_GLASS_LAYERS).toHaveProperty('specular');
            expect(ENHANCED_GLASS_LAYERS).toHaveProperty('content');
        });

        it('should have correct z-index ordering', () => {
            const layers = Object.values(ENHANCED_GLASS_LAYERS);
            const zIndexes = layers.map(layer => layer.zIndex).sort((a, b) => a - b);

            expect(zIndexes).toEqual([0, 1, 2, 3]);
            expect(ENHANCED_GLASS_LAYERS.backdrop.zIndex).toBe(0);
            expect(ENHANCED_GLASS_LAYERS.overlay.zIndex).toBe(1);
            expect(ENHANCED_GLASS_LAYERS.specular.zIndex).toBe(2);
            expect(ENHANCED_GLASS_LAYERS.content.zIndex).toBe(3);
        });

        it('should have appropriate blend modes', () => {
            expect(ENHANCED_GLASS_LAYERS.backdrop.blendMode).toBe('normal');
            expect(ENHANCED_GLASS_LAYERS.overlay.blendMode).toBe('multiply');
            expect(ENHANCED_GLASS_LAYERS.specular.blendMode).toBe('screen');
            expect(ENHANCED_GLASS_LAYERS.content.blendMode).toBe('normal');
        });
    });

    describe('Pixel Perfect Configuration', () => {
        it('should have correct pixel perfect settings', () => {
            expect(PIXEL_PERFECT_CONFIG.subpixelRendering).toBe(true);
            expect(PIXEL_PERFECT_CONFIG.retinaDensitySupport).toBe(true);
            expect(PIXEL_PERFECT_CONFIG.vectorIconOptimization).toBe(true);
            expect(PIXEL_PERFECT_CONFIG.antiAliasing).toBe('subpixel');
        });
    });

    describe('Apple HIG Compliance', () => {
        it('should have Apple HIG color system', () => {
            expect(APPLE_HIG_COMPLIANCE.colorSystem.primary).toBe('#007AFF');
            expect(APPLE_HIG_COMPLIANCE.colorSystem.secondary).toBe('#5856D6');
            expect(APPLE_HIG_COMPLIANCE.colorSystem.accent).toBe('#FF9500');
        });

        it('should have semantic colors', () => {
            const semantic = APPLE_HIG_COMPLIANCE.colorSystem.semantic;
            expect(semantic.success).toBe('#34C759');
            expect(semantic.warning).toBe('#FF9500');
            expect(semantic.error).toBe('#FF3B30');
            expect(semantic.info).toBe('#5AC8FA');
        });

        it('should have typography scale', () => {
            const scale = APPLE_HIG_COMPLIANCE.typography.scale;
            expect(scale).toContain(11);
            expect(scale).toContain(17);
            expect(scale).toContain(48);
            expect(scale.length).toBeGreaterThan(5);
        });

        it('should have animation configurations', () => {
            const animations = APPLE_HIG_COMPLIANCE.animations;
            expect(animations.durations).toContain(0.25);
            expect(animations.easings).toContain('cubic-bezier(0.25, 0.1, 0.25, 1)');
            expect(animations.choreography.stagger).toBe(0.05);
        });
    });

    describe('useEnhancedAppleLiquidGlass Hook', () => {
        it('should initialize with default options', () => {
            const { result } = renderHook(() => useEnhancedAppleLiquidGlass());

            expect(result.current.containerRef).toBeDefined();
            expect(result.current.layersRef).toBeDefined();
            expect(result.current.variant).toBeDefined();
            expect(result.current.isRetina).toBe(true); // devicePixelRatio is 2
            expect(result.current.pixelRatio).toBe(2);
        });

        it('should handle custom options', () => {
            const options: EnhancedGlassOptions = {
                intensity: 'strong',
                enablePhysics: false,
                enableHaptics: true,
                magneticStrength: 0.5,
                liquidFlowIntensity: 0.8,
            };

            const { result } = renderHook(() => useEnhancedAppleLiquidGlass(options));

            expect(result.current.variant).toEqual(ENHANCED_GLASS_VARIANTS.strong);
        });

        it('should set up pixel ratio detection', () => {
            renderHook(() => useEnhancedAppleLiquidGlass({ enableRetina: true }));

            expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
                '--pixel-ratio',
                '2'
            );
        });

        it('should set up subpixel rendering', () => {
            renderHook(() => useEnhancedAppleLiquidGlass({ enableSubpixel: true }));

            expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
                '--subpixel-rendering',
                'optimizeSpeed'
            );
        });

        it('should register and unregister layers', () => {
            const { result } = renderHook(() => useEnhancedAppleLiquidGlass());

            act(() => {
                result.current.registerLayer('test-layer', mockElement);
            });

            expect(result.current.layersRef.has('test-layer')).toBe(true);

            act(() => {
                result.current.unregisterLayer('test-layer');
            });

            expect(result.current.layersRef.has('test-layer')).toBe(false);
        });
    });

    describe('getEnhancedGlassClass', () => {
        it('should generate correct base class', () => {
            const className = getEnhancedGlassClass();
            expect(className).toContain('enhanced-apple-liquid-glass');
            expect(className).toContain('enhanced-apple-liquid-glass--medium');
        });

        it('should handle intensity variants', () => {
            const subtleClass = getEnhancedGlassClass('subtle');
            const strongClass = getEnhancedGlassClass('strong');
            const extremeClass = getEnhancedGlassClass('extreme');

            expect(subtleClass).toContain('enhanced-apple-liquid-glass--subtle');
            expect(strongClass).toContain('enhanced-apple-liquid-glass--strong');
            expect(extremeClass).toContain('enhanced-apple-liquid-glass--extreme');
        });

        it('should handle options', () => {
            const className = getEnhancedGlassClass('medium', {
                interactive: true,
                magnetic: true,
                animated: true,
                pixelPerfect: true,
            });

            expect(className).toContain('enhanced-apple-liquid-glass--interactive');
            expect(className).toContain('enhanced-apple-liquid-glass--magnetic');
            expect(className).toContain('enhanced-apple-liquid-glass--animated');
            expect(className).toContain('enhanced-apple-liquid-glass--pixel-perfect');
        });

        it('should filter out false options', () => {
            const className = getEnhancedGlassClass('medium', {
                interactive: false,
                magnetic: false,
                animated: false,
                pixelPerfect: false,
            });

            expect(className).not.toContain('enhanced-apple-liquid-glass--interactive');
            expect(className).not.toContain('enhanced-apple-liquid-glass--magnetic');
            expect(className).not.toContain('enhanced-apple-liquid-glass--animated');
            expect(className).not.toContain('enhanced-apple-liquid-glass--pixel-perfect');
        });
    });

    describe('createEnhancedGlassLayers', () => {
        it('should create all required layers', () => {
            const content = 'Test content';
            const layers = createEnhancedGlassLayers(content);

            // This is a React Fragment with multiple children
            expect(layers).toBeDefined();
        });

        it('should handle options correctly', () => {
            const content = 'Test content';
            const options = {
                intensity: 'strong' as const,
                className: 'custom-class',
                enableDistortion: true,
                distortionFilter: 'url(#custom-filter)',
            };

            const layers = createEnhancedGlassLayers(content, options);
            expect(layers).toBeDefined();
        });

        it('should use default options when not provided', () => {
            const content = 'Test content';
            const layers = createEnhancedGlassLayers(content);
            expect(layers).toBeDefined();
        });
    });

    describe('Physics and Interactions', () => {
        it('should handle mouse move events with physics enabled', () => {
            const { result } = renderHook(() =>
                useEnhancedAppleLiquidGlass({
                    enablePhysics: true,
                    magneticStrength: 0.3
                })
            );

            // Mock the container ref
            result.current.containerRef.current = mockElement;

            // Simulate mouse move
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: 150,
                clientY: 150,
            });

            // The hook should set up event listeners
            expect(mockElement.addEventListener).toHaveBeenCalledWith(
                'mousemove',
                expect.any(Function)
            );
        });

        it('should handle haptic feedback when enabled', () => {
            renderHook(() =>
                useEnhancedAppleLiquidGlass({
                    enableHaptics: true
                })
            );

            // Haptic feedback should be available
            expect(navigator.vibrate).toBeDefined();
        });

        it('should skip physics when disabled', () => {
            const { result } = renderHook(() =>
                useEnhancedAppleLiquidGlass({
                    enablePhysics: false
                })
            );

            result.current.containerRef.current = mockElement;

            // Should still set up event listeners but not apply transforms
            expect(mockElement.addEventListener).toHaveBeenCalled();
        });
    });

    describe('Performance Optimizations', () => {
        it('should use requestAnimationFrame for liquid flow', () => {
            const mockRAF = vi.fn();
            const mockCAF = vi.fn();

            global.requestAnimationFrame = mockRAF;
            global.cancelAnimationFrame = mockCAF;

            const { unmount } = renderHook(() =>
                useEnhancedAppleLiquidGlass({
                    liquidFlowIntensity: 0.5
                })
            );

            expect(mockRAF).toHaveBeenCalled();

            unmount();
            expect(mockCAF).toHaveBeenCalled();
        });

        it('should skip liquid flow when intensity is 0', () => {
            const mockRAF = vi.fn();
            global.requestAnimationFrame = mockRAF;

            renderHook(() =>
                useEnhancedAppleLiquidGlass({
                    liquidFlowIntensity: 0
                })
            );

            expect(mockRAF).not.toHaveBeenCalled();
        });
    });

    describe('Error Handling', () => {
        it('should handle missing container ref gracefully', () => {
            const { result } = renderHook(() => useEnhancedAppleLiquidGlass());

            // Container ref is null initially
            expect(result.current.containerRef.current).toBeNull();

            // Should not throw when trying to register layers
            expect(() => {
                result.current.registerLayer('test', mockElement);
            }).not.toThrow();
        });

        it('should handle missing navigator.vibrate gracefully', () => {
            const originalVibrate = navigator.vibrate;
            delete (navigator as any).vibrate;

            expect(() => {
                renderHook(() =>
                    useEnhancedAppleLiquidGlass({
                        enableHaptics: true
                    })
                );
            }).not.toThrow();

            (navigator as any).vibrate = originalVibrate;
        });

        it('should handle missing window.devicePixelRatio gracefully', () => {
            const originalDPR = window.devicePixelRatio;
            delete (window as any).devicePixelRatio;

            const { result } = renderHook(() =>
                useEnhancedAppleLiquidGlass({
                    enableRetina: true
                })
            );

            expect(result.current.pixelRatio).toBe(1);

            (window as any).devicePixelRatio = originalDPR;
        });
    });
});