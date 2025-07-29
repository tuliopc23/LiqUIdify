import { ChevronRight, Menu, X } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { cn, getGlassClass, microInteraction } from '@/core/utils/classname';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: Array<NavItem>;
  action?: () => void;
}

interface GlassMobileNavProps {
  items: Array<NavItem>;
  className?: string;
  onItemClick?: (item: NavItem) => void;
}

export const GlassMobileNav: React.FC<GlassMobileNavProps> = ({
  items,
  className,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(
    undefined
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleItemClick = (item: NavItem) => {
    if (item.children?.length) {
      setActiveSubmenu(activeSubmenu === item.id ? undefined : item.id);
    } else {
      if (item.action) {
        item.action();
      }
      onItemClick?.(item);
      setIsOpen(false);
    }
  };

  const MenuTrigger = () => (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        'rounded-xl p-3',
        getGlassClass('default'),
        'hover:bg-[var(--glass-bg-elevated)]',
        microInteraction.interactive,
        'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
        'md:hidden', // Only show on mobile
        className
      )}
      aria-label="Toggle navigation menu"
    >
      {isOpen ? (
        <X className="h-5 w-5 text-[var(--text-primary)]" />
      ) : (
        <Menu className="h-5 w-5 text-[var(--text-primary)]" />
      )}
    </button>
  );

  const renderNavItem = (item: NavItem, level = 0) => (
    <div key={item.id} className="w-full">
      <button
        type="button"
        onClick={() => handleItemClick(item)}
        className={cn(
          'flex w-full items-center justify-between p-4 text-left',
          'hover:bg-[var(--glass-bg)] active:bg-[var(--glass-bg-pressed)]',
          microInteraction.gentle,
          level > 0 && 'border-[var(--glass-border)] border-l-2 pl-8'
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon && (
            <span className="h-5 w-5 text-[var(--text-secondary)]">
              {item.icon}
            </span>
          )}

          <span className="font-medium text-[var(--text-primary)]">
            {item.label}
          </span>
        </div>
        {item.children?.length && (
          <ChevronRight
            className={cn(
              'h-4 w-4 text-[var(--text-secondary)] transition-transform duration-200',
              activeSubmenu === item.id && 'rotate-90'
            )}
          />
        )}
      </button>

      {/* Submenu */}
      {item.children?.length && activeSubmenu === item.id && (
        <div className="border-[var(--glass-border)] border-t">
          {item.children.map((child) => renderNavItem(child, level + 1))}
        </div>
      )}
    </div>
  );

  if (!isOpen) {
    return <MenuTrigger />;
  }

  return (
    <>
      <MenuTrigger />
      {typeof window !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}

            <button
              type="button"
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsOpen(false);
                }
              }}
              aria-label="Close navigation menu"
            />

            {/* Navigation Panel */}

            <div
              className={cn(
                'absolute top-0 right-0 h-full w-80 max-w-[85vw]',
                getGlassClass('elevated'),
                'border-[var(--glass-border)] border-l',
                'slide-in-from-right animate-in duration-300'
              )}
            >
              {/* Header */}

              <div className="flex items-center justify-between border-[var(--glass-border)] border-b p-4">
                <h2 className="font-semibold text-[var(--text-primary)] text-lg">
                  Navigation
                </h2>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--glass-bg)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}

              <div className="flex h-[calc(100%-80px)] flex-col overflow-y-auto">
                {items.map((item) => renderNavItem(item))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
