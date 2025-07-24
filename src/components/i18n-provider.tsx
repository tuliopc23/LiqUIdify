import type { I18nConfig } from '../utils/i18n';
import React, { useCallback, useMemo, useState } from 'react';
import {
  I18nContext,
  i18n as i18nInstance,
} from '../utils/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, Record<string, string>>;
}

/**
 * I18n Provider component for LiqUIdify
 * Provides internationalization context to child components
 */
export const I18nProvider = ({
  children,
  locale = 'en',
  messages,
}: I18nProviderProps) => {
  const [currentLocale, setCurrentLocale] = useState(locale);

  // Initialize i18n with provided config
  useMemo(() => {
    if (messages) {
      for (const [loc, msgs] of Object.entries(messages)) {
        i18nInstance.addMessages(loc, msgs);
      }
    }
    i18nInstance.setLocale(locale);
  }, [locale, messages]);

  const setLocale = useCallback((newLocale: string) => {
    i18nInstance.setLocale(newLocale);
    setCurrentLocale(newLocale);
  }, []);

  const translate = useCallback(
    (key: string, params?: Record<string, unknown>) => i18nInstance.t(key, params),
    [],
  ); // Re-create when locale changes

  const contextValue = useMemo(
    () => ({
      locale: currentLocale,
      setLocale,
      t: translate,
    }),
    [currentLocale, setLocale, translate],
  );

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};
