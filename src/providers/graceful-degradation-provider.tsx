import type React from 'react';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { DegradationConfig } from '../utils/graceful-degradation';
import { GracefulDegradationManager } from '../utils/graceful-degradation';

interface GracefulDegradationContextType {
  manager: GracefulDegradationManager;
  config: DegradationConfig;
}

const GracefulDegradationContext =
  createContext<GracefulDegradationContextType | null>(undefined);

interface GracefulDegradationProviderProps {
  children: ReactNode;
  config?: Partial<DegradationConfig>;
}

export const GracefulDegradationProvider: React.FC<
  GracefulDegradationProviderProps
> = ({ children, config = {} }) => {
  const manager = GracefulDegradationManager.getInstance();
  const defaultConfig: DegradationConfig = {
    enableFallbacks: true,
    enableStaticFallbacks: true,
    enableCSSFallbacks: true,
    enableNetworkFallbacks: true,
    enablePerformanceFallbacks: true,
    enableAccessibilityFallbacks: true,
    ...config,
  };

  return (

    <GracefulDegradationContext.Provider
      value={{ manager, config: defaultConfig }}
    >
      {children}
    </GracefulDegradationContext.Provider>
  );
};

export const useGracefulDegradation = () => {
  const context = useContext(GracefulDegradationContext);
  if (!context) {
    throw new Error(
      'useGracefulDegradation must be used within GracefulDegradationProvider'
    );
  }
  return context;
};
