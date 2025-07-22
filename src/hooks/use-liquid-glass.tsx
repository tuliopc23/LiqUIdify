/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { liquidGlassTokens } from '../lib/liquid-glass-tokens';

export interface LiquidGlassConfig {
  color?: string; // rgb string e.g. "255,255,255"
  blur?: number; // px
  saturation?: number; // percentage
  opacity?: number; // 0-1
  adaptToContent?: boolean; // Enable content-aware adaptation
  specularHighlights?: boolean; // Enable specular highlights
  magneticHover?: boolean; // Enable magnetic hover effects
}

export interface ContentAnalysis {
  averageColor: string;
  brightness: number;
  contrast: number;
  dominantHue: number;
}

const defaultConfig: Required<LiquidGlassConfig> = {
  color: '255,255,255',
  blur: 24,
  saturation: 180,
  opacity: 0.75,
  adaptToContent: true,
  specularHighlights: true,
  magneticHover: false,
};

const LiquidGlassContext = createContext<
  LiquidGlassConfig & {
    contentAnalysis?: ContentAnalysis;
    updateGlassStyle: (_analysis: ContentAnalysis) => void;
  }
>(defaultConfig as any);

export function LiquidGlassProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: LiquidGlassConfig;
}) {
  const merged = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
  const [contentAnalysis, setContentAnalysis] = useState<ContentAnalysis>();

  const updateGlassStyle = useCallback(
    (analysis: ContentAnalysis) => {
      setContentAnalysis(analysis);

      if (!merged.adaptToContent) {
        return undefined;
      }

      const root = document.documentElement;

      // Adapt glass properties based on content analysis
      const adaptedOpacity =
        merged.opacity * (1 + (analysis.contrast - 0.5) * 0.3);
      const adaptedBlur = merged.blur * (1 + (1 - analysis.brightness) * 0.2);
      const adaptedSaturation =
        merged.saturation * (1 + analysis.brightness * 0.1);

      // Set adaptive properties
      root.style.setProperty(
        '--glass-opacity-adaptive',
        String(Math.max(0.1, Math.min(0.9, adaptedOpacity)))
      );
      root.style.setProperty(
        '--glass-blur-adaptive',
        `${Math.max(8, Math.min(48, adaptedBlur))}px`
      );
      root.style.setProperty(
        '--glass-saturation-adaptive',
        `${Math.max(120, Math.min(250, adaptedSaturation))}%`
      );

      // Adapt color based on dominant hue
      const hue = analysis.dominantHue;
      const adaptedColor = `hsl(${hue}, 20%, ${0.5 < analysis.brightness ? 95 : 15}%)`;
      root.style.setProperty('--glass-color-adaptive', adaptedColor);
    },
    [merged]
  );

  useEffect(() => {
    const root = document.documentElement;

    // Set base properties
    root.style.setProperty('--glass-color', `rgb(${merged.color})`);
    root.style.setProperty('--glass-blur', `${merged.blur}px`);
    root.style.setProperty('--glass-saturation', `${merged.saturation}%`);
    root.style.setProperty('--glass-opacity', String(merged.opacity));

    // Set liquid glass tokens
    Object.entries(liquidGlassTokens.colors.glass.white).forEach(
      ([key, value]) => {
        root.style.setProperty(`--liquid-glass-${key}`, value as string);
      }
    );

    // Set shadow tokens
    Object.entries(liquidGlassTokens.shadows.glass).forEach(([key, value]) => {
      root.style.setProperty(`--liquid-shadow-${key}`, value as string);
    });

    // Set timing tokens
    Object.entries(liquidGlassTokens.animation.duration).forEach(
      ([key, value]) => {
        root.style.setProperty(`--liquid-timing-${key}`, value as string);
      }
    );

    // Enable specular highlights if configured
    if (merged.specularHighlights) {
      root.style.setProperty('--specular-enabled', '1');
    }
  }, [merged]);

  return (
    <LiquidGlassContext.Provider
      value={{ ...merged, contentAnalysis, updateGlassStyle }}
    >
      {children}
    </LiquidGlassContext.Provider>
  );
}

export const useLiquidGlass = () => useContext(LiquidGlassContext);

