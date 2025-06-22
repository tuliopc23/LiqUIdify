import { Search, Github, Layers } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold font-mono text-primary flex items-center">
                <Layers className="mr-2 h-6 w-6" />
                Liquid Glass UI
              </h1>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-secondary">
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
                className="w-64 px-4 py-2 pl-10 glass-effect rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary text-sm text-primary bg-glass"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* GitHub Link */}
            <button className="glass-effect rounded-lg p-2 btn-scale hover:bg-opacity-80">
              <Github className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
