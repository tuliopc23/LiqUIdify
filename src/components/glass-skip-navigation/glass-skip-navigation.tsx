import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/glass-utils';
import { accessibilityManager } from '@/core/accessibility-manager';

export interface SkipLink {
  id: string;
  label: string;
  target: string | HTMLElement;
  shortcut?: string;
}

export interface GlassSkipNavigationProps {
  links?: SkipLink[];
  autoGenerate?: boolean;
  position?: 'top' | 'left' | 'right';
  className?: string;
  visibleOnFocus?: boolean;
  announceOnFocus?: boolean;
  customStyles?: React.CSSProperties;
}

const DEFAULT_LANDMARKS = [
  { role: 'navigation', label: 'main navigation', id: 'nav' },
  { role: 'main', label: 'main content', id: 'main' },
  { role: 'search', label: 'search', id: 'search' },
  { role: 'complementary', label: 'sidebar', id: 'sidebar' },
  { role: 'contentinfo', label: 'footer', id: 'footer' },
];

export const GlassSkipNavigation: React.FC<GlassSkipNavigationProps> = ({
  links: providedLinks,
  autoGenerate = true,
  position = 'top',
  className,
  visibleOnFocus = true,
  announceOnFocus = true,
  customStyles,
}) => {
  const [links, setLinks] = useState<SkipLink[]>(providedLinks || []);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Auto-generate skip links for landmarks
  useEffect(() => {
    if (!autoGenerate || providedLinks) return;

    const generateSkipLinks = () => {
      const generatedLinks: SkipLink[] = [];

      // Find landmark elements
      DEFAULT_LANDMARKS.forEach(({ role, label, id }) => {
        const elements = document.querySelectorAll(`[role="${role}"]`);
        
        if (elements.length > 0) {
          elements.forEach((element, index) => {
            const elementId = element.id || `${id}-${index}`;
            
            // Ensure element has an ID
            if (!element.id) {
              element.id = elementId;
            }

            // Get accessible name
            const accessibleName = 
              element.getAttribute('aria-label') ||
              element.getAttribute('aria-labelledby') ||
              label;

            generatedLinks.push({
              id: `skip-to-${elementId}`,
              label: `Skip to ${accessibleName}`,
              target: `#${elementId}`,
            });
          });
        }
      });

      // Find headings
      const headings = document.querySelectorAll('h1, h2');
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }

        const text = heading.textContent?.trim() || `Heading ${index + 1}`;
        generatedLinks.push({
          id: `skip-to-${heading.id}`,
          label: `Skip to "${text}"`,
          target: `#${heading.id}`,
        });
      });

      // Find forms
      const forms = document.querySelectorAll('form[aria-label], form[aria-labelledby]');
      forms.forEach((form, index) => {
        if (!form.id) {
          form.id = `form-${index}`;
        }

        const formName = 
          form.getAttribute('aria-label') ||
          document.getElementById(form.getAttribute('aria-labelledby') || '')?.textContent ||
          `Form ${index + 1}`;

        generatedLinks.push({
          id: `skip-to-${form.id}`,
          label: `Skip to ${formName}`,
          target: `#${form.id}`,
        });
      });

      setLinks(generatedLinks);
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', generateSkipLinks);
    } else {
      generateSkipLinks();
    }

    // Observe DOM changes
    const observer = new MutationObserver(() => {
      generateSkipLinks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['role', 'aria-label', 'aria-labelledby'],
    });

    return () => {
      observer.disconnect();
    };
  }, [autoGenerate, providedLinks]);

  const handleSkipTo = (link: SkipLink, event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();

    let targetElement: HTMLElement | null = null;

    if (typeof link.target === 'string') {
      if (link.target.startsWith('#')) {
        targetElement = document.querySelector(link.target);
      } else {
        targetElement = document.getElementById(link.target);
      }
    } else {
      targetElement = link.target;
    }

    if (targetElement) {
      // Ensure element is focusable
      const originalTabIndex = targetElement.getAttribute('tabindex');
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
      }

      // Focus the element
      targetElement.focus();
      
      // Scroll into view
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Restore original tabindex after focus
      if (!originalTabIndex) {
        setTimeout(() => {
          targetElement.removeAttribute('tabindex');
        }, 100);
      }

      // Announce navigation
      if (announceOnFocus) {
        accessibilityManager.announce(`Navigated to ${link.label.replace('Skip to ', '')}`, 'polite');
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let handled = false;
    let newIndex = index;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = Math.min(index + 1, links.length - 1);
        handled = true;
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = Math.max(index - 1, 0);
        handled = true;
        break;

      case 'Home':
        newIndex = 0;
        handled = true;
        break;

      case 'End':
        newIndex = links.length - 1;
        handled = true;
        break;

      case 'Enter':
      case ' ':
        handleSkipTo(links[index], event);
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      
      if (newIndex !== index && linkRefs.current[newIndex]) {
        linkRefs.current[newIndex]?.focus();
        setFocusedIndex(newIndex);
      }
    }
  };

  const positionClasses = {
    top: 'top-0 left-0 right-0 flex-row justify-center',
    left: 'top-0 left-0 bottom-0 flex-col justify-start',
    right: 'top-0 right-0 bottom-0 flex-col justify-start',
  };

  const visibilityClasses = visibleOnFocus
    ? 'sr-only focus-within:not-sr-only focus-within:absolute focus-within:z-50'
    : 'absolute z-50';

  return (
    <nav
      ref={containerRef}
      className={cn(
        'glass-skip-navigation',
        visibilityClasses,
        positionClasses[position],
        'flex gap-2 p-2',
        className
      )}
      aria-label="Skip navigation"
      style={customStyles}
    >
      {links.map((link, index) => (
        <a
          key={link.id}
          ref={(el) => { linkRefs.current[index] = el; }}
          href={typeof link.target === 'string' ? link.target : `#${link.id}`}
          className={cn(
            'glass-skip-link',
            'inline-flex items-center gap-2 px-4 py-2',
            'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl',
            'border border-white/20 rounded-lg',
            'text-sm font-medium text-gray-900 dark:text-white',
            'hover:bg-white/95 dark:hover:bg-gray-800/95',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'transition-all duration-200',
            'shadow-lg',
            focusedIndex === index && 'ring-2 ring-blue-500'
          )}
          onClick={(e) => handleSkipTo(link, e)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          tabIndex={index === 0 ? 0 : -1}
          data-skip-link={link.id}
        >
          {link.label}
          {link.shortcut && (
            <kbd className="text-xs bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">
              {link.shortcut}
            </kbd>
          )}
        </a>
      ))}
    </nav>
  );
};

