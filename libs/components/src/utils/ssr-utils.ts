/**
 * SSR-safe utility functions for browser API checks and fallbacks
 * These utilities ensure that browser-specific APIs are only accessed
 * in client-side environments, preventing SSR errors.
 */

/**
 * Check if code is running in a browser environment
 * @returns {boolean} true if running in browser, false if server-side
 */
const isBrowser = (): boolean => typeof window !== "undefined";
const _isClient = isBrowser;
const _isServer = (): boolean => !isBrowser();

/**
 * Check if document object is available
 * @returns {boolean} true if document is available
 */
const isDocument = (): boolean => typeof document !== "undefined";

/**
 * Check if navigator object is available
 * @returns {boolean} true if navigator is available
 */
const isNavigator = (): boolean => typeof navigator !== "undefined";

/**
 * Safe window object with SSR fallback
 * @returns {Window | undefined} window object or undefined
 */
const safeWindow = (): Window | undefined => {
  return isBrowser() ? window : undefined;
};

/**
 * Safe document object with SSR fallback
 * @returns {Document | undefined} document object or undefined
 */
const safeDocument = (): Document | undefined => {
  return isDocument() ? document : undefined;
};

/**
 * Safe navigator object with SSR fallback
 * @returns {Navigator | undefined} navigator object or undefined
 */
const safeNavigator = (): Navigator | undefined => {
  return isNavigator() ? navigator : undefined;
};

/**
 * Safe localStorage with SSR fallback
 * @returns {Storage | null} localStorage object or null
 */
