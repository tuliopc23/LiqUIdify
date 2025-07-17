import React, { createContext, useContext, ReactNode } from 'react';
import { GracefulDegradationManager, DegradationConfig } from '../utils/graceful-degradation';

interface GracefulDegradationContextType {
  manager: GracefulDegradationManager;
  config: DegradationConfig;
}

const GracefulDegradationContext = createContext<GracefulDegradationContextType | null>(null);

interface GracefulDegradationProviderProps {
  children: ReactNode;
  config?: Partial<DegradationConfig>;
}

export const GracefulDegradationProvider: React.FC<GracefulDegradationProviderProps> = ({
  children,
  config = {},
}) => {
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
    <GracefulDegradationContext.Provider value={{ manager, config: defaultConfig }}>
      {children}
    </GracefulDegradationContext.Provider>
  );
};

export const useGracefulDegradation = () => {
  const context = useContext(GracefulDegradationContext);
  if (!context) {
    throw new Error('useGracefulDegradation must be used within GracefulDegradationProvider');
  }
  return context;
};