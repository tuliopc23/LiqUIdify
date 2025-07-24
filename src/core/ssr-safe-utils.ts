/**
 * Enhanced SSR-Safe Utilities
 * Provides centralized utilities to replace manual typeof checks throughout the codebase
 */

import { 
  isSSR, 
  isClient, 
  safeAddEventListener, 
  safeGetWindowProperty,
  safeGetViewportDimensions 
} from './ssr-safe-dom';

export const safeWindow = {
  addEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => {
    if (isSSR()) return () => {};
    return safeAddEventListener(window, type, listener, options);
  },

  removeEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) => {
    if (isSSR()) return;
    try {
      window.removeEventListener(type, listener, options);
    } catch {
    }
  },

  getProperty: <T>(property: keyof Window, fallback: T): T => {
    return safeGetWindowProperty(property, fallback);
  },

  getDimensions: () => safeGetViewportDimensions(),

  getInnerWidth: (fallback: number = 1024): number => {
    return safeGetWindowProperty('innerWidth', fallback);
  },

  getInnerHeight: (fallback: number = 768): number => {
    return safeGetWindowProperty('innerHeight', fallback);
  },

  getLocation: () => {
    if (isSSR()) {
      return {
        href: '',
        pathname: '/',
        search: '',
        hash: '',
        reload: () => {},
      };
    }
    return window.location;
  },

  reload: () => {
    if (isSSR()) return;
    try {
      window.location.reload();
    } catch {
    }
  },
};

export const safeDocument = {
  addEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => {
    if (isSSR()) return () => {};
    return safeAddEventListener(document, type, listener, options);
  },

  removeEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) => {
    if (isSSR()) return;
    try {
      document.removeEventListener(type, listener, options);
    } catch {
    }
  },

  querySelector: <T extends Element = Element>(selector: string): T | null => {
    if (isSSR()) return null;
    try {
      return document.querySelector<T>(selector);
    } catch {
      return null;
    }
  },

  querySelectorAll: <T extends Element = Element>(selector: string): NodeListOf<T> | T[] => {
    if (isSSR()) return [] as T[];
    try {
      return document.querySelectorAll<T>(selector);
    } catch {
      return [] as T[];
    }
  },

  getElementById: <T extends HTMLElement = HTMLElement>(id: string): T | null => {
    if (isSSR()) return null;
    try {
      return document.getElementById(id) as T | null;
    } catch {
      return null;
    }
  },

  getBody: (): HTMLElement | null => {
    if (isSSR()) return null;
    return document.body;
  },

  getActiveElement: (): Element | null => {
    if (isSSR()) return null;
    return document.activeElement;
  },
};

export const withClientSide = <T>(
  clientFn: () => T,
  fallback?: T
): T | undefined => {
  if (isClient()) {
    try {
      return clientFn();
    } catch {
      return fallback;
    }
  }
  return fallback;
};

export const withSSRFallback = <T>(
  clientFn: () => T,
  ssrFallback: T
): T => {
  if (isSSR()) {
    return ssrFallback;
  }
  
  try {
    return clientFn();
  } catch {
    return ssrFallback;
  }
};

export const getSSRSafeEffectConfig = (
  effect: () => void | (() => void),
  deps?: React.DependencyList
) => {
  return { effect, deps, isSSR: isSSR() };
};

export const safeMatchMedia = (query: string) => {
  if (isSSR()) {
    return {
      matches: false,
      addEventListener: () => () => {},
      removeEventListener: () => {},
    };
  }

  try {
    return window.matchMedia(query);
  } catch {
    return {
      matches: false,
      addEventListener: () => () => {},
      removeEventListener: () => {},
    };
  }
};

export const safeRequestAnimationFrame = (callback: FrameRequestCallback): number => {
  if (isSSR()) return 0;
  
  try {
    return window.requestAnimationFrame(callback);
  } catch {
    return 0;
  }
};

export const safeCancelAnimationFrame = (id: number): void => {
  if (isSSR()) return;
  
  try {
    window.cancelAnimationFrame(id);
  } catch {
  }
};

export const SSRSafe = {
  isSSR,
  isClient,
  window: safeWindow,
  document: safeDocument,
  withClientSide,
  withSSRFallback,
  matchMedia: safeMatchMedia,
  requestAnimationFrame: safeRequestAnimationFrame,
  cancelAnimationFrame: safeCancelAnimationFrame,
};

export default SSRSafe;
