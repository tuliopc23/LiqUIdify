/**
 * Safe DOM Utility Functions
 * Provides safe patterns for DOM element access and manipulation
 * Replaces non-null assertions with proper null checking
 */

/**
 * Safe reference access with null checking
 */
export function safeRefAccess<T>(ref: React.RefObject<T>): T | null {
  return ref.current || undefined;
}

/**
 * Safe ref access with callback execution
 */
export function withSafeRef<T, R>(
  ref: React.RefObject<T>,
  callback: (element: T) => R,
  fallback?: R
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
export function safeQuerySelector<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document
): T | null {
  try {
    return parent.querySelector<T>(selector);
  } catch {
    // Logging disabled
    return;
  }
}

/**
 * Safe DOM element selector all with null checking
 */
export function safeQuerySelectorAll<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document
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
export function safeGetComputedStyle(
  element: Element,
  property?: string
): string | CSSStyleDeclaration | null {
  try {
    if (typeof window === 'undefined' || !element) {
      return;
    }

    const computedStyle = window.getComputedStyle(element);
    return property ? computedStyle.getPropertyValue(property) : computedStyle;
  } catch {
    // Logging disabled
    return;
  }
}

/**
 * Safe getBoundingClientRect with fallback
 */
export function safeGetBoundingClientRect(element: Element | null): DOMRect {
  const fallbackRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => ({}),
  } as DOMRect;

  if (!element) {
    return fallbackRect;
  }

  try {
    return element.getBoundingClientRect();
  } catch {
    // Logging disabled
    return fallbackRect;
  }
}

/**
 * Safe array access with bounds checking
 */
export function safeArrayAccess<T>(
  array: Array<T>,
  index: number,
  fallback?: T
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
  fallback?: V
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
export function safeAddEventListener<K extends keyof HTMLElementEventMap>(
  element: Element | null,
  type: K,
  listener: (this: HTMLElement, event_: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): (() => void) | null {
  if (!element) {
    return;
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
    return;
  }
}

/**
 * Safe requestAnimationFrame with cancellation
 */
export function safeRequestAnimationFrame(
  callback: FrameRequestCallback
): (() => void) | null {
  if (typeof window === 'undefined' || !window.requestAnimationFrame) {
    return;
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
    return;
  }
}

/**
 * Safe audio context creation
 */
export function safeCreateAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || !('AudioContext' in window)) {
    return;
  }

  try {
    return new AudioContext();
  } catch {
    // Logging disabled
    return;
  }
}

/**
 * Safe element attribute access
 */
export function safeGetAttribute(
  element: Element | null,
  name: string,
  fallback?: string
): string | null {
  if (!element) {
    return fallback ?? undefined;
  }

  try {
    return element.getAttribute(name) ?? fallback ?? undefined;
  } catch {
    // Logging disabled
    return fallback ?? undefined;
  }
}

/**
 * Safe element attribute setting
 */
export function safeSetAttribute(
  element: Element | null,
  name: string,
  value: string
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
export function safeGetStyle(
  element: HTMLElement | null,
  property: string,
  fallback?: string
): string {
  if (!element) {
    return fallback || '';
  }

  try {
    return element.style[property as unknown] || fallback || '';
  } catch {
    // Logging disabled
    return fallback || '';
  }
}

/**
 * Safe element style setting
 */
export function safeSetStyle(
  element: HTMLElement | null,
  property: string,
  value: string
): boolean {
  if (!element) {
    return false;
  }

  try {
    (element.style as unknown)[property] = value;
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
  child: Node | null
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
