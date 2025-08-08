import type { ReactNode } from "react";
import {
  GlassUIProvider,
  type GlassUIProviderProps,
} from "./glass-ui-provider";
import {
  GlobalConfigProvider,
  type GlobalConfigProviderProps,
} from "./global-config-provider";

interface ConfigProviderProps {
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
function ConfigProvider({
  children,
  glassConfig,
  hapticConfig,
  theme = "light",
  globalConfig,
}: ConfigProviderProps) {
  return (
    <GlobalConfigProvider config={globalConfig || {}}>
      <GlassUIProvider
        theme={theme}
        glassConfig={glassConfig || {}}
        hapticConfig={hapticConfig || {}}
      >
        {children}
      </GlassUIProvider>
    </GlobalConfigProvider>
  );
}

// Export the main provider
export { ConfigProvider as default };

// Alias for backward compatibility
const LiquidifyProvider = ConfigProvider;
