import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useIsClient } from "@/hooks/use-ssr-safe";
import { cn } from "../../core/utils/classname";

// Mock accessibilityManager since it was removed
const accessibilityManager = {
  announce: (message: string, priority?: string) =>
    console.debug(`Announced: ${message} (${priority || "polite"})`),
};

interface SkipLink {
  id: string;
  label: string;
  target: string | HTMLElement;
  shortcut?: string;
}

interface GlassSkipNavigationProps {
  links?: SkipLink[];
  autoGenerate?: boolean;
  position?: "top" | "left" | "right";
  className?: string;
  visibleOnFocus?: boolean;
  announceOnFocus?: boolean;
  customStyles?: React.CSSProperties;
}

const DEFAULT_LANDMARKS = [
  { role: "navigation", label: "main navigation", id: "nav" },
  { role: "main", label: "main content", id: "main" },
  { role: "search", label: "search", id: "search" },
  { role: "complementary", label: "sidebar", id: "sidebar" },
  { role: "contentinfo", label: "footer", id: "footer" },
];

export const GlassSkipNavigation: React.FC<GlassSkipNavigationProps> = ({
  links: providedLinks,
  autoGenerate = true,
  position = "top",
  className,
  visibleOnFocus = true,
  announceOnFocus = true,
  customStyles,
}) => {
  const [links, setLinks] = useState<SkipLink[]>(providedLinks || []);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkReferences = useRef<(HTMLAnchorElement | null)[]>([]);
  const isClient = useIsClient();

  // Auto-generate skip links for landmarks
  useEffect(() => {
    if (!autoGenerate || providedLinks || !isClient) {
      return;
    }

    const generateSkipLinks = () => {
      const generatedLinks: SkipLink[] = [];

      // Find landmark elements
      for (const { role, label, id } of DEFAULT_LANDMARKS) {
        const elements =
          typeof document === "undefined" ? [] : document.querySelectorAll(`[role="${role}"]`);

        if (elements.length > 0) {
          for (const [index, element] of elements.entries()) {
            const elementId = element.id || `${id}-${index}`;

            // Ensure element has an ID
            if (!element.id) {
              element.id = elementId;
            }

            // Get accessible name
            const accessibleName =
              element.getAttribute("aria-label") ||
              element.getAttribute("aria-labelledby") ||
              label;

            generatedLinks.push({
              id: `skip-to-${elementId}`,
              label: `Skip to ${accessibleName}`,
              target: `#${elementId}`,
            });
          }
        }
      }

      // Find headings
      const headings = typeof document === "undefined" ? [] : document.querySelectorAll("h1, h2");
      for (const [index, heading] of headings.entries()) {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }

        const text = heading.textContent?.trim() || `Heading ${index + 1}`;
        generatedLinks.push({
          id: `skip-to-${heading.id}`,
          label: `Skip to "${text}"`,
          target: `#${heading.id}`,
        });
      }

      // Find forms
      const forms =
        typeof document === "undefined"
          ? []
          : document.querySelectorAll("form[aria-label], form[aria-labelledby]");
      for (const [index, form] of forms.entries()) {
        if (!form.id) {
          form.id = `form-${index}`;
        }

        const labelledById = form.getAttribute("aria-labelledby");
        const labelElement = labelledById
          ? typeof document === "undefined"
            ? undefined
            : document.getElementById(labelledById)
          : undefined;
        const formName =
          form.getAttribute("aria-label") || labelElement?.textContent || `Form ${index + 1}`;

        generatedLinks.push({
          id: `skip-to-${form.id}`,
          label: `Skip to ${formName}`,
          target: `#${form.id}`,
        });
      }

      setLinks(generatedLinks);
    };

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      if (typeof document !== "undefined") {
        document.addEventListener("DOMContentLoaded", generateSkipLinks);
      }
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
      attributeFilter: ["role", "aria-label", "aria-labelledby"],
    });

    return () => {
      observer.disconnect();
    };
  }, [autoGenerate, providedLinks, isClient]);

  const handleSkipTo = (link: SkipLink, event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();

    if (!isClient) {
      return;
    }

    let targetElement: HTMLElement | null;

    if (typeof link.target === "string") {
      if (link.target.startsWith("#")) {
        targetElement =
          typeof document === "undefined" ? null : document.querySelector(link.target);
      } else {
        targetElement =
          typeof document === "undefined" ? null : document.getElementById(link.target);
      }
    } else {
      targetElement = link.target;
    }

    if (targetElement) {
      // Ensure element is focusable
      const originalTabIndex = targetElement.getAttribute("tabindex");
      if (!targetElement.hasAttribute("tabindex")) {
        targetElement.setAttribute("tabindex", "-1");
      }

      // Focus the element
      targetElement.focus();

      // Scroll into view
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

      // Restore original tabindex after focus
      if (!originalTabIndex) {
        setTimeout(() => {
          targetElement.removeAttribute("tabindex");
        }, 100);
      }

      // Announce navigation
      if (announceOnFocus) {
        accessibilityManager.announce(
          `Navigated to ${link.label.replace("Skip to ", "")}`,
          "polite"
        );
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let handled = false;
    let newIndex = index;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight": {
        newIndex = Math.min(index + 1, links.length - 1);
        handled = true;
        break;
      }

      case "ArrowUp":
      case "ArrowLeft": {
        newIndex = Math.max(index - 1, 0);
        handled = true;
        break;
      }

      case "Home": {
        newIndex = 0;
        handled = true;
        break;
      }

      case "End": {
        newIndex = links.length - 1;
        handled = true;
        break;
      }

      case "Enter":
      case " ": {
        const link = links[index];
        if (link) {
          handleSkipTo(link, event);
        }
        handled = true;
        break;
      }
    }

    if (handled) {
      event.preventDefault();

      if (newIndex !== index) {
        const element = linkReferences.current[newIndex];
        if (element) {
          element.focus();
          setFocusedIndex(newIndex);
        }
      }
    }
  };

  const positionClasses = {
    top: "top-0 left-0 right-0 flex-row justify-center",
    left: "top-0 left-0 bottom-0 flex-col justify-start",
    right: "top-0 right-0 bottom-0 flex-col justify-start",
  };

  const visibilityClasses = visibleOnFocus
    ? "sr-only focus-within:not-sr-only focus-within:absolute focus-within:z-50"
    : "absolute z-50";

  return (
    <nav
      ref={containerRef}
      className={cn("", visibilityClasses, positionClasses[position], "flex gap-2 p-2", className)}
      aria-label="Skip navigation"
      style={customStyles}
    >
      {links.map((link, index) => (
        <a
          key={link.id}
          ref={(element) => {
            if (linkReferences.current) {
              linkReferences.current[index] = element;
            }
          }}
          href={typeof link.target === "string" ? link.target : `#${link.id}`}
          className={cn(
            "",
            "inline-flex items-center gap-2 px-4 py-2",
            " ",
            "rounded-lg border border-blue-300/20",
            "font-medium text-blue-900 text-sm",
            "hover:/20",
            "focus:outline-none focus:ring-2 focus:ring-liquid-accent focus:ring-offset-2",
            "transition-all duration-200",
            "shadow-lg",
            focusedIndex === index && "ring-2 ring-liquid-accent"
          )}
          onClick={(e) => handleSkipTo(link, e)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          tabIndex={index === 0 ? 0 : -1}
          data-skip-link={link.id}
        >
          {link.label}
          {link.shortcut && <kbd className="rounded /20 px-1 py-0.5 text-xs">{link.shortcut}</kbd>}
        </a>
      ))}
    </nav>
  );
};

