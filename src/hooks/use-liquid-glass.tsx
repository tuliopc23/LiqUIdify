/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
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

      if (!merged.adaptToContent) return;

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
      const adaptedColor = `hsl(${hue}, 20%, ${analysis.brightness > 0.5 ? 95 : 15}%)`;
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

// Content-aware glass hook
export const useContentAwareGlass = (
  contentRef: React.RefObject<HTMLElement>
) => {
  const { updateGlassStyle, adaptToContent } = useLiquidGlass();
  const analysisRef = useRef<ContentAnalysis | null>(null);

  const analyzeContent = useCallback(async () => {
    if (!contentRef.current || !adaptToContent) return;

    try {
      const element = contentRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Create a temporary canvas to analyze the content
      const rect = element.getBoundingClientRect();
      canvas.width = Math.min(rect.width, 200);
      canvas.height = Math.min(rect.height, 200);

      // Capture element as image data (simplified approach)
      const computedStyle = getComputedStyle(element);
      const bgColor = computedStyle.backgroundColor;

      // Parse background color and analyze
      const analysis = analyzeColor(bgColor);

      if (
        analysis &&
        JSON.stringify(analysis) !== JSON.stringify(analysisRef.current)
      ) {
        analysisRef.current = analysis;
        updateGlassStyle(analysis);
      }
    } catch (error) {
      console.warn('Content analysis failed:', error);
    }
  }, [contentRef, updateGlassStyle, adaptToContent]);

  useEffect(() => {
    if (!adaptToContent) return;
    if (
      typeof window === 'undefined' ||
      !('MutationObserver' in window) ||
      !('ResizeObserver' in window)
    ) {
      return;
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
    };
  }, [analyzeContent, adaptToContent, contentRef]);

  return analysisRef.current;
};

// Helper function to analyze color
function analyzeColor(colorString: string): ContentAnalysis | null {
  if (!colorString || typeof colorString !== 'string') {
    console.warn('analyzeColor: Invalid color string provided:', colorString);
    return null;
  }

  try {
    // Parse RGB values from color string with better error handling
    const rgbMatch = colorString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );

    if (!rgbMatch) {
      console.warn('analyzeColor: Could not parse color string:', colorString);
      // Return a default analysis for unrecognized colors
      return {
        averageColor: 'rgb(128, 128, 128)',
        brightness: 0.5,
        contrast: 0.5,
        dominantHue: 0,
      };
    }

    const r = parseInt(rgbMatch[1], 10) / 255;
    const g = parseInt(rgbMatch[2], 10) / 255;
    const b = parseInt(rgbMatch[3], 10) / 255;

    // Validate parsed values
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      console.warn('analyzeColor: Invalid RGB values:', { r, g, b });
      return null;
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
    console.warn('analyzeColor: Error processing color:', error);
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

  if (delta === 0) return 0;

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
