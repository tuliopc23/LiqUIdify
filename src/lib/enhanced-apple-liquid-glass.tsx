/**
 * Enhanced Apple Liquid Glass Rendering Engine
 * Pixel-perfect multi-layer glass system with advanced physics and visual effects
 * Requirements: 6.1, 6.3 - Enhanced multi-layer glass rendering with pixel-perfect precision
 */

import React, { useRef, useEffect, useCallback, startTransition } from 'react';

export interface EnhancedGlassLayer {
  id: string;
  type: 'backdrop' | 'overlay' | 'specular' | 'content';
  zIndex: number;
  opacity: number;
  blendMode: string;
  transform: string;
  filter: string;
}

export interface PixelPerfectConfig {
  subpixelRendering: boolean;
  retinaDensitySupport: boolean;
  vectorIconOptimization: boolean;
  antiAliasing: 'none' | 'standard' | 'subpixel';
}

export interface EnhancedGlassOptions {
  intensity?: 'subtle' | 'medium' | 'strong' | 'extreme';
  layers?: Partial<EnhancedGlassLayer>[];
  pixelPerfect?: Partial<PixelPerfectConfig>;
  distortionStrength?: number;
  liquidFlowIntensity?: number;
  magneticStrength?: number;
  enablePhysics?: boolean;
  enableHaptics?: boolean;
  enableRetina?: boolean;
  enableSubpixel?: boolean;
}

