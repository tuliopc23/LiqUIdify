export interface LiquidGlassConfig {
    color?: string;
    blur?: number;
    saturation?: number;
    opacity?: number;
    adaptToContent?: boolean;
    specularHighlights?: boolean;
    magneticHover?: boolean;
}
export interface ContentAnalysis {
    averageColor: string;
    brightness: number;
    contrast: number;
    dominantHue: number;
}
export declare function LiquidGlassProvider({ children, config, }: {
    children: React.ReactNode;
    config?: LiquidGlassConfig;
}): import("react/jsx-runtime").JSX.Element;
export declare const useLiquidGlass: () => LiquidGlassConfig & {
    contentAnalysis?: ContentAnalysis;
    updateGlassStyle: (_analysis: ContentAnalysis) => void;
};
export declare const useContentAwareGlass: (contentRef: React.RefObject<HTMLElement>) => ContentAnalysis | undefined;
//# sourceMappingURL=use-liquid-glass.d.ts.map