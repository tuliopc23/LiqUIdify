/**
 * Safe DOM Utility Functions
 * Provides safe patterns for DOM element access and manipulation
 * Replaces non-null assertions with proper null checking
 */

/**
 * Safe reference access with null checking
 */
function safeRefAccess<T>(ref: React.RefObject<T>): T | null {
  return ref.current || null;
}

/**
 * Safe ref access with callback execution
 */
function _withSafeRef<T, R>(
  ref: React.RefObject<T>,
  callback: (element: T) => R,
  fallback?: R,
): R | undefined {
  const element = safeRefAccess(ref);
  if (element) {
    try {
      return callback(element);
    } catch {
      // Logging disabled
      return fallback;
    }
  }
  return fallback;
}

/**
 * Safe DOM element selector with null checking
 */
function _safeQuerySelector<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document,
): T | null {
  try {
    return parent.querySelector<T>(selector);
  } catch {
    // Logging disabled
    return null;
  }
}

/**
 * Safe DOM element selector all with null checking
 */
function _safeQuerySelectorAll<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document,
): Array<T> {
  try {
    return [...parent.querySelectorAll<T>(selector)];
  } catch {
    // Logging disabled
    return [];
  }
}

/**
 * Safe style property access
 */
function _safeGetComputedStyle(
  element: Element,
  property?: string,
): string | CSSStyleDeclaration | null {
  try {
    if (typeof window === "undefined" || !element) {
      return null;
    }

    const computedStyle = window.getComputedStyle(element);
    return property ? computedStyle.getPropertyValue(property) : computedStyle;
  } catch {
    // Logging disabled
    return null;
  }
}

/**
 * Safe getBoundingClientRect with fallback
 */
export function safeGetBoundingClientRect(element: Element | null): DOMRect {
  if (!element) {
    return new DOMRect(0, 0, 0, 0);
  }

  try {
    return element.getBoundingClientRect();
  } catch {
    // Logging disabled
    return new DOMRect(0, 0, 0, 0);
  }
}

/**
 * Safe array access with bounds checking
 */
function _safeArrayAccess<T>(
  array: Array<T>,
  index: number,
  fallback?: T,
): T | undefined {
  if (!Array.isArray(array)) {
    return fallback;
  }

  if (index < 0 || index >= array.length) {
    return fallback;
  }

  return array[index];
}

/**
 * Safe Map access with null checking
 */
export function safeMapGet<K, V>(
  map: Map<K, V> | null | undefined,
  key: K,
  fallback?: V,
): V | undefined {
  if (!map || !map.has(key)) {
    return fallback;
  }

  try {
    return map.get(key);
  } catch {
    // Logging disabled
    return fallback;
  }
}

/**
 * Safe addEventListener with cleanup
 */
function _safeAddEventListener<K extends keyof HTMLElementEventMap>(
  element: Element | null,
  type: K,
  listener: (this: HTMLElement, event_: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): (() => void) | null {
  if (!element) {
    return null;
  }

  try {
    element.addEventListener(type, listener as EventListener, options);

    return () => {
      try {
        element.removeEventListener(type, listener as EventListener, options);
      } catch {
        // Logging disabled
      }
    };
  } catch {
    // Logging disabled
    return null;
  }
}

/**
 * Safe requestAnimationFrame with cancellation
 */
export function safeRequestAnimationFrame(
  callback: FrameRequestCallback,
): () => void {
  if (typeof window === "undefined" || !window.requestAnimationFrame) {
    // Return no-op function for consistent API
    return () => {};
  }

  try {
    const id = window.requestAnimationFrame(callback);

    return () => {
      try {
        window.cancelAnimationFrame(id);
      } catch {
        // Logging disabled
      }
    };
  } catch {
    // Logging disabled
    return () => {};
  }
}

/**
 * Safe audio context creation
 */
export function safeCreateAudioContext(): AudioContext | null {
  if (typeof window === "undefined" || !("AudioContext" in window)) {
    return null;
  }

  try {
    return new AudioContext();
  } catch {
    // Logging disabled
    return null;
  }
}

/**
 * Safe element attribute access
 */
function _safeGetAttribute(
  element: Element | null,
  name: string,
  fallback?: string,
): string | null {
  if (!element) {
    return fallback ?? null;
  }

  try {
    return element.getAttribute(name) ?? fallback ?? null;
  } catch {
    // Logging disabled
    return fallback ?? null;
  }
}

/**
 * Safe element attribute setting
 */
function _safeSetAttribute(
  element: Element | null,
  name: string,
  value: string,
): boolean {
  if (!element) {
    return false;
  }

  try {
    element.setAttribute(name, value);
    return true;
  } catch {
    // Logging disabled
    return false;
  }
}

/**
 * Safe element style access with fallback
 */
function _safeGetStyle(
  element: HTMLElement | null,
  property: string,
  fallback?: string,
): string {
  if (!element) {
    return fallback || "";
  }

  try {
    return (element.style as any)[property] || fallback || "";
  } catch {
    // Logging disabled
    return fallback || "";
  }
}

/**
 * Safe element style setting
 */
function _safeSetStyle(
  element: HTMLElement | null,
  property: string,
  value: string,
): boolean {
  if (!element) {
    return false;
  }

  try {
    (element.style as any)[property] = value;
    return true;
  } catch {
    // Logging disabled
    return false;
  }
}

/**
 * Safe element removal
 */
export function safeRemoveElement(element: Element | null): boolean {
  if (!element || !element.parentNode) {
    return false;
  }

  try {
    element.remove();
    return true;
  } catch {
    // Logging disabled
    return false;
  }
}

/**
 * Safe element appendChild
 */
export function safeAppendChild(
  parent: Element | null,
  child: Node | null,
): boolean {
  if (!parent || !child) {
    return false;
  }

  try {
    parent.append(child);
    return true;
  } catch {
    // Logging disabled
    return false;
  }
}
