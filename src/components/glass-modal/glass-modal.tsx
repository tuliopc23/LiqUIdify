import { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/glass-utils';

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string; // Optional class for title
  contentClassName?: string; // Optional class for content area
}

export function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  titleClassName,
  contentClassName,
}: GlassModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // const contentId = useId(); // If using aria-describedby for a specific content block

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
      // TODO: Implement focus trapping. When modal opens, focus should be moved inside.
      // Tab navigation should be contained within the modal.
      // modalRef.current?.focus(); // Example: focus the modal container or first focusable element
    } else {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEsc);
      // TODO: Restore focus to the element that opened the modal when it closes.
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      // TODO: Move these styles to a dedicated CSS class e.g., .glass-modal-backdrop
      style={{
        background: 'rgba(0, 0, 0, 0.5)', // Example: --glass-modal-backdrop-bg or similar token
        backdropFilter: 'blur(10px)', // Example: --glass-modal-backdrop-blur or similar token
      }}
      onClick={onClose} // Close on backdrop click
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        // aria-describedby={contentId} // If you have a specific content block to describe the modal
        className={cn(
          'glass-effect rounded-2xl p-8 max-w-md w-full animate-scale', // Base styles
          'outline-none', // Ensure focus styles are managed if modal itself is focused
          className // Custom class for the modal dialog
        )}
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal content
        tabIndex={-1} // Allows the modal dialog to be programmatically focused if needed
      >
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3
              id={titleId}
              className={cn(
                'text-lg font-semibold text-primary',
                titleClassName
              )}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-lg glass-effect btn-scale focus:outline-none focus:ring-2 focus:ring-blue-500" // Added focus styles
            >
              <X className="h-4 w-4 text-secondary" />
            </button>
          </div>
        )}
        <div className={cn(contentClassName)}>
          {' '}
          {/* Optional class for content area */}
          {/* <div id={contentId}> */}{' '}
          {/* If using aria-describedby for a specific content block */}
          {children}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
