import { ArrowRight, Clock, Search, TrendingUp, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  cn,
  focusRing,
  getGlassClass,
  microInteraction,
} from "@/core/utils/classname";

export interface SearchSuggestion {
  id: string;
  text: string;
  type: "recent" | "suggestion" | "trending";
  category?: string;
  count?: number;
}

interface GlassSearchProps {
  placeholder?: string;
  suggestions?: Array<SearchSuggestion>;
  recentSearches?: Array<string>;
  onSearch?: (query: string) => void;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  showTrending?: boolean;
  maxSuggestions?: number;
  className?: string;
  id?: string;
}

export const GlassSearch: React.FC<GlassSearchProps> = ({
  placeholder = "Search...",
  suggestions = [],
  recentSearches = [],
  onSearch,
  onSuggestionClick,
  className,
  maxSuggestions = 8,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = useMemo(
    () =>
      suggestions
        .filter((s) => s.text.toLowerCase().includes(query.toLowerCase()))
        .slice(0, maxSuggestions),
    [suggestions, query, maxSuggestions],
  );

  const recentFiltered = useMemo(
    () =>
      recentSearches
        .filter((r) => r.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3),
    [recentSearches, query],
  );

  const allResults = useMemo(
    () => [
      ...recentFiltered.map((r) => ({
        id: r,
        text: r,
        type: "recent" as const,
      })),
      ...filteredSuggestions,
    ],
    [recentFiltered, filteredSuggestions],
  );

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch?.(query.trim());
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query, onSearch]);

  const handleSelect = useCallback(
    (item: SearchSuggestion) => {
      setQuery(item.text);
      onSuggestionClick?.(item);
      setIsOpen(false);
      setSelectedIndex(-1);
    },
    [onSuggestionClick],
  );

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
      if (!isOpen) {
        return;
      }

      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          setSelectedIndex((previous) =>
            Math.min(previous + 1, allResults.length - 1),
          );
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          setSelectedIndex((previous) => Math.max(previous - 1, -1));
          break;
        }
        case "Enter": {
          event.preventDefault();
          if (selectedIndex >= 0 && allResults[selectedIndex]) {
            handleSelect(allResults[selectedIndex]);
          } else if (query.trim()) {
            handleSearch();
          }
          break;
        }
        case "Escape": {
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
        }
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isOpen, selectedIndex, allResults, query, handleSelect, handleSearch]);

  const getIcon = (type: SearchSuggestion["type"]) => {
    switch (type) {
      case "recent": {
        return <Clock className="h-4 w-4 text-[var(--text-tertiary)]" />;
      }
      case "trending": {
        return <TrendingUp className="h-4 w-4 text-[var(--text-tertiary)]" />;
      }
      default: {
        return <Search className="h-4 w-4 text-[var(--text-tertiary)]" />;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-md", className)}
    >
      {/* Search Input */}

      <div className="relative">
        <div className="-translate-y-1/2 absolute top-1/2 left-3">
          <Search className="h-4 w-4 text-[var(--text-secondary)]" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border py-3 pr-10 pl-10",
            getGlassClass("default"),
            focusRing,
            "text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]",
            "border-[var(--glass-border)] focus:border-[var(--glass-border-focus)]",
            microInteraction.gentle,
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="-translate-y-1/2 absolute top-1/2 right-3 rounded-lg p-1 text-[var(--text-secondary)] hover:bg-[var(--glass-bg)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (query || recentSearches.length > 0) && (
        <div
          className={cn(
            "absolute top-full right-0 left-0 z-50 mt-2 rounded-xl border",
            getGlassClass("elevated"),
            "max-h-80 overflow-y-auto border-[var(--glass-border)]",
          )}
        >
          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 font-medium text-[var(--text-secondary)] text-xs uppercase tracking-wider">
                Recent
              </div>
              {recentSearches.slice(0, 5).map((recent) => (
                <button
                  type="button"
                  key={recent}
                  onClick={() =>
                    handleSelect({ id: recent, text: recent, type: "recent" })
                  }
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left",
                    "text-[var(--text-primary)] hover:bg-[var(--glass-bg)]",
                    microInteraction.gentle,
                  )}
                >
                  <Clock className="h-4 w-4 text-[var(--text-tertiary)]" />

                  <span className="flex-1 truncate">{recent}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {allResults.length > 0 && (
            <div className="p-2">
              {query && (
                <div className="px-3 py-2 font-medium text-[var(--text-secondary)] text-xs uppercase tracking-wider">
                  Suggestions
                </div>
              )}
              {allResults.map((result, index) => (
                <button
                  type="button"
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left",
                    "text-[var(--text-primary)] hover:bg-[var(--glass-bg)]",
                    selectedIndex === index && "bg-[var(--glass-bg)]",
                    microInteraction.gentle,
                  )}
                >
                  {getIcon(result.type)}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{result.text}</span>
                      {"count" in result && result.count && (
                        <span className="ml-2 text-[var(--text-tertiary)] text-xs">
                          {result.count.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {"category" in result &&
                      typeof result.category === "string" && (
                        <div className="mt-0.5 text-[var(--text-tertiary)] text-xs">
                          in {result.category}
                        </div>
                      )}
                  </div>

                  <ArrowRight className="h-3 w-3 text-[var(--text-tertiary)] opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {query && allResults.length === 0 && (
            <div className="p-8 text-center">
              <Search className="mx-auto mb-2 h-8 w-8 text-[var(--text-tertiary)]" />

              <p className="text-[var(--text-secondary)] text-sm">
                No results found
              </p>

              <p className="mt-1 text-[var(--text-tertiary)] text-xs">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
