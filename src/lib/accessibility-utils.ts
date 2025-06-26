/**
 * Comprehensive Accessibility Utilities for LiquidiUI
 * 
 * This file provides professional-grade accessibility features including
 * focus management, keyboard navigation, screen reader support, and WCAG compliance.
 */

import { RefObject, useEffect, useRef, useCallback, useState } from 'react';

// ============================================================================
// FOCUS MANAGEMENT
// ============================================================================

/**
 * Enhanced focus trap hook for modals, dropdowns, and overlays
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  isActive: boolean = true
) {
  const previousFocus = useRef<HTMLElement | null>(null);
  
  const getFocusableElements = useCallback((container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
      'audio[controls]',
      'video[controls]',
      'summary',
      'iframe'
    ].join(', ');
    
    return Array.from(container.querySelectorAll(focusableSelectors))
      .filter(el => {
        const element = el as HTMLElement;
        return element.offsetWidth > 0 && 
               element.offsetHeight > 0 && 
               !element.hidden &&
               getComputedStyle(element).visibility !== 'hidden';
      }) as HTMLElement[];
  }, []);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!containerRef.current || !isActive) return;
    
    const focusableElements = getFocusableElements(containerRef.current);
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
    
    // ESC key handling
    if (event.key === 'Escape') {
      event.preventDefault();
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    }
  }, [containerRef, isActive, getFocusableElements]);
  
  useEffect(() => {
    if (isActive && containerRef.current) {
      // Store previous focus
      previousFocus.current = document.activeElement as HTMLElement;
      
      // Focus first focusable element
      const focusableElements = getFocusableElements(containerRef.current);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
      
      // Add event listener
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Restore previous focus when deactivating
        if (previousFocus.current) {
          previousFocus.current.focus();
        }
      };
    }
  }, [isActive, handleKeyDown, getFocusableElements]);
  
  return {
    restoreFocus: () => {
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    }
  };
}

/**
 * Advanced roving tabindex for complex widgets like menus, tabs, and toolbars
 */
export function useRovingTabIndex(
  containerRef: RefObject<HTMLElement>,
  orientation: 'horizontal' | 'vertical' | 'both' = 'horizontal',
  loop: boolean = true
) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const getNavigableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    
    return Array.from(
      containerRef.current.querySelectorAll('[role="option"], [role="tab"], [role="menuitem"], button, [tabindex]')
    ).filter(el => {
      const element = el as HTMLElement;
      return !element.hasAttribute('disabled') && 
             element.getAttribute('aria-disabled') !== 'true';
    }) as HTMLElement[];
  }, [containerRef]);
  
  const updateTabIndices = useCallback((elements: HTMLElement[], activeIdx: number) => {
    elements.forEach((element, index) => {
      element.setAttribute('tabindex', index === activeIdx ? '0' : '-1');
    });
  }, []);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!containerRef.current) return;
    
    const elements = getNavigableElements();
    if (elements.length === 0) return;
    
    let newIndex = activeIndex;
    const maxIndex = elements.length - 1;
    
    switch (event.key) {
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault();
          newIndex = loop ? (activeIndex + 1) % elements.length : Math.min(activeIndex + 1, maxIndex);
        }
        break;
        
      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault();
          newIndex = loop ? (activeIndex - 1 + elements.length) % elements.length : Math.max(activeIndex - 1, 0);
        }
        break;
        
      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault();
          newIndex = loop ? (activeIndex + 1) % elements.length : Math.min(activeIndex + 1, maxIndex);
        }
        break;
        
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault();
          newIndex = loop ? (activeIndex - 1 + elements.length) % elements.length : Math.max(activeIndex - 1, 0);
        }
        break;
        
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
        
      case 'End':
        event.preventDefault();
        newIndex = maxIndex;
        break;
        
      default:
        return;
    }
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      updateTabIndices(elements, newIndex);
      elements[newIndex].focus();
    }
  }, [activeIndex, orientation, loop, containerRef, getNavigableElements, updateTabIndices]);
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const elements = getNavigableElements();
      updateTabIndices(elements, activeIndex);
      
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, [activeIndex, handleKeyDown, getNavigableElements, updateTabIndices]);
  
  return {
    activeIndex,
    setActiveIndex: (index: number) => {
      const elements = getNavigableElements();
      if (index >= 0 && index < elements.length) {
        setActiveIndex(index);
        updateTabIndices(elements, index);
      }
    }
  };
}