const safeLocalStorage = (): Storage | null => {
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
const safeSessionStorage = (): Storage | null => {
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
const _getLocalStorageItem = <T>(key: string, fallback: T): T => {
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
const _setLocalStorageItem = <T>(key: string, value: T): boolean => {
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
const _getSessionStorageItem = <T>(key: string, fallback: T): T => {
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
const _setSessionStorageItem = <T>(key: string, value: T): boolean => {
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
const safeMatchMedia = (query: string): MediaQueryList | null => {
  const win = safeWindow();
  return win?.matchMedia ? win.matchMedia(query) : undefined;
};

/**
 * Safe requestAnimationFrame with SSR fallback
 * @param {FrameRequestCallback} callback - animation frame callback
 * @returns {number | null} request ID or null
 */
const _safeRequestAnimationFrame = (
  callback: FrameRequestCallback,
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
const _safeCancelAnimationFrame = (id: number | null): void => {
  const win = safeWindow();
  if (win?.cancelAnimationFrame && id !== null) {
    win.cancelAnimationFrame(id);
  }
};

/**
 * Safe setTimeout with SSR fallback
 * @param {Function} callback - callback function
 * @param {number} delay - delay in milliseconds
 * @returns {NodeJS.Timeout | number | null} timeout ID or null
 */
const _safeSetTimeout = (
  callback: () => void,
  delay: number,
): NodeJS.Timeout | number | null => {
  if (typeof setTimeout !== "undefined") {
    return setTimeout(callback, delay);
  }
  return;
};

/**
 * Safe clearTimeout with SSR fallback
 * @param {NodeJS.Timeout | number | null} id - timeout ID to clear
 */
const _safeClearTimeout = (id: NodeJS.Timeout | number | null): void => {
  if (typeof clearTimeout !== "undefined" && id !== null) {
    clearTimeout(id as unknown);
  }
};

/**
 * Safe setInterval with SSR fallback
 * @param {Function} callback - callback function
 * @param {number} delay - delay in milliseconds
 * @returns {NodeJS.Timeout | number | null} interval ID or null
 */
const _safeSetInterval = (
  callback: () => void,
  delay: number,
): NodeJS.Timeout | number | null => {
  if (typeof setInterval !== "undefined") {
    return setInterval(callback, delay);
  }
  return;
};

/**
 * Safe clearInterval with SSR fallback
 * @param {NodeJS.Timeout | number | null} id - interval ID to clear
 */
const _safeClearInterval = (id: NodeJS.Timeout | number | null): void => {
  if (typeof clearInterval !== "undefined" && id !== null) {
    clearInterval(id as unknown);
  }
};

/**
 * Get window dimensions with SSR fallback
 * @returns {{ width: number, height: number }} window dimensions or default
 */
const _getWindowDimensions = (): { width: number; height: number } => {
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
const _getScrollPosition = (): { x: number; y: number } => {
  const win = safeWindow();
  const document_ = safeDocument();

  return {
    x: win?.pageXOffset || document_?.documentElement?.scrollLeft || 0,
    y: win?.pageYOffset || document_?.documentElement?.scrollTop || 0,
  };
};

/**
 * Safe addEventListener with SSR fallback
 * @param {string} event - event name
 * @param {EventListener} handler - event handler
 * @param {AddEventListenerOptions} options - event options
 * @returns {() => void} cleanup function
 */
const _safeAddEventListener = (
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions,
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
const _prefersReducedMotion = (): boolean => {
  const mediaQuery = safeMatchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery?.matches ?? false;
};

/**
 * Check if user prefers dark color scheme
 * @returns {boolean} true if user prefers dark scheme
 */
const _prefersDarkScheme = (): boolean => {
  const mediaQuery = safeMatchMedia("(prefers-color-scheme: dark)");
  return mediaQuery?.matches ?? false;
};

/**
 * Get user agent string with SSR fallback
 * @returns {string} user agent string or empty string
 */
const _getUserAgent = (): string => {
  const nav = safeNavigator();
  return nav?.userAgent || "";
};

/**
 * Check if device has touch support
 * @returns {boolean} true if touch is supported
 */
const _isTouchDevice = (): boolean => {
  const win = safeWindow();
  const nav = safeNavigator();

  return Boolean(
    win && ("ontouchstart" in win || (nav && nav.maxTouchPoints > 0)),
  );
};

/**
 * Safe dynamic import wrapper for client-side only modules
 * Use this inside useEffect to ensure it only runs on client
 * @param {() => Promise<T>} importFn - dynamic import function
 * @returns {Promise<T | null>} imported module or null
 */
const _safeDynamicImport = async <T>(
  importFunction: () => Promise<T>,
): Promise<T | null> => {
  if (!isBrowser()) {
    return;
  }

  try {
    return await importFunction();
  } catch {
    // Dynamic import failed, return null
    return;
  }
};

/**
 * Create a no-op function for SSR environments
 * @returns {Function} no-op function
 */
const _createNoOp = (): (() => void) => {
  return () => {};
};

/**
 * Safe IntersectionObserver with SSR fallback
 * @param {IntersectionObserverCallback} callback - observer callback
 * @param {IntersectionObserverInit} options - observer options
 * @returns {IntersectionObserver | null} observer instance or null
 */
const _safeIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): IntersectionObserver | null => {
  const win = safeWindow();

  if (win && "IntersectionObserver" in win) {
    return new IntersectionObserver(callback, options);
  }

  return;
};

/**
 * Safe ResizeObserver with SSR fallback
 * @param {ResizeObserverCallback} callback - observer callback
 * @returns {ResizeObserver | null} observer instance or null
 */
const _safeResizeObserver = (
  callback: ResizeObserverCallback,
): ResizeObserver | null => {
  const win = safeWindow();

  if (win && "ResizeObserver" in win) {
    return new ResizeObserver(callback);
  }

  return;
};

/**
 * Safe MutationObserver with SSR fallback
 * @param {MutationCallback} callback - observer callback
 * @returns {MutationObserver | null} observer instance or null
 */
const _safeMutationObserver = (
  callback: MutationCallback,
): MutationObserver | null => {
  const win = safeWindow();

  if (win && "MutationObserver" in win) {
    return new MutationObserver(callback);
  }

  return;
};

/**
 * Execute callback only in browser environment
 * @param {Function} callback - function to execute
 * @param {Array<any>} deps - dependencies for the callback
 */
const _clientOnly = (
  callback: () => void,
  _deps: Array<unknown> = [],
): void => {
  if (isBrowser()) {
    callback();
  }
};

/**
 * Get computed style with SSR fallback
 * @param {Element} element - target element
 * @returns {CSSStyleDeclaration | null} computed style or null
 */
const _safeGetComputedStyle = (
  element: Element,
): CSSStyleDeclaration | null => {
  const win = safeWindow();
  return win?.getComputedStyle ? win.getComputedStyle(element) : undefined;
};

/**
 * Create element with SSR fallback
 * @param {K} tagName - HTML tag name
 * @returns {HTMLElementTagNameMap[K] | null} created element or null
 */
const _safeCreateElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
): HTMLElementTagNameMap[K] | null => {
  const document_ = safeDocument();
  return document_?.createElement
    ? document_.createElement(tagName)
    : undefined;
};

/**
 * Query selector with SSR fallback
 * @param {string} selector - CSS selector
 * @returns {Element | null} matched element or null
 */
const _safeQuerySelector = (selector: string): Element | null => {
  const document_ = safeDocument();
  return document_?.querySelector
    ? document_.querySelector(selector)
    : undefined;
};

/**
 * Query selector all with SSR fallback
 * @param {string} selector - CSS selector
 * @returns {NodeListOf<Element> | []} matched elements or empty array
 */
const _safeQuerySelectorAll = (selector: string): NodeListOf<Element> | [] => {
  const document_ = safeDocument();
  return document_?.querySelectorAll
    ? document_.querySelectorAll(selector)
    : [];
};

/**
 * Get element by ID with SSR fallback
 * @param {string} id - element ID
 * @returns {HTMLElement | null} matched element or null
 */
const _safeGetElementById = (id: string): HTMLElement | null => {
  const document_ = safeDocument();
  return document_?.getElementById ? document_.getElementById(id) : null;
};

// Export main functions for module resolution
export {
  isBrowser,
  isDocument,
  isNavigator,
  safeWindow,
  safeDocument,
  safeNavigator,
};
