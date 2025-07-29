import React, { useRef, useState } from 'react';


import { RovingTabindexGroup, useRovingTabindex } from '@/core/roving-tabindex';

import { cn } from '@/core/utils/classname';
import { GlassButton } from '../glass-button-refactored';
import { GlassCard } from '../glass-card-refactored';
import { GlassFocusTrap } from '../glass-focus-trap';
import { GlassSkipNavigation } from '../glass-skip-navigation';

export const GlassFocusDemo: React.FC = () => {
  const [trapActive, setTrapActive] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemReferences = useRef<HTMLButtonElement | Array<null>>([]);

  // Setup roving tabindex for menu
  const menuItems = menuItemReferences.current.filter(
    Boolean
  ) as Array<HTMLElement>;
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
    {
      icon: '🔔',
      label: 'Notifications',
      action: 'View notifications',
      badge: 7,
    },
    { icon: '📊', label: 'Analytics', action: 'View analytics' },
    { icon: '🚪', label: 'Sign Out', action: 'Sign out of account' },
  ];

  return (
    <div className="space-y-8">
      {/* Skip Navigation Demo */}
      <GlassSkipNavigation autoGenerate visibleOnFocus position="top" />

      {/* Header for skip nav target */}

      <header className="mb-8">
        <h1 id="main-heading" className="mb-4 font-bold text-3xl">
          Focus Management Demo
        </h1>

        <p className="text-gray-600 dark:text-gray-400">
          Demonstrating enhanced focus trap, roving tabindex, and skip
          navigation
        </p>
      </header>

      {/* Navigation for skip nav target  */}

      <nav aria-label="Demo navigation" className="mb-8">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {}}
            className="cursor-pointer border-none bg-transparent text-blue-500 hover:underline"
          >
            Link 1
          </button>

          <button
            type="button"
            onClick={() => {}}
            className="cursor-pointer border-none bg-transparent text-blue-500 hover:underline"
          >
            Link 2
          </button>

          <button
            type="button"
            onClick={() => {}}
            className="cursor-pointer border-none bg-transparent text-blue-500 hover:underline"
          >
            Link 3
          </button>
        </div>
      </nav>

      {/* Main content  */}

      <main className="space-y-8">
        {/* Focus Trap Demo  */}

        <GlassCard className="p-6">
          <h2 className="mb-4 font-semibold text-2xl">Enhanced Focus Trap</h2>

          <div className="space-y-4">
            <p>
              Click the button below to activate a focus trap. Press{' '}
              <kbd className="rounded bg-gray-200 px-2 py-1 text-sm dark:bg-gray-700">
                Escape
              </kbd>{' '}
              to deactivate.
            </p>

            <GlassButton
              type="button"
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
                preventScroll
                returnFocus
              >
                <GlassCard className="relative mx-4 w-full max-w-md bg-white p-6 dark:bg-gray-900">
                  <h3 className="mb-4 font-semibold text-xl">
                    Focus Trapped Dialog
                  </h3>

                  <p className="mb-4">
                    Focus is now trapped within this dialog. Try tabbing through
                    the elements.
                  </p>

                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1 block font-medium text-sm"
                      >
                        Name
                      </label>

                      <input
                        id="name"
                        type="text"
                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block font-medium text-sm"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <GlassButton
                        type="button"
                        variant="ghost"
                        onClick={() => setTrapActive(false)}
                      >
                        Cancel
                      </GlassButton>

                      <GlassButton
                        type="button"
                        onClick={() => {
                          // Form submission handled
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

        {/* Roving Tabindex Demo  */}

        <GlassCard className="p-6">
          <h2 className="mb-4 font-semibold text-2xl">Roving Tabindex Menu</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-medium text-lg">Interactive Menu</h3>

              <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
                Use arrow keys to navigate, Home/End for first/last item, or
                type to search
              </p>

              <div
                ref={menuRef}
                role="menu"
                aria-label="Application menu"
                className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                onKeyDown={roving.handlers.onKeyDown}
              >
                {menuOptions.map((option, index) => (
                  <button
                    type="button"
                    key={option.label}
                    ref={(element) => {
                      menuItemReferences.current[index] = element;
                    }}
                    role="menuitem"
                    {...roving.getRovingProps(index)}
                    onClick={() => option.action?.()}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-3',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'focus:bg-blue-50 dark:focus:bg-blue-900/20',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
                      'transition-colors duration-150',
                      selectedMenuItem === index &&
                        'bg-blue-50 dark:bg-blue-900/20'
                    )}
                  >
                    <span className="text-xl">{option.icon}</span>

                    <span className="flex-1 text-left">{option.label}</span>
                    {option.badge && (
                      <span className="rounded-full bg-red-500 px-2 py-1 text-white text-xs">
                        {option.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-medium text-lg">Toolbar Example</h3>

              <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
                Horizontal roving tabindex with icon buttons
              </p>

              <RovingTabindexGroup
                orientation="horizontal"
                role="toolbar"
                aria-label="Text formatting"
                className="inline-flex gap-1 rounded-lg border border-gray-200 p-2 dark:border-gray-700"
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
                    type="button"
                    key={tool.label}
                    aria-label={tool.label}
                    onClick={() => {}}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded',
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

        {/* Skip Navigation Info  */}

        <GlassCard className="p-6">
          <h2 className="mb-4 font-semibold text-2xl">Skip Navigation</h2>

          <div className="space-y-4">
            <p>
              Skip navigation links are automatically generated for this page.
              Focus on the page (click here) and press{' '}
              <kbd className="rounded bg-gray-200 px-2 py-1 text-sm dark:bg-gray-700">
                Tab
              </kbd>{' '}
              to reveal them.
            </p>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h3 className="mb-2 font-medium">Generated Skip Links:</h3>

              <ul className="list-inside list-disc space-y-1 text-sm">
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
