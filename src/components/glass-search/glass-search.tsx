import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, Search, TrendingUp, X } from 'lucide-react';
import {
  cn,
  focusRing,
  getGlassClass,
  microInteraction,
} from '@/core/utils/classname';

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'suggestion' | 'trending';
  category?: string;
  count?: number;
}

export interface GlassSearchProps {
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  onSearch?: (query: string) => void;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  className?: string;
  showTrending?: boolean;
  maxSuggestions?: number;
}

export const GlassSearch: React.FC<GlassSearchProps> = ({
  placeholder = 'Search...',
  suggestions = [],
  recentSearches = [],
  onSearch,
  onSuggestionClick,
  className,
  maxSuggestions = 8,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions
    .filter(s => s.text.toLowerCase().includes(query.toLowerCase()))
    .slice(0, maxSuggestions);

  const recentFiltered = recentSearches
    .filter(r => r.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3);

  const allResults = [
    ...recentFiltered.map(r => ({ id: r, text: r, type: 'recent' as const })),
    ...filteredSuggestions,
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) {return;}

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, allResults.length - 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, -1));
          break;
        case 'Enter':
          event.preventDefault();
          if (0 <= selectedIndex && allResults[selectedIndex]) {
            handleSelect(allResults[selectedIndex]);
          } else if (query.trim()) {
            handleSearch();
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    if ('undefined' !== typeof document) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if ('undefined' !== typeof document) {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isOpen, selectedIndex, allResults, query]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query.trim());
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleSelect = (item: SearchSuggestion) => {
    setQuery(item.text);
    onSuggestionClick?.(item);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const getIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return <Clock className="w-4 h-4 text-[var(--text-tertiary)]" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-[var(--text-tertiary)]" />;
      default:
        return <Search className="w-4 h-4 text-[var(--text-tertiary)]" />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full max-w-md', className)}
    >
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-4 h-4 text-[var(--text-secondary)]" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={e => {
            if ('Enter' === e.key) {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder={placeholder}
          className={cn(
            'w-full pl-10 pr-10 py-3 rounded-xl border',
            getGlassClass('default'),
            focusRing,
            'text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]',
            'border-[var(--glass-border)] focus:border-[var(--glass-border-focus)]',
            microInteraction.gentle
          )}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-secondary)]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (query || 0 < recentSearches.length) && (
        <div
          className={cn(
            'absolute top-full left-0 right-0 mt-2 rounded-xl border z-50',
            getGlassClass('elevated'),
            'border-[var(--glass-border)] max-h-80 overflow-y-auto'
          )}
        >
          {/* Recent Searches */}
          {!query && 0 < recentSearches.length && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Recent
              </div>
              {recentSearches.slice(0, 5).map(recent => (
                <button
                  key={recent}
                  onClick={() =>
                    handleSelect({ id: recent, text: recent, type: 'recent' })
                  }
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left',
                    'hover:bg-[var(--glass-bg)] text-[var(--text-primary)]',
                    microInteraction.gentle
                  )}
                >
                  <Clock className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="flex-1 truncate">{recent}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          { 0 < allResults.length && (
            <div className="p-2">
              {query && (
                <div className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Suggestions
                </div>
              )}
              {allResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left',
                    'hover:bg-[var(--glass-bg)] text-[var(--text-primary)]',
                    selectedIndex === index && 'bg-[var(--glass-bg)]',
                    microInteraction.gentle
                  )}
                >
                  {getIcon(result.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{result.text}</span>
                      {'count' in result && result.count && (
                        <span className="text-xs text-[var(--text-tertiary)] ml-2">
                          {result.count.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {'category' in result &&
                      'string' === typeof result.category && (
                        <div className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          in {result.category}
                        </div>
                      )}
                  </div>
                  <ArrowRight className="w-3 h-3 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {query && 0 === allResults.length && (
            <div className="p-8 text-center">
              <Search className="w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-2" />
              <p className="text-[var(--text-secondary)] text-sm">
                No results found
              </p>
              <p className="text-[var(--text-tertiary)] text-xs mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
