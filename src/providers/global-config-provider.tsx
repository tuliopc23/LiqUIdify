import React, { createContext, type ReactNode } from 'react';

export interface GlobalConfig {
  defaultVariant?: 'default' | 'glass' | 'frosted' | 'liquid';
  defaultSize?: 'sm' | 'md' | 'lg';
  enableAnimations?: boolean;
  enableA11y?: boolean;
  colorScheme?: 'auto' | 'light' | 'dark';
  reducedMotion?: boolean;
  highContrast?: boolean;
}

const defaultConfig: GlobalConfig = {
  defaultVariant: 'glass',
  defaultSize: 'md',
  enableAnimations: true,
  enableA11y: true,
  colorScheme: 'auto',
  reducedMotion: false,
  highContrast: false,
};

export const GlobalConfigContext = createContext<GlobalConfig>(defaultConfig);

export interface GlobalConfigProviderProps {
  children: ReactNode;
  config?: Partial<GlobalConfig>;
}

export function GlobalConfigProvider({
  children,
  config = {},
}: GlobalConfigProviderProps) {
  const mergedConfig = { ...defaultConfig, ...config };

  return (
    <GlobalConfigContext.Provider value={mergedConfig}>
      {children}
    </GlobalConfigContext.Provider>
  );
}

