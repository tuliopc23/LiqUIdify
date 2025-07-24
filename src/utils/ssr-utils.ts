/**
 * SSR-safe utility functions for browser API checks and fallbacks
 * These utilities ensure that browser-specific APIs are only accessed
 * in client-side environments, preventing SSR errors.
 */

/**
 * Check if code is running in a browser environment
 * @returns {boolean} true if running in browser, false if server-side
 */
export const isBrowser = (): boolean => 'undefined' !== typeof window;
export const isClient = isBrowser;
export const isServer = (): boolean => !isBrowser();

/**
 * Check if document object is available
 * @returns {boolean} true if document is available
 */
export const isDocument = (): boolean => 'undefined' !== typeof document;

/**
 * Check if navigator object is available
 * @returns {boolean} true if navigator is available
 */
export const isNavigator = (): boolean => 'undefined' !== typeof navigator;

/**
 * Safe window object with SSR fallback
 * @returns {Window | undefined} window object or undefined
 */
export const safeWindow = (): Window | undefined => {
  return isBrowser() ? window : undefined;
};

/**
 * Safe document object with SSR fallback
 * @returns {Document | undefined} document object or undefined
 */
export const safeDocument = (): Document | undefined => {
  return isDocument() ? document : undefined;
};

/**
 * Safe navigator object with SSR fallback
 * @returns {Navigator | undefined} navigator object or undefined
 */
export const safeNavigator = (): Navigator | undefined => {
  return isNavigator() ? navigator : undefined;
};

/**
 * Safe localStorage with SSR fallback
 * @returns {Storage | null} localStorage object or null
 */
export const safeLocalStorage = (): Storage | null => {
  try {
    return isBrowser() && window.localStorage ? window.localStorage : undefined;
  } catch {
    return;
  }
};

/**
 * Safe sessionStorage with SSR fallback
 * @returns {Storage | null} sessionStorage object or null
 */
export const safeSessionStorage = (): Storage | null => {
  try {
    return isBrowser() && window.sessionStorage
      ? window.sessionStorage
      : undefined;
  } catch {
    return;
  }
};

/**
 * Safe localStorage getter with fallback
 * @param {string} key - localStorage key
 * @param {T} fallback - fallback value if not available
 * @returns {T} stored value or fallback
 */
