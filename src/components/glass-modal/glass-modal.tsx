import { useCallback, useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/core/utils/classname';
import { GlassFocusTrap } from '@/components/glass-focus-trap';
import { GlassPortal } from '@/components/glass-portal';
import { announcer } from '@/components/glass-live-region';
import { useIsClient } from '@/hooks/use-ssr-safe';

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
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose]
  );

  // Manage body scroll lock
const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    if (isOpen) {
      try {
        if (document.body && document.documentElement) {
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        
        // Announce modal opened
        announcer.announce(`${title || 'Dialog'} opened`, {
          priority: 'medium',
          context: 'general'
        });
      } catch (error) {
        console.warn('[GlassModal] Failed to set body styles:', error);
      }
    } else {
      try {
        if (document.body) {
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        }
      } catch (error) {
        console.warn('[GlassModal] Failed to reset body styles:', error);
      }
    }

    return () => {
      try {
        if (document.body) {
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        }
      } catch (error) {
        console.warn('[GlassModal] Failed to cleanup body styles:', error);
      }
    };
  }, [isClient, isOpen, title]);

  if (!isOpen) {return undefined;}

  const modalContent = (
    <div
      className="glass-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <GlassFocusTrap
        active={isOpen}
        onEscape={handleEscape}
        initialFocus={initialFocus || (closeButtonRef as React.RefObject<HTMLElement>)}
        className="glass-modal-focus-trap w-full max-w-md"
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={descriptionId}
          className={cn(
            'glass-modal',
            'glass-effect rounded-2xl p-8 w-full animate-scale',
            'outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="glass-modal-header flex items-center justify-between mb-4">
              <h3
                id={titleId}
                className={cn(
                  'glass-modal-title text-lg font-semibold text-primary',
                  titleClassName
                )}
              >
                {title}
              </h3>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close modal"
                className="glass-modal-close p-2 rounded-lg glass-effect btn-scale focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <X className="h-4 w-4 text-secondary" />
              </button>
            </div>
          )}
          <div 
            id={descriptionId}
            className={cn('glass-modal-content', contentClassName)}
          >
            {children}
          </div>
        </div>
      </GlassFocusTrap>
    </div>
  );

  return portalTarget ? (
    <GlassPortal container={portalTarget}>{modalContent}</GlassPortal>
  ) : (
    <GlassPortal>{modalContent}</GlassPortal>
  );
}
