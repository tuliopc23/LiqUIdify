import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef } from "react";
import { cn } from "../../core/utils/classname";

// Import other liquid-glass components (assuming they exist)
// import { GlassFocusTrap } from "../liquid-glass-interactive:focus-visible-trap";
// import { announcer } from "../liquid-glass-live-region";
// import { GlassPortal } from "../liquid-glass-portal";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  portalTarget?: HTMLElement;
}

export function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  titleClassName,
  contentClassName,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  initialFocus,
  portalTarget,
}: GlassModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  // Handle escape key
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        onClose();
      }
    },
    [closeOnEscape, onClose],
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose],
  );

  // Manage body scroll lock and keyboard events
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      // Lock body scroll
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Add escape key listener
      document.addEventListener("keydown", handleEscape);

      // Focus management
      if (initialFocus?.current) {
        initialFocus.current.focus();
      } else if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape, initialFocus]);

  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <div
      className="liquid-glass-modal-backdrop"
      onClick={handleBackdropClick}
      aria-label="Modal backdrop"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={descriptionId}
        className={cn(
          "liquid-glass-modal liquid-glass-container w-full max-w-md",
          "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-200",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Liquid Glass Layers */}
        <div className="liquid-glass-filter" />
        <div className="liquid-glass-overlay" />
        <div className="liquid-glass-specular" />

        {/* Modal content */}
        <div className="liquid-glass-content flex-col items-start justify-start">
          {title && (
            <div className="mb-4 flex items-center justify-between w-full">
              <h3
                id={titleId}
                className={cn(
                  "font-semibold text-lg text-liquid-primary",
                  titleClassName,
                )}
              >
                {title}
              </h3>

              <button
                type="button"
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close modal"
                className={cn(
                  "liquid-glass-button liquid-glass-sm p-2 text-liquid-grey",
                  "motion-safe:hover:text-liquid-primary motion-safe:hover:scale-110",
                  "motion-safe:active:scale-95 transition-all duration-200",
                  "liquid-glass-interactive:focus-visible",
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div
            id={descriptionId}
            className={cn("text-liquid-primary", contentClassName)}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // For now, render directly without portal (can be enhanced later)
  if (typeof document !== "undefined") {
    return <div>{modalContent}</div>;
  }

  return null;
}