/**
 * Hook for programmatically managing skip navigation
 */
export function useSkipNavigation() {
  const [skipLinks, setSkipLinks] = useState<SkipLink[]>([]);

  const addSkipLink = (link: SkipLink) => {
    setSkipLinks(prev => {
      const exists = prev.find(l => l.id === link.id);
      if (exists) return prev;
      return [...prev, link];
    });
  };

  const removeSkipLink = (id: string) => {
    setSkipLinks(prev => prev.filter(l => l.id !== id));
  };

  const skipTo = (id: string) => {
    const link = skipLinks.find(l => l.id === id);
    if (!link) return;

    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    const syntheticEvent = {
      preventDefault: () => {},
    } as React.MouseEvent;

    // Use the same logic as handleSkipTo
    let targetElement: HTMLElement | null = null;

    if (typeof link.target === 'string') {
      if (link.target.startsWith('#')) {
        targetElement = document.querySelector(link.target);
      } else {
        targetElement = document.getElementById(link.target);
      }
    } else {
      targetElement = link.target;
    }

    if (targetElement) {
      const originalTabIndex = targetElement.getAttribute('tabindex');
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
      }

      targetElement.focus();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (!originalTabIndex) {
        setTimeout(() => {
          targetElement.removeAttribute('tabindex');
        }, 100);
      }

      accessibilityManager.announce(`Navigated to ${link.label.replace('Skip to ', '')}`, 'polite');
    }
  };

  return {
    skipLinks,
    addSkipLink,
    removeSkipLink,
    skipTo,
  };
}