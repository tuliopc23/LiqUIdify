import { useEffect, useRef, useId, forwardRef } from "react";
import { X } from "lucide-react";
import { cn, getGlassClass, microInteraction } from "@/lib/glass-utils";
import { 
  useFocusTrap, 
  useLiveRegion, 
  useReducedMotion,
  ScreenReaderOnly,
  useAccessibilityMonitor 
} from "@/lib/accessibility-utils";
import { 
  ComponentSize, 
  validateComponentProps, 
  getFocusRingClasses 
} from "@/lib/component-standards";

interface GlassModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title for accessibility */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Custom CSS class for modal container */
  className?: string;
  /** Custom CSS class for title */
  titleClassName?: string;
  /** Custom CSS class for content area */
  contentClassName?: string;
  /** Modal size variant */
  size?: ComponentSize;
  /** Whether to close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Initial focus element selector */
  initialFocus?: string;
  /** Whether to trap focus within modal */
  trapFocus?: boolean;
  /** Custom aria-describedby value */
  'aria-describedby'?: string;
  /** Custom aria-labelledby value (overrides title) */
  'aria-labelledby'?: string;
  /** Modal description for screen readers */
  description?: string;
  /** Whether modal prevents scrolling on body */
  preventScroll?: boolean;
}

export const GlassModal = forwardRef<HTMLDivElement, GlassModalProps>(({
  isOpen,
  onClose,
  title,
  children,
  className,
  titleClassName,
  contentClassName,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  initialFocus,
  trapFocus = true,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
  description,
  preventScroll = true,
}, ref) => {
  // Validate props in development
  validateComponentProps({ size }, 'GlassModal');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  
  // Generate unique IDs for accessibility
  const titleId = useId();
  const descriptionId = useId();
  const contentId = useId();
  
  // Accessibility hooks
  const { announce } = useLiveRegion();
  const prefersReducedMotion = useReducedMotion();
  const accessibilityReport = useAccessibilityMonitor(modalRef);
  
  // Focus trapping
  const { restoreFocus } = useFocusTrap(modalRef, isOpen && trapFocus);
  
  // Size classes for modal
  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm", 
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape && isOpen) {
        event.preventDefault();
        onClose();
        announce('Modal closed', 'polite');
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeOnEscape, onClose, announce]);
  
  // Manage body scroll and focus
  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Prevent body scroll
      if (preventScroll) {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      
      // Announce modal opening
      announce(`Modal opened${title ? `: ${title}` : ''}`, 'polite');
      
      // Focus management
      setTimeout(() => {
        if (modalRef.current) {
          let elementToFocus: HTMLElement | null = null;
          
          if (initialFocus) {
            elementToFocus = modalRef.current.querySelector(initialFocus);
          }
          
          if (!elementToFocus) {
            // Find first focusable element
            const focusableElements = modalRef.current.querySelectorAll(
              'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            );
            elementToFocus = focusableElements[0] as HTMLElement;
          }
          
          if (!elementToFocus) {
            // Fallback to modal container
            elementToFocus = modalRef.current;
          }
          
          elementToFocus?.focus();
        }
      }, 100);
    } else {
      // Restore body scroll
      if (preventScroll) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
      
      // Restore focus
      setTimeout(() => {
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      }, 100);
    }
    
    return () => {
      if (preventScroll) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [isOpen, preventScroll, title, announce, initialFocus]);
  
  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === backdropRef.current) {
      onClose();
      announce('Modal closed', 'polite');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={backdropRef}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/50 backdrop-blur-md",
        prefersReducedMotion ? "" : "animate-in fade-in duration-200"
      )}
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      <div
        ref={(node) => {
          if (modalRef.current !== node) {
            (modalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref && 'current' in ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy || (title ? titleId : undefined)}
        aria-describedby={ariaDescribedBy || (description ? descriptionId : undefined)}
        className={cn(
          // Base styles
          getGlassClass("elevated"),
          "rounded-xl p-6 w-full shadow-2xl",
          sizeClasses[size],
          
          // Focus management
          getFocusRingClasses(),
          "outline-none",
          
          // Animation
          prefersReducedMotion ? "" : "animate-in zoom-in-95 duration-200",
          
          // Interaction
          microInteraction.smooth,
          
          className
        )}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        data-testid="modal-dialog"
      >
        {/* Screen reader announcement */}
        <ScreenReaderOnly>
          Modal dialog{title ? ` titled ${title}` : ''}
          {description ? `. ${description}` : ''}
          . Press escape to close.
        </ScreenReaderOnly>
        
        {/* Header */}
        {title && (
          <div className="flex items-start justify-between mb-6">
            <h2 
              id={titleId} 
              className={cn(
                "text-xl font-semibold text-[var(--text-primary)] pr-8",
                titleClassName
              )}
            >
              {title}
            </h2>
            <button
              onClick={() => {
                onClose();
                announce('Modal closed', 'polite');
              }}
              aria-label="Close modal"
              className={cn(
                "flex-shrink-0 p-2 rounded-lg text-[var(--text-secondary)]",
                "hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]",
                getFocusRingClasses(),
                microInteraction.gentle
              )}
              data-testid="modal-close-button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Description for screen readers */}
        {description && (
          <ScreenReaderOnly id={descriptionId}>
            {description}
          </ScreenReaderOnly>
        )}
        
        {/* Content */}
        <div 
          id={contentId}
          className={cn(contentClassName)}
          data-testid="modal-content"
        >
          {children}
        </div>
        
        {/* Development accessibility info */}
        {process.env.NODE_ENV === 'development' && accessibilityReport && accessibilityReport.score < 80 && (
          <div className="mt-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
            🔍 Accessibility Score: {accessibilityReport.score}/100
            {accessibilityReport.issues.length > 0 && (
              <details className="mt-1">
                <summary className="cursor-pointer">Issues ({accessibilityReport.issues.length})</summary>
                <ul className="mt-1 list-disc list-inside">
                  {accessibilityReport.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

GlassModal.displayName = "GlassModal";
