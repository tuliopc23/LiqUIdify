/**
 * Simple i18n wrapper for LiqUIdify
 * This provides a basic internationalization setup that can be extended
 * with react-intl or other i18n libraries as needed
 */

export interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, Record<string, string>>;
}

export interface I18nContext {
  locale: string;
  t: (key: string, params?: Record<string, any>) => string;
  setLocale: (locale: string) => void;
}

// Default messages for English
const defaultMessages: Record<string, Record<string, string>> = {
  en: {
    // Common UI elements
    'common.close': 'Close',
    'common.open': 'Open',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Info',

    // Accessibility
    'a11y.skipToContent': 'Skip to content',
    'a11y.menu': 'Menu',
    'a11y.navigation': 'Navigation',
    'a11y.search': 'Search',
    'a11y.closeModal': 'Close modal',
    'a11y.openMenu': 'Open menu',
    'a11y.closeMenu': 'Close menu',

    // Forms
    'form.required': 'This field is required',
    'form.invalid': 'Invalid input',
    'form.submit': 'Submit',
    'form.reset': 'Reset',

    // Glass components
    'glass.reducedMotion': 'Animations reduced for accessibility',
    'glass.highContrast': 'High contrast mode active',
  },
};

class I18n {
  private config: I18nConfig;
  private currentLocale: string;

  constructor(config?: Partial<I18nConfig>) {
    this.config = {
      locale: config?.locale || 'en',
      fallbackLocale: config?.fallbackLocale || 'en',
      messages: { ...defaultMessages, ...config?.messages },
    };
    this.currentLocale = this.config.locale;
  }

  /**
   * Translate a key to the current locale
   * @param key - The translation key
   * @param params - Optional parameters for interpolation
   * @returns The translated string
   */
  t(key: string, params?: Record<string, any>): string {
    const messages =
      this.config.messages[this.currentLocale] ||
      this.config.messages[this.config.fallbackLocale];
    let message = messages?.[key] || key;

    // Simple parameter interpolation
    if (params) {
      for (const [parameterKey, value] of Object.entries(params)) {
        message = message.replaceAll(
          new RegExp(`\\{${parameterKey}\\}`, 'g'),
          String(value)
        );
      }
    }

    return message;
  }

  /**
   * Set the current locale
   * @param locale - The locale to set
   */
  setLocale(locale: string): void {
    if (this.config.messages[locale]) {
      this.currentLocale = locale;
    } else {
      // Logging disabled
      this.currentLocale = this.config.fallbackLocale;
    }
  }

  /**
   * Get the current locale
   * @returns The current locale
   */
  getLocale(): string {
    return this.currentLocale;
  }

  /**
   * Add messages for a locale
   * @param locale - The locale to add messages for
   * @param messages - The messages to add
   */
  addMessages(locale: string, messages: Record<string, string>): void {
    this.config.messages[locale] = {
      ...this.config.messages[locale],
      ...messages,
    };
  }

  /**
   * Check if a locale is supported
   * @param locale - The locale to check
   * @returns Whether the locale is supported
   */
  isLocaleSupported(locale: string): boolean {
    return locale in this.config.messages;
  }

  /**
   * Get all supported locales
   * @returns Array of supported locale codes
   */
  getSupportedLocales(): Array<string> {
    return Object.keys(this.config.messages);
  }
}

// Create a singleton instance
export const i18n = new I18n();

// Export convenience function
export const t = i18n.t.bind(i18n);

// React hook for i18n (to be used with a context provider)
import { createContext, useContext } from 'react';

export const I18nContext = createContext<I18nContext>({
  locale: 'en',
  t: i18n.t.bind(i18n),
  setLocale: i18n.setLocale.bind(i18n),
});

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    // Fallback to singleton if not in provider
    return {
      locale: i18n.getLocale(),
      t: i18n.t.bind(i18n),
      setLocale: i18n.setLocale.bind(i18n),
    };
  }
  return context;
};
