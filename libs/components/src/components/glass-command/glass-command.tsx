import {
  ArrowRight,
  Command,
  FileText,
  Hash,
  Search,
  Settings,
  User,
  Zap,
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn, getGlassClass, microInteraction } from '@/core/utils/classname';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: Array<string>;
  category?: string;
  action: () => void;
  keywords?: Array<string>;
}

export interface CommandPaletteProps {
  items: Array<CommandItem>;
  placeholder?: string;
  shortcut?: Array<string>;
  className?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  items,
  placeholder = 'Type a command or search...',
  shortcut = ['cmd', 'k'],
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter and categorize items
  const filteredItems = items.filter((item) => {
    const searchTerms = query.toLowerCase().split(' ');
    const itemText =
      `${item.label} ${item.description || ''} ${item.keywords?.join(' ') || ''}`.toLowerCase();
    return searchTerms.every((term) => itemText.includes(term));
  });

  const categorizedItems = filteredItems.reduce(
    (accumulator, item) => {
      const category = item.category || 'General';
      if (!accumulator[category]) {
        accumulator[category] = [];
      }
      accumulator[category].push(item);
      return accumulator;
    },
    {} as Record<string, Array<CommandItem>>
  );

  const allFilteredItems = Object.values(categorizedItems).flat();

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette
      if ((e.metaKey || e.ctrlKey) && 'k' === e.key) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      if (!isOpen) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setSelectedIndex((previous) =>
            Math.min(previous + 1, allFilteredItems.length - 1)
          );
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setSelectedIndex((previous) => Math.max(previous - 1, 0));
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (allFilteredItems[selectedIndex]) {
            allFilteredItems[selectedIndex].action();
            handleClose();
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          handleClose();
          break;
        }
      }
    };

    if ('undefined' !== typeof document) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if ('undefined' !== typeof document) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isOpen, selectedIndex, allFilteredItems, handleClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  const formatShortcut = (keys: Array<string>) => {
    return keys
      .map((key) => {
        switch (key.toLowerCase()) {
          case 'cmd':
          case 'command': {
            return '⌘';
          }
          case 'ctrl': {
            return '^';
          }
          case 'shift': {
            return '⇧';
          }
          case 'alt':
          case 'option': {
            return '⌥';
          }
          case 'enter': {
            return '↵';
          }
          case 'escape': {
            return '⎋';
          }
          case 'backspace': {
            return '⌫';
          }
          case 'delete': {
            return '⌦';
          }
          case 'tab': {
            return '⇥';
          }
          case 'space': {
            return '␣';
          }
          default: {
            return key.toUpperCase();
          }
        }
      })
      .join('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'navigation': {
        return <ArrowRight className="h-4 w-4" />;
      }
      case 'user': {
        return <User className="h-4 w-4" />;
      }
      case 'settings': {
        return <Settings className="h-4 w-4" />;
      }
      case 'content': {
        return <FileText className="h-4 w-4" />;
      }
      case 'actions': {
        return <Zap className="h-4 w-4" />;
      }
      default: {
        return <Hash className="h-4 w-4" />;
      }
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          'flex items-center gap-2 rounded-lg px-3 py-2',
          getGlassClass('default'),
          'hover:bg-[var(--glass-bg-elevated)]',
          'text-[var(--text-secondary)] text-sm',
          microInteraction.gentle,
          className
        )}
      >
        <Search className="h-4 w-4" />

        <span>Search...</span>

        <div className="ml-auto flex items-center gap-1">
          {shortcut.map((key, index) => (
            <kbd
              key={index}
              className="rounded border border-[var(--glass-border)] bg-[var(--glass-bg)] px-1.5 py-0.5 text-xs"
            >
              {formatShortcut([key])}
            </kbd>
          ))}
        </div>
      </button>
    );
  }

  // SSR safety check
  if ('undefined' === typeof window) {
    return;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}

      <button
        type="button"
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
        onKeyDown={(e) => {
          if ('Enter' === e.key || ' ' === e.key) {
            e.preventDefault();
            handleClose();
          }
        }}
        aria-label="Close command palette"
      />

      {/* Command Palette */}

      <div
        ref={containerRef}
        className={cn(
          'relative mx-4 w-full max-w-2xl overflow-hidden rounded-2xl border',
          getGlassClass('elevated'),
          'border-[var(--glass-border)]',
          'fade-in-0 zoom-in-95 animate-in duration-200'
        )}
      >
        {/* Search Input */}

        <div className="flex items-center gap-3 border-[var(--glass-border)] border-b p-4">
          <Search className="h-5 w-5 flex-shrink-0 text-[var(--text-secondary)]" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn(
              'flex-1 border-none bg-transparent outline-none',
              'text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]',
              'text-lg'
            )}
          />

          <kbd className="rounded border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-1 text-[var(--text-tertiary)] text-xs">
            ESC
          </kbd>
        </div>

        {/* Results */}

        <div className="max-h-96 overflow-y-auto">
          {Object.entries(categorizedItems).length === 0 ? (
            <div className="p-8 text-center">
              <Search className="mx-auto mb-2 h-8 w-8 text-[var(--text-tertiary)]" />

              <p className="text-[var(--text-secondary)]">No results found</p>

              <p className="mt-1 text-[var(--text-tertiary)] text-sm">
                Try a different search term
              </p>
            </div>
          ) : (
            Object.entries(categorizedItems).map(
              ([category, categoryItems]) => (
                <div key={category} className="py-2">
                  {/* Category Header */}

                  <div className="flex items-center gap-2 px-4 py-2 font-medium text-[var(--text-secondary)] text-xs uppercase tracking-wider">
                    {getCategoryIcon(category)}
                    {category}
                  </div>

                  {/* Category Items */}
                  {categoryItems.map((item) => {
                    const globalIndex = allFilteredItems.indexOf(item);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => {
                          item.action();
                          handleClose();
                        }}
                        className={cn(
                          'flex w-full items-center gap-3 px-4 py-3 text-left',
                          'hover:bg-[var(--glass-bg)]',
                          isSelected && 'bg-[var(--glass-bg)]',
                          microInteraction.gentle
                        )}
                      >
                        {/* Icon */}
                        {item.icon && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--glass-bg)] text-[var(--text-secondary)]">
                            {item.icon}
                          </div>
                        )}

                        {/* Content */}

                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium text-[var(--text-primary)]">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="truncate text-[var(--text-secondary)] text-sm">
                              {item.description}
                            </div>
                          )}
                        </div>

                        {/* Shortcut */}
                        {item.shortcut && (
                          <div className="flex items-center gap-1">
                            {item.shortcut.map((key, index) => (
                              <kbd
                                key={index}
                                className="rounded border border-[var(--glass-border)] bg-[var(--glass-bg)] px-1.5 py-0.5 text-xs"
                              >
                                {formatShortcut([key])}
                              </kbd>
                            ))}
                          </div>
                        )}

                        {/* Arrow */}

                        <ArrowRight className="h-4 w-4 text-[var(--text-tertiary)]" />
                      </button>
                    );
                  })}
                </div>
              )
            )
          )}
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-[var(--glass-border)] border-t px-4 py-3 text-[var(--text-tertiary)] text-xs">
          <div className="flex items-center gap-4">
            <span>Navigate with ↑↓</span>

            <span>Select with ↵</span>
          </div>

          <div className="flex items-center gap-1">
            <Command className="h-3 w-3" />

            <span>Command Palette</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
