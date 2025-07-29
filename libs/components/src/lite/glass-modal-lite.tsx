import { X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';


import { GlassPortal } from '@/components/glass-portal';

import { cn } from '@/core/utils/classname';

export interface GlassModalLiteProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Lightweight Glass Modal without animations
 * Uses CSS transitions for open/close
 * ~4KB vs ~12KB for full version
 */
export function GlassModalLite({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: GlassModalLiteProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen && typeof document !== 'undefined') {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return;
  }

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <GlassPortal>
      <button
        type="button"
        className={cn(
          'glass-modal-lite-backdrop',
          'fixed inset-0 z-50',
          'flex items-center justify-center p-4',
          'bg-black/50 backdrop-blur-sm',
          'transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
        aria-label="Close modal backdrop"
      >
        <div
          ref={modalRef}
          className={cn(
            'glass-modal-lite',
            'glass-effect rounded-2xl p-6',
            'w-full',
            'transition-transform duration-200',
            'transform',
            isOpen ? 'scale-100' : 'scale-95',
            sizeClasses[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {title && (
            <div className="mb-4 flex items-center justify-between">
              <h3 id="modal-title" className="font-semibold text-lg">
                {title}
              </h3>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div>{children}</div>
        </div>
      </button>
    </GlassPortal>
  );
}
