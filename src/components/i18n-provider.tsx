import React, { useCallback, useMemo, useState } from 'react';
import { type I18nConfig, I18nContext, i18n as i18nInstance } from '../utils/i18n';

export interface I18nProviderProps {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, Record<string, string>>;
  fallbackLocale?: string;
}

/**
 * I18n Provider component for LiqUIdify
 * Provides internationalization context to child components
 */
export function I18nProvider({ 
  children, 
  locale = 'en',
  messages,
  fallbackLocale = 'en'
}: I18nProviderProps) {
  const [currentLocale, setCurrentLocale] = useState(locale);
  
  // Initialize i18n with provided config
  useMemo(() => {
    if (messages) {
      Object.entries(messages).forEach(([loc, msgs]) => {
        i18nInstance.addMessages(loc, msgs);
      });
    }
    i18nInstance.setLocale(locale);
  }, [locale, messages]);
  
  const setLocale = useCallback((newLocale: string) => {
    i18nInstance.setLocale(newLocale);
    setCurrentLocale(newLocale);
  }, []);
  
  const t = useCallback((key: string, params?: Record<string, any>) => {
    return i18nInstance.t(key, params);
  }, [currentLocale]); // Re-create when locale changes
  
  const contextValue = useMemo(() => ({
    locale: currentLocale,
    t,
    setLocale
  }), [currentLocale, t, setLocale]);
  
  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}