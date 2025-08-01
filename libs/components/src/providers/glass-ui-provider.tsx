import type { ReactNode } from "react";
import { GlassErrorBoundary } from "../components/glass-error-boundary";
import { _GlassLiveRegionProvider } from "../components/glass-live-region";

import { ToastProvider } from "../components/glass-toast/glass-toast";

import { HapticProvider } from "../hooks/use-haptic-feedback";

import { LiquidGlassProvider } from "../hooks/use-liquid-glass";

import { ThemeProvider } from "../hooks/use-theme";

export interface GlassUIProviderProps {
  children: ReactNode;
  theme?: "light" | "dark";
  glassConfig?: {
    intensity?: number;
    blur?: number;
    saturation?: number;
    enableMagnetic?: boolean;
    enableSpecular?: boolean;
  };
  hapticConfig?: {
    enableVibration?: boolean;
    enableAudio?: boolean;
    enableVisual?: boolean;
  };
}

export function GlassUIProvider({
  children,
  theme = "light",
  glassConfig,
  hapticConfig,
}: GlassUIProviderProps) {
  return (
    <GlassErrorBoundary level="page">
      <ThemeProvider defaultTheme={theme} storageKey="glass-ui-theme">
        <LiquidGlassProvider {...glassConfig}>
          <HapticProvider {...hapticConfig}>
            <_GlassLiveRegionProvider>
              <ToastProvider>{children}</ToastProvider>
            </_GlassLiveRegionProvider>
          </HapticProvider>
        </LiquidGlassProvider>
      </ThemeProvider>
    </GlassErrorBoundary>
  );
}