// Content-aware glass hook with performance optimizations
export const useContentAwareGlass = (
  contentRef: React.RefObject<HTMLElement>
) => {
  const { updateGlassStyle, adaptToContent } = useLiquidGlass();
  const analysisRef = useRef<ContentAnalysis | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Throttled analysis function to avoid excessive DOM operations
  const analyzeContent = useCallback(async () => {
    if (!contentRef.current || !adaptToContent) {
      return undefined;
    }

    // Clear any pending analysis
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Throttle analysis to max once per 100ms for performance
    timeoutRef.current = setTimeout(async () => {
      try {
        const element = contentRef.current;
        if (!element) return;

        // Use efficient approach - just analyze computed style
        const computedStyle = getComputedStyle(element);
        const bgColor = computedStyle.backgroundColor;

        // Parse background color and analyze - cached result
        const analysis = analyzeColor(bgColor);

        // Only update if analysis actually changed (performance optimization)
        if (
          analysis &&
          JSON.stringify(analysis) !== JSON.stringify(analysisRef.current)
        ) {
          analysisRef.current = analysis;
          updateGlassStyle(analysis);
        }
      } catch (error) {
        // Silently fail in production, log in development
        if ('development' === process.env.NODE_ENV) {
          console.warn('Content analysis failed:', error);
        }
      }
    }, 100); // 100ms throttle for performance
  }, [contentRef, updateGlassStyle, adaptToContent]);

  useEffect(() => {
    if (!adaptToContent) {
      return undefined;
    }
    if (
      'undefined' === typeof window ||
      !('MutationObserver' in window) ||
      !('ResizeObserver' in window)
    ) {
      return undefined;
    }

    const observer = new MutationObserver(analyzeContent);
    const resizeObserver = new ResizeObserver(analyzeContent);

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class'],
      });
      resizeObserver.observe(contentRef.current);
    }

    // Initial analysis
    analyzeContent();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      // Cleanup throttle timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [analyzeContent, adaptToContent, contentRef]);

  return analysisRef.current;
};

// Helper function to analyze color
function analyzeColor(colorString: string): ContentAnalysis | null {
  if (!colorString || 'string' !== typeof colorString) {
    if ('development' === process.env.NODE_ENV) {
      console.warn('analyzeColor: Invalid color string provided:', colorString);
    }
    return undefined;
  }

  try {
    // Parse RGB values from color string with better error handling
    const rgbMatch = colorString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );

    if (!rgbMatch) {
      if ('development' === process.env.NODE_ENV) {
        console.warn(
          'analyzeColor: Could not parse color string:',
          colorString
        );
      }
      // Return a default analysis for unrecognized colors
      return {
        averageColor: 'rgb(128, 128, 128)',
        brightness: 0.5,
        contrast: 0.5,
        dominantHue: 0,
      };
    }

    const r = parseInt(rgbMatch[1] || '0', 10) / 255;
    const g = parseInt(rgbMatch[2] || '0', 10) / 255;
    const b = parseInt(rgbMatch[3] || '0', 10) / 255;

    // Validate parsed values
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      if ('development' === process.env.NODE_ENV) {
        console.warn('analyzeColor: Invalid RGB values:', { r, g, b });
      }
      return undefined;
    }

    // Calculate brightness (luminance)
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    // Calculate contrast (simplified)
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const contrast = (max - min) / (max + min + 0.001);

    // Calculate dominant hue
    const hue = rgbToHue(r, g, b);

    return {
      averageColor: `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`,
      brightness,
      contrast,
      dominantHue: hue,
    };
  } catch (error) {
    if ('development' === process.env.NODE_ENV) {
      console.warn('analyzeColor: Error processing color:', error);
    }
    // Return a safe default
    return {
      averageColor: 'rgb(128, 128, 128)',
      brightness: 0.5,
      contrast: 0.5,
      dominantHue: 0,
    };
  }
}

// Helper function to convert RGB to HSL hue
function rgbToHue(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (0 === delta) {
    return 0;
  }

  let hue = 0;
  if (max === r) {
    hue = ((g - b) / delta) % 6;
  } else if (max === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }

  return Math.round(hue * 60);
}
