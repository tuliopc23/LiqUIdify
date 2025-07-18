import { type ReactNode } from 'react';
import { ThemeProvider } from '../hooks/use-theme';
import { LiquidGlassProvider } from '../hooks/use-liquid-glass';
import { HapticProvider } from '../hooks/use-haptic-feedback';
import { ToastProvider } from '../components/glass-toast/glass-toast';
import { GlassLiveRegionProvider } from '../components/glass-live-region';
import { GlassErrorBoundary } from '../components/glass-error-boundary';

export interface GlassUIProviderProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
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
  theme = 'light',
  glassConfig,
  hapticConfig,
}: GlassUIProviderProps) {
  return (
    <GlassErrorBoundary level="page">
      <ThemeProvider defaultTheme={theme} storageKey="glass-ui-theme">
        <LiquidGlassProvider {...glassConfig}>
          <HapticProvider {...hapticConfig}>
            <GlassLiveRegionProvider>
              <ToastProvider>{children}</ToastProvider>
            </GlassLiveRegionProvider>
          </HapticProvider>
        </LiquidGlassProvider>
      </ThemeProvider>
    </GlassErrorBoundary>
  );
}
