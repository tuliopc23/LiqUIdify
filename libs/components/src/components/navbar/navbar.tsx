import { Github, Layers, Search } from 'lucide-react';

import { AppleLiquidGlassNav } from '@/components/apple-liquid-glass';

// import { LiquidGlassSvgFilters } from "@/components/liquid-glass-svg-filters";
import { ThemeToggle } from '../theme-toggle';

export function Navbar() {
  return (
    <>
      {/* <LiquidGlassSvgFilters /> */}

      <AppleLiquidGlassNav
        intensity="medium"
        magnetic
        animated
        className="fixed top-0 right-0 left-0 z-50 border-white/15 border-b"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="flex items-center font-bold font-mono text-white text-xl">
                  <Layers className="mr-2 h-6 w-6" />
                  Liquid Glass UI
                </h1>
              </div>

              <div className="hidden md:block">
                <span className="text-sm text-white/70">
                  React Component Library
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Box */}

              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search components..."
                  className="w-64 rounded-lg border border-white/30 bg-white/20 px-4 py-2 pl-10 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />

                <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-white/70" />
              </div>

              {/* Theme Toggle */}

              <ThemeToggle />

              {/* GitHub Link */}

              <button
                type="button"
                className="rounded-lg bg-white/20 p-2 transition-all duration-200 hover:scale-105 hover:bg-white/30"
              >
                <Github className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </AppleLiquidGlassNav>
    </>
  );
}
