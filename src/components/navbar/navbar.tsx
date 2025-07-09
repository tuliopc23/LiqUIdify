import { Search, Github, Layers } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { AppleLiquidGlassNav } from '@/components/apple-liquid-glass';
import { LiquidGlassSvgFilters } from '@/components/liquid-glass-svg-filters';

export function Navbar() {
  return (
    <>
      <LiquidGlassSvgFilters />
      <AppleLiquidGlassNav
        intensity="medium"
        magnetic={true}
        animated={true}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold font-mono text-white flex items-center">
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
                  className="w-64 px-4 py-2 pl-10 bg-white/20 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm text-white placeholder-white/60"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* GitHub Link */}
              <button className="bg-white/20 rounded-lg p-2 transition-all duration-200 hover:bg-white/30 hover:scale-105">
                <Github className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </AppleLiquidGlassNav>
    </>
  );
}
