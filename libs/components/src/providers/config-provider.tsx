import type { ReactNode } from "react";
import {
  GlassUIProvider,
  type GlassUIProviderProps,
} from "./glass-ui-provider";
import {
  GlobalConfigProvider,
  type GlobalConfigProviderProps,
} from "./global-config-provider";

export interface ConfigProviderProps {
  children: ReactNode;
  glassConfig?: GlassUIProviderProps["glassConfig"];
  hapticConfig?: GlassUIProviderProps["hapticConfig"];
  theme?: GlassUIProviderProps["theme"];
  globalConfig?: GlobalConfigProviderProps["config"];
}

/**
 * Combined configuration provider that wraps both GlassUIProvider and GlobalConfigProvider
 * for easier setup and SSR safety
 */
export function ConfigProvider({
  children,
  glassConfig,
  hapticConfig,
  theme = "light",
  globalConfig,
}: ConfigProviderProps) {
  return (
    <GlobalConfigProvider config={globalConfig}>
      <GlassUIProvider
        theme={theme}
        glassConfig={glassConfig}
        hapticConfig={hapticConfig}
      >
        {children}
      </GlassUIProvider>
    </GlobalConfigProvider>
  );
}

// Alias for backward compatibility
export const LiquidifyProvider = ConfigProvider;