/**
 * Hook for programmatically managing skip navigation
 */
function _useSkipNavigation() {
  const [skipLinks, setSkipLinks] = useState<SkipLink[]>([]);

  const addSkipLink = (link: SkipLink) => {
    setSkipLinks((previous) => {
      const exists = previous.find((l) => l.id === link.id);
      if (exists) {
        return previous;
      }
      return [...previous, link];
    });
  };

  const removeSkipLink = (id: string) => {
    setSkipLinks((previous) => previous.filter((l) => l.id !== id));
  };

  const skipTo = (id: string) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const link = skipLinks.find((l) => l.id === id);
    if (!link) {
      return;
    }

    // Use the same logic as handleSkipTo
    let targetElement: HTMLElement | null;

    if (typeof link.target === "string") {
      if (link.target.startsWith("#")) {
        targetElement =
          typeof document === "undefined" ? null : document.querySelector(link.target);
      } else {
        targetElement =
          typeof document === "undefined" ? null : document.getElementById(link.target);
      }
    } else {
      targetElement = link.target;
    }

    if (targetElement) {
      const originalTabIndex = targetElement.getAttribute("tabindex");
      if (!targetElement.hasAttribute("tabindex")) {
        targetElement.setAttribute("tabindex", "-1");
      }

      targetElement.focus();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

      if (!originalTabIndex) {
        setTimeout(() => {
          targetElement.removeAttribute("tabindex");
        }, 100);
      }

      accessibilityManager.announce(`Navigated to ${link.label.replace("Skip to ", "")}`, "polite");
    }
  };

  return {
    skipLinks,
    addSkipLink,
    removeSkipLink,
    skipTo,
  };
}
