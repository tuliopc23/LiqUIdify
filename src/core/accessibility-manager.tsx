/**
 * Accessibility Manager
 *
 * Provides centralized accessibility management for glass components
 */

import React, { useCallback, useEffect, useRef } from 'react';

export interface AccessibilityOptions {
  autoAnnounce?: boolean;
  respectPreferences?: boolean;
  focusManagement?: boolean;
  highContrast?: boolean;
}

export interface AccessibilityState {
  reducedMotion: boolean;
  highContrast: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
}

/**
 * Hook for managing accessibility features
 */
export function useAccessibilityManager(options: AccessibilityOptions = {}) {
  const {
    autoAnnounce = false,
    respectPreferences = true,
    focusManagement = true,
    highContrast = false,
  } = options;

  const [state, setState] = React.useState<AccessibilityState>({
    reducedMotion: false,
    highContrast: false,
    screenReader: false,
    keyboardNavigation: false,
  });

  const announcer = useRef<HTMLDivElement>(null);

  // Detect user preferences
  useEffect(() => {
    if (!respectPreferences || 'undefined' === typeof window) {
      return;
    }

    const checkPreferences = () => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      const highContrastMedia = window.matchMedia(
        '(prefers-contrast: high)'
      ).matches;
      const screenReader =
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        window.speechSynthesis?.speaking;

      setState((prev) => ({
        ...prev,
        reducedMotion,
        highContrast: highContrastMedia || highContrast,
        screenReader: Boolean(screenReader),
      }));
    };

    checkPreferences();

    const motionMediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const contrastMediaQuery = window.matchMedia('(prefers-contrast: high)');

    motionMediaQuery.addEventListener('change', checkPreferences);
    contrastMediaQuery.addEventListener('change', checkPreferences);

    return () => {
      motionMediaQuery.removeEventListener('change', checkPreferences);
      contrastMediaQuery.removeEventListener('change', checkPreferences);
    };
  }, [respectPreferences, highContrast]);

  // Keyboard navigation detection
  useEffect(() => {
    if (!focusManagement) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ('Tab' === e.key) {
        setState((prev) => ({ ...prev, keyboardNavigation: true }));
      }
    };

    const handleMouseDown = () => {
      setState((prev) => ({ ...prev, keyboardNavigation: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [focusManagement]);

  // Announce function for screen readers
  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (!autoAnnounce || !announcer.current) {
        return null;
      }

      announcer.current.setAttribute('aria-live', priority);
      announcer.current.textContent = message;

      // Clear after announcement
      setTimeout(() => {
        if (announcer.current) {
          announcer.current.textContent = '';
        }
      }, 1000);
    },
    [autoAnnounce]
  );

  // Focus management utilities
  const focusElement = useCallback(
    (element: HTMLElement | null) => {
      if (!focusManagement || !element) {
        return null;
      }

      element.focus({ preventScroll: state.reducedMotion });
    },
    [focusManagement, state.reducedMotion]
  );

  const trapFocus = useCallback(
    (container: HTMLElement) => {
      if (!focusManagement) {
        return () => {};
      }

      const focusableElements = container.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if ('Tab' !== e.key) {
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };

      container.addEventListener('keydown', handleTabKey);

      return () => {
        container.removeEventListener('keydown', handleTabKey);
      };
    },
    [focusManagement]
  );

  // Create announcer element
  const AnnouncerElement = autoAnnounce ? (
    <div
      ref={announcer}
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
    />
  ) : null;

  return {
    state,
    announce,
    focusElement,
    trapFocus,
    AnnouncerElement,
    // Utility functions
    getGlassClasses: (baseClasses: string) => {
      let classes = baseClasses;

      if (state.reducedMotion) {
        classes +=
          ' motion-reduce:transition-none motion-reduce:transform-none';
      }

      if (state.highContrast) {
        classes += ' contrast-more:border-2 contrast-more:border-solid';
      }

      if (state.keyboardNavigation) {
        classes += ' focus-visible:ring-2 focus-visible:ring-blue-500';
      }

      return classes;
    },
  };
}

/**
 * Legacy export for backward compatibility
 */
export const AccessibilityManager = useAccessibilityManager;