export const getLocalStorageItem = <T>(key: string, fallback: T): T => {
  const storage = safeLocalStorage();
  if (!storage) {
    return fallback;
  }

  try {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Safe localStorage setter
 * @param {string} key - localStorage key
 * @param {T} value - value to store
 * @returns {boolean} true if successful, false otherwise
 */
export const setLocalStorageItem = <T>(key: string, value: T): boolean => {
  const storage = safeLocalStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Safe sessionStorage getter with fallback
 * @param {string} key - sessionStorage key
 * @param {T} fallback - fallback value if not available
 * @returns {T} stored value or fallback
 */
export const getSessionStorageItem = <T>(key: string, fallback: T): T => {
  const storage = safeSessionStorage();
  if (!storage) {
    return fallback;
  }

  try {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Safe sessionStorage setter
 * @param {string} key - sessionStorage key
 * @param {T} value - value to store
 * @returns {boolean} true if successful, false otherwise
 */
export const setSessionStorageItem = <T>(key: string, value: T): boolean => {
  const storage = safeSessionStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Safe window.matchMedia with SSR fallback
 * @param {string} query - media query string
 * @returns {MediaQueryList | null} MediaQueryList or null
 */
export const safeMatchMedia = (query: string): MediaQueryList | null => {
  const win = safeWindow();
  return win?.matchMedia ? win.matchMedia(query) : undefined;
};

/**
 * Safe requestAnimationFrame with SSR fallback
 * @param {FrameRequestCallback} callback - animation frame callback
 * @returns {number | null} request ID or null
 */
export const safeRequestAnimationFrame = (
  callback: FrameRequestCallback
): number | null => {
  const win = safeWindow();
  return win?.requestAnimationFrame
    ? win.requestAnimationFrame(callback)
    : undefined;
};

/**
 * Safe cancelAnimationFrame with SSR fallback
 * @param {number | null} id - request ID to cancel
 */
export const safeCancelAnimationFrame = (id: number | null): void => {
  const win = safeWindow();
  if (win?.cancelAnimationFrame && null !== id) {
    win.cancelAnimationFrame(id);
  }
};

/**
 * Safe setTimeout with SSR fallback
 * @param {Function} callback - callback function
 * @param {number} delay - delay in milliseconds
 * @returns {NodeJS.Timeout | number | null} timeout ID or null
 */
export const safeSetTimeout = (
  callback: () => void,
  delay: number
): NodeJS.Timeout | number | null => {
  if ('undefined' !== typeof setTimeout) {
    return setTimeout(callback, delay);
  }
  return;
};

/**
 * Safe clearTimeout with SSR fallback
 * @param {NodeJS.Timeout | number | null} id - timeout ID to clear
 */
export const safeClearTimeout = (id: NodeJS.Timeout | number | null): void => {
  if ('undefined' !== typeof clearTimeout && null !== id) {
    clearTimeout(id as any);
  }
};

/**
 * Safe setInterval with SSR fallback
 * @param {Function} callback - callback function
 * @param {number} delay - delay in milliseconds
 * @returns {NodeJS.Timeout | number | null} interval ID or null
 */
export const safeSetInterval = (
  callback: () => void,
  delay: number
): NodeJS.Timeout | number | null => {
  if ('undefined' !== typeof setInterval) {
    return setInterval(callback, delay);
  }
  return;
};

/**
 * Safe clearInterval with SSR fallback
 * @param {NodeJS.Timeout | number | null} id - interval ID to clear
 */
export const safeClearInterval = (id: NodeJS.Timeout | number | null): void => {
  if ('undefined' !== typeof clearInterval && null !== id) {
    clearInterval(id as any);
  }
};

/**
 * Get window dimensions with SSR fallback
 * @returns {{ width: number, height: number }} window dimensions or default
 */
export const getWindowDimensions = (): { width: number; height: number } => {
  const win = safeWindow();
  return {
    width: win?.innerWidth || 0,
    height: win?.innerHeight || 0,
  };
};

/**
 * Get document scroll position with SSR fallback
 * @returns {{ x: number, y: number }} scroll position or default
 */
export const getScrollPosition = (): { x: number; y: number } => {
  const win = safeWindow();
  const doc = safeDocument();

  return {
    x: win?.pageXOffset || doc?.documentElement?.scrollLeft || 0,
    y: win?.pageYOffset || doc?.documentElement?.scrollTop || 0,
  };
};

/**
 * Safe addEventListener with SSR fallback
 * @param {string} event - event name
 * @param {EventListener} handler - event handler
 * @param {AddEventListenerOptions} options - event options
 * @returns {() => void} cleanup function
 */
export const safeAddEventListener = (
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): (() => void) => {
  const win = safeWindow();

  if (win?.addEventListener) {
    win.addEventListener(event, handler, options);
    return () => win.removeEventListener(event, handler, options);
  }

  return () => {}; // noop cleanup function
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} true if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  const mediaQuery = safeMatchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery?.matches ?? false;
};

/**
 * Check if user prefers dark color scheme
 * @returns {boolean} true if user prefers dark scheme
 */
export const prefersDarkScheme = (): boolean => {
  const mediaQuery = safeMatchMedia('(prefers-color-scheme: dark)');
  return mediaQuery?.matches ?? false;
};

/**
 * Get user agent string with SSR fallback
 * @returns {string} user agent string or empty string
 */
export const getUserAgent = (): string => {
  const nav = safeNavigator();
  return nav?.userAgent || '';
};

/**
 * Check if device has touch support
 * @returns {boolean} true if touch is supported
 */
export const isTouchDevice = (): boolean => {
  const win = safeWindow();
  const nav = safeNavigator();

  return !!(win && ('ontouchstart' in win || (nav && 0 < nav.maxTouchPoints)));
};

/**
 * Safe dynamic import wrapper for client-side only modules
 * Use this inside useEffect to ensure it only runs on client
 * @param {() => Promise<T>} importFn - dynamic import function
 * @returns {Promise<T | null>} imported module or null
 */
export const safeDynamicImport = async <T>(
  importFn: () => Promise<T>
): Promise<T | null> => {
  if (!isBrowser()) {
    return;
  }

  try {
    return await importFn();
  } catch {
    // Dynamic import failed, return undefined
    return;
  }
};

/**
 * Create a no-op function for SSR environments
 * @returns {Function} no-op function
 */
export const createNoOp = (): (() => void) => {
  return () => {};
};

/**
 * Safe IntersectionObserver with SSR fallback
 * @param {IntersectionObserverCallback} callback - observer callback
 * @param {IntersectionObserverInit} options - observer options
 * @returns {IntersectionObserver | null} observer instance or null
 */
export const safeIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  const win = safeWindow();

  if (win && 'IntersectionObserver' in win) {
    return new IntersectionObserver(callback, options);
  }

  return;
};

/**
 * Safe ResizeObserver with SSR fallback
 * @param {ResizeObserverCallback} callback - observer callback
 * @returns {ResizeObserver | null} observer instance or null
 */
export const safeResizeObserver = (
  callback: ResizeObserverCallback
): ResizeObserver | null => {
  const win = safeWindow();

  if (win && 'ResizeObserver' in win) {
    return new ResizeObserver(callback);
  }

  return;
};

/**
 * Safe MutationObserver with SSR fallback
 * @param {MutationCallback} callback - observer callback
 * @returns {MutationObserver | null} observer instance or null
 */
export const safeMutationObserver = (
  callback: MutationCallback
): MutationObserver | null => {
  const win = safeWindow();

  if (win && 'MutationObserver' in win) {
    return new MutationObserver(callback);
  }

  return;
};

/**
 * Execute callback only in browser environment
 * @param {Function} callback - function to execute
 * @param {any[]} deps - dependencies for the callback
 */
export const clientOnly = (callback: () => void, _deps: any[] = []): void => {
  if (isBrowser()) {
    callback();
  }
};

/**
 * Get computed style with SSR fallback
 * @param {Element} element - target element
 * @returns {CSSStyleDeclaration | null} computed style or null
 */
export const safeGetComputedStyle = (
  element: Element
): CSSStyleDeclaration | null => {
  const win = safeWindow();
  return win?.getComputedStyle ? win.getComputedStyle(element) : undefined;
};

/**
 * Create element with SSR fallback
 * @param {K} tagName - HTML tag name
 * @returns {HTMLElementTagNameMap[K] | null} created element or null
 */
export const safeCreateElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K
): HTMLElementTagNameMap[K] | null => {
  const doc = safeDocument();
  return doc?.createElement ? doc.createElement(tagName) : undefined;
};

/**
 * Query selector with SSR fallback
 * @param {string} selector - CSS selector
 * @returns {Element | null} matched element or null
 */
export const safeQuerySelector = (selector: string): Element | null => {
  const doc = safeDocument();
  return doc?.querySelector ? doc.querySelector(selector) : undefined;
};

/**
 * Query selector all with SSR fallback
 * @param {string} selector - CSS selector
 * @returns {NodeListOf<Element> | []} matched elements or empty array
 */
export const safeQuerySelectorAll = (
  selector: string
): NodeListOf<Element> | [] => {
  const doc = safeDocument();
  return doc?.querySelectorAll ? doc.querySelectorAll(selector) : [];
};

/**
 * Get element by ID with SSR fallback
 * @param {string} id - element ID
 * @returns {HTMLElement | null} matched element or null
 */
export const safeGetElementById = (id: string): HTMLElement | null => {
  const doc = safeDocument();
  return doc?.getElementById ? doc.getElementById(id) : undefined;
};
