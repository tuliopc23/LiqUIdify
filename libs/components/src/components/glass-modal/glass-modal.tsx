import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef } from "react";

import { GlassFocusTrap } from "@/components/glass-focus-trap";

import { announcer } from "@/components/glass-live-region";

import { GlassPortal } from "@/components/glass-portal";

import { cn } from "@/core/utils/classname";

import { useIsClient } from "@/hooks/use-ssr-safe";

export interface GlassModalProps {
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

  // Handle escape key through focus trap
  const handleEscape = useCallback(() => {
    if (closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose],
  );

  // Manage body scroll lock
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) {
      return;
    }

    if (isOpen) {
      try {
        if (document.body && document.documentElement) {
          const scrollbarWidth =
            typeof window === "undefined"
              ? 0
              : window.innerWidth - document.documentElement.clientWidth;
          document.body.style.overflow = "hidden";
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        // Announce modal opened
        announcer.announce(`${title || "Dialog"} opened`, {
          priority: "medium",
          context: "general",
        });
      } catch {
        // Logging disabled
      }
    } else {
      try {
        if (document.body) {
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }
      } catch {
        // Logging disabled
      }
    }

    return () => {
      try {
        if (document.body) {
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }
      } catch {
        // Logging disabled
      }
    };
  }, [isClient, isOpen, title]);

  if (!isOpen) {
    return;
  }

  const modalContent = (
    <button
      type="button"
      className="glass-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleBackdropClick(e as unknown);
        }
      }}
      tabIndex={-1}
      aria-label="Modal backdrop"
    >
      <GlassFocusTrap
        active={isOpen}
        onEscape={handleEscape}
        initialFocus={
          initialFocus || (closeButtonRef as React.RefObject<HTMLElement>)
        }
        className="glass-modal-focus-trap w-full max-w-md"
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : null}
          aria-describedby={descriptionId}
          className={cn(
            "glass-modal",
            "glass-effect w-full animate-scale rounded-2xl p-8",
            "outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="glass-modal-header mb-4 flex items-center justify-between">
              <h3
                id={titleId}
                className={cn(
                  "glass-modal-title font-semibold text-lg text-primary",
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
                className="glass-modal-close glass-effect btn-scale rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <X className="h-4 w-4 text-secondary" />
              </button>
            </div>
          )}

          <div
            id={descriptionId}
            className={cn("glass-modal-content", contentClassName)}
          >
            {children}
          </div>
        </div>
      </GlassFocusTrap>
    </button>
  );

  return portalTarget ? (
    <GlassPortal container={portalTarget}>{modalContent}</GlassPortal>
  ) : (
    <GlassPortal>{modalContent}</GlassPortal>
  );
}
