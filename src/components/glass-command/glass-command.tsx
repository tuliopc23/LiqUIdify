import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
import { cn, getGlassClass, microInteraction } from '@/core/utils/classname';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  category?: string;
  action: () => void;
  keywords?: string[];
}

export interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
  shortcut?: string[];
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
  const filteredItems = items.filter(item => {
    const searchTerms = query.toLowerCase().split(' ');
    const itemText =
      `${item.label} ${item.description || ''} ${item.keywords?.join(' ') || ''}`.toLowerCase();
    return searchTerms.every(term => itemText.includes(term));
  });

  const categorizedItems = filteredItems.reduce(
    (acc, item) => {
      const category = item.category || 'General';
      if (!acc[category]) {acc[category] = [];}
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, CommandItem[]>
  );

  const allFilteredItems = Object.values(categorizedItems).flat();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette
      if ((e.metaKey || e.ctrlKey) && 'k' === e.key) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      if (!isOpen) {return;}

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev =>
            Math.min(prev + 1, allFilteredItems.length - 1)
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (allFilteredItems[selectedIndex]) {
            allFilteredItems[selectedIndex].action();
            handleClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
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
  }, [isOpen, selectedIndex, allFilteredItems]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const formatShortcut = (keys: string[]) => {
    return keys
      .map(key => {
        switch (key.toLowerCase()) {
          case 'cmd':
          case 'command':
            return '⌘';
          case 'ctrl':
            return '^';
          case 'shift':
            return '⇧';
          case 'alt':
          case 'option':
            return '⌥';
          case 'enter':
            return '↵';
          case 'escape':
            return '⎋';
          case 'backspace':
            return '⌫';
          case 'delete':
            return '⌦';
          case 'tab':
            return '⇥';
          case 'space':
            return '␣';
          default:
            return key.toUpperCase();
        }
      })
      .join('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'navigation':
        return <ArrowRight className="w-4 h-4" />;
      case 'user':
        return <User className="w-4 h-4" />;
      case 'settings':
        return <Settings className="w-4 h-4" />;
      case 'content':
        return <FileText className="w-4 h-4" />;
      case 'actions':
        return <Zap className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          getGlassClass('default'),
          'hover:bg-[var(--glass-bg-elevated)]',
          'text-[var(--text-secondary)] text-sm',
          microInteraction.gentle,
          className
        )}
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <div className="ml-auto flex items-center gap-1">
          {shortcut.map((key, index) => (
            <kbd
              key={index}
              className="px-1.5 py-0.5 text-xs rounded bg-[var(--glass-bg)] border border-[var(--glass-border)]"
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
    return ;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Command Palette */}
      <div
        ref={containerRef}
        className={cn(
          'relative w-full max-w-2xl mx-4 rounded-2xl border overflow-hidden',
          getGlassClass('elevated'),
          'border-[var(--glass-border)]',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-[var(--glass-border)]">
          <Search className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn(
              'flex-1 bg-transparent border-none outline-none',
              'text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]',
              'text-lg'
            )}
          />
          <kbd className="px-2 py-1 text-xs rounded bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-tertiary)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          { 0 === Object.entries(categorizedItems).length ? (
            <div className="p-8 text-center">
              <Search className="w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-2" />
              <p className="text-[var(--text-secondary)]">No results found</p>
              <p className="text-[var(--text-tertiary)] text-sm mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            Object.entries(categorizedItems).map(
              ([category, categoryItems]) => (
                <div key={category} className="py-2">
                  {/* Category Header */}
                  <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                    {getCategoryIcon(category)}
                    {category}
                  </div>

                  {/* Category Items */}
                  {categoryItems.map(item => {
                    const globalIndex = allFilteredItems.indexOf(item);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          item.action();
                          handleClose();
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 text-left',
                          'hover:bg-[var(--glass-bg)]',
                          isSelected && 'bg-[var(--glass-bg)]',
                          microInteraction.gentle
                        )}
                      >
                        {/* Icon */}
                        {item.icon && (
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--glass-bg)] text-[var(--text-secondary)]">
                            {item.icon}
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[var(--text-primary)] truncate">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-sm text-[var(--text-secondary)] truncate">
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
                                className="px-1.5 py-0.5 text-xs rounded bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                              >
                                {formatShortcut([key])}
                              </kbd>
                            ))}
                          </div>
                        )}

                        {/* Arrow */}
                        <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                      </button>
                    );
                  })}
                </div>
              )
            )
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--glass-border)] text-xs text-[var(--text-tertiary)]">
          <div className="flex items-center gap-4">
            <span>Navigate with ↑↓</span>
            <span>Select with ↵</span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span>Command Palette</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
