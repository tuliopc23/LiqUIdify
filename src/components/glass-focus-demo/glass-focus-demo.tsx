import React, { useState, useRef } from 'react';
import { GlassFocusTrap } from '../glass-focus-trap';
import { GlassSkipNavigation } from '../glass-skip-navigation';
import { RovingTabindexGroup, useRovingTabindex } from '@/core/roving-tabindex';
import { GlassButton } from '../glass-button';
import { GlassCard } from '../glass-card';
import { cn } from '@/lib/glass-utils';

export const GlassFocusDemo: React.FC = () => {
  const [trapActive, setTrapActive] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Setup roving tabindex for menu
  const menuItems = menuItemRefs.current.filter(Boolean) as HTMLElement[];
  const roving = useRovingTabindex({
    items: menuItems,
    orientation: 'vertical',
    loop: true,
    onActiveChange: (_, index) => setSelectedMenuItem(index),
  });

  const menuOptions = [
    { icon: '🏠', label: 'Home', action: 'Navigate to home' },
    { icon: '👤', label: 'Profile', action: 'View your profile' },
    { icon: '⚙️', label: 'Settings', action: 'Adjust preferences' },
    { icon: '📧', label: 'Messages', action: 'Check messages', badge: 3 },
    { icon: '🔔', label: 'Notifications', action: 'View notifications', badge: 7 },
    { icon: '📊', label: 'Analytics', action: 'View analytics' },
    { icon: '🚪', label: 'Sign Out', action: 'Sign out of account' },
  ];

  return (
    <div className="space-y-8">
      {/* Skip Navigation Demo */}
      <GlassSkipNavigation
        autoGenerate={true}
        visibleOnFocus={true}
        position="top"
      />

      {/* Header for skip nav target */}
      <header role="banner" className="mb-8">
        <h1 id="main-heading" className="text-3xl font-bold mb-4">
          Focus Management Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Demonstrating enhanced focus trap, roving tabindex, and skip navigation
        </p>
      </header>

      {/* Navigation for skip nav target */}
      <nav role="navigation" aria-label="Demo navigation" className="mb-8">
        <div className="flex gap-4">
          <a href="#" className="text-blue-500 hover:underline">Link 1</a>
          <a href="#" className="text-blue-500 hover:underline">Link 2</a>
          <a href="#" className="text-blue-500 hover:underline">Link 3</a>
        </div>
      </nav>

      {/* Main content */}
      <main role="main" className="space-y-8">
        {/* Focus Trap Demo */}
        <GlassCard className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Enhanced Focus Trap</h2>
          
          <div className="space-y-4">
            <p>
              Click the button below to activate a focus trap. Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">Escape</kbd> to deactivate.
            </p>
            
            <GlassButton
              onClick={() => setTrapActive(true)}
              aria-label="Activate focus trap demo"
            >
              Activate Focus Trap
            </GlassButton>

            {trapActive && (
              <GlassFocusTrap
                active={trapActive}
                onEscape={() => setTrapActive(false)}
                onDeactivate={() => setTrapActive(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                preventScroll={true}
                returnFocus={true}
              >
                <GlassCard className="relative max-w-md w-full mx-4 p-6 bg-white dark:bg-gray-900">
                  <h3 className="text-xl font-semibold mb-4">Focus Trapped Dialog</h3>
                  
                  <p className="mb-4">
                    Focus is now trapped within this dialog. Try tabbing through the elements.
                  </p>
                  
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div className="flex gap-3 justify-end">
                      <GlassButton
                        variant="ghost"
                        onClick={() => setTrapActive(false)}
                      >
                        Cancel
                      </GlassButton>
                      <GlassButton
                        onClick={() => {
                          alert('Form submitted!');
                          setTrapActive(false);
                        }}
                      >
                        Submit
                      </GlassButton>
                    </div>
                  </form>
                </GlassCard>
              </GlassFocusTrap>
            )}
          </div>
        </GlassCard>

        {/* Roving Tabindex Demo */}
        <GlassCard className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Roving Tabindex Menu</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Interactive Menu</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Use arrow keys to navigate, Home/End for first/last item, or type to search
              </p>
              
              <div
                ref={menuRef}
                role="menu"
                aria-label="Application menu"
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                onKeyDown={roving.handlers.onKeyDown}
              >
                {menuOptions.map((option, index) => (
                  <button
                    key={option.label}
                    ref={el => { menuItemRefs.current[index] = el; }}
                    role="menuitem"
                    tabIndex={roving.getRovingProps(index).tabIndex}
                    onClick={() => alert(option.action)}
                    onFocus={() => roving.handlers.onFocus(index)}
                    className={cn(
                      'w-full px-4 py-3 flex items-center gap-3',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'focus:bg-blue-50 dark:focus:bg-blue-900/20',
                      'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
                      'transition-colors duration-150',
                      selectedMenuItem === index && 'bg-blue-50 dark:bg-blue-900/20'
                    )}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span className="flex-1 text-left">{option.label}</span>
                    {option.badge && (
                      <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                        {option.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Toolbar Example</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Horizontal roving tabindex with icon buttons
              </p>
              
              <RovingTabindexGroup
                orientation="horizontal"
                role="toolbar"
                aria-label="Text formatting"
                className="inline-flex gap-1 p-2 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                {[
                  { icon: 'B', label: 'Bold', style: 'font-bold' },
                  { icon: 'I', label: 'Italic', style: 'italic' },
                  { icon: 'U', label: 'Underline', style: 'underline' },
                  { icon: 'S', label: 'Strikethrough', style: 'line-through' },
                  { icon: '≤', label: 'Align left' },
                  { icon: '≡', label: 'Align center' },
                  { icon: '≥', label: 'Align right' },
                ].map((tool) => (
                  <button
                    key={tool.label}
                    aria-label={tool.label}
                    onClick={() => alert(`${tool.label} clicked`)}
                    className={cn(
                      'w-10 h-10 rounded flex items-center justify-center',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'focus:bg-blue-50 dark:focus:bg-blue-900/20',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500',
                      'transition-colors duration-150',
                      tool.style
                    )}
                  >
                    {tool.icon}
                  </button>
                ))}
              </RovingTabindexGroup>
            </div>
          </div>
        </GlassCard>

        {/* Skip Navigation Info */}
        <GlassCard className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Skip Navigation</h2>
          
          <div className="space-y-4">
            <p>
              Skip navigation links are automatically generated for this page. 
              Focus on the page (click here) and press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">Tab</kbd> to reveal them.
            </p>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium mb-2">Generated Skip Links:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Skip to main navigation</li>
                <li>Skip to main content</li>
                <li>Skip to "Focus Management Demo"</li>
                <li>Skip to "Enhanced Focus Trap"</li>
                <li>Skip to "Roving Tabindex Menu"</li>
                <li>Skip to "Skip Navigation"</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  );
};