export interface AppleHIGCompliance {
  colorSystem: {
    primary: string;
    secondary: string;
    accent: string;
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  typography: {
    scale: number[];
    weights: number[];
    lineHeights: number[];
  };
  spacing: number[];
  animations: {
    durations: number[];
    easings: string[];
    choreography: {
      stagger: number;
      sequence: number;
      parallel: number;
    };
  };
}

/**
 * Enhanced Glass Layer Definitions
 * Pixel-perfect multi-layer structure following Apple HIG
 */
export const ENHANCED_GLASS_LAYERS: Record<string, EnhancedGlassLayer> = {
  backdrop: {
    id: 'backdrop',
    type: 'backdrop',
    zIndex: 0,
    opacity: 1,
    blendMode: 'normal',
    transform: 'translateZ(0)',
    filter: 'blur(20px) saturate(180%) brightness(110%)',
  },
  overlay: {
    id: 'overlay',
    type: 'overlay',
    zIndex: 1,
    opacity: 0.85,
    blendMode: 'multiply',
    transform: 'translateZ(1px)',
    filter: 'contrast(120%) saturate(150%)',
  },
  specular: {
    id: 'specular',
    type: 'specular',
    zIndex: 2,
    opacity: 0.7,
    blendMode: 'screen',
    transform: 'translateZ(2px)',
    filter: 'brightness(150%) contrast(200%)',
  },
  content: {
    id: 'content',
    type: 'content',
    zIndex: 3,
    opacity: 1,
    blendMode: 'normal',
    transform: 'translateZ(3px)',
    filter: 'none',
  },
};

/**
 * Pixel-Perfect Rendering Configuration
 * Optimized for retina displays and subpixel accuracy
 */
export const PIXEL_PERFECT_CONFIG: PixelPerfectConfig = {
  subpixelRendering: true,
  retinaDensitySupport: true,
  vectorIconOptimization: true,
  antiAliasing: 'subpixel',
};

/**
 * Apple HIG Compliance Configuration
 * Following Apple's Human Interface Guidelines precisely
 */
export const APPLE_HIG_COMPLIANCE: AppleHIGCompliance = {
  colorSystem: {
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#FF9500',
    semantic: {
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#5AC8FA',
    },
  },
  typography: {
    scale: [11, 12, 13, 15, 17, 20, 24, 28, 34, 41, 48],
    weights: [300, 400, 500, 600, 700, 800, 900],
    lineHeights: [1.2, 1.3, 1.4, 1.5, 1.6],
  },
  spacing: [2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
  animations: {
    durations: [0.15, 0.25, 0.35, 0.5, 0.75, 1.0],
    easings: [
      'cubic-bezier(0.25, 0.1, 0.25, 1)',
      'cubic-bezier(0.4, 0, 0.2, 1)',
      'cubic-bezier(0.34, 1.56, 0.64, 1)',
    ],
    choreography: {
      stagger: 0.05,
      sequence: 0.1,
      parallel: 0,
    },
  },
};

/**
 * Enhanced Glass Variants with Pixel-Perfect Precision
 */
export const ENHANCED_GLASS_VARIANTS = {
  subtle: {
    backdrop: {
      blur: 12,
      saturation: 150,
      brightness: 105,
      opacity: 0.08,
    },
    overlay: {
      background: 'rgba(255, 255, 255, 0.06)',
      border: 'rgba(255, 255, 255, 0.7)',
      shadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    },
    specular: {
      highlight: 'rgba(255, 255, 255, 0.6)',
      reflection: 'rgba(255, 255, 255, 0.3)',
    },
    radius: 20,
  },
  medium: {
    backdrop: {
      blur: 20,
      saturation: 180,
      brightness: 110,
      opacity: 0.15,
    },
    overlay: {
      background: 'rgba(255, 255, 255, 0.12)',
      border: 'rgba(255, 255, 255, 0.8)',
      shadow: '0 12px 48px rgba(31, 38, 135, 0.25)',
    },
    specular: {
      highlight: 'rgba(255, 255, 255, 0.8)',
      reflection: 'rgba(255, 255, 255, 0.4)',
    },
    radius: 28,
  },
  strong: {
    backdrop: {
      blur: 32,
      saturation: 200,
      brightness: 115,
      opacity: 0.25,
    },
    overlay: {
      background: 'rgba(255, 255, 255, 0.18)',
      border: 'rgba(255, 255, 255, 0.9)',
      shadow: '0 16px 64px rgba(31, 38, 135, 0.35)',
    },
    specular: {
      highlight: 'rgba(255, 255, 255, 1)',
      reflection: 'rgba(255, 255, 255, 0.5)',
    },
    radius: 36,
  },
  extreme: {
    backdrop: {
      blur: 48,
      saturation: 250,
      brightness: 120,
      opacity: 0.35,
    },
    overlay: {
      background: 'rgba(255, 255, 255, 0.25)',
      border: 'rgba(255, 255, 255, 1)',
      shadow: '0 24px 96px rgba(31, 38, 135, 0.45)',
    },
    specular: {
      highlight: 'rgba(255, 255, 255, 1)',
      reflection: 'rgba(255, 255, 255, 0.7)',
    },
    radius: 44,
  },
} as const;

/**
 * Enhanced Apple Liquid Glass Hook
 * Pixel-perfect rendering with advanced physics and visual effects
 */
export function useEnhancedAppleLiquidGlass(
  options: EnhancedGlassOptions = {}
) {
  const containerRef = useRef<HTMLElement>(null);
  const layersRef = useRef<Map<string, HTMLElement>>(new Map());
  const animationFrameRef = useRef<number | undefined>(undefined);
  const isRetina = useRef<boolean>(false);
  const pixelRatio = useRef<number>(1);

  const {
    intensity = 'medium',
    layers = [],
    pixelPerfect = PIXEL_PERFECT_CONFIG,
    distortionStrength: _distortionStrength = 0.3,
    liquidFlowIntensity = 0.5,
    magneticStrength = 0.2,
    enablePhysics = true,
    enableHaptics = false,
    enableRetina = true,
    enableSubpixel = true,
  } = options;

  // Initialize pixel-perfect rendering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      pixelRatio.current = window.devicePixelRatio || 1;
      isRetina.current = pixelRatio.current > 1;

      if (enableRetina && isRetina.current) {
        document.documentElement.style.setProperty(
          '--pixel-ratio',
          pixelRatio.current.toString()
        );
      }

      if (enableSubpixel && pixelPerfect.subpixelRendering) {
        document.documentElement.style.setProperty(
          '--subpixel-rendering',
          'optimizeSpeed'
        );
      }
    }
  }, [enableRetina, enableSubpixel, pixelPerfect.subpixelRendering]);

  // Enhanced magnetic hover with physics
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !enablePhysics) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;

      // Apply physics-based transformation with subpixel precision
      startTransition(() => {
        if (containerRef.current) {
          const transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0)`;
          containerRef.current.style.transform = transform;

          // Apply layered transformations for depth effect
          layersRef.current.forEach((layer, id) => {
            const layerConfig = ENHANCED_GLASS_LAYERS[id];
            if (layerConfig) {
              const layerDeltaX = deltaX * (layerConfig.zIndex * 0.1);
              const layerDeltaY = deltaY * (layerConfig.zIndex * 0.1);
              const layerTransform = `translate3d(${layerDeltaX.toFixed(2)}px, ${layerDeltaY.toFixed(2)}px, ${layerConfig.zIndex}px)`;
              layer.style.transform = layerTransform;
            }
          });
        }
      });

      // Haptic feedback
      if (enableHaptics && 'vibrate' in navigator) {
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance > 10) {
          navigator.vibrate(1);
        }
      }
    },
    [magneticStrength, enablePhysics, enableHaptics]
  );

  // Enhanced mouse leave with spring physics
  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;

    startTransition(() => {
      if (containerRef.current) {
        containerRef.current.style.transform = 'translate3d(0, 0, 0)';
        containerRef.current.style.transition =
          'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';

        // Reset layer transformations with staggered timing
        layersRef.current.forEach((layer, id) => {
          const layerConfig = ENHANCED_GLASS_LAYERS[id];
          if (layerConfig) {
            setTimeout(() => {
              layer.style.transform = `translateZ(${layerConfig.zIndex}px)`;
              layer.style.transition =
                'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, layerConfig.zIndex * 50);
          }
        });

        // Clear transitions after animation
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = '';
            layersRef.current.forEach(layer => {
              layer.style.transition = '';
            });
          }
        }, 600);
      }
    });

    if (enableHaptics && 'vibrate' in navigator) {
      navigator.vibrate(5);
    }
  }, [enableHaptics]);

  // Liquid flow animation with requestAnimationFrame
  useEffect(() => {
    if (!liquidFlowIntensity || liquidFlowIntensity === 0) return;

    let startTime = 0;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      layersRef.current.forEach((layer, id) => {
        if (id === 'backdrop' || id === 'overlay') {
          const offset = Math.sin(elapsed * 0.001) * liquidFlowIntensity;
          const currentTransform = layer.style.transform || '';
          const newTransform = currentTransform.includes('translate3d')
            ? currentTransform.replace(
                /translate3d\([^)]+\)/,
                `translate3d(${offset.toFixed(2)}px, ${(-offset * 0.5).toFixed(2)}px, ${ENHANCED_GLASS_LAYERS[id]?.zIndex || 0}px)`
              )
            : `${currentTransform} translate3d(${offset.toFixed(2)}px, ${(-offset * 0.5).toFixed(2)}px, ${ENHANCED_GLASS_LAYERS[id]?.zIndex || 0}px)`;

          layer.style.transform = newTransform;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [liquidFlowIntensity]);

  // Event listeners
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Layer registration
  const registerLayer = useCallback((id: string, element: HTMLElement) => {
    layersRef.current.set(id, element);
  }, []);

  const unregisterLayer = useCallback((id: string) => {
    layersRef.current.delete(id);
  }, []);

  return {
    containerRef,
    layersRef: layersRef.current,
    registerLayer,
    unregisterLayer,
    variant: ENHANCED_GLASS_VARIANTS[intensity],
    layers: { ...ENHANCED_GLASS_LAYERS, ...layers },
    pixelPerfect,
    isRetina: isRetina.current,
    pixelRatio: pixelRatio.current,
  };
}

/**
 * Generate Enhanced Glass Layer JSX
 * Creates pixel-perfect multi-layer structure
 */
export function createEnhancedGlassLayers(
  content: React.ReactNode,
  options: {
    intensity?: keyof typeof ENHANCED_GLASS_VARIANTS;
    className?: string;
    enableDistortion?: boolean;
    distortionFilter?: string;
  } = {}
): React.ReactNode {
  const {
    intensity = 'medium',
    className = '',
    enableDistortion = true,
    distortionFilter = 'url(#liquid-lens)',
  } = options;

  const variant = ENHANCED_GLASS_VARIANTS[intensity];

  return React.createElement(
    React.Fragment,
    null,
    // Backdrop Layer - Blur and saturation effects
    React.createElement('div', {
      className: 'enhanced-glass-backdrop',
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backdropFilter: `blur(${variant.backdrop.blur}px) saturate(${variant.backdrop.saturation}%) brightness(${variant.backdrop.brightness}%)`,
        WebkitBackdropFilter: `blur(${variant.backdrop.blur}px) saturate(${variant.backdrop.saturation}%) brightness(${variant.backdrop.brightness}%)`,
        filter: enableDistortion ? distortionFilter : 'none',
        isolation: 'isolate',
        transform: 'translateZ(0)',
      },
    }),
    // Overlay Layer - Color tinting and opacity
    React.createElement('div', {
      className: 'enhanced-glass-overlay',
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: variant.overlay.background,
        border: `1px solid ${variant.overlay.border}`,
        borderRadius: `${variant.radius}px`,
        boxShadow: variant.overlay.shadow,
        transform: 'translateZ(1px)',
      },
    }),
    // Specular Layer - Highlight reflections
    React.createElement('div', {
      className: 'enhanced-glass-specular',
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        borderRadius: `${variant.radius}px`,
        boxShadow: `inset 1px 1px 0 ${variant.specular.highlight}, inset 0 0 8px ${variant.specular.reflection}`,
        pointerEvents: 'none',
        transform: 'translateZ(2px)',
      },
    }),
    // Content Layer - Actual component content
    React.createElement(
      'div',
      {
        className: `enhanced-glass-content ${className}`,
        style: {
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          color: 'rgba(255, 255, 255, 0.95)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          fontWeight: 600,
          padding: '1rem 1.5rem',
          transform: 'translateZ(3px)',
        },
      },
      content
    )
  );
}

/**
 * Enhanced Glass CSS Class Generator
 * Generates pixel-perfect CSS classes with HIG compliance
 */
export function getEnhancedGlassClass(
  intensity: keyof typeof ENHANCED_GLASS_VARIANTS = 'medium',
  options: {
    interactive?: boolean;
    magnetic?: boolean;
    animated?: boolean;
    pixelPerfect?: boolean;
  } = {}
): string {
  const {
    interactive = true,
    magnetic = false,
    animated = false,
    pixelPerfect = true,
  } = options;

  const classes = [
    'enhanced-apple-liquid-glass',
    `enhanced-apple-liquid-glass--${intensity}`,
    interactive && 'enhanced-apple-liquid-glass--interactive',
    magnetic && 'enhanced-apple-liquid-glass--magnetic',
    animated && 'enhanced-apple-liquid-glass--animated',
    pixelPerfect && 'enhanced-apple-liquid-glass--pixel-perfect',
  ].filter(Boolean);

  return classes.join(' ');
}