// ============================================================================
// SCREEN READER SUPPORT
// ============================================================================

/**
 * Live region announcements for dynamic content changes
 */
export function useLiveRegion() {
  const announceRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Create live region if it doesn't exist
    if (!announceRef.current) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      `;
      document.body.appendChild(liveRegion);
      announceRef.current = liveRegion;
    }
    
    return () => {
      if (announceRef.current && announceRef.current.parentNode) {
        announceRef.current.parentNode.removeChild(announceRef.current);
        announceRef.current = null;
      }
    };
  }, []);
  
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announceRef.current) {
      announceRef.current.setAttribute('aria-live', priority);
      announceRef.current.textContent = message;
      
      // Clear after announcement to allow repeated messages
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);
  
  return { announce };
}

/**
 * Screen reader only text component
 */
export function ScreenReaderOnly({ children, ...props }: { children: React.ReactNode; [key: string]: any }): JSX.Element {
  const React = require('react');
  
  return React.createElement(
    'span',
    {
      ...props,
      style: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0',
        ...props.style
      }
    },
    children
  );
}

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================

/**
 * Enhanced keyboard event handler with accessibility patterns
 */
export function useKeyboardNavigation(
  handlers: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onHome?: () => void;
    onEnd?: () => void;
    onTab?: (shiftKey: boolean) => void;
  }
) {
  return useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        if (handlers.onEnter) {
          event.preventDefault();
          handlers.onEnter();
        }
        break;
      case ' ':
        if (handlers.onSpace) {
          event.preventDefault();
          handlers.onSpace();
        }
        break;
      case 'Escape':
        if (handlers.onEscape) {
          event.preventDefault();
          handlers.onEscape();
        }
        break;
      case 'ArrowUp':
        if (handlers.onArrowUp) {
          event.preventDefault();
          handlers.onArrowUp();
        }
        break;
      case 'ArrowDown':
        if (handlers.onArrowDown) {
          event.preventDefault();
          handlers.onArrowDown();
        }
        break;
      case 'ArrowLeft':
        if (handlers.onArrowLeft) {
          event.preventDefault();
          handlers.onArrowLeft();
        }
        break;
      case 'ArrowRight':
        if (handlers.onArrowRight) {
          event.preventDefault();
          handlers.onArrowRight();
        }
        break;
      case 'Home':
        if (handlers.onHome) {
          event.preventDefault();
          handlers.onHome();
        }
        break;
      case 'End':
        if (handlers.onEnd) {
          event.preventDefault();
          handlers.onEnd();
        }
        break;
      case 'Tab':
        if (handlers.onTab) {
          handlers.onTab(event.shiftKey);
        }
        break;
    }
  }, [handlers]);
}

// ============================================================================
// ACCESSIBILITY TESTING & VALIDATION
// ============================================================================

/**
 * Runtime accessibility validation
 */
export function validateAccessibility(element: HTMLElement): {
  score: number;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;
  
  // Check for missing alt text on images
  const images = element.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push(`Image ${index + 1} missing alt text`);
      suggestions.push('Add descriptive alt text to images');
      score -= 10;
    }
  });
  
  // Check for proper heading hierarchy
  const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let lastLevel = 0;
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > lastLevel + 1) {
      issues.push(`Heading level skipped at heading ${index + 1}`);
      suggestions.push('Maintain proper heading hierarchy (h1 → h2 → h3)');
      score -= 5;
    }
    lastLevel = level;
  });
  
  // Check for interactive elements without proper labels
  const interactiveElements = element.querySelectorAll('button, input, select, textarea, a');
  interactiveElements.forEach((elem, index) => {
    const hasLabel = elem.getAttribute('aria-label') || 
                    elem.getAttribute('aria-labelledby') ||
                    (elem as HTMLElement).textContent?.trim() ||
                    (elem.tagName === 'INPUT' && (elem as HTMLInputElement).labels?.length);
    
    if (!hasLabel) {
      issues.push(`Interactive element ${index + 1} missing accessible label`);
      suggestions.push('Add aria-label or visible text to interactive elements');
      score -= 8;
    }
  });
  
  // Check for sufficient color contrast
  if (typeof window !== 'undefined' && 'getComputedStyle' in window) {
    const textElements = element.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, a');
    textElements.forEach((elem) => {
      const styles = getComputedStyle(elem as Element);
      const fontSize = parseFloat(styles.fontSize);
      
      // Basic heuristic - real color contrast would need more sophisticated checking
      if (fontSize < 16 && styles.color === styles.backgroundColor) {
        issues.push('Potential color contrast issue detected');
        suggestions.push('Ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text)');
        score -= 5;
      }
    });
  }
  
  // Check for keyboard accessibility
  const focusableElements = element.querySelectorAll(
    'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach((elem, index) => {
    if (elem.getAttribute('tabindex') === '-1' && !elem.getAttribute('role')) {
      issues.push(`Element ${index + 1} may not be keyboard accessible`);
      suggestions.push('Ensure all interactive elements are keyboard accessible');
      score -= 3;
    }
  });
  
  return {
    score: Math.max(0, score),
    issues,
    suggestions
  };
}

/**
 * Hook for real-time accessibility monitoring
 */
export function useAccessibilityMonitor(
  elementRef: RefObject<HTMLElement>,
  enabled: boolean = process.env.NODE_ENV === 'development'
) {
  const [accessibilityReport, setAccessibilityReport] = useState<{
    score: number;
    issues: string[];
    suggestions: string[];
  } | null>(null);
  
  useEffect(() => {
    if (!enabled || !elementRef.current) return;
    
    const checkAccessibility = () => {
      if (elementRef.current) {
        const report = validateAccessibility(elementRef.current);
        setAccessibilityReport(report);
        
        if (report.score < 80) {
          console.warn('🔍 Accessibility Score Low:', report);
        }
      }
    };
    
    // Check on mount and when content changes
    checkAccessibility();
    
    // Set up mutation observer for dynamic content
    const observer = new MutationObserver(checkAccessibility);
    observer.observe(elementRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-label', 'aria-labelledby', 'alt', 'role']
    });
    
    return () => observer.disconnect();
  }, [elementRef, enabled]);
  
  return accessibilityReport;
}

// ============================================================================
// REDUCED MOTION SUPPORT
// ============================================================================

/**
 * Hook to respect user's reduced motion preferences
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}

// ============================================================================
// HIGH CONTRAST MODE SUPPORT
// ============================================================================

/**
 * Hook to detect high contrast mode
 */
export function useHighContrastMode(): boolean {
  const [isHighContrast, setIsHighContrast] = useState(false);
  
  useEffect(() => {
    const checkHighContrast = () => {
      // Check for Windows high contrast mode
      const testElement = document.createElement('div');
      testElement.style.cssText = `
        border: 1px solid;
        border-color: buttontext;
        position: absolute;
        height: 5px;
        top: -999px;
        background-image: url("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
      `;
      
      document.body.appendChild(testElement);
      
      const styles = getComputedStyle(testElement);
      const isHighContrastMode = styles.backgroundImage === 'none' ||
                                styles.borderTopColor === styles.borderRightColor;
      
      document.body.removeChild(testElement);
      setIsHighContrast(isHighContrastMode);
    };
    
    checkHighContrast();
    
    // Check periodically as there's no reliable event for this
    const interval = setInterval(checkHighContrast, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return isHighContrast;
}

// ============================================================================
// ARIA UTILITIES
// ============================================================================

/**
 * Generate unique IDs for ARIA relationships
 */
export function useAriaIds(prefix: string, count: number = 1): string[] {
  const ids = useRef<string[]>([]);
  
  if (ids.current.length === 0) {
    ids.current = Array.from({ length: count }, (_, index) => 
      `${prefix}-${Math.random().toString(36).substr(2, 9)}-${index}`
    );
  }
  
  return ids.current;
}

/**
 * ARIA state management helper
 */
export function useAriaState() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [checked, setChecked] = useState(false);
  
  return {
    expanded: { 'aria-expanded': expanded, setExpanded },
    selected: { 'aria-selected': selected, setSelected },
    pressed: { 'aria-pressed': pressed, setPressed },
    checked: { 'aria-checked': checked, setChecked }
  };
}