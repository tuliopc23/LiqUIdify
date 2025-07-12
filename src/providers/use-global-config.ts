import { useContext } from 'react';
import { GlobalConfigContext } from './global-config-provider';

export function useGlobalConfig() {
  const context = useContext(GlobalConfigContext);
  if (!context) {
    throw new Error(
      'useGlobalConfig must be used within a GlobalConfigProvider'
    );
  }
  return context;
}