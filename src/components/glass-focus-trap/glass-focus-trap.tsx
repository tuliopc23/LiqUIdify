import React, { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/glass-utils';

export interface GlassFocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  paused?: boolean;
  onEscape?: () => void;
  initialFocus?: React.RefObject<HTMLElement>;
  returnFocus?: boolean;
  className?: string;
}

export const GlassFocusTrap: React.FC<GlassFocusTrapProps> = ({
  children,
  active = true,
  paused = false,
  onEscape,
  initialFocus,
  returnFocus = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];

    const focusableSelectors = [
      'a[href]:not([disabled])',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"]):not([disabled])',
      '[contenteditable]:not([disabled])',
    ].join(',');

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter((el) => {
      // Check if element is visible
      const style = window.getComputedStyle(el);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        el.offsetParent !== null
      );
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!active || paused) return;

      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      // Tab forwards
      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
      // Tab backwards
      else if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    },
    [active, paused, onEscape, getFocusableElements]
  );

  const handleFocusIn = useCallback(
    (event: FocusEvent) => {
      if (!active || paused || !containerRef.current) return;

      const target = event.target as HTMLElement;
      
      // If focus moved outside the trap, bring it back
      if (!containerRef.current.contains(target)) {
        event.preventDefault();
        event.stopPropagation();

        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    },
    [active, paused, getFocusableElements]
  );

  // Set up focus trap
  useEffect(() => {
    if (!active) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Set initial focus
    const setInitialFocus = () => {
      if (initialFocus?.current) {
        initialFocus.current.focus();
      } else {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(setInitialFocus);

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);

      // Return focus to previous element
      if (returnFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, returnFocus, initialFocus, handleKeyDown, handleFocusIn, getFocusableElements]);

  return (
    <div
      ref={containerRef}
      className={cn('glass-focus-trap', className)}
      data-focus-trap-active={active}
      aria-modal={active ? 'true' : undefined}
    >
      {children}
    </div>
  );
